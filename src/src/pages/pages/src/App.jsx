import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { STREAM_DATA, INITIAL_ACCOUNTS } from './data/mockData';
import Sidebar from './components/Sidebar';
import HelpUsReportModal from './components/HelpUsReportModal';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import StreamOnboarding from './pages/StreamOnboarding';
import DashboardPage from './pages/DashboardPage';
import StudyPlannerPage from './pages/StudyPlannerPage';
import QuizGeneratorPage from './pages/QuizGeneratorPage';
import MistakeMemoryPage from './pages/MistakeMemoryPage';
import StudentLifePage from './pages/StudentLifePage';
import LeaderboardPage from './pages/LeaderboardPage';
import SafetyCenterPage from './pages/SafetyCenterPage';
import ProfilePage from './pages/ProfilePage';

export default function App() {
  const [view, setView] = useState("landing");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [currentUser, setCurrentUser] = useState(INITIAL_ACCOUNTS[0]);
  const [userStream, setUserStream] = useState("Engineering");

  const [privacy, setPrivacy] = useState({
    showOnLeaderboard: true,
    showSubjectsOnProfile: true,
    allowStudyGroupRecs: true
  });

  const [toast, setToast] = useState(null);
  const triggerToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const [examDate, setExamDate] = useState("2026-11-18");
  const [dailyHours, setDailyHours] = useState(4);
  const [studyPlan, setStudyPlan] = useState([
    { id: "sp1", topic: "TCP Three-Way Handshake & Congestion Control", subject: "Computer Networks", duration: 1.5, difficulty: "Hard", understanding: "Weak", priority: "CRITICAL (Quiz Weakness)", completed: false, type: "Adaptive Revision" },
    { id: "sp2", topic: "OSI 7-Layer Architecture & Encapsulation", subject: "Computer Networks", duration: 1.5, difficulty: "Medium", understanding: "Moderate", priority: "High", completed: true, type: "Core Study" },
    { id: "sp3", topic: "B+ Trees & Indexing in DBMS", subject: "DBMS", duration: 1.0, difficulty: "Hard", understanding: "Moderate", priority: "Medium", completed: false, type: "Practice Quiz" }
  ]);

  const [topicPerformance, setTopicPerformance] = useState([
    {
      id: "tp1",
      topic: "TCP Three-Way Handshake",
      subject: "Computer Networks",
      attempted: 12,
      correct: 5,
      accuracy: 42,
      status: "Needs Attention",
      lastMistake: "Confused Sequence Number (ISN) with Acknowledgment Number (ISN + 1) in SYN-ACK.",
      attemptsCount: 3,
      lastRevised: "2026-10-26",
      nextRevision: "Today (Urgent)"
    },
    {
      id: "tp2",
      topic: "OSI Model & Protocol Data Units",
      subject: "Computer Networks",
      attempted: 15,
      correct: 10,
      accuracy: 67,
      status: "Improving",
      lastMistake: "Mixed up Presentation Layer encryption with Session Layer dialog control.",
      attemptsCount: 2,
      lastRevised: "2026-10-25",
      nextRevision: "2026-10-30"
    }
  ]);

  const [peerTeachers, setPeerTeachers] = useState([
    {
      id: "pt1",
      author: "Rohan Verma",
      stream: "Engineering",
      levelBadge: "Level 10 • GATE 99.2%ile",
      expertise: "Computer Networks (TCP/IP, Subnetting & Routing)",
      ageGroup: "College Students",
      bio: "I noticed many students struggle with TCP sequence numbers and subnet masks. Join my 30-min live whiteboard peer session!",
      studentsHelped: 42,
      upvotes: 38,
      schedule: "Today, 7:00 PM IST"
    },
    {
      id: "pt2",
      author: "Dr. Ananya Sen (MBBS Intern)",
      stream: "Medical",
      levelBadge: "Level 12 • Helpful Mentor",
      expertise: "Human Physiology & Organic Reaction Mechanisms",
      ageGroup: "Class 11-12 & NEET Aspirants",
      bio: "Teaching memory mnemonics for Cranial Nerves and ECG interpretation.",
      studentsHelped: 67,
      upvotes: 64,
      schedule: "Thu & Sat, 6:00 PM IST"
    }
  ]);

  const [doubts, setDoubts] = useState([
    {
      id: "d1",
      title: "Why does TCP use a 3-way handshake instead of a 2-way handshake?",
      body: "In my quiz I got confused about what happens if a delayed duplicate SYN packet arrives at the server after the connection is already closed. Also why is ACK = ISN + 1?",
      subject: "Computer Networks",
      stream: "Engineering",
      tags: ["TCP/IP", "Three-Way Handshake"],
      author: "Alex Sharma",
      time: "1 hour ago",
      votes: 14,
      saved: false,
      codeSnippet: "Client -> Server: SYN (seq=x)\nServer -> Client: SYN-ACK (seq=y, ack=x+1)\nClient -> Server: ACK (seq=x+1, ack=y+1)",
      aiExplanation: null,
      answers: [
        {
          id: "ans1",
          author: "Rohan Verma",
          isPeerTeacher: true,
          text: "If TCP only used 2 steps, an old delayed SYN packet could reach the server and allocate resources even when the client is no longer waiting. The 3rd step lets the client reject stale SYN-ACKs.",
          votes: 9,
          isAccepted: true,
          time: "42 mins ago"
        }
      ]
    }
  ]);

  const [reports, setReports] = useState([
    {
      id: "rep-101",
      offender: "ToxicUser_99",
      reason: "Abusive Language & Harassment in Doubt Thread",
      proofFileName: "chat_screenshot_oct27.png",
      status: "Action Taken: 7-Day Account Suspension & Post Removed",
      timestamp: "Yesterday, 4:15 PM"
    }
  ]);
  const [reportModalTarget, setReportModalTarget] = useState(null);

  const [studyGroups, setStudyGroups] = useState([
    { id: "sg1", name: "Computer Networks Mastery Squad", stream: "Engineering", topic: "TCP/IP & OSI Model", code: "NET-2026", members: 18, joined: true, activeChallenge: "Complete 3 TCP/OSI Quizzes with >80% accuracy" },
    { id: "sg2", name: "NEET & Science Concept Builders", stream: "Medical", topic: "Physiology & Organic Chem", code: "MED-2026", members: 26, joined: false, activeChallenge: "Help 3 students in Unanswered Doubts" }
  ]);

  const awardXP = (points, reason) => {
    setCurrentUser((prev) => {
      const newXp = prev.xp + points;
      const newLevel = Math.floor(newXp / 250) + 1;
      return { ...prev, xp: newXp, level: newLevel };
    });
    triggerToast(`+${points} XP Earned: ${reason}`);
  };

  const handleSelectStream = (streamName) => {
    setUserStream(streamName);
    setCurrentUser((prev) => ({ ...prev, stream: streamName }));
    setView("app");
    triggerToast(`Stream set to ${streamName}! Upcoming exams & peer feed updated.`);
  };

  if (view === "landing") {
    return (
      <LandingPage
        onGetStarted={() => setView("login")}
        onExploreDemo={() => {
          setUserStream(currentUser.stream);
          setView("app");
          triggerToast("Logged in with Demo Account (Alex Sharma)");
        }}
      />
    );
  }

  if (view === "login") {
    return (
      <LoginPage
        accounts={accounts}
        setAccounts={setAccounts}
        onSuccess={(user, isNewUser) => {
          setCurrentUser(user);
          setUserStream(user.stream || "Engineering");
          setView(isNewUser ? "onboarding" : "app");
          triggerToast(`Welcome, ${user.name}! Case-sensitive verification passed.`);
        }}
        onBack={() => setView("landing")}
      />
    );
  }

  if (view === "onboarding") {
    return <StreamOnboarding currentStream={userStream} onSelectStream={handleSelectStream} />;
  }

  const activeStreamConfig = STREAM_DATA[userStream] || STREAM_DATA["Engineering"];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans text-slate-800">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl border border-purple-500/30 flex items-center gap-3">
          <Sparkles className="text-purple-400 shrink-0" size={20} />
          <span className="text-sm font-semibold">{toast.msg}</span>
        </div>
      )}

      {reportModalTarget && (
        <HelpUsReportModal
          target={reportModalTarget}
          onClose={() => setReportModalTarget(null)}
          onSubmitReport={(newReport) => {
            setReports([newReport, ...reports]);
            setReportModalTarget(null);
            triggerToast("Report & proof submitted to Safety Team. Action initiated!");
          }}
        />
      )}

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userStream={userStream}
        activeStreamConfig={activeStreamConfig}
        handleSelectStream={handleSelectStream}
        onOpenOnboarding={() => setView("onboarding")}
        currentUser={currentUser}
        onLogout={() => setView("landing")}
      />

      <main className="flex-1 overflow-y-auto p-5 md:p-8 max-w-7xl mx-auto w-full">
        {activeTab === "dashboard" && (
          <DashboardPage
            user={currentUser}
            stream={userStream}
            streamConfig={activeStreamConfig}
            studyPlan={studyPlan}
            setStudyPlan={setStudyPlan}
            topicPerformance={topicPerformance}
            awardXP={awardXP}
            navigateTo={setActiveTab}
          />
        )}
        {activeTab === "planner" && (
          <StudyPlannerPage
            stream={userStream}
            streamConfig={activeStreamConfig}
            examDate={examDate}
            setExamDate={setExamDate}
            dailyHours={dailyHours}
            setDailyHours={setDailyHours}
            studyPlan={studyPlan}
            setStudyPlan={setStudyPlan}
            awardXP={awardXP}
            triggerToast={triggerToast}
          />
        )}
        {activeTab === "quiz" && (
          <QuizGeneratorPage
            awardXP={awardXP}
            setTopicPerformance={setTopicPerformance}
            studyPlan={studyPlan}
            setStudyPlan={setStudyPlan}
            navigateTo={setActiveTab}
            triggerToast={triggerToast}
          />
        )}
        {activeTab === "mistakes" && (
          <MistakeMemoryPage
            topicPerformance={topicPerformance}
            navigateTo={setActiveTab}
            awardXP={awardXP}
          />
        )}
        {activeTab === "studentlife" && (
          <StudentLifePage
            user={currentUser}
            stream={userStream}
            peerTeachers={peerTeachers}
            setPeerTeachers={setPeerTeachers}
            doubts={doubts}
            setDoubts={setDoubts}
            awardXP={awardXP}
            onOpenReport={(target) => setReportModalTarget(target)}
            triggerToast={triggerToast}
          />
        )}
        {activeTab === "leaderboard" && (
          <LeaderboardPage
            user={currentUser}
            stream={userStream}
            studyGroups={studyGroups}
            setStudyGroups={setStudyGroups}
            privacy={privacy}
            setPrivacy={setPrivacy}
            awardXP={awardXP}
            triggerToast={triggerToast}
          />
        )}
        {activeTab === "safety" && (
          <SafetyCenterPage
            reports={reports}
            onOpenReport={(target) => setReportModalTarget(target)}
          />
        )}
        {activeTab === "profile" && (
          <ProfilePage
            user={currentUser}
            stream={userStream}
            privacy={privacy}
            setPrivacy={setPrivacy}
            triggerToast={triggerToast}
          />
        )}
      </main>
    </div>
  );
}