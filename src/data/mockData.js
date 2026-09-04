// Mock Data for SIH26044: Academia-Industry Collaboration & Skill Mapping Portal (Ministry of Ayush & STEM)

export const INITIAL_STUDENT_PROFILE = {
  id: "STD-2026-089",
  name: "Ananya Sharma",
  email: "ananya.sharma@ayush-univ.edu.in",
  institution: "National Institute of Ayurveda, Jaipur",
  degree: "B.A.M.S. & M.Sc. Herbal Bio-Technology",
  year: "Final Year (2026)",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  bio: "Passionate about combining traditional Ayush formulation principles with modern bio-analytics, phytochemistry, and digital health technology.",
  skillScore: 78,
  readinessIndex: "High (Ready for Industry Placement)",
  skills: [
    { name: "Phytochemistry & QC", category: "Ayush Core", currentLevel: 85, requiredLevel: 90 },
    { name: "Herbal Formulation QA", category: "Ayush Core", currentLevel: 80, requiredLevel: 85 },
    { name: "Bio-Analytics & HPLC", category: "Lab Skills", currentLevel: 72, requiredLevel: 88 },
    { name: "Tele-Ayush Systems", category: "Digital Health", currentLevel: 65, requiredLevel: 80 },
    { name: "Regulatory Compliance (AYUSH & ISO)", category: "Regulatory", currentLevel: 70, requiredLevel: 85 },
    { name: "Clinical Data Management", category: "Data Science", currentLevel: 60, requiredLevel: 75 },
    { name: "Good Manufacturing Practice (GMP)", category: "Ayush Core", currentLevel: 88, requiredLevel: 90 }
  ],
  verifiedCertifications: [
    { title: "Certified Herbal QA Auditor", issuer: "Pharmacopoeia Commission for Indian Medicine & Homoeopathy", date: "Jan 2026", id: "PCIMH-9921" },
    { title: "Digital Health System Protocols", issuer: "Ministry of Ayush & CDAC", date: "Nov 2025", id: "AYUSH-CDAC-441" },
    { title: "HPLC & LC-MS Analytical Procedures", issuer: "CSIR-IHBT", date: "Aug 2025", id: "CSIR-7732" }
  ],
  completedCourses: [
    { title: "Standardization of Phytopharmaceuticals", provider: "Swayam / Ministry of Education", progress: 100, score: "94%" },
    { title: "AI in Traditional Medicine Research", provider: "IIT Delhi & AllIA", progress: 100, score: "88%" },
    { title: "GMP Compliance for Herbal Products", provider: "Ayush Skill Council", progress: 85, score: "In Progress" }
  ]
};

export const SKILL_ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    category: "Phytochemistry & QC",
    question: "Which chromatography technique is recommended by the Pharmacopoeia Commission for Ayush raw material fingerprinting?",
    options: [
      "High-Performance Thin-Layer Chromatography (HPTLC)",
      "Gas Chromatography without derivatization",
      "Paper Chromatography only",
      "Simple Column Filtration"
    ],
    correctAnswer: 0,
    skillBoost: { skillName: "Phytochemistry & QC", points: 8 }
  },
  {
    id: 2,
    category: "Tele-Ayush Systems",
    question: "In Tele-Ayush electronic health record (EHR) systems, which standard ensures interoperability under ABDM (Ayushman Bharat Digital Mission)?",
    options: [
      "ISO 9001 only",
      "FHIR (Fast Healthcare Interoperability Resources) + Ayush Namaste Portal Coding",
      "FTP Plain File Server",
      "Custom CSV Export"
    ],
    correctAnswer: 1,
    skillBoost: { skillName: "Tele-Ayush Systems", points: 10 }
  },
  {
    id: 3,
    category: "Regulatory Compliance",
    question: "Which schedule under the Drugs and Cosmetics Rules 1945 outlines Good Manufacturing Practices (GMP) for Ayurveda, Siddha & Unani drugs?",
    options: [
      "Schedule M",
      "Schedule T",
      "Schedule Y",
      "Schedule X"
    ],
    correctAnswer: 1,
    skillBoost: { skillName: "Regulatory Compliance (AYUSH & ISO)", points: 9 }
  },
  {
    id: 4,
    category: "Bio-Analytics & HPLC",
    question: "What is the primary indicator of chromatographic resolution quality when quantifying active herbal marker compounds?",
    options: [
      "Baseline separation factor (Rs ≥ 1.5)",
      "Injection volume size",
      "Color intensity of sample solvent",
      "Column temperature speed only"
    ],
    correctAnswer: 0,
    skillBoost: { skillName: "Bio-Analytics & HPLC", points: 8 }
  },
  {
    id: 5,
    category: "Clinical Data Management",
    question: "Which Ayush digital repository aggregates scientific evidence, clinical studies, and drug safety monitoring?",
    options: [
      "DHARA & AYUSH Research Portal",
      "Wikipedia Ayush Portal",
      "Open Source GIS",
      "Manual Register Archives"
    ],
    correctAnswer: 0,
    skillBoost: { skillName: "Clinical Data Management", points: 7 }
  }
];

