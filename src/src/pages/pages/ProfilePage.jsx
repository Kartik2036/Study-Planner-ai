import React from 'react';
import { Award, Lock } from 'lucide-react';

export default function ProfilePage({ user, stream, privacy, setPrivacy, triggerToast }) {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-md">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
            <p className="text-sm text-slate-500">
              @{user.username} • <strong>{stream} Stream</strong> • Level {user.level} ({user.xp} XP)
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Award className="text-purple-600" size={20} /> Earned Gamification Badges
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {["Consistency Champion", "Quiz Explorer", "Helpful Mentor", "Revision Master", "Learning Comeback"].map(
              (badge) => {
                const earned = user.badges.includes(badge);
                return (
                  <div
                    key={badge}
                    className={`p-3.5 rounded-2xl border text-xs font-bold flex items-center gap-2.5 ${
                      earned
                        ? "bg-purple-50 border-purple-200 text-purple-900"
                        : "bg-slate-50 border-slate-200 text-slate-400 opacity-60"
                    }`}
                  >
                    <Award size={18} className={earned ? "text-purple-600" : "text-slate-400"} />
                    <span>{badge}</span>
                  </div>
                );
              }
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
            <Lock className="text-blue-600" size={20} /> Privacy & Data Controls
          </h2>
          <div className="space-y-3 text-sm">
            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl cursor-pointer">
              <span className="font-semibold text-slate-700">Display my rank on Friends Leaderboards</span>
              <input
                type="checkbox"
                checked={privacy.showOnLeaderboard}
                onChange={() => {
                  setPrivacy({ ...privacy, showOnLeaderboard: !privacy.showOnLeaderboard });
                  triggerToast("Updated leaderboard visibility preference.");
                }}
                className="w-4 h-4 accent-purple-600"
              />
            </label>
            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl cursor-pointer">
              <span className="font-semibold text-slate-700">Show my active stream & subjects on public profile</span>
              <input
                type="checkbox"
                checked={privacy.showSubjectsOnProfile}
                onChange={() => setPrivacy({ ...privacy, showSubjectsOnProfile: !privacy.showSubjectsOnProfile })}
                className="w-4 h-4 accent-purple-600"
              />
            </label>
            <label className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl cursor-pointer">
              <span className="font-semibold text-slate-700">Use weak quiz topics for Smart Study Group matching</span>
              <input
                type="checkbox"
                checked={privacy.allowStudyGroupRecs}
                onChange={() => setPrivacy({ ...privacy, allowStudyGroupRecs: !privacy.allowStudyGroupRecs })}
                className="w-4 h-4 accent-purple-600"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}