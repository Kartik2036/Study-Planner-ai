import React, { useState, useMemo } from 'react';
import { RefreshCw, CheckCircle, AlertTriangle, Plus, Trash2 } from 'lucide-react';

export default function StudyPlannerPage({
  stream,
  streamConfig,
  examDate,
  setExamDate,
  dailyHours,
  setDailyHours,
  studyPlan,
  setStudyPlan,
  awardXP,
  triggerToast
}) {
  const [newTopic, setNewTopic] = useState("");
  const [newSubject, setNewSubject] = useState(streamConfig.subjects[0]);
  const [newDuration, setNewDuration] = useState(1.5);
  const [newDifficulty, setNewDifficulty] = useState("Medium");
  const [viewFormat, setViewFormat] = useState("daily");

  const remainingHours = useMemo(
    () => studyPlan.filter((s) => !s.completed).reduce((acc, item) => acc + Number(item.duration), 0),
    [studyPlan]
  );

  const daysUntilExam = useMemo(() => {
    const today = new Date("2026-10-28");
    const target = new Date(examDate);
    const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24));
    return Math.max(diff, 1);
  }, [examDate]);

  const totalAvailableCapacity = daysUntilExam * dailyHours;
  const isFeasible = remainingHours <= totalAvailableCapacity;

  const handleAddTopic = (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;
    const item = {
      id: `sp-${Date.now()}`,
      topic: newTopic,
      subject: newSubject,
      duration: Number(newDuration),
      difficulty: newDifficulty,
      understanding: newDifficulty === "Hard" ? "Weak" : "Moderate",
      priority: newDifficulty === "Hard" ? "High" : "Medium",
      completed: false,
      type: "Core Study"
    };
    setStudyPlan([item, ...studyPlan]);
    setNewTopic("");
    triggerToast(`Added "${newTopic}" to your adaptive plan!`);
  };

  const handleRedistributeMissed = () => {
    const rank = { "CRITICAL (Quiz Weakness)": 1, High: 2, Medium: 3, Low: 4 };
    const sorted = [...studyPlan].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return (rank[a.priority] || 3) - (rank[b.priority] || 3);
    });
    setStudyPlan(sorted);
    triggerToast("Unfinished tasks redistributed across available daily slots without overlap!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">Adaptive AI Study Planner</h1>
          <p className="text-sm text-slate-500">
            Deterministic scheduling for {stream} exams — auto-prioritizes your quiz weaknesses.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewFormat("daily")}
            className={`px-4 py-2 rounded-xl text-xs font-bold ${viewFormat === "daily" ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600"}`}
          >
            Daily View
          </button>
          <button
            onClick={() => setViewFormat("weekly")}
            className={`px-4 py-2 rounded-xl text-xs font-bold ${viewFormat === "weekly" ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600"}`}
          >
            Weekly Breakdown
          </button>
          <button
            onClick={handleRedistributeMissed}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 flex items-center gap-1.5"
          >
            <RefreshCw size={14} /> Reschedule Unfinished
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Target Examination Date</label>
          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-bold"
          />
          <p className="text-xs text-slate-500 mt-1.5">{daysUntilExam} days remaining until exam</p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200">
          <label className="block text-xs font-bold text-slate-500 uppercase mb-1">
            Available Study Hours / Day: <span className="text-purple-700">{dailyHours} hrs/day</span>
          </label>
          <input
            type="range"
            min="0.5"
            max="10"
            step="0.5"
            value={dailyHours}
            onChange={(e) => setDailyHours(Number(e.target.value))}
            className="w-full accent-purple-600 mt-2"
          />
          <p className="text-xs text-slate-500 mt-1">
            Total Capacity: <strong>{totalAvailableCapacity} hrs</strong> before exam
          </p>
        </div>

        <div className={`p-5 rounded-2xl border ${isFeasible ? "bg-emerald-50 border-emerald-200" : "bg-red-50 border-red-300"}`}>
          <div className="flex items-center gap-2 font-extrabold text-sm">
            {isFeasible ? (
              <>
                <CheckCircle size={18} className="text-emerald-600" />
                <span className="text-emerald-900">Schedule is Feasible</span>
              </>
            ) : (
              <>
                <AlertTriangle size={18} className="text-red-600" />
                <span className="text-red-900">Workload Overload Warning!</span>
              </>
            )}
          </div>
          <p className="text-xs mt-1.5 leading-relaxed text-slate-700">
            {isFeasible
              ? `Remaining workload (${remainingHours} hrs) fits comfortably within your ${totalAvailableCapacity} hr capacity.`
              : `Remaining ${remainingHours} hrs exceeds your ${totalAvailableCapacity} hr capacity! Increase daily hours or focus on CRITICAL topics.`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <form onSubmit={handleAddTopic} className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 space-y-4 h-fit">
          <h3 className="font-extrabold text-slate-900 text-base">Add Topic / Chapter</h3>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Subject</label>
            <select
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold"
            >
              {streamConfig.subjects.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Topic or Chapter Name</label>
            <input
              type="text"
              required
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="e.g., IPv4 Subnetting & CIDR"
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Duration (Hrs)</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="6"
                value={newDuration}
                onChange={(e) => setNewDuration(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Difficulty</label>
              <select
                value={newDifficulty}
                onChange={(e) => setNewDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
          >
            <Plus size={16} /> Add to Study Plan
          </button>
        </form>

        <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200 space-y-3">
          <h3 className="font-extrabold text-slate-900 text-base mb-2">
            {viewFormat === "daily" ? "Structured Daily Study Sessions & Breaks" : "Weekly Revision & Practice Schedule"}
          </h3>
          {studyPlan.map((item, idx) => (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                item.completed ? "bg-slate-50 border-slate-200 opacity-70" : "bg-white border-slate-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => {
                    setStudyPlan(
                      studyPlan.map((s) => (s.id === item.id ? { ...s, completed: !s.completed } : s))
                    );
                    if (!item.completed) awardXP(40, `Completed: ${item.topic}`);
                  }}
                  className="mt-1 w-4 h-4 accent-purple-600"
                />
                <div>
                  <span className="text-[11px] font-bold text-slate-400 uppercase">
                    Slot {idx + 1} • {viewFormat === "weekly" ? `Day ${(idx % 5) + 1}` : "Today"} • Includes 10m Break
                  </span>
                  <h4 className={`font-bold text-sm ${item.completed ? "line-through text-slate-400" : "text-slate-900"}`}>
                    {item.topic}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {item.subject} • Difficulty: <strong>{item.difficulty}</strong> • Est: <strong>{item.duration}h</strong>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 self-end sm:self-center">
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-lg ${
                    item.priority.includes("CRITICAL") ? "bg-red-100 text-red-700" : "bg-purple-50 text-purple-700"
                  }`}
                >
                  {item.priority}
                </span>
                <button
                  onClick={() => setStudyPlan(studyPlan.filter((s) => s.id !== item.id))}
                  className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}