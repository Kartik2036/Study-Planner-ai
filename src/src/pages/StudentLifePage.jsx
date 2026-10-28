import React, { useState } from 'react';
import { HeartHandshake, AlertTriangle, Search, ThumbsUp, Sparkles, BrainCircuit } from 'lucide-react';

export default function StudentLifePage({
  user,
  stream,
  peerTeachers,
  setPeerTeachers,
  doubts,
  setDoubts,
  awardXP,
  onOpenReport,
  triggerToast
}) {
  const [subTab, setSubTab] = useState("peer-teach");
  const [expertiseTopic, setExpertiseTopic] = useState("");
  const [expertiseBio, setExpertiseBio] = useState("");
  const [expertiseSchedule, setExpertiseSchedule] = useState("Weekends, 6:00 PM IST");

  const [doubtTitle, setDoubtTitle] = useState("");
  const [doubtBody, setDoubtBody] = useState("");
  const [doubtSubject, setDoubtSubject] = useState("Computer Networks");
  const [doubtCode, setDoubtCode] = useState("");
  const [filterMode, setFilterMode] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [replyInputs, setReplyInputs] = useState({});

  const handlePostExpertise = (e) => {
    e.preventDefault();
    if (!expertiseTopic.trim() || !expertiseBio.trim()) return;
    const newCard = {
      id: `pt-${Date.now()}`,
      author: user.name,
      stream,
      levelBadge: `Level ${user.level} • Peer Educator`,
      expertise: expertiseTopic,
      ageGroup: "Kids to Adults",
      bio: expertiseBio,
      studentsHelped: 1,
      upvotes: 1,
      schedule: expertiseSchedule
    };
    setPeerTeachers([newCard, ...peerTeachers]);
    setExpertiseTopic("");
    setExpertiseBio("");
    awardXP(60, "Posted Peer-to-Peer Teaching Expertise!");
  };

  const handleCreateDoubt = (e) => {
    e.preventDefault();
    if (!doubtTitle.trim() || !doubtBody.trim()) return;
    const newPost = {
      id: `d-${Date.now()}`,
      title: doubtTitle,
      body: doubtBody,
      subject: doubtSubject,
      stream,
      tags: [stream, doubtSubject],
      author: user.name,
      time: "Just now",
      votes: 1,
      saved: false,
      codeSnippet: doubtCode,
      aiExplanation: null,
      answers: []
    };
    setDoubts([newPost, ...doubts]);
    setDoubtTitle("");
    setDoubtBody("");
    setDoubtCode("");
    awardXP(20, "Posted an academic doubt to the community");
  };

  const handleExplainWithAI = (doubtId) => {
    setDoubts(
      doubts.map((d) => {
        if (d.id === doubtId) {
          return {
            ...d,
            aiExplanation: {
              summary: `AI Academic Assistant Breakdown for "${d.title}":`,
              steps: [
                "1. Core Principle: Verify both endpoints synchronize sequence numbers before transmitting application data.",
                "2. Step-by-Step Reasoning: A 2-way handshake cannot distinguish between a new connection request and a delayed duplicate SYN from an old closed connection.",
                "3. Mini Check Question: What flag does the client send if it receives a stale SYN-ACK it never requested? (Answer: RST / Reset flag)."
              ]
            }
          };
        }
        return d;
      })
    );
    triggerToast("AI Doubt Assistant generated a step-by-step explanation!");
  };

  const handleAddReply = (doubtId) => {
    const text = replyInputs[doubtId];
    if (!text || !text.trim()) return;
    setDoubts(
      doubts.map((d) => {
        if (d.id === doubtId) {
          return {
            ...d,
            answers: [
              ...d.answers,
              {
                id: `ans-${Date.now()}`,
                author: user.name,
                isPeerTeacher: true,
                text,
                votes: 1,
                isAccepted: false,
                time: "Just now"
              }
            ]
          };
        }
        return d;
      })
    );
    setReplyInputs({ ...replyInputs, [doubtId]: "" });
    awardXP(50, "Helped a peer by answering a community doubt!");
  };

  const filteredDoubts = doubts.filter((d) => {
    if (filterMode === "unanswered" && d.answers.length > 0) return false;
    if (
      searchQuery &&
      !d.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !d.subject.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600">
            Merged Concept • STUDENT LIFE + Collaborative Community
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-0.5">
            Peer-to-Peer Teaching & AI Doubt-Solving Hub
          </h1>
          <p className="text-sm text-slate-500">
            Students with expertise in any subject can teach others here. See misbehaving words? Click{" "}
            <strong className="text-red-600">Help Us / Report</strong> on any post.
          </p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl shrink-0">
          <button
            onClick={() => setSubTab("peer-teach")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
              subTab === "peer-teach" ? "bg-purple-600 text-white shadow-sm" : "text-slate-600"
            }`}
          >
            🎓 Peer-to-Peer Teaching ({peerTeachers.length})
          </button>
          <button
            onClick={() => setSubTab("doubts")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition ${
              subTab === "doubts" ? "bg-purple-600 text-white shadow-sm" : "text-slate-600"
            }`}
          >
            💬 Doubt Forum & AI Assistant ({doubts.length})
          </button>
        </div>
      </div>

      {subTab === "peer-teach" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <form onSubmit={handlePostExpertise} className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 h-fit">
            <div className="flex items-center gap-2 text-purple-700 font-extrabold text-base">
              <HeartHandshake size={20} /> Post Your Expertise & Teach
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Topic of Expertise</label>
              <input
                type="text"
                required
                value={expertiseTopic}
                onChange={(e) => setExpertiseTopic(e.target.value)}
                placeholder="e.g., Calculus Shortcuts / Constitutional Law"
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">How You Can Help Peers</label>
              <textarea
                rows={3}
                required
                value={expertiseBio}
                onChange={(e) => setExpertiseBio(e.target.value)}
                placeholder="Describe what you'll teach, tricks you know, or exam prep tips..."
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Teaching Time</label>
              <input
                type="text"
                value={expertiseSchedule}
                onChange={(e) => setExpertiseSchedule(e.target.value)}
                className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold text-sm shadow-md"
            >
              Publish Expertise on My Account (+60 XP)
            </button>
          </form>

          <div className="lg:col-span-8 space-y-4">
            {peerTeachers.map((pt) => (
              <div key={pt.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center">
                      {pt.author.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-base">{pt.author}</h3>
                      <span className="text-xs text-purple-700 font-semibold">{pt.levelBadge} • {pt.stream}</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                    For: {pt.ageGroup}
                  </span>
                </div>

                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase">Expertise Offered</p>
                  <p className="text-sm font-extrabold text-slate-900">{pt.expertise}</p>
                  <p className="text-xs text-slate-600 mt-1">{pt.bio}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold">
                    <span>🕒 {pt.schedule}</span>
                    <span>🎓 {pt.studentsHelped} Students Helped</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setPeerTeachers(
                          peerTeachers.map((item) =>
                            item.id === pt.id
                              ? { ...item, studentsHelped: item.studentsHelped + 1, upvotes: item.upvotes + 1 }
                              : item
                          )
                        );
                        triggerToast(`Joined ${pt.author}'s peer learning session!`);
                      }}
                      className="px-4 py-2 bg-purple-600 text-white rounded-xl text-xs font-bold hover:bg-purple-700"
                    >
                      Request Peer Session ({pt.upvotes} 👍)
                    </button>
                    <button
                      onClick={() => onOpenReport({ author: pt.author, content: pt.bio })}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold hover:bg-red-100 flex items-center gap-1"
                    >
                      <AlertTriangle size={14} /> Help Us / Report
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === "doubts" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <form onSubmit={handleCreateDoubt} className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 h-fit">
            <h3 className="font-extrabold text-slate-900 text-base">Ask an Academic Doubt</h3>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Question Title</label>
              <input
                type="text"
                required
                value={doubtTitle}
                onChange={(e) => setDoubtTitle(e.target.value)}
                placeholder="e.g., How does Dijkstra handle negative weights?"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Subject Category</label>
              <select
                value={doubtSubject}
                onChange={(e) => setDoubtSubject(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-semibold"
              >
                <option>Computer Networks</option>
                <option>Data Structures</option>
                <option>Programming</option>
                <option>Database Management Systems</option>
                <option>Mathematics</option>
                <option>Organic Chemistry</option>
                <option>Constitutional Law</option>
                <option>General Academics</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Detailed Question</label>
              <textarea
                rows={3}
                required
                value={doubtBody}
                onChange={(e) => setDoubtBody(e.target.value)}
                placeholder="Explain where you are stuck..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Optional Code Snippet / Formula</label>
              <textarea
                rows={2}
                value={doubtCode}
                onChange={(e) => setDoubtCode(e.target.value)}
                placeholder="Paste code or equation..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-mono bg-slate-50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-bold text-sm"
            >
              Post Doubt (+20 XP)
            </button>
          </form>

          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                <Search size={18} className="text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doubts by topic or subject..."
                  className="w-full text-sm focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterMode("all")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${filterMode === "all" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                >
                  All Discussions
                </button>
                <button
                  onClick={() => setFilterMode("unanswered")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold ${filterMode === "unanswered" ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-800"}`}
                >
                  Unanswered Doubts ({doubts.filter((d) => d.answers.length === 0).length})
                </button>
              </div>
            </div>

            {filteredDoubts.map((d) => (
              <div key={d.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
                        {d.subject}
                      </span>
                      <span className="text-xs text-slate-400">
                        Posted by <strong>{d.author}</strong> • {d.time}
                      </span>
                    </div>
                    <h3 className="text-lg font-extrabold text-slate-900">{d.title}</h3>
                  </div>
                  <button
                    onClick={() => onOpenReport({ author: d.author, content: d.title })}
                    className="text-xs font-bold text-red-500 hover:text-red-700 flex items-center gap-1 shrink-0"
                  >
                    <AlertTriangle size={14} /> Report
                  </button>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">{d.body}</p>

                {d.codeSnippet && (
                  <pre className="bg-slate-900 text-emerald-300 p-3.5 rounded-2xl text-xs font-mono overflow-x-auto">
                    {d.codeSnippet}
                  </pre>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <button
                    onClick={() =>
                      setDoubts(doubts.map((item) => (item.id === d.id ? { ...item, votes: item.votes + 1 } : item)))
                    }
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5"
                  >
                    <ThumbsUp size={14} /> {d.votes} Upvotes
                  </button>
                  <button
                    onClick={() => handleExplainWithAI(d.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Sparkles size={14} /> Explain with AI
                  </button>
                </div>

                {d.aiExplanation && (
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-purple-800 flex items-center gap-1">
                        <BrainCircuit size={14} /> AI Academic Assistant
                      </span>
                      <span className="text-[10px] bg-purple-200 text-purple-900 px-2 py-0.5 rounded font-bold">
                        AI-Generated
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900">{d.aiExplanation.summary}</p>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {d.aiExplanation.steps.map((st, idx) => (
                        <li key={idx}>{st}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {d.answers.map((ans) => (
                    <div
                      key={ans.id}
                      className={`p-3.5 rounded-2xl border text-xs ${
                        ans.isAccepted ? "bg-emerald-50/60 border-emerald-300" : "bg-slate-50 border-slate-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-900">
                          {ans.author} {ans.isPeerTeacher && <span className="text-purple-700">(Peer Mentor)</span>}
                        </span>
                        {ans.isAccepted && (
                          <span className="text-[10px] font-extrabold bg-emerald-600 text-white px-2 py-0.5 rounded-full">
                            ✓ Accepted Answer
                          </span>
                        )}
                      </div>
                      <p className="text-slate-700 leading-relaxed">{ans.text}</p>
                    </div>
                  ))}

                  <div className="flex gap-2 pt-2">
                    <input
                      type="text"
                      value={replyInputs[d.id] || ""}
                      onChange={(e) => setReplyInputs({ ...replyInputs, [d.id]: e.target.value })}
                      placeholder="Write a helpful answer to earn +50 XP..."
                      className="flex-1 px-3.5 py-2 border border-slate-200 rounded-xl text-xs"
                    />
                    <button
                      onClick={() => handleAddReply(d.id)}
                      className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}