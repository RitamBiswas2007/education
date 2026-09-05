// Comprehensive AI Skill-to-Career & Multi-Domain Engine
// Covers all modern and classical domains: AI, Data Science, BioTech, Ayush, Pharma, etc.

export const MASTER_DOMAINS = [
  {
    id: 'ai_healthtech',
    name: 'Artificial Intelligence & Machine Learning in Healthcare',
    badge: 'AI & Data Science',
    icon: '🤖',
    color: 'from-violet-600 to-indigo-700',
    description: 'Machine Learning, Deep Learning, Generative AI / LLMs, Clinical Decision Support & Computer Vision in Medicine',
    careerRoles: [
      'AI HealthTech Engineer',
      'Clinical ML Algorithm Developer',
      'Ayush Diagnostic AI Specialist',
      'Medical Computer Vision Researcher',
      'Healthcare Data Scientist'
    ],
    skills: [
      'Machine Learning (Scikit-Learn, PyTorch)',
      'Deep Learning & Neural Networks',
      'Generative AI & LLMs in Healthcare',
      'Clinical Computer Vision (Medical Imaging)',
      'Natural Language Processing (Clinical Notes)'
    ]
  },
  {
    id: 'data_science',
    name: 'Healthcare Data Science & Biostatistics',
    badge: 'Data Analytics',
    icon: '📊',
    color: 'from-blue-600 to-cyan-700',
    description: 'Biostatistical modeling, epidemiological data mining, Python/R clinical analytics & EHR data processing',
    careerRoles: [
      'Healthcare Data Analyst',
      'Biostatistician & Clinical Trial Modeler',
      'Epidemiological Data Scientist',
      'Health Analytics Consultant'
    ],
    skills: [
      'Python Data Analytics (Pandas, NumPy)',
      'R for Biostatistics & Survival Analysis',
      'SQL & Clinical Data Warehousing',
      'Statistical Hypothesis Testing (p-values, ANOVA)',
      'Clinical Data Visualization (Tableau/Seaborn)'
    ]
  },
  {
    id: 'bioinformatics',
    name: 'Bioinformatics, Genomics & Molecular Modeling',
    badge: 'BioTech & Genomics',
    icon: '🧬',
    color: 'from-fuchsia-600 to-pink-700',
    description: 'In-silico molecular docking, Ayurgenomics, target identification, PyMOL/AutoDock & NGS sequencing analysis',
    careerRoles: [
      'Bioinformatics Scientist',
      'Computational Drug Discovery Specialist',
      'Ayurgenomics Researcher',
      'Molecular Docking & Simulation Analyst'
    ],
    skills: [
      'Molecular Docking (AutoDock, PyMOL)',
      'Ayurgenomics & Phenotype Correlation',
      'Next-Gen Sequencing (NGS) Data Analysis',
      'Target-Protein Ligand Binding Prediction',
      'BLAST & Genomic Alignment Tools'
    ]
  },
  {
    id: 'phytochemistry',
    name: 'Phytochemistry, Bio-Analytics & Quality Control',
    badge: 'Analytical QC',
    icon: '🧪',
    color: 'from-cyan-600 to-teal-700',
    description: 'HPTLC fingerprinting, HPLC/LC-MS quantitative profiling, botanical marker isolation & pharmacopoeial standards',
    careerRoles: [
      'Senior Phytochemist',
      'Analytical QC/QA Laboratory Head',
      'Botanical Fingerprinting Specialist',
      'Pharmacognosy Monograph Researcher'
    ],
    skills: [
      'HPTLC Fingerprinting & Derivatization',
      'HPLC & LC-MS/MS Quantitative Profiling',
      'Bio-Active Marker Compound Isolation',
      'Pharmacopoeial Monograph Testing (API/WHO)',
      'Spectrophotometry (UV-Vis & FTIR)'
    ]
  },
  {
    id: 'herbal_tech',
    name: 'Herbal Drug Formulation, NDDS & Schedule T GMP',
    badge: 'Manufacturing & R&D',
    icon: '💊',
    color: 'from-emerald-600 to-teal-800',
    description: 'Schedule T Good Manufacturing Practices, Novel Drug Delivery Systems (NDDS), nanomedicine & stability testing',
    careerRoles: [
      'Herbal Formulation Scientist',
      'GMP Production & Plant Manager (Schedule T)',
      'Novel Drug Delivery (NDDS) Researcher',
      'Cosmeceutical & Nutraceutical Formulator'
    ],
    skills: [
      'Good Manufacturing Practice (Schedule T)',
      'Supercritical Fluid Extraction (SFE-CO2)',
      'Nano-emulsion & Phytosome Formulation',
      'ICH Accelerated Stability Testing (40°C/75% RH)',
      'Heavy Metal & Microbial Limit Compliance'
    ]
  },
  {
    id: 'ayurveda',
    name: 'Ayurveda Clinical Medicine & Dravyaguna Therapeutics',
    badge: 'Ayurveda Core',
    icon: '🌿',
    color: 'from-emerald-500 to-green-700',
    description: 'Classical diagnostic methodology, Panchakarma clinical management, Dravyaguna plant taxonomy & Bhasma nanomedicine',
    careerRoles: [
      'Consultant Ayurvedic Physician',
      'Panchakarma Clinical Director',
      'Dravyaguna Plant Taxonomist',
      'Rasashastra Quality Specialist'
    ],
    skills: [
      'Dravyaguna Plant Taxonomy & Herbarium',
      'Panchakarma Protocols & Snehana-Swedana',
      'Nadi Pariksha & Classical Rogi-Roga Pareeksha',
      'Bhasma Standardization & Varitara Testing',
      'Asava-Arishta Fermentation Quality'
    ]
  },
  {
    id: 'tele_ayush',
    name: 'Digital Health, Tele-Ayush & ABDM Systems',
    badge: 'Digital HealthTech',
    icon: '💻',
    color: 'from-sky-600 to-blue-700',
    description: 'Ayushman Bharat Digital Mission (ABDM), NAMASTE portal terminologies, FHIR interoperability & tele-consultation systems',
    careerRoles: [
      'Digital Health Solutions Architect',
      'ABDM Clinical Interoperability Specialist',
      'Tele-Ayush Medical Operations Lead',
      'Health Informatics Project Manager'
    ],
    skills: [
      'NAMASTE Portal Standardized Coding',
      'HL7 FHIR Health Informatics & ABHA IDs',
      'Tele-Triage & Remote Clinical Protocols',
      'Electronic Health Record (EHR) Architecture',
      'Digital Health Data Privacy & HIPAA/DISHA'
    ]
  },
  {
    id: 'clinical_research',
    name: 'Clinical Trials, GCP & Pharmacovigilance',
    badge: 'Clinical Research',
    icon: '📋',
    color: 'from-purple-600 to-violet-800',
    description: 'Ayush Good Clinical Practice (GCP), CTRI trial protocol registry, ADR pharmacovigilance reporting & clinical auditing',
    careerRoles: [
      'Clinical Research Associate (CRA)',
      'Ayush Pharmacovigilance Officer',
      'Clinical Trial Protocol Manager',
      'Regulatory GCP Compliance Auditor'
    ],
    skills: [
      'Ayush Good Clinical Practice (GCP)',
      'CTRI Clinical Trial Prospective Registry',
      'Adverse Drug Reaction (ADR) Causality Scoring',
      'Clinical Case Report Form (CRF) Design',
      'Bioethics & Institutional Ethics Committee (IEC)'
    ]
  },
  {
    id: 'software_engineering',
    name: 'Healthcare Software & Web App Development',
    badge: 'Software Engineering',
    icon: '⚡',
    color: 'from-amber-600 to-orange-700',
    description: 'Full-stack web applications, React, Node.js, cloud APIs, database architecture & modern health application stacks',
    careerRoles: [
      'Full-Stack HealthTech Engineer',
      'React / Front-End Web Developer',
      'Cloud & API Systems Engineer',
      'Mobile Health App Developer'
    ],
    skills: [
      'React.js & Modern JavaScript (ES6+)',
      'Node.js, Express & RESTful APIs',
      'Supabase & PostgreSQL Database Architecture',
      'Cloud Deployment (Vercel, AWS)',
      'UI/UX Design for Healthcare Portals'
    ]
  },
  {
    id: 'yoga_naturopathy',
    name: 'Yoga Therapy, Naturopathy & Lifestyle Medicine',
    badge: 'Lifestyle & Wellness',
    icon: '🧘',
    color: 'from-emerald-400 to-teal-600',
    description: 'Evidence-based therapeutic yoga for NCDs, autonomic nervous regulation, hydrotherapy & clinical dietetics',
    careerRoles: [
      'Therapeutic Yoga Consultant',
      'Clinical Naturopathic Physician',
      'Mind-Body Lifestyle Medicine Director',
      'Corporate Wellness & Stress Physiologist'
    ],
    skills: [
      'Therapeutic Yoga Protocols for Diabetes & Hypertension',
      'Shatkriya & Autonomic Nervous System Regulation',
      'Hydrotherapy & Thermal Vascular Treatments',
      'Naturopathic Nutritional Prescription',
      'Stress Biomarker Profiling (HRV, Cortisol)'
    ]
  },
  {
    id: 'regulatory_ip',
    name: 'Regulatory Affairs, Patent Law & TKDL Defense',
    badge: 'IP & Regulatory',
    icon: '⚖️',
    color: 'from-slate-600 to-zinc-800',
    description: 'Traditional Knowledge Digital Library (TKDL) defense, National Biodiversity Authority (NBA) approvals & export documentation',
    careerRoles: [
      'Ayush Regulatory Affairs Manager',
      'Patent & Intellectual Property Attorney',
      'Biodiversity Access & Benefit Sharing Consultant',
      'International Ayush Export Regulatory Lead'
    ],
    skills: [
      'TKDL Documentation & Biopiracy Defense',
      'National Biodiversity Act (NBA) Clearances',
      'Ayush Premium Mark Certification Audits',
      'Drug & Cosmetic Act (Schedule T/M) Regulatory Filing',
      'Patent Prior Art Search & Dossier Preparation'
    ]
  },
  {
    id: 'unani_siddha_homeo',
    name: 'Unani Tibb, Siddha Medicine & Homeopathy',
    badge: 'Traditional Systems',
    icon: '🏺',
    color: 'from-rose-600 to-red-800',
    description: 'Mizaj diagnosis, Ilaj-bit-Tadbeer, Siddha Gunapadam, Homeopathic Pharmacopoeia (HPI) & mother tincture standards',
    careerRoles: [
      'Unani Clinical Consultant',
      'Siddha Medicine Physician',
      'Homeopathic Pharmacy QA Specialist',
      'Traditional System Formulator'
    ],
    skills: [
      'Mizaj Diagnosis & Humoral Balance (Akhlat)',
      'Siddha Envagai Thervu & Gunapadam',
      'Homoeopathic Pharmacopoeia of India (HPI) Testing',
      'Centesimal Potentization & Dynamization',
      'Regimenal Therapy (Ilaj-bit-Tadbeer)'
    ]
  }
];

