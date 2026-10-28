import React from 'react';
import { GraduationCap, CheckCircle, ChevronRight } from 'lucide-react';
import { STREAM_DATA } from '../data/mockData';

export default function StreamOnboarding({ currentStream, onSelectStream }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-6">
      <div className="bg-white max-w-4xl w-full rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto mb-4">
            <GraduationCap size={32} />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Select Your Academic Stream</h1>
          <p className="text-slate-500 mt-2 text-sm">
            Designed for kids, school students, college learners, and adults. Your stream customizes your upcoming exam notifications, study planner subjects, and peer teaching feed.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(STREAM_DATA).map(([name, info]) => {
            const isSelected = currentStream === name;
            return (
              <button
                key={name}
                onClick={() => onSelectStream(name)}
                className={`p-5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? "border-purple-600 bg-purple-50/40 shadow-md"
                    : "border-slate-200 hover:border-purple-400 hover:bg-slate-50"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${info.badgeBg}`}>
                      {info.ageGroup}
                    </span>
                    {isSelected && <CheckCircle size={18} className="text-purple-600" />}
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">{name}</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {info.subjects.slice(0, 3).join(" • ")}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
                  <span>{info.exams.length} Upcoming Exams</span>
                  <ChevronRight size={15} />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}