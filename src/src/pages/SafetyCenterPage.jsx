import React from 'react';

export default function SafetyCenterPage({ reports, onOpenReport }) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
            Zero-Tolerance Student Safety
          </span>
          <h1 className="text-2xl font-extrabold mt-1">
            "Help Us" — Report Misbehavior, Threats & Abusive Words
          </h1>
          <p className="text-xs text-red-100 mt-1 max-w-2xl">
            If anyone uses misbehaving words, bullies, or threatens students on the community feed, upload screenshot proof here. Verified complaints immediately suspend the offending account.
          </p>
        </div>
        <button
          onClick={() => onOpenReport({ author: "", content: "" })}
          className="px-5 py-3 bg-white text-red-700 rounded-2xl font-extrabold text-xs shadow-sm hover:bg-red-50 shrink-0"
        >
          + Submit New Complaint & Proof
        </button>
      </div>

      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-extrabold text-slate-900">Active Complaints & Enforcement Log</h2>
        <div className="space-y-3">
          {reports.map((rep) => (
            <div key={rep.id} className="p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-400">#{rep.id}</span>
                  <span className="text-xs font-bold text-red-700">Reported User: {rep.offender}</span>
                  <span className="text-xs text-slate-400">• {rep.timestamp}</span>
                </div>
                <p className="text-sm font-bold text-slate-900 mt-1">{rep.reason}</p>
                <p className="text-xs text-slate-500 mt-0.5">Uploaded Evidence: 📎 {rep.proofFileName}</p>
              </div>
              <span className="text-xs font-extrabold px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                ✓ {rep.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}