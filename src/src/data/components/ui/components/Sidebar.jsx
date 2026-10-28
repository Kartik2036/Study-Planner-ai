import React from 'react';
import {
  BrainCircuit, LayoutDashboard, Target, BookOpen, RefreshCw,
  Users, Trophy, ShieldAlert, UserCheck, LogOut
} from 'lucide-react';
import { SidebarBtn } from './ui/CommonUI';
import { STREAM_DATA } from '../data/mockData';

export default function Sidebar({
  activeTab,
  setActiveTab,
  userStream,
  activeStreamConfig,
  handleSelectStream,
  onOpenOnboarding,
  currentUser,
  onLogout
}) {
  return (
    <aside className="w-full md:w-72 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 shadow-sm">
      <div>
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-md shadow-purple-200">
              <BrainCircuit size={24} />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent">
                StudyPilot AI
              </span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                + STUDENT LIFE HUB
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 border-b border-slate-100 bg-slate-50/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Active Stream ({activeStreamConfig.ageGroup})
            </span>
            <button
              onClick={onOpenOnboarding}
              className="text-xs font-bold text-purple-600 hover:text-purple-800 underline"
            >
              Change
            </button>
          </div>
          <select
            value={userStream}
            onChange={(e) => handleSelectStream(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            {Object.keys(STREAM_DATA).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <nav className="p-3 space-y-1">
          <SidebarBtn icon={LayoutDashboard} label="Student Dashboard" active={activeTab === "dashboard"} onClick={() => setActiveTab("dashboard")} />
          <SidebarBtn icon={Target} label="AI Study Planner" active={activeTab === "planner"} onClick={() => setActiveTab("planner")} badge="Adaptive" />
          <SidebarBtn icon={BookOpen} label="Notes-to-Quiz AI" active={activeTab === "quiz"} onClick={() => setActiveTab("quiz")} />
          <SidebarBtn icon={RefreshCw} label="Mistake Memory" active={activeTab === "mistakes"} onClick={() => setActiveTab("mistakes")} badge="1 Weak" badgeColor="bg-red-100 text-red-700" />
          <SidebarBtn icon={Users} label="STUDENT LIFE & Teach" active={activeTab === "studentlife"} onClick={() => setActiveTab("studentlife")} badge="Peer + AI" badgeColor="bg-purple-100 text-purple-700" />
          <SidebarBtn icon={Trophy} label="Friends Leaderboard" active={activeTab === "leaderboard"} onClick={() => setActiveTab("leaderboard")} />
          <SidebarBtn icon={ShieldAlert} label="Help Us (Safety)" active={activeTab === "safety"} onClick={() => setActiveTab("safety")} />
          <SidebarBtn icon={UserCheck} label="Profile & Achievements" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
        </nav>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 to-blue-500 text-white font-bold flex items-center justify-center text-sm">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 leading-tight">{currentUser.name}</p>
              <p className="text-xs text-purple-700 font-semibold">Lvl {currentUser.level} • {currentUser.xp} XP</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            title="Log Out"
            className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition"
          >
            <LogOut size={18} />
          </button>
        </div>
        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-full rounded-full transition-all"
            style={{ width: `${(currentUser.xp % 250) / 2.5}%` }}
          />
        </div>
      </div>
    </aside>
  );
}