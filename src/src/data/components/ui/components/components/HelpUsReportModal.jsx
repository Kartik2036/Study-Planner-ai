import React, { useState } from 'react';
import { ShieldAlert, Upload, X } from 'lucide-react';

export default function HelpUsReportModal({ target, onClose, onSubmitReport }) {
  const [offender, setOffender] = useState(target?.author || "");
  const [reason, setReason] = useState("");
  const [proofFile, setProofFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!offender.trim() || !reason.trim() || !proofFile) return;
    onSubmitReport({
      id: `rep-${Math.floor(100 + Math.random() * 900)}`,
      offender,
      reason,
      proofFileName: proofFile.name,
      status: "Action Taken: Offender Muted & Under Admin Ban Review",
      timestamp: "Just now"
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="bg-red-50 p-5 border-b border-red-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-700 font-extrabold text-base">
            <ShieldAlert size={20} /> Help Us: Report Misbehavior
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Offending Username / Author</label>
            <input
              type="text"
              required
              value={offender}
              onChange={(e) => setOffender(e.target.value)}
              placeholder="Enter username of the person misbehaving"
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Complaint Details (Misbehaving Words / Threats Used)
            </label>
            <textarea
              rows={3}
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe the abusive words, threats, or harassment..."
              className="w-full px-3.5 py-2 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Upload Misbehavior Proof (Screenshot / Image Required)
            </label>
            <label className="border-2 border-dashed border-red-200 bg-red-50/40 rounded-2xl p-5 text-center cursor-pointer hover:bg-red-50 transition block">
              <Upload size={22} className="mx-auto text-red-600 mb-1" />
              <span className="text-xs font-bold text-slate-700 block">
                {proofFile ? `Attached: ${proofFile.name}` : "Click to upload screenshot proof"}
              </span>
              <input
                type="file"
                required
                accept="image/*,.pdf"
                onChange={(e) => setProofFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700"
            >
              Upload Proof & Take Action
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}