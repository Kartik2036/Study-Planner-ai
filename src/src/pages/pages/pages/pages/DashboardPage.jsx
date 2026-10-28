import React from 'react';
import {
  Flame, Sparkles, Clock, CheckCircle, Target, Upload,
  Zap, MessageSquare, Users, AlertTriangle, Check, Bell
} from 'lucide-react';
import { StatBadge, QuickActionBtn } from '../components/ui/CommonUI';

export default function DashboardPage({
  user,
  stream,
  streamConfig,
  studyPlan,
  setStudyPlan,
  topicPerformance,
  awardXP,
  navigateTo
}) {
  const completedCount = studyPlan.filter((s) => s.completed).length;
  const weakTopics = topicPerformance.filter((t) => t.status === "Needs Attention");

  const toggleSession = (id) => {
    setStudyPlan((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextState = !s.completed;
          if (nextState) awardXP(40, `Completed study session: ${s.topic}`);
          return { ...s, completed: nextState };
        }
        return s;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold px-3 py-1 rounded-full ${streamConfig.badgeBg}`}>
              {stream} Stream • {streamConfig.ageGroup}
            </span>
            <span className="text-xs text-slate-400 font-semibold">
              Wednesday, Oct 28, 2026
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Recommended Next Activity: Complete your adaptive revision on{" "}
            <strong className="text-purple-700">TCP Three-Way Handshake</strong>.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <StatBadge icon={Flame} label="Streak" value={`${user.streak} Days`} color="text-orange-600 bg-orange-50" />
          <StatBadge icon={Sparkles} label="XP & Level" value={`${user.xp} XP (Lvl ${user.level})`} color="text-purple-700 bg-purple-50" />
          <StatBadge icon={Clock} label="Total Hours" value={`${user.studyHours} hrs`} color="text-blue-700 bg-blue-50" />
          <StatBadge icon={CheckCircle} label="Sessions" value={`${completedCount}/${studyPlan.length}`} color="text-emerald-700 bg-emerald-50" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <QuickActionBtn icon={Target} label="1. Generate Study Plan" onClick={() => navigateTo("planner")} />
        <QuickActionBtn icon={Upload} label="2. Upload Notes" onClick={() => navigateTo("quiz")} />
        <QuickActionBtn icon={Zap} label="3. Start a Quiz" onClick={() => navigateTo("quiz")} />
        <QuickActionBtn icon={MessageSquare} label="4. Ask a Doubt" onClick={() => navigateTo("studentlife")} />
        <QuickActionBtn icon={Users} label="5. Find Study Groups" onClick={() => navigateTo("leaderboard")} />
      </div>

      {weakTopics.length > 0 && (
        <div className="bg-gradient-to-r from-red-50 via-amber-50 to-purple-50 border border-red-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-red-100 text-red-700 rounded-xl shrink-0 mt-0.5">
              <AlertTriangle size={20} />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-red-700">
                Adaptive Mistake Memory Alert
              </span>
              <h3 className="font-bold text-slate-900 text-sm">
                Needs Attention: {weakTopics[0].topic} ({weakTopics[0].accuracy}% Accuracy)
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Last mistake: {weakTopics[0].lastMistake}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0">
            <button
              onClick={() => navigateTo("mistakes")}
              className="px-3.5 py-2 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-100"
            >
              AI Concept Breakdown
            </button>
            <button
              onClick={() => navigateTo("studentlife")}
              className="px-3.5 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700"
            >
              Ask Peer Mentor
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900">Today's Adaptive Study Plan</h2>
              <p className="text-xs text-slate-500">Check off completed sessions to earn verified +40 XP</p>
            </div>
            <button onClick={() => navigateTo("planner")} className="text-xs font-bold text-purple-600 hover:underline">
              Full Planner →
            </button>
          </div>

          <div className="space-y-3">
            {studyPlan.map((session) => (
              <div
                key={session.id}
                onClick={() => toggleSession(session.id)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex items-center justify-between gap-3 ${
                  session.completed
                    ? "bg-slate-50 border-slate-200 opacity-75"
                    : session.priority.includes("CRITICAL")
                    ? "bg-purple-50/40 border-purple-300"
                    : "bg-white border-slate-200 hover:border-purple-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center border ${
                      session.completed ? "bg-emerald-600 border-emerald-600 text-white" : "border-slate-300 bg-white"
                    }`}
                  >
                    {session.completed && <Check size={14} />}
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${session.completed ? "line-through text-slate-400" : "text-slate-900"}`}>
                      {session.topic}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="text-[11px] font-semibold text-slate-500">{session.subject}</span>
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {session.duration} hrs
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          session.priority.includes("CRITICAL") ? "bg-red-100 text-red-700" : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {session.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-400 shrink-0">{session.type}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className={`bg-gradient-to-br ${streamConfig.color} text-white p-6 rounded-3xl shadow-md`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-extrabold flex items-center gap-2">
                <Bell size={20} /> Upcoming {stream} Exams
              </h2>
              <span className="text-[11px] bg-white/20 px-2.5 py-1 rounded-full font-bold">Live Alerts</span>
            </div>
            <div className="space-y-3">
              {streamConfig.exams.map((exam) => (
                <div key={exam.id} className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/15">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold bg-white/20 px-2 py-0.5 rounded">
                      {exam.badge}
                    </span>
                    <span className="text-xs font-extrabold text-amber-200">
                      In {exam.daysLeft} Days ({exam.date})
                    </span>
                  </div>
                  <h3 className="font-bold text-sm mt-1.5">{exam.title}</h3>
                  <p className="text-xs text-blue-100 mt-1">Syllabus: {exam.syllabus}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-extrabold text-slate-900 mb-3">
              Weekly Quiz Accuracy & Study Hours
            </h3>
            <div className="flex items-end justify-between h-36 gap-2 pt-4 px-2 border-b border-slate-100">
              {[
                { day: "Mon", acc: 58 },
                { day: "Tue", acc: 64 },
                { day: "Wed", acc: 42 },
                { day: "Thu", acc: 72 },
                { day: "Fri", acc: 79 },
                { day: "Sat", acc: 84 },
                { day: "Sun", acc: 88 }
              ].map((bar) => (
                <div key={bar.day} className="flex-1 flex flex-col items-center gap-1 group">
                  <span className="text-[10px] font-bold text-purple-700 opacity-0 group-hover:opacity-100 transition">
                    {bar.acc}%
                  </span>
                  <div className="w-full max-w-[28px] bg-slate-100 rounded-t-lg h-24 flex items-end overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-lg transition-all"
                      style={{ height: `${bar.acc}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-500">{bar.day}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 mt-3">
              <span>Quiz Accuracy Improvement: <strong className="text-emerald-600">{user.quizImprovement}</strong></span>
              <span>Target: <strong>85%+</strong></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}