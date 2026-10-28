export const STREAM_DATA = {
  "Engineering": {
    ageGroup: "College & University",
    color: "from-blue-600 to-indigo-700",
    badgeBg: "bg-blue-100 text-blue-800",
    subjects: ["Computer Networks", "Data Structures", "Operating Systems", "DBMS", "Artificial Intelligence"],
    exams: [
      { id: "e1", title: "GATE 2027 Mock Test - CS & IT", date: "2026-11-18", daysLeft: 21, badge: "National Exam", syllabus: "CN, OS, DBMS, DSA" },
      { id: "e2", title: "University End-Sem: Computer Networks", date: "2026-12-04", daysLeft: 37, badge: "Semester Final", syllabus: "OSI, TCP/IP, Routing, DNS" },
      { id: "e3", title: "All-India Coding & Algorithm Cup", date: "2026-12-19", daysLeft: 52, badge: "Competitive", syllabus: "Graphs, DP, Trees" }
    ]
  },
  "Science": {
    ageGroup: "School (Classes 6–12) & UG",
    color: "from-purple-600 to-blue-600",
    badgeBg: "bg-purple-100 text-purple-800",
    subjects: ["Physics", "Organic Chemistry", "Calculus & Algebra", "Biology"],
    exams: [
      { id: "s1", title: "National Science Olympiad (NSO)", date: "2026-11-15", daysLeft: 18, badge: "School & Jr", syllabus: "Mechanics, Optics, Cell Bio" },
      { id: "s2", title: "CBSE / State Board Pre-Board Exam", date: "2026-12-01", daysLeft: 34, badge: "Board Prep", syllabus: "Full Class 12 Physics & Chem" }
    ]
  },
  "Medical": {
    ageGroup: "NEET Aspirants & Med Students",
    color: "from-emerald-600 to-teal-700",
    badgeBg: "bg-emerald-100 text-emerald-800",
    subjects: ["Human Anatomy", "Physiology", "Organic Chemistry", "Genetics & Biotech"],
    exams: [
      { id: "m1", title: "All-India NEET UG Full Test Series #4", date: "2026-11-22", daysLeft: 25, badge: "Medical Entrance", syllabus: "Human Physiology & Biomolecules" },
      { id: "m2", title: "AIIMS Clinical Case Quiz", date: "2026-12-10", daysLeft: 43, badge: "Clinical", syllabus: "Pathology & Pharmacology" }
    ]
  },
  "Commerce": {
    ageGroup: "High School, B.Com & CA/CS",
    color: "from-indigo-600 to-purple-700",
    badgeBg: "bg-indigo-100 text-indigo-800",
    subjects: ["Corporate Accounting", "Macroeconomics", "Financial Management", "Business Statistics"],
    exams: [
      { id: "c1", title: "CA Foundation Mock Paper 2", date: "2026-11-20", daysLeft: 23, badge: "Professional", syllabus: "Accounting & Mercantile Law" },
      { id: "c2", title: "CUET Commerce Domain Test", date: "2026-12-08", daysLeft: 41, badge: "University Entrance", syllabus: "Micro/Macro Economics" }
    ]
  },
  "Arts": {
    ageGroup: "School, Humanities & Liberal Arts",
    color: "from-fuchsia-600 to-purple-700",
    badgeBg: "bg-fuchsia-100 text-fuchsia-800",
    subjects: ["World History", "Political Science", "Sociology", "Psychology", "Literature"],
    exams: [
      { id: "a1", title: "Humanities National Essay & Quiz", date: "2026-11-19", daysLeft: 22, badge: "All Ages", syllabus: "Modern History & Civics" },
      { id: "a2", title: "Psychology & Behavioral Term Exam", date: "2026-12-05", daysLeft: 38, badge: "Semester", syllabus: "Cognitive & Social Psychology" }
    ]
  },
  "Law": {
    ageGroup: "CLAT Aspirants & LLB Students",
    color: "from-slate-700 to-indigo-900",
    badgeBg: "bg-slate-200 text-slate-800",
    subjects: ["Constitutional Law", "Law of Torts", "Criminal Law (BNS)", "Legal Reasoning"],
    exams: [
      { id: "l1", title: "CLAT 2027 National Sim Test", date: "2026-11-25", daysLeft: 28, badge: "Law Entrance", syllabus: "Legal Aptitude, Logical Reasoning" },
      { id: "l2", title: "Moot Court & Constitutional Quiz", date: "2026-12-12", daysLeft: 45, badge: "LLB Core", syllabus: "Fundamental Rights & Writs" }
    ]
  },
  "Government Exams": {
    ageGroup: "Graduates & Working Adults",
    color: "from-blue-700 to-purple-800",
    badgeBg: "bg-blue-100 text-blue-900",
    subjects: ["Indian Polity", "Quantitative Aptitude", "General Studies & Current Affairs", "Logical Reasoning"],
    exams: [
      { id: "g1", title: "UPSC CSE Prelims GS Mock #6", date: "2026-11-16", daysLeft: 19, badge: "Civil Services", syllabus: "Polity, Economy, Environment" },
      { id: "g2", title: "SSC CGL Tier-2 Quant & English", date: "2026-12-02", daysLeft: 35, badge: "Govt Job", syllabus: "Arithmetic, Geometry, Comprehension" },
      { id: "g3", title: "IBPS PO Mains Simulation", date: "2026-12-18", daysLeft: 51, badge: "Banking", syllabus: "Data Interpretation & Banking Awareness" }
    ]
  }
};