// Rich searchable skills database with intelligent matching
export const SKILLS_CATALOG = [
  // AI & Tech Skills
  { name: 'Artificial Intelligence (AI)', domainId: 'ai_healthtech', category: 'AI & Tech', role: 'AI HealthTech Engineer' },
  { name: 'Machine Learning (ML)', domainId: 'ai_healthtech', category: 'AI & Tech', role: 'Machine Learning Scientist' },
  { name: 'Deep Learning & Neural Networks', domainId: 'ai_healthtech', category: 'AI & Tech', role: 'Deep Learning Researcher' },
  { name: 'Generative AI & LLMs', domainId: 'ai_healthtech', category: 'AI & Tech', role: 'GenAI Healthcare Engineer' },
  { name: 'Natural Language Processing (NLP)', domainId: 'ai_healthtech', category: 'AI & Tech', role: 'Clinical NLP Specialist' },
  { name: 'Computer Vision in Healthcare', domainId: 'ai_healthtech', category: 'AI & Tech', role: 'Medical Imaging AI Developer' },
  { name: 'Python Programming', domainId: 'data_science', category: 'AI & Tech', role: 'Healthcare Data Scientist' },
  { name: 'Data Science & Big Data', domainId: 'data_science', category: 'Data Science', role: 'Big Data Clinical Analyst' },
  { name: 'Biostatistics & R Programming', domainId: 'data_science', category: 'Data Science', role: 'Biostatistician' },
  { name: 'Full-Stack Web Development', domainId: 'software_engineering', category: 'Software', role: 'HealthTech Web Developer' },
  { name: 'React.js & JavaScript', domainId: 'software_engineering', category: 'Software', role: 'Frontend UI/UX Engineer' },
  { name: 'Cloud Computing & APIs', domainId: 'software_engineering', category: 'Software', role: 'Cloud Health Systems Engineer' },

  // Bio-Analytics & Phytochemistry
  { name: 'HPTLC Chromatography', domainId: 'phytochemistry', category: 'Bio-Analytics', role: 'Botanical Fingerprinting Analyst' },
  { name: 'HPLC Analytical Chemistry', domainId: 'phytochemistry', category: 'Bio-Analytics', role: 'HPLC QC Specialist' },
  { name: 'LC-MS/MS Bio-Analytics', domainId: 'phytochemistry', category: 'Bio-Analytics', role: 'Mass Spectrometry Analyst' },
  { name: 'Phytochemistry & QC', domainId: 'phytochemistry', category: 'Bio-Analytics', role: 'Phytochemist' },
  { name: 'Marker Compound Isolation', domainId: 'phytochemistry', category: 'Bio-Analytics', role: 'Extraction Chemistry Scientist' },
  { name: 'Spectrophotometry (UV-Vis / FTIR)', domainId: 'phytochemistry', category: 'Bio-Analytics', role: 'QC Instrumentation Chemist' },

  // Formulation & Manufacturing
  { name: 'Good Manufacturing Practice (Schedule T)', domainId: 'herbal_tech', category: 'Manufacturing', role: 'GMP Plant Compliance Manager' },
  { name: 'Herbal Drug Formulation', domainId: 'herbal_tech', category: 'Manufacturing', role: 'Herbal Formulator & R&D Lead' },
  { name: 'Novel Drug Delivery Systems (NDDS)', domainId: 'herbal_tech', category: 'Manufacturing', role: 'Nanomedicine Researcher' },
  { name: 'Supercritical CO2 Extraction', domainId: 'herbal_tech', category: 'Manufacturing', role: 'Extraction Scale-Up Engineer' },
  { name: 'Stability Testing (ICH Q1A)', domainId: 'herbal_tech', category: 'Manufacturing', role: 'Stability Study Officer' },

  // Bioinformatics & Genomics
  { name: 'Molecular Docking (AutoDock / PyMOL)', domainId: 'bioinformatics', category: 'Bioinformatics', role: 'Computational Drug Designer' },
  { name: 'Ayurgenomics & Gene Expression', domainId: 'bioinformatics', category: 'Bioinformatics', role: 'Ayurgenomics Researcher' },
  { name: 'Genomic Sequencing (NGS)', domainId: 'bioinformatics', category: 'Bioinformatics', role: 'Genomics Bioinformatician' },
  { name: 'Target Identification & In-Silico Modeling', domainId: 'bioinformatics', category: 'Bioinformatics', role: 'In-Silico Pharmacologist' },

  // Clinical & Regulatory
  { name: 'Clinical Trials (GCP Compliance)', domainId: 'clinical_research', category: 'Clinical', role: 'Clinical Research Associate' },
  { name: 'Pharmacovigilance & ADR Reporting', domainId: 'clinical_research', category: 'Clinical', role: 'Pharmacovigilance Safety Lead' },
  { name: 'Clinical Data Management (CDM)', domainId: 'clinical_research', category: 'Clinical', role: 'Clinical Data Manager' },
  { name: 'Tele-Ayush Systems & ABDM', domainId: 'tele_ayush', category: 'Digital Health', role: 'Telehealth Systems Lead' },
  { name: 'NAMASTE Coding & FHIR Interoperability', domainId: 'tele_ayush', category: 'Digital Health', role: 'Health Informatics Architect' },
  { name: 'Traditional Knowledge Digital Library (TKDL)', domainId: 'regulatory_ip', category: 'Regulatory', role: 'IP & TKDL Examiner' },
  { name: 'Patent Law & Prior Art Search', domainId: 'regulatory_ip', category: 'Regulatory', role: 'Patent Strategy Attorney' },
  { name: 'National Biodiversity Act (NBA) Approvals', domainId: 'regulatory_ip', category: 'Regulatory', role: 'Regulatory Compliance Officer' },

  // Ayurveda & Traditional
  { name: 'Dravyaguna & Plant Taxonomy', domainId: 'ayurveda', category: 'Ayurveda', role: 'Dravyaguna Ethnobotanist' },
  { name: 'Panchakarma Protocol Management', domainId: 'ayurveda', category: 'Ayurveda', role: 'Panchakarma Physician' },
  { name: 'Nadi Pariksha (Pulse Diagnosis)', domainId: 'ayurveda', category: 'Ayurveda', role: 'Ayurvedic Clinical Specialist' },
  { name: 'Rasashastra & Bhasma Standardization', domainId: 'ayurveda', category: 'Ayurveda', role: 'Rasashastra Quality Scientist' },
  { name: 'Yoga Therapy for NCDs', domainId: 'yoga_naturopathy', category: 'Yoga & Wellness', role: 'Therapeutic Yoga Consultant' },
  { name: 'Naturopathic Hydrotherapy & Dietetics', domainId: 'yoga_naturopathy', category: 'Yoga & Wellness', role: 'Naturopathic Clinician' },
  { name: 'Mizaj Analysis & Unani Pharmacotherapy', domainId: 'unani_siddha_homeo', category: 'Traditional Systems', role: 'Unani Medical Officer' },
  { name: 'Siddha Gunapadam Formulations', domainId: 'unani_siddha_homeo', category: 'Traditional Systems', role: 'Siddha Clinical Researcher' },
  { name: 'Homeopathic Pharmacopoeia (HPI) Standards', domainId: 'unani_siddha_homeo', category: 'Traditional Systems', role: 'Homeopathic Quality Lead' }
];

