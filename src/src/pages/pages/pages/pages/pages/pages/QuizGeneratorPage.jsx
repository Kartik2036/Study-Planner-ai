import React, { useState, useMemo } from 'react';
import { Upload } from 'lucide-react';
import { TCP_DEMO_QUIZ } from '../data/mockData';

export default function QuizGeneratorPage({
  awardXP,
  setTopicPerformance,
  studyPlan,
  setStudyPlan,
  navigateTo,
  triggerToast
}) {
  const [notesInput, setNotesInput] = useState(
    "The TCP Three-Way Handshake establishes a reliable transport connection. Step 1: Client sends SYN with initial sequence number x. Step 2: Server replies with SYN-ACK (seq=y, ack=x+1). Step 3: Client replies with ACK (ack=y+1). Leaving half-open connections causes a SYN Flood DoS attack."
  );
  const [fileStatus, setFileStatus] = useState("Loaded Demo Excerpt: TCP Three-Way Handshake");
  const [activeSubView, setActiveSubView] = useState("quiz");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setFileStatus("Error: File exceeds 5MB limit.");
      return;
    }
    if (file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setNotesInput(ev.target.result);
        setFileStatus(`Extracted text from ${file.name}`);
      };
      reader.readAsText(file);
    } else {
      setFileStatus(`Uploaded ${file.name} (Grounded excerpt loaded below).`);
    }
  };

  const scoreCount = useMemo(() => {
    return TCP_DEMO_QUIZ.questions.reduce(
      (acc, q) => acc + (answers[q.id] === q.correctAnswer ? 1 : 0),
      0
    );
  }, [answers]);

  const handleSubmitQuiz = () => {
    if (Object.keys(answers).length < TCP_DEMO_QUIZ.questions.length) {
      triggerToast("Please answer all questions before submitting!", "error");
      return;
    }
    setSubmitted(true);
    const accuracy = Math.round((scoreCount / TCP_DEMO_QUIZ.questions.length) * 100);
    awardXP(75, `Completed Quiz (${accuracy}% Score)`);

    setTopicPerformance((prev) =>
      prev.map((tp) => {
        if (tp.topic === "TCP Three-Way Handshake") {
          const newStatus = accuracy >= 80 ? "Improving" : "Needs Attention";
          return {
            ...tp,
            attempted: tp.attempted + 3,
            correct: tp.correct + scoreCount,
            accuracy,
            status: newStatus,
            attemptsCount: tp.attemptsCount + 1,
            lastRevised: "Today"
          };
        }
        return tp;
      })
    );

    if (accuracy < 70) {
      const alreadyExists = studyPlan.some((s) => s.id === "adaptive-tcp-urgent");
      if (!alreadyExists) {
        setStudyPlan([
          {
            id: "adaptive-tcp-urgent",
            topic: "URGENT RETRY: TCP Sequence & ACK Numbers",
            subject: "Computer Networks",
            duration: 1.0,
            difficulty: "Hard",
            understanding: "Weak",
            priority: "CRITICAL (Quiz Weakness)",
            completed: false,
            type: "Adaptive Follow-Up"
          },
          ...studyPlan
        ]);
      }
      triggerToast("Low quiz score detected! Study Planner & Mistake Memory updated automatically.");
    }
  };

  const handleSimulateLowScoreDemo = () => {
    setAnswers({
      q1: "1000",
      q2: "True",
      q3: "SYN Flood Attack (DoS)"
    });
    setSubmitted(false);
    triggerToast("Filled sample answers (1/3) — Click 'Submit Quiz' to trigger the Adaptive Loop!");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Notes-to-Quiz Generator</h1>
            <p className="text-sm text-slate-500">
              Convert textbook excerpts or notes into interactive MCQs, True/False, Flashcards & Summaries.
            </p>
          </div>
          <button
            onClick={handleSimulateLowScoreDemo}
            className="px-4 py-2.5 bg-amber-100 text-amber-900 rounded-xl text-xs font-extrabold hover:bg-amber-200 transition"
          >
            ⚡ Demo Scenario: Simulate Poor TCP Score
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-8">
            <label className="block text-xs font-bold text-slate-600 mb-1">Paste Notes or Textbook Excerpt</label>
            <textarea
              rows={3}
              value={notesInput}
              onChange={(e) => setNotesInput(e.target.value)}
              className="w-full p-3.5 border border-slate-200 rounded-2xl text-sm outline-none"
            />
          </div>
          <div className="lg:col-span-4">
            <label className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center cursor-pointer hover:bg-slate-50 transition flex flex-col items-center justify-center h-full">
              <Upload size={22} className="text-purple-600 mb-1" />
              <span className="text-xs font-bold text-slate-700">Upload .TXT or .PDF Notes</span>
              <span className="text-[11px] text-slate-400 mt-0.5">{fileStatus}</span>
              <input type="file" accept=".txt,.pdf" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {["quiz", "flashcards", "summary"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubView(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize ${
                activeSubView === tab ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {activeSubView === "flashcards" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TCP_DEMO_QUIZ.flashcards.map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Flashcard #{i + 1}</span>
                <h3 className="font-extrabold text-base text-slate-900 mt-1">{card.front}</h3>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-sm text-slate-600">{card.back}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSubView === "summary" && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="font-extrabold text-lg text-slate-900 mb-2">AI Concise Topic Summary</h3>
          <p className="text-sm text-slate-700 leading-relaxed">{TCP_DEMO_QUIZ.summary}</p>
        </div>
      )}

      {activeSubView === "quiz" && (
        <div className="space-y-4">
          {TCP_DEMO_QUIZ.questions.map((q, index) => {
            const selected = answers[q.id];
            const isCorrect = selected === q.correctAnswer;
            return (
              <div key={q.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-purple-700 bg-purple-50 px-3 py-1 rounded-full">
                    Q{index + 1} • {q.type} • {q.topic}
                  </span>
                  <span className="text-xs font-bold text-slate-400">Difficulty: {q.difficulty}</span>
                </div>
                <h3 className="font-bold text-base text-slate-900">{q.question}</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt) => {
                    let btnStyle = "border-slate-200 hover:border-purple-400 bg-white";
                    if (selected === opt) btnStyle = "border-purple-600 bg-purple-50 text-purple-900";
                    if (submitted) {
                      if (opt === q.correctAnswer) btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-900";
                      else if (selected === opt) btnStyle = "border-red-400 bg-red-50 text-red-900";
                    }
                    return (
                      <button
                        key={opt}
                        disabled={submitted}
                        onClick={() => setAnswers({ ...answers, [q.id]: opt })}
                        className={`p-3.5 rounded-2xl border-2 text-left text-sm font-semibold transition ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className={`p-4 rounded-2xl text-xs ${isCorrect ? "bg-emerald-50 text-emerald-900" : "bg-red-50 text-red-900"}`}>
                    <p className="font-extrabold mb-1">
                      {isCorrect ? "✓ Correct!" : `✗ Incorrect (Correct Answer: ${q.correctAnswer})`}
                    </p>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}

          {!submitted ? (
            <button
              onClick={handleSubmitQuiz}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-2xl font-extrabold text-base shadow-lg"
            >
              Submit Quiz & Analyze Performance
            </button>
          ) : (
            <div className="bg-slate-900 text-white p-6 rounded-3xl space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold uppercase text-purple-400">Quiz Result & Adaptive Action</span>
                  <h3 className="text-2xl font-extrabold mt-1">
                    You Scored {scoreCount} / {TCP_DEMO_QUIZ.questions.length} ({Math.round((scoreCount / TCP_DEMO_QUIZ.questions.length) * 100)}%)
                  </h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => { setSubmitted(false); setAnswers({}); }}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold"
                  >
                    Retry Quiz
                  </button>
                  <button
                    onClick={() => navigateTo("mistakes")}
                    className="px-4 py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-xs font-bold"
                  >
                    View Mistake Memory →
                  </button>
                  <button
                    onClick={() => navigateTo("studentlife")}
                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold"
                  >
                    Ask Peer / AI in Student Life →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}