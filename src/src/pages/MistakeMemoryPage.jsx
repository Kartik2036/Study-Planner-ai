import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function MistakeMemoryPage({ topicPerformance, navigateTo, awardXP }) {
  const [selectedTopicForAI, setSelectedTopicForAI] = useState(topicPerformance[0]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-extrabold text-slate-900">Adaptive Learning & Mistake Memory</h1>
        <p className="text-sm text-slate-500">
          Tracks multi-attempt accuracy across topics so no concept is declared mastered from a single quiz.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-4">
          {topicPerformance.map((tp) => {
            const badgeStyle =
              tp.status === "Needs Attention"
                ? "bg-red-100 text-red-700"
                : tp.status === "Improving"
                ? "bg-amber-100 text-amber-800"
                : "bg-emerald-100 text-emerald-700";

            return (
              <div key={tp.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400">{tp.subject}</span>
                  <span className={`text-xs font-extrabold px-3 py-1 rounded-full ${badgeStyle}`}>
                    {tp.status} ({tp.accuracy}%)
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-slate-900">{tp.topic}</h3>
                <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <strong>Recorded Mistake Pattern:</strong> {tp.lastMistake}
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs text-slate-500 pt-1">
                  <div>Attempted: <strong>{tp.correct}/{tp.attempted}</strong></div>
                  <div>Practice Runs: <strong>{tp.attemptsCount}</strong></div>
                  <div>Next Revision: <strong className="text-purple-700">{tp.nextRevision}</strong></div>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button
                    onClick={() => setSelectedTopicForAI(tp)}
                    className="px-3.5 py-2 bg-purple-50 text-purple-700 rounded-xl text-xs font-bold hover:bg-purple-100"
                  >
                    1. Simple AI Explanation
                  </button>
                  <button
                    onClick={() => navigateTo("quiz")}
                    className="px-3.5 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold hover:bg-blue-100"
                  >
                    2. Targeted Practice Quiz
                  </button>
                  <button
                    onClick={() => navigateTo("studentlife")}
                    className="px-3.5 py-2 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-200"
                  >
                    3. Related Peer Discussion
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-purple-900 to-slate-900 text-white p-6 rounded-3xl shadow-lg space-y-4 h-fit">
          <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase">
            <Sparkles size={16} /> Adaptive Concept Remediator
          </div>
          <h3 className="text-xl font-extrabold">{selectedTopicForAI.topic}</h3>
          <div className="bg-white/10 p-4 rounded-2xl text-xs leading-relaxed space-y-2 text-slate-100">
            <p className="font-bold text-white">Simple Analogy Breakdown:</p>
            <p>Think of the <strong>TCP Three-Way Handshake</strong> like a phone call:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Step 1 (SYN):</strong> "Hello, can you hear me? My starting counter is 1000."</li>
              <li><strong>Step 2 (SYN-ACK):</strong> "Yes, I hear you! Expecting 1001 next. My counter is 5000."</li>
              <li><strong>Step 3 (ACK):</strong> "Loud and clear! Expecting 5001 from you. Here is my first data packet."</li>
            </ul>
          </div>
          <button
            onClick={() => awardXP(25, `Reviewed Adaptive Breakdown: ${selectedTopicForAI.topic}`)}
            className="w-full py-3 bg-purple-500 hover:bg-purple-400 text-white rounded-xl font-bold text-xs transition"
          >
            Mark Concept Reviewed (+25 XP)
          </button>
        </div>
      </div>
    </div>
  );
}