// Smart AI Search matching across skills, domains, and career pathways
export function searchSkillsAndDomains(query = '') {
  const cleanQuery = query.trim().toLowerCase();
  if (!cleanQuery) {
    return {
      suggestedSkills: SKILLS_CATALOG.slice(0, 8),
      matchingDomains: MASTER_DOMAINS.slice(0, 6)
    };
  }

  // 1. Search matching skills
  const matchedSkills = SKILLS_CATALOG.filter(skill => {
    return skill.name.toLowerCase().includes(cleanQuery) ||
           skill.category.toLowerCase().includes(cleanQuery) ||
           skill.role.toLowerCase().includes(cleanQuery) ||
           skill.domainId.toLowerCase().includes(cleanQuery);
  });

  // 2. Search matching domains
  const matchedDomains = MASTER_DOMAINS.filter(domain => {
    return domain.name.toLowerCase().includes(cleanQuery) ||
           domain.badge.toLowerCase().includes(cleanQuery) ||
           domain.description.toLowerCase().includes(cleanQuery) ||
           domain.careerRoles.some(r => r.toLowerCase().includes(cleanQuery)) ||
           domain.skills.some(s => s.toLowerCase().includes(cleanQuery));
  });

  // 3. If no direct domain match but skill matched, include parent domains
  matchedSkills.forEach(sk => {
    const parentDom = MASTER_DOMAINS.find(d => d.id === sk.domainId);
    if (parentDom && !matchedDomains.some(d => d.id === parentDom.id)) {
      matchedDomains.push(parentDom);
    }
  });

  return {
    suggestedSkills: matchedSkills.slice(0, 10),
    matchingDomains: matchedDomains.slice(0, 6)
  };
}