export const INITIAL_INTERNSHIPS = [
  {
    id: "JOB-101",
    title: "Herbal Formulation QA Specialist",
    company: "Dabur Research & Development Centre",
    location: "Sahibabad, UP / Hybrid",
    stipend: "₹25,000 / month",
    duration: "6 Months",
    type: "Internship to PPO",
    domain: "Ayush Bio-Tech",
    matchScore: 92,
    skillsRequired: ["Phytochemistry & QC", "Herbal Formulation QA", "Good Manufacturing Practice (GMP)"],
    description: "Join the senior analytical team to perform HPTLC validation, marker compound isolation, and shelf-life study testing for standardized botanical formulations under Ayush GMP guidelines.",
    applicantsCount: 42,
    deadline: "15 Sep 2026",
    status: "Active"
  },
  {
    id: "JOB-102",
    title: "Tele-Ayush Software & AI Systems Engineer",
    company: "Himalaya Wellness Digital Tech Division",
    location: "Bengaluru, KA (Remote Option)",
    stipend: "₹35,000 / month",
    duration: "6 Months",
    type: "Full-Time Internship",
    domain: "Digital Health & Tech",
    matchScore: 84,
    skillsRequired: ["Tele-Ayush Systems", "Clinical Data Management", "Regulatory Compliance (AYUSH & ISO)"],
    description: "Develop AI-based Prakriti assessment modules, telehealth triage workflows, and ABDM FHIR FHIR-compliant record systems for Ayush digital clinics.",
    applicantsCount: 68,
    deadline: "20 Sep 2026",
    status: "Active"
  },
  {
    id: "JOB-103",
    title: "Phytopharmaceutical Bio-Analytics Associate",
    company: "Patanjali Research Institute",
    location: "Haridwar, UK",
    stipend: "₹28,000 / month",
    duration: "4 Months",
    type: "Research Internship",
    domain: "Bio-Analytics",
    matchScore: 78,
    skillsRequired: ["Bio-Analytics & HPLC", "Phytochemistry & QC", "Good Manufacturing Practice (GMP)"],
    description: "Hands-on LC-MS/MS analysis, heavy metal quantification, and pesticide residue screening for herbal raw materials in an NABL-accredited facility.",
    applicantsCount: 31,
    deadline: "18 Sep 2026",
    status: "Active"
  },
  {
    id: "JOB-104",
    title: "Ayush Clinical Trial Data Analyst",
    company: "Central Council for Research in Ayurvedic Sciences (CCRAS)",
    location: "New Delhi",
    stipend: "₹30,000 / month",
    duration: "6 Months",
    type: "Government Project Sabbatical/Internship",
    domain: "Data Science & Clinical",
    matchScore: 71,
    skillsRequired: ["Clinical Data Management", "Regulatory Compliance (AYUSH & ISO)", "Tele-Ayush Systems"],
    description: "Analyze clinical trial data from multi-centric Ayush intervention studies, compile statistical reports for Ayush grid integration.",
    applicantsCount: 54,
    deadline: "25 Sep 2026",
    status: "Active"
  }
];

