import React, { useState } from 'react';

export default function LeaderboardPage({
  user,
  stream,
  studyGroups,
  setStudyGroups,
  privacy,
  setPrivacy,
  awardXP,
  triggerToast
}) {
  const [boardType, setBoardType] = useState("consistency");
  const [inviteCodeInput, setInviteCodeInput] = useState("");

  const leaderboardRows = [
    { name: "Priya Nair", stream: "Medical", xp: 2890, sessions: 42, improvement: "+31%", helpful: 29, badge: "Helpful Mentor" },
    { name: user.name + " (You)", stream, xp: user.xp, sessions: 19, improvement: user.quizImprovement, helpful: user.helpfulAnswers, badge: "Learning Comeback", isMe: true },
    { name: "Rohan Verma", stream: "Engineering", xp: 2450, sessions: 35, improvement: "+24%", helpful: 38, badge: "Consistency Champion" },
    { name: "Siddharth Iyer", stream: "Government Exams", xp: 2190, sessions: 31, improvement: "+22%", helpful: 25, badge: "Revision Master" }
  ];

  const handleJoinByCode = (e) => {
    e.preventDefault();
    const match = studyGroups.find((g) => g.code.toLowerCase() === inviteCodeInput.trim().toLowerCase());
    if (!match) {
      triggerToast("Invalid group invite code! Try NET-2026 or MED-2026.", "error");
      return;
    }
    setStudyGroups(studyGroups.map((g) => (g.id === match.id ? { ...g, joined: true, members: g.members + 1 } : g)));
    setInviteCodeInput("");
    awardXP(30, `Joined Study Group: ${match.name}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Friends Leaderboard & Smart Study Groups
          </h1>
          <p className="text-sm text-slate-500">
            Fair rankings based on consistency, quiz improvement, and helping peers—never raw exam marks alone.
          </p>
        </div>
        <label className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 px-4 py-2.5 rounded-xl cursor-pointer">
          <input
            type="checkbox"
            checked={!privacy.showOnLeaderboard}
            onChange={() => setPrivacy({ ...privacy, showOnLeaderboard: !privacy.showOnLeaderboard })}
            className="accent-purple-600"
          />
          Keep My Progress Private
        </label>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setBoardType("consistency")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold ${boardType === "consistency" ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600"}`}
          >
            1. Consistency Leaderboard
          </button>
          <button
            onClick={() => setBoardType("improvement")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold ${boardType === "improvement" ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600"}`}
          >
            2. Learning Improvement Leaderboard
          </button>
          <button
            onClick={() => setBoardType("helper")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold ${boardType === "helper" ? "bg-purple-600 text-white" : "bg-slate-100 text-slate-600"}`}
          >
            3. Community Helper Leaderboard
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-[11px] font-bold uppercase text-slate-400">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Stream</th>
                <th className="py-3 px-4">Verified XP</th>
                <th className="py-3 px-4">Sessions</th>
                <th className="py-3 px-4">Quiz Improvement</th>
                <th className="py-3 px-4">Helpful Answers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {leaderboardRows
                .filter((r) => (r.isMe ? privacy.showOnLeaderboard : true))
                .map((row, i) => (
                  <tr key={row.name} className={row.isMe ? "bg-purple-50/60 font-bold" : ""}>
                    <td className="py-3.5 px-4 font-extrabold text-purple-700">#{i + 1}</td>
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900">{row.name}</span>
                      <span className="block text-[11px] text-slate-500">{row.badge}</span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-semibold text-slate-600">{row.stream}</td>
                    <td className="py-3.5 px-4 font-bold text-purple-700">{row.xp} XP</td>
                    <td className="py-3.5 px-4">{row.sessions}</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-bold">{row.improvement}</td>
                    <td className="py-3.5 px-4">{row.helpful}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900">
            Smart Study Group Recommendations (Matched to {stream})
          </h2>
          {studyGroups.map((sg) => (
            <div key={sg.id} className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full">
                    {sg.stream}
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-400">Code: {sg.code}</span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-base mt-1">{sg.name}</h3>
                <p className="text-xs text-slate-500">
                  Focus: <strong>{sg.topic}</strong> • {sg.members} Members • Challenge: {sg.activeChallenge}
                </p>
              </div>
              <button
                onClick={() => {
                  setStudyGroups(studyGroups.map((g) => (g.id === sg.id ? { ...g, joined: !g.joined } : g)));
                  if (!sg.joined) awardXP(30, `Joined ${sg.name}`);
                }}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 ${
                  sg.joined ? "bg-emerald-100 text-emerald-800" : "bg-purple-600 text-white hover:bg-purple-700"
                }`}
              >
                {sg.joined ? "✓ Joined Group" : "Join Study Group"}
              </button>
            </div>
          ))}
        </div>

        <form onSubmit={handleJoinByCode} className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 h-fit">
          <h3 className="font-extrabold text-slate-900 text-base">Join Group via Invite Code</h3>
          <p className="text-xs text-slate-500">
            Enter a friend's invitation code (e.g., <code>NET-2026</code> or <code>MED-2026</code>).
          </p>
          <input
            type="text"
            required
            value={inviteCodeInput}
            onChange={(e) => setInviteCodeInput(e.target.value)}
            placeholder="Enter code (e.g., MED-2026)"
            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono uppercase"
          />
          <button type="submit" className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-xs">
            Verify Code & Join Group
          </button>
        </form>
      </div>
    </div>
  );
}