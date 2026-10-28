import React from 'react';

export function SidebarBtn({ icon: Icon, label, active, onClick, badge, badgeColor = "bg-blue-100 text-blue-700" }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition ${
        active
          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-sm"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      <div className="flex items-center gap-2.5">
        <Icon size={17} />
        <span>{label}</span>
      </div>
      {badge && (
        <span
          className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
            active ? "bg-white/20 text-white" : badgeColor
          }`}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

export function StatBadge({ icon: Icon, label, value, color }) {
  return (
    <div className={`px-3.5 py-2 rounded-2xl flex items-center gap-2.5 ${color}`}>
      <Icon size={18} />
      <div>
        <span className="block text-[10px] uppercase font-bold opacity-75">{label}</span>
        <span className="text-xs font-extrabold">{value}</span>
      </div>
    </div>
  );
}

export function QuickActionBtn({ icon: Icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm hover:border-purple-400 hover:shadow transition flex items-center gap-2.5 text-left"
    >
      <div className="p-2 rounded-xl bg-purple-50 text-purple-700 shrink-0">
        <Icon size={16} />
      </div>
      <span className="text-xs font-extrabold text-slate-800 leading-snug">{label}</span>
    </button>
  );
}

export function FeatureCard({ icon: Icon, title, desc }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
      <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-4">
        <Icon size={24} />
      </div>
      <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
    </div>
  );
}