export const INITIAL_ACCOUNTS = [
  {
    username: "Alex_Student",
    password: "Study@2026",
    name: "Alex Sharma",
    role: "Struggling with Computer Networks (Demo Flow)",
    stream: "Engineering",
    xp: 1420,
    level: 6,
    streak: 9,
    studyHours: 38.5,
    helpfulAnswers: 7,
    quizImprovement: "+18%",
    badges: ["Consistency Champion", "Quiz Explorer", "Learning Comeback"]
  },
  {
    username: "Priya_Topper",
    password: "Priya#Pass9",
    name: "Priya Nair",
    role: "Consistency & Peer Mentor",
    stream: "Medical",
    xp: 2890,
    level: 11,
    streak: 24,
    studyHours: 74.0,
    helpfulAnswers: 29,
    quizImprovement: "+31%",
    badges: ["Consistency Champion", "Helpful Mentor", "Revision Master", "Quiz Explorer"]
  }
];

export const TCP_DEMO_QUIZ = {
  title: "Computer Networks: TCP Three-Way Handshake & Transport Layer",
  subject: "Computer Networks",
  topic: "TCP Three-Way Handshake",
  summary: "The TCP Three-Way Handshake establishes a reliable connection before data transfer using three segments: SYN (Client -> Server), SYN-ACK (Server -> Client), and ACK (Client -> Server). Sequence and Acknowledgment numbers synchronize both sides.",
  flashcards: [
    { front: "Step 1 of TCP Handshake", back: "Client sends SYN=1 with initial sequence number ISN(c) = x." },
    { front: "Step 2 of TCP Handshake", back: "Server responds with SYN=1, ACK=1, seq = y, ack = x + 1." },
    { front: "Why 3 steps instead of 2?", back: "To prevent old duplicate connection initiations from causing half-open connections and ensure bidirectional sequence number sync." }
  ],
  questions: [
    {
      id: "q1",
      type: "MCQ",
      difficulty: "Medium",
      topic: "TCP Three-Way Handshake",
      question: "During a TCP Three-Way Handshake, if the client sends a SYN segment with Sequence Number = 1000, what Acknowledgment Number will the server include in its SYN-ACK response?",
      options: ["1000", "1001", "0", "2000"],
      correctAnswer: "1001",
      explanation: "A SYN flag consumes 1 sequence number space. Therefore, the server acknowledges receipt by setting ACK = Client ISN + 1 = 1001."
    },
    {
      id: "q2",
      type: "True/False",
      difficulty: "Easy",
      topic: "TCP Three-Way Handshake",
      question: "True or False: In the final (3rd) step of the TCP three-way handshake, the client's ACK segment is never allowed to piggyback application payload data.",
      options: ["True", "False"],
      correctAnswer: "False",
      explanation: "Once the client receives the SYN-ACK, the connection is established from the client's perspective, and the 3rd segment (ACK) can carry data."
    },
    {
      id: "q3",
      type: "MCQ",
      difficulty: "Hard",
      topic: "TCP Three-Way Handshake",
      question: "Which attack exploits the TCP Three-Way Handshake by sending thousands of SYN packets with spoofed IP addresses without completing the final ACK?",
      options: ["ARP Poisoning", "SYN Flood Attack (DoS)", "DNS Amplification", "SQL Injection"],
      correctAnswer: "SYN Flood Attack (DoS)",
      explanation: "A SYN Flood leaves half-open connections in the server's SYN_RCVD backlog queue until resources are exhausted."
    }
  ]
};