// Production Dataset for Ministry of Ayush Academia-Industry Skill Mapping Infrastructure

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
  // 1. AI & Machine Learning in Healthcare
  {
    id: "JOB-AI-101",
    title: "Ayush Diagnostic AI & ML Engineer Intern",
    company: "Himalaya Wellness Digital Health Division",
    location: "Bengaluru, KA",
    mode: "Remote",
    stipend: "₹45,000 / month",
    salaryNumeric: 45000,
    duration: "6 Months",
    type: "Internship to PPO",
    domainId: "ai_healthtech",
    domain: "Artificial Intelligence & ML",
    matchScore: 95,
    skillsRequired: ["Machine Learning (Scikit-Learn, PyTorch)", "Deep Learning & Neural Networks", "Python Programming"],
    description: "Build clinical decision support models and computer vision pipelines for botanical leaf identification and Ayush diagnostic classification.",
    applicantsCount: 58,
    deadline: "25 Sep 2026",
    status: "Active"
  },
  {
    id: "JOB-AI-102",
    title: "Generative AI & Clinical LLM Research Fellow",
    company: "Wipro HealthTech / Ayush Innovation Lab",
    location: "Hyderabad, TS",
    mode: "Hybrid",
    stipend: "₹50,000 / month",
    salaryNumeric: 50000,
    duration: "6 Months",
    type: "Research Internship",
    domainId: "ai_healthtech",
    domain: "Artificial Intelligence & ML",
    matchScore: 92,
    skillsRequired: ["Generative AI & LLMs in Healthcare", "Natural Language Processing (Clinical Notes)", "Python Programming"],
    description: "Develop Retrieval-Augmented Generation (RAG) pipelines over verified Ayush classical monographs and clinical trial databases.",
    applicantsCount: 42,
    deadline: "30 Sep 2026",
    status: "Active"
  },

  // 2. Healthcare Data Science & Biostatistics
  {
    id: "JOB-DS-201",
    title: "Clinical Biostatistician & Health Data Scientist",
    company: "Central Council for Research in Ayurvedic Sciences (CCRAS)",
    location: "New Delhi",
    mode: "Hybrid",
    stipend: "₹38,000 / month",
    salaryNumeric: 38000,
    duration: "6 Months",
    type: "Government Project Fellowship",
    domainId: "data_science",
    domain: "Healthcare Data Science",
    matchScore: 90,
    skillsRequired: ["Python Data Analytics (Pandas, NumPy)", "R for Biostatistics & Survival Analysis", "SQL & Clinical Data Warehousing"],
    description: "Analyze multi-centric randomized clinical trial datasets, calculate hypothesis test statistics, and model patient outcomes.",
    applicantsCount: 47,
    deadline: "28 Sep 2026",
    status: "Active"
  },
  {
    id: "JOB-DS-202",
    title: "Healthcare Predictive Analytics Intern",
    company: "Apollo AyurVAID Health Systems",
    location: "Bengaluru, KA",
    mode: "Remote",
    stipend: "₹40,000 / month",
    salaryNumeric: 40000,
    duration: "5 Months",
    type: "Full-Time Internship",
    domainId: "data_science",
    domain: "Healthcare Data Science",
    matchScore: 88,
    skillsRequired: ["Data Science & Big Data", "Python Programming", "Biostatistics & R Programming"],
    description: "Mine electronic health record longitudinal registries to build disease progression risk curves and treatment outcome visualizations.",
    applicantsCount: 36,
    deadline: "05 Oct 2026",
    status: "Active"
  },

  // 3. Phytochemistry, Bio-Analytics & QC
  {
    id: "JOB-PC-301",
    title: "Botanical QC & HPTLC Chromatography Specialist",
    company: "Dabur Research & Development Centre",
    location: "Sahibabad, UP",
    mode: "On-site",
    stipend: "₹32,000 / month",
    salaryNumeric: 32000,
    duration: "6 Months",
    type: "Internship to PPO",
    domainId: "phytochemistry",
    domain: "Phytochemistry & QC",
    matchScore: 94,
    skillsRequired: ["HPTLC Chromatography", "Phytochemistry & QC", "Marker Compound Isolation"],
    description: "Perform high-resolution chromatographic fingerprinting, phytochemical marker isolation, and pharmacopoeial monograph validation.",
    applicantsCount: 65,
    deadline: "20 Sep 2026",
    status: "Active"
  },
  {
    id: "JOB-PC-302",
    title: "HPLC / LC-MS Quantitative Analytical Associate",
    company: "Patanjali Research Institute",
    location: "Haridwar, UK",
    mode: "On-site",
    stipend: "₹30,000 / month",
    salaryNumeric: 30000,
    duration: "4 Months",
    type: "Research Internship",
    domainId: "phytochemistry",
    domain: "Phytochemistry & QC",
    matchScore: 89,
    skillsRequired: ["HPLC Analytical Chemistry", "LC-MS/MS Bio-Analytics", "Spectrophotometry (UV-Vis / FTIR)"],
    description: "Operate modern analytical LC-MS/MS and HPLC instruments for pesticide residue, heavy metals, and active constituent assay testing.",
    applicantsCount: 52,
    deadline: "24 Sep 2026",
    status: "Active"
  },

  // 4. Bioinformatics & Molecular Docking
  {
    id: "JOB-BI-401",
    title: "Molecular Docking & In-Silico Drug Discovery Intern",
    company: "CSIR-Institute of Himalayan Bioresource Technology (IHBT)",
    location: "Palampur, HP",
    mode: "Hybrid",
    stipend: "₹36,000 / month",
    salaryNumeric: 36000,
    duration: "6 Months",
    type: "Research Fellowship",
    domainId: "bioinformatics",
    domain: "Bioinformatics & Genomics",
    matchScore: 93,
    skillsRequired: ["Molecular Docking (AutoDock / PyMOL)", "Target Identification & In-Silico Modeling", "Ayurgenomics & Gene Expression"],
    description: "Perform virtual screening and molecular docking simulations of phytocompounds against inflammatory and metabolic receptor targets.",
    applicantsCount: 39,
    deadline: "27 Sep 2026",
    status: "Active"
  },
  {
    id: "JOB-BI-402",
    title: "Ayurgenomics & NGS Sequence Analyst",
    company: "CSIR-Institute of Genomics & Integrative Biology (IGIB)",
    location: "New Delhi",
    mode: "Hybrid",
    stipend: "₹42,000 / month",
    salaryNumeric: 42000,
    duration: "6 Months",
    type: "Project Fellowship",
    domainId: "bioinformatics",
    domain: "Bioinformatics & Genomics",
    matchScore: 91,
    skillsRequired: ["Genomic Sequencing (NGS)", "Ayurgenomics & Gene Expression", "Bioinformatics Scientist"],
    description: "Analyze genomic sequencing pipelines correlating Cytochrome P450 variations with classical Ayurvedic Prakriti phenotypes.",
    applicantsCount: 29,
    deadline: "02 Oct 2026",
    status: "Active"
  },

  // 5. Herbal Formulation & GMP (Schedule T)
  {
    id: "JOB-HT-501",
    title: "NDDS Herbal Formulation & GMP Scientist",
    company: "Charak Pharma Innovation Labs",
    location: "Mumbai, MH",
    mode: "On-site",
    stipend: "₹35,000 / month",
    salaryNumeric: 35000,
    duration: "6 Months",
    type: "Internship to PPO",
    domainId: "herbal_tech",
    domain: "Herbal Formulation & GMP",
    matchScore: 89,
    skillsRequired: ["Good Manufacturing Practice (Schedule T)", "Novel Drug Delivery Systems (NDDS)", "Herbal Drug Formulation"],
    description: "Scale up novel phytosome and nano-emulsion formulations under Schedule T GMP standards with ICH accelerated stability protocols.",
    applicantsCount: 44,
    deadline: "19 Sep 2026",
    status: "Active"
  },

  // 6. Ayurveda Clinical Medicine & Dravyaguna
  {
    id: "JOB-AY-601",
    title: "Clinical Panchakarma & Dravyaguna Resident Fellow",
    company: "All India Institute of Ayurveda (AIIA)",
    location: "New Delhi",
    mode: "On-site",
    stipend: "₹45,000 / month",
    salaryNumeric: 45000,
    duration: "12 Months",
    type: "Clinical Residency",
    domainId: "ayurveda",
    domain: "Ayurveda Clinical Medicine",
    matchScore: 96,
    skillsRequired: ["Dravyaguna & Plant Taxonomy", "Panchakarma Protocol Management", "Nadi Pariksha (Pulse Diagnosis)"],
    description: "Manage clinical inpatient Panchakarma therapies, authenticate medicinal herbarium specimens, and monitor patient health outcomes.",
    applicantsCount: 78,
    deadline: "15 Sep 2026",
    status: "Active"
  },

  // 7. Digital Health, Tele-Ayush & ABDM
  {
    id: "JOB-DH-701",
    title: "Tele-Ayush & ABDM Solutions Architect Intern",
    company: "Centre for Development of Advanced Computing (C-DAC)",
    location: "Pune, MH",
    mode: "Remote",
    stipend: "₹40,000 / month",
    salaryNumeric: 40000,
    duration: "6 Months",
    type: "Technical Internship",
    domainId: "tele_ayush",
    domain: "Digital Health & Tele-Ayush",
    matchScore: 87,
    skillsRequired: ["Tele-Ayush Systems & ABDM", "NAMASTE Coding & FHIR Interoperability", "Cloud Computing & APIs"],
    description: "Design HL7 FHIR interoperability bridges connecting Ayush clinical registries with the Ayushman Bharat Digital Mission gateway.",
    applicantsCount: 63,
    deadline: "30 Sep 2026",
    status: "Active"
  },

  // 8. Clinical Trials & Pharmacovigilance
  {
    id: "JOB-CR-801",
    title: "Ayush Clinical Research Associate (CRA) Intern",
    company: "IQVIA Clinical Research India",
    location: "Mumbai / Bengaluru",
    mode: "Hybrid",
    stipend: "₹36,000 / month",
    salaryNumeric: 36000,
    duration: "6 Months",
    type: "Corporate Internship",
    domainId: "clinical_research",
    domain: "Clinical Trials & GCP",
    matchScore: 86,
    skillsRequired: ["Clinical Trials (GCP Compliance)", "Pharmacovigilance & ADR Reporting", "Clinical Data Management (CDM)"],
    description: "Monitor Ayush clinical trial sites for GCP compliance, verify Case Report Forms (CRFs), and report adverse drug reactions to PvPI.",
    applicantsCount: 51,
    deadline: "22 Sep 2026",
    status: "Active"
  },

  // 9. Healthcare Software & Web Engineering
  {
    id: "JOB-SE-901",
    title: "Full-Stack HealthTech Web Developer Intern",
    company: "National Health Authority Ecosystem Tech",
    location: "Bengaluru, KA",
    mode: "Remote",
    stipend: "₹50,000 / month",
    salaryNumeric: 50000,
    duration: "6 Months",
    type: "Full-Time Internship",
    domainId: "software_engineering",
    domain: "Healthcare Software & Tech",
    matchScore: 92,
    skillsRequired: ["React.js & JavaScript", "Full-Stack Web Development", "Cloud Computing & APIs"],
    description: "Build user interfaces, real-time consultation widgets, and secure RESTful database endpoints for national Ayush applications.",
    applicantsCount: 84,
    deadline: "05 Oct 2026",
    status: "Active"
  },

  // 10. Regulatory Affairs & TKDL
  {
    id: "JOB-RG-1001",
    title: "TKDL Patent Examination & Regulatory Fellow",
    company: "CSIR-Traditional Knowledge Digital Library Unit",
    location: "New Delhi",
    mode: "Hybrid",
    stipend: "₹38,000 / month",
    salaryNumeric: 38000,
    duration: "6 Months",
    type: "Government Fellowship",
    domainId: "regulatory_ip",
    domain: "Regulatory Affairs & TKDL",
    matchScore: 85,
    skillsRequired: ["Traditional Knowledge Digital Library (TKDL)", "Patent Law & Prior Art Search", "National Biodiversity Act (NBA) Approvals"],
    description: "Screen international patent applications to defend traditional medicinal formulations against biopiracy and prepare prior-art dossiers.",
    applicantsCount: 33,
    deadline: "28 Sep 2026",
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
