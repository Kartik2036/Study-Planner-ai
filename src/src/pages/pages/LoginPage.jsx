import React, { useState } from 'react';
import { Lock, AlertTriangle, Eye, EyeOff } from 'lucide-react';
import { STREAM_DATA, INITIAL_ACCOUNTS } from '../data/mockData';

export default function LoginPage({ accounts, setAccounts, onSuccess, onBack }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("Alex_Student");
  const [password, setPassword] = useState("Study@2026");
  const [fullName, setFullName] = useState("");
  const [stream, setStream] = useState("Engineering");
  const [showPass, setShowPass] = useState(false);
  const [securityCodeInput, setSecurityCodeInput] = useState("SP-94A");
  const [error, setError] = useState("");

  const REQUIRED_CODE = "SP-94A";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (securityCodeInput !== REQUIRED_CODE) {
      setError(`Verification failed! Security code is strictly case-sensitive (${REQUIRED_CODE}).`);
      return;
    }

    if (mode === "login") {
      const exactMatch = accounts.find(
        (acc) => acc.username === username && acc.password === password
      );
      const caseInsensitiveMatch = accounts.find(
        (acc) =>
          acc.username.toLowerCase() === username.toLowerCase() ||
          acc.password.toLowerCase() === password.toLowerCase()
      );

      if (!exactMatch) {
        if (caseInsensitiveMatch) {
          setError("Case-Sensitivity Alert: Username and Password must match exact uppercase/lowercase characters to prevent fake logins!");
        } else {
          setError("Invalid credentials. Please check your exact username and password.");
        }
        return;
      }
      onSuccess(exactMatch, false);
    } else {
      if (username.length < 4 || /\s/.test(username)) {
        setError("Username must be at least 4 characters with no spaces.");
        return;
      }
      if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
        setError("Password must contain Uppercase, Lowercase, and a Number for case-sensitive protection.");
        return;
      }
      const newUser = {
        username,
        password,
        name: fullName || username,
        role: `${stream} Learner`,
        stream,
        xp: 500,
        level: 2,
        streak: 1,
        studyHours: 2.0,
        helpfulAnswers: 0,
        quizImprovement: "+0%",
        badges: ["Quiz Explorer"]
      };
      setAccounts([...accounts, newUser]);
      onSuccess(newUser, true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-xl border border-slate-200 p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white flex items-center justify-center">
              <Lock size={18} />
            </div>
            <span className="font-extrabold text-xl text-slate-900">StudyPilot Auth</span>
          </div>
          <button onClick={onBack} className="text-xs font-bold text-slate-400 hover:text-slate-700">
            ← Back
          </button>
        </div>

        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            onClick={() => { setMode("login"); setError(""); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${mode === "login" ? "bg-white text-purple-700 shadow-sm" : "text-slate-500"}`}
          >
            Case-Sensitive Login
          </button>
          <button
            onClick={() => { setMode("register"); setError(""); }}
            className={`flex-1 py-2 text-sm font-bold rounded-lg transition ${mode === "register" ? "bg-white text-purple-700 shadow-sm" : "text-slate-500"}`}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl flex items-start gap-2">
            <AlertTriangle size={16} className="shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g., Riya Deshmukh"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Username <span className="text-purple-600">(Strictly Case-Sensitive)</span>
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Password <span className="text-purple-600">(Strictly Case-Sensitive)</span>
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {mode === "register" && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Initial Stream</label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold"
              >
                {Object.keys(STREAM_DATA).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          )}

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div>
              <span className="block text-[11px] font-bold text-slate-500">ANTI-FAKE LOGIN CHECK</span>
              <span className="font-mono text-sm font-extrabold text-purple-700 tracking-widest">{REQUIRED_CODE}</span>
            </div>
            <input
              type="text"
              value={securityCodeInput}
              onChange={(e) => setSecurityCodeInput(e.target.value)}
              className="w-28 px-3 py-1.5 border border-slate-300 rounded-lg text-sm font-mono text-center"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-md"
          >
            {mode === "login" ? "Verify & Login" : "Register & Choose Stream"}
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-slate-100">
          <p className="text-xs font-bold text-slate-400 uppercase mb-2">1-Click Demo Personas:</p>
          <div className="grid grid-cols-2 gap-2">
            {INITIAL_ACCOUNTS.map((acc) => (
              <button
                key={acc.username}
                type="button"
                onClick={() => {
                  setUsername(acc.username);
                  setPassword(acc.password);
                  setSecurityCodeInput(REQUIRED_CODE);
                  setError("");
                }}
                className="p-2.5 text-left rounded-xl border border-slate-200 hover:border-purple-400 bg-slate-50/50 text-xs"
              >
                <p className="font-bold text-slate-800">{acc.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{acc.stream}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}