export const INITIAL_FACULTY_PROGRAMS = [
  {
    id: "FDP-201",
    title: "Industry Sabbatical: High-Throughput Botanical Extraction & QA",
    organizer: "CSIR-Central Institute of Medicinal and Aromatic Plants (CIMAP)",
    duration: "2 Weeks Intensive Sabbatical",
    mode: "On-Site (Lucknow)",
    targetFaculty: "Department of Dravyaguna & Rasashastra Faculty",
    seatsAvailable: 15,
    stipendProvided: "Fully Sponsored + TA/DA",
    skillsCovered: ["Supercritical CO2 Extraction", "HPLC Method Validation", "NABL Accreditation Standard"],
    status: "Applications Open"
  },
  {
    id: "FDP-202",
    title: "Faculty Masterclass: Integrating AI & Bioinformatics into Ayush Curricula",
    organizer: "IIT Kharagpur & All India Institute of Ayurveda",
    duration: "5 Days Online Workshop",
    mode: "Virtual Live Interactive",
    targetFaculty: "All Ayush & Bio-Engineering Educators",
    seatsAvailable: 100,
    stipendProvided: "Certificate of Excellence + UGC/AICTE Credit",
    skillsCovered: ["Network Pharmacology", "Molecular Docking for Herbal Molecules", "Digital Pedagogy"],
    status: "Applications Open"
  }
];

export const INITIAL_RESEARCH_CHALLENGES = [
  {
    id: "RES-301",
    title: "Development of Rapid Rapid-Test Strip for Heavy Metal Toxicity in Herbal Extracts",
    sponsor: "Baidyanath Research Foundation",
    grantAmount: "₹12,00,000 Consultancy Grant",
    timeline: "9 Months",
    requiredDomain: "Phytochemistry & Nanotechnology Faculty Researchers",
    proposalsCount: 8,
    status: "Accepting Proposals"
  },
  {
    id: "RES-302",
    title: "Standardized Stability Testing Protocol for Classical Asava & Arishta Fermentations",
    sponsor: "Kerala Ayurveda Ltd",
    grantAmount: "₹8,50,000 Consultancy Grant",
    timeline: "6 Months",
    requiredDomain: "Pharmaceutics & Quality Assurance Department",
    proposalsCount: 12,
    status: "Reviewing Applications"
  }
];

export const INITIAL_CANDIDATES = [
  {
    id: "STD-2026-089",
    name: "Ananya Sharma",
    institution: "National Institute of Ayurveda, Jaipur",
    degree: "B.A.M.S. & M.Sc. Herbal Bio-Tech",
    skillScore: 88,
    matchScore: 94,
    status: "Shortlisted",
    topSkills: ["Phytochemistry", "HPLC", "GMP Compliance"],
    appliedRole: "Herbal Formulation QA Specialist"
  },
  {
    id: "STD-2026-042",
    name: "Vikramaditya Roy",
    institution: "Institute of Teaching and Research in Ayurveda, Jamnagar",
    degree: "M.Pharm (Ayurveda)",
    skillScore: 84,
    matchScore: 89,
    status: "Interview Scheduled",
    topSkills: ["Bio-Analytics", "HPTLC", "Stability Studies"],
    appliedRole: "Herbal Formulation QA Specialist"
  },
  {
    id: "STD-2026-115",
    name: "Meera Nair",
    institution: "Banaras Hindu University (Faculty of Ayurveda)",
    degree: "B.Tech Bio-Engineering",
    skillScore: 79,
    matchScore: 82,
    status: "Under Review",
    topSkills: ["Tele-Ayush Systems", "Python Data Science", "FHIR Standards"],
    appliedRole: "Tele-Ayush Software & AI Systems Engineer"
  }
];

export const INSTITUTION_ANALYTICS = {
  totalStudentsAssessed: 1420,
  overallReadinessRate: 76.4,
  curriculumAlignmentIndex: 82,
  industryPartnershipsCount: 38,
  skillGapHeatmap: [
    { category: "Phytochemistry & QC", currentScore: 82, targetScore: 90, gap: -8 },
    { category: "Tele-Ayush & Digital Health", currentScore: 62, targetScore: 85, gap: -23 },
    { category: "Ayush Regulatory & GMP", currentScore: 74, targetScore: 88, gap: -14 },
    { category: "Clinical Bio-Analytics", currentScore: 68, targetScore: 82, gap: -14 },
    { category: "Data Science & Bioinformatics", currentScore: 55, targetScore: 78, gap: -23 }
  ],
  domainDemand: [
    { name: "Ayush Bio-Analytics & QA", growth: "+34%", positions: 450 },
    { name: "Tele-Ayush & Digital Health", growth: "+48%", positions: 620 },
    { name: "Herbal Pharmacovigilance", growth: "+22%", positions: 280 },
    { name: "Bioinformatics & Docking", growth: "+41%", positions: 390 }
  ]
};
