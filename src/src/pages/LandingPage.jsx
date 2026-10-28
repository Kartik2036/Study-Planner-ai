import React from 'react';
import {
  BrainCircuit, Sparkles, ArrowRight, AlertTriangle,
  Target, Users, Compass, BookOpen, HeartHandshake, Trophy, ShieldCheck
} from 'lucide-react';
import { FeatureCard } from '../components/ui/CommonUI';

export default function LandingPage({ onGetStarted, onExploreDemo }) {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white shadow-md">
            <BrainCircuit size={24} />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-slate-900">
            StudyPilot AI
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onExploreDemo}
            className="text-sm font-bold text-slate-600 hover:text-purple-700 px-3 py-2"
          >
            Instant Demo Mode
          </button>
          <button
            onClick={onGetStarted}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:opacity-95 transition"
          >
            Login / Sign Up
          </button>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-xs font-bold">
            <Sparkles size={14} />
            For Kids to Adults • Science, Commerce, Arts, Engg, Medical, Law & Govt Exams
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Study Smarter.{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Learn Together.
            </span>{" "}
            Achieve More.
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
            StudyPilot AI merges personalized study planning, adaptive notes-to-quiz generation, and the <strong>STUDENT LIFE</strong> peer-to-peer teaching community—so no student ever studies alone.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={onGetStarted}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-7 py-4 rounded-2xl font-bold text-base shadow-lg shadow-purple-200 hover:opacity-95 transition flex items-center gap-2"
            >
              Get Started <ArrowRight size={18} />
            </button>
            <button
              onClick={onExploreDemo}
              className="bg-slate-100 text-slate-800 px-7 py-4 rounded-2xl font-bold text-base hover:bg-slate-200 transition"
            >
              Explore Features (Demo)
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6 rounded-3xl border border-slate-200 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Connected Ecosystem Preview</span>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full">Live Adaptive Loop</span>
          </div>
          <div className="space-y-3">
            <div className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-red-50 text-red-600"><AlertTriangle size={20} /></div>
              <div>
                <p className="text-xs font-bold text-slate-400">STEP 1 • QUIZ MISTAKE DETECTED</p>
                <p className="text-sm font-bold text-slate-800">TCP 3-Way Handshake (42% Accuracy)</p>
              </div>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600"><Target size={20} /></div>
              <div>
                <p className="text-xs font-bold text-slate-400">STEP 2 • STUDY PLAN AUTO-ADJUSTED</p>
                <p className="text-sm font-bold text-slate-800">Added 1.5h Priority Revision + AI Breakdown</p>
              </div>
            </div>
            <div className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600"><Users size={20} /></div>
              <div>
                <p className="text-xs font-bold text-slate-400">STEP 3 • STUDENT LIFE PEER MATCH</p>
                <p className="text-sm font-bold text-slate-800">Matched with Peer Mentor Rohan V. (GATE 99%ile)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-center text-slate-900 mb-12">
            One Connected Platform for Every Stream
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard icon={Compass} title="Stream-Based Exam Alerts" desc="Tailored for Science, Commerce, Arts, Engineering, Medical, Law & Govt Exams—with live countdowns for kids to adults." />
            <FeatureCard icon={Target} title="Adaptive AI Study Planner" desc="Deterministic scheduling that checks workload feasibility and automatically reprioritizes topics you fail in quizzes." />
            <FeatureCard icon={BookOpen} title="Notes-to-Quiz & Mistake Memory" desc="Convert notes or PDFs into MCQs, True/False & Flashcards. Tracks repeated errors until you master the concept." />
            <FeatureCard icon={HeartHandshake} title="Peer-to-Peer Student Teaching" desc="Good at a subject? Post your expertise on your account and teach peers in the STUDENT LIFE hub." />
            <FeatureCard icon={Trophy} title="Fair Gamified Leaderboards" desc="Ranked by Consistency, Learning Improvement, and Community Helpfulness—not just raw exam marks." />
            <FeatureCard icon={ShieldCheck} title="'Help Us' Community Protection" desc="Zero tolerance for threats or abusive language. Upload screenshot proof to trigger rapid moderation action." />
          </div>
        </div>
      </section>
    </div>
  );
}