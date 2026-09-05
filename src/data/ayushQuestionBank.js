// Official Ayush Question Bank & Domain Engine for Ministry of Ayush Skill Diagnostics

export const AYUSH_DOMAINS = [
  {
    id: 'ayurveda',
    name: 'Ayurveda & Classical Therapeutics',
    badge: 'Ayurveda Core',
    icon: '🌿',
    color: 'from-emerald-600 to-green-700',
    description: 'Dravyaguna, Panchakarma, Rasashastra, Bhaishajya Kalpana & Classical Diagnostic Principles',
    defaultSkills: [
      { name: 'Dravyaguna & Plant Taxonomy', category: 'Ayurveda Core', currentLevel: 50, requiredLevel: 85 },
      { name: 'Panchakarma Protocol Management', category: 'Clinical Practice', currentLevel: 45, requiredLevel: 80 }
    ]
  },
  {
    id: 'phytochemistry',
    name: 'Phytochemistry & Quality Control (QC/QA)',
    badge: 'QC / Analytics',
    icon: '🧪',
    color: 'from-cyan-600 to-teal-700',
    description: 'Marker compound isolation, HPTLC fingerprinting, spectrophotometry & herbal monograph standardization',
    defaultSkills: [
      { name: 'Phytochemistry & QC Monograph Standards', category: 'Lab & QC', currentLevel: 55, requiredLevel: 90 },
      { name: 'HPTLC & Chromatography Fingerprinting', category: 'Analytical Instrumentation', currentLevel: 45, requiredLevel: 85 }
    ]
  },
  {
    id: 'herbal_tech',
    name: 'Herbal Formulation & GMP (Schedule T)',
    badge: 'Manufacturing & GMP',
    icon: '💊',
    color: 'from-teal-600 to-emerald-800',
    description: 'Standardized extraction, stability testing, Ayush Good Manufacturing Practice & heavy metal compliance',
    defaultSkills: [
      { name: 'Good Manufacturing Practice (Schedule T)', category: 'GMP & Compliance', currentLevel: 60, requiredLevel: 90 },
      { name: 'Herbal Extraction & Formulation Stability', category: 'Industrial Pharmacy', currentLevel: 50, requiredLevel: 85 }
    ]
  },
  {
    id: 'tele_ayush',
    name: 'Tele-Ayush & Digital Health Systems',
    badge: 'Digital Health',
    icon: '💻',
    color: 'from-blue-600 to-indigo-700',
    description: 'Ayushman Bharat Digital Mission (ABDM), NAMASTE portal coding, EHR interoperability & digital consultations',
    defaultSkills: [
      { name: 'Tele-Ayush Systems & NAMASTE Coding', category: 'Digital Health', currentLevel: 40, requiredLevel: 80 },
      { name: 'FHIR EHR Standards & ABDM Compliance', category: 'Health Informatics', currentLevel: 45, requiredLevel: 80 }
    ]
  },
  {
    id: 'clinical_research',
    name: 'Clinical Research, Trials & Pharmacovigilance',
    badge: 'Clinical Research',
    icon: '📊',
    color: 'from-purple-600 to-indigo-800',
    description: 'Ayush GCP guidelines, clinical trial protocols (CTRI), adverse drug reaction (ADR) reporting & biostatistics',
    defaultSkills: [
      { name: 'Ayush GCP & Clinical Trial Design', category: 'Research Methodology', currentLevel: 45, requiredLevel: 85 },
      { name: 'Pharmacovigilance & Adverse Drug Reaction Reporting', category: 'Drug Safety', currentLevel: 50, requiredLevel: 80 }
    ]
  },
  {
    id: 'bio_analytics',
    name: 'Bio-Analytics & Instrumentation (HPLC/LC-MS)',
    badge: 'Bio-Analytics',
    icon: '🔬',
    color: 'from-amber-600 to-orange-700',
    description: 'High Performance Liquid Chromatography, LC-MS/MS, pesticide screening & microbial limit testing',
    defaultSkills: [
      { name: 'HPLC & LC-MS Quantitative Analysis', category: 'Bio-Analytics', currentLevel: 45, requiredLevel: 85 },
      { name: 'Aflatoxin & Pesticide Residue Profiling', category: 'NABL Testing', currentLevel: 50, requiredLevel: 85 }
    ]
  },
  {
    id: 'yoga_naturopathy',
    name: 'Yoga Therapy & Naturopathic Medicine',
    badge: 'Yoga & Wellness',
    icon: '🧘',
    color: 'from-emerald-500 to-cyan-600',
    description: 'Therapeutic yoga protocols for non-communicable diseases, hydrotherapy, lifestyle interventions & mind-body medicine',
    defaultSkills: [
      { name: 'Therapeutic Yoga Protocols for NCDs', category: 'Yoga Therapy', currentLevel: 55, requiredLevel: 85 },
      { name: 'Naturopathic Dietetics & Hydrotherapy', category: 'Naturopathy', currentLevel: 50, requiredLevel: 80 }
    ]
  },
  {
    id: 'unani_siddha',
    name: 'Unani & Siddha Traditional Systems',
    badge: 'Unani / Siddha',
    icon: '🏺',
    color: 'from-amber-700 to-rose-800',
    description: 'Mizaj diagnosis, Ilaj-bit-Tadbeer, Siddha Gunapadam, Mufradat & classical formulation chemistry',
    defaultSkills: [
      { name: 'Mizaj Assessment & Unani Pharmacotherapy', category: 'Unani Medicine', currentLevel: 50, requiredLevel: 85 },
      { name: 'Siddha Gunapadam & Thathu Formulations', category: 'Siddha Medicine', currentLevel: 45, requiredLevel: 80 }
    ]
  },
  {
    id: 'homeopathy',
    name: 'Homeopathy & Pharmacopoeial Standards',
    badge: 'Homeopathy',
    icon: '🍃',
    color: 'from-sky-600 to-cyan-700',
    description: 'Homeopathic Pharmacopoeia of India (HPI) compliance, mother tincture preparation & dynamization protocols',
    defaultSkills: [
      { name: 'HPI Standards & Mother Tincture QA', category: 'Homeopathic Pharmacy', currentLevel: 50, requiredLevel: 85 },
      { name: 'Miasmatic Analysis & Repertorization', category: 'Clinical Practice', currentLevel: 45, requiredLevel: 80 }
    ]
  },
  {
    id: 'regulatory_ip',
    name: 'Regulatory Affairs, TKDL & Patent Law',
    badge: 'Regulatory & IP',
    icon: '⚖️',
    color: 'from-slate-600 to-slate-800',
    description: 'Traditional Knowledge Digital Library (TKDL), NBA clearance, export compliance & Ayush mark certification',
    defaultSkills: [
      { name: 'TKDL Documentation & Prior Art Defense', category: 'IP & Patents', currentLevel: 45, requiredLevel: 85 },
      { name: 'Ayush Premium Mark & Export Regulations', category: 'Regulatory Affairs', currentLevel: 50, requiredLevel: 85 }
    ]
  }
];

// Rich Multi-Domain Question Bank for 10-MCQ Diagnostic Assessment
export const DOMAIN_QUESTION_BANK = {
  ayurveda: [
    {
      id: 'ayu-1',
      domainId: 'ayurveda',
      category: 'Dravyaguna & Formulation',
      question: 'Which classical test is mandated by the Ayurvedic Pharmacopoeia of India to confirm the shelf-life stability of Asava and Arishta formulations?',
      options: [
        'Determination of self-generated alcohol percentage and absence of secondary fermentation',
        'Boiling point test at standard atmospheric pressure',
        'Centrifugation at 15,000 RPM only',
        'Color intensity matching with synthetic dyes'
      ],
      correctAnswer: 0,
      explanation: 'Under Ayurvedic Pharmacopoeia of India (API) standards, self-generated alcohol content (typically 5–10% v/v) must be quantitatively verified and secondary acetic acid fermentation monitored.',
      skillBoost: { skillName: 'Dravyaguna & Plant Taxonomy', points: 10 }
    },
    {
      id: 'ayu-2',
      domainId: 'ayurveda',
      category: 'Panchakarma & Clinical Safety',
      question: 'Before administering Sneha Pana in classical Vamana Karma, which physiological marker must be verified to confirm digestion of the unctuous substance (Jeerna Sneha Lakshana)?',
      options: [
        'Appearance of clear belching (Udgara Shuddhi) and return of natural appetite (Kshut Pravritti)',
        'Significant elevation in systolic blood pressure',
        'Complete cessation of urinary excretion',
        'Induction of immediate sedation'
      ],
      correctAnswer: 0,
      explanation: 'According to Charaka Samhita, proper digestion of Sneha is verified by Udgara Shuddhi (clear eructations), Laghuta (lightness), and return of hunger before advancing the shodhana regimen.',
      skillBoost: { skillName: 'Panchakarma Protocol Management', points: 10 }
    },
    {
      id: 'ayu-3',
      domainId: 'ayurveda',
      category: 'Rasashastra & Metal Bhasmas',
      question: 'Which classical test confirms that a Bhasma (calcined mineral/metal) has reached micro-fine state and will float smoothly on calm water?',
      options: [
        'Varitara Test',
        'Rekhapurnatva Test',
        'Apunarbhava Test',
        'Niruttha Test'
      ],
      correctAnswer: 0,
      explanation: 'Varitara (floating on surface tension of water) verifies that the particle size has reached nano/colloidal dimensions. Rekhapurnatva confirms particles enter the furrows of fingers.',
      skillBoost: { skillName: 'Dravyaguna & Plant Taxonomy', points: 8 }
    },
    {
      id: 'ayu-4',
      domainId: 'ayurveda',
      category: 'Pharmacognosy & Raw Material',
      question: 'In macroscopic authentication of Ashwagandha (Withania somnifera) roots, what characteristic odor and texture indicates high-grade raw material?',
      options: [
        'Distinct horse-like (equine) characteristic odor and starchy, short fracture',
        'Sweet fruity aroma with fibrous woody fracture',
        'Strong ammoniacal pungent gas with hollow center',
        'Odorless glassy translucent appearance'
      ],
      correctAnswer: 0,
      explanation: 'Ashwagandha literally translates to "smell of a horse", and genuine fresh root presents this characteristic odor along with a starchy, smooth fracture containing withanolides.',
      skillBoost: { skillName: 'Dravyaguna & Plant Taxonomy', points: 9 }
    }
  ],

  phytochemistry: [
    {
      id: 'phy-1',
      domainId: 'phytochemistry',
      category: 'Chromatography Fingerprinting',
      question: 'Which chromatography technique is globally recognized by Ayush and WHO for chemical fingerprinting of botanical raw materials?',
      options: [
        'High-Performance Thin-Layer Chromatography (HPTLC)',
        'Capillary zone paper electrophoresis',
        'Simple open gravity column filtration without stationary phase',
        'Non-derivatized gas chromatography with flame ionization'
      ],
      correctAnswer: 0,
      explanation: 'HPTLC provides reproducible Rf values, characteristic spectral scanning at multiple wavelengths (UV 254nm, 366nm, derivatized white light), making it the gold standard in herbal pharmacopoeias.',
      skillBoost: { skillName: 'HPTLC & Chromatography Fingerprinting', points: 10 }
    },
    {
      id: 'phy-2',
      domainId: 'phytochemistry',
      category: 'Quality Control Monograph',
      question: 'What is the permissible limit for Total Ash content when evaluating the purity of herbal raw material drugs under Ayurvedic Pharmacopoeia guidelines?',
      options: [
        'It reflects total inorganic salts and earthy matter, specified per monograph (typically under 8–15%)',
        'Total ash must strictly be 0.00% in all botanical specimens',
        'Over 50% ash indicates superior therapeutic potency',
        'Ash value is only recorded for synthetically synthesized powders'
      ],
      correctAnswer: 0,
      explanation: 'Total ash measures both physiological ash (plant minerals) and non-physiological ash (sand, silica). Specific thresholds prevent adulteration with soil or exhausted material.',
      skillBoost: { skillName: 'Phytochemistry & QC Monograph Standards', points: 8 }
    },
    {
      id: 'phy-3',
      domainId: 'phytochemistry',
      category: 'Marker Compound Isolation',
      question: 'Which chemical marker is quantified in Curcuma longa extracts to establish standardization under Ayush industrial quality control?',
      options: [
        'Curcuminoids (Curcumin, Demethoxycurcumin, Bisdemethoxycurcumin)',
        'Ginkgolide B and Bilobalide',
        'Sennoside A and B',
        'Artemisinin and Arteether'
      ],
      correctAnswer: 0,
      explanation: 'Curcuminoids are the primary bio-active marker group standardized via HPLC/HPTLC at 95% purity for commercial and clinical Ayush formulations.',
      skillBoost: { skillName: 'Phytochemistry & QC Monograph Standards', points: 9 }
    },
    {
      id: 'phy-4',
      domainId: 'phytochemistry',
      category: 'Spectroscopic Validation',
      question: 'During UV-Vis spectrophotometric validation of flavonoid contents, which reagent is commonly employed to form a stable yellow chelate for photometric measurement?',
      options: [
        'Aluminium chloride (AlCl3) reagent',
        'Benedict’s solution',
        'Nessler’s reagent',
        'Fehling’s A and B solution'
      ],
      correctAnswer: 0,
      explanation: 'Aluminium chloride forms acid-stable complexes with the C-4 keto group and either the C-3 or C-5 hydroxyl group of flavones and flavonols, quantified at 415–430 nm.',
      skillBoost: { skillName: 'HPTLC & Chromatography Fingerprinting', points: 9 }
    }
  ],

  herbal_tech: [
    {
      id: 'ht-1',
      domainId: 'herbal_tech',
      category: 'Schedule T GMP Compliance',
      question: 'Under the Drugs and Cosmetics Rules 1945, which specific schedule defines Good Manufacturing Practices (GMP) for ASU (Ayurveda, Siddha, Unani) medicines?',
      options: [
        'Schedule T',
        'Schedule M',
        'Schedule Y',
        'Schedule F'
      ],
      correctAnswer: 0,
      explanation: 'Schedule T strictly regulates factory premises, hygiene, raw material storage, batch manufacturing records (BMR), and quality control labs for Ayurvedic, Siddha, and Unani pharmaceutical units.',
      skillBoost: { skillName: 'Good Manufacturing Practice (Schedule T)', points: 10 }
    },
    {
      id: 'ht-2',
      domainId: 'herbal_tech',
      category: 'Stability Testing (ICH & Ayush)',
      question: 'What are the standard accelerated stability testing conditions required by Ayush/ICH for botanical finished drug products?',
      options: [
        '40°C ± 2°C at 75% RH ± 5% RH for 6 months',
        '25°C ± 2°C at 40% RH for 1 month',
        '60°C ± 5°C at 90% RH for 24 hours',
        'Sub-zero -20°C in vacuum desiccator'
      ],
      correctAnswer: 0,
      explanation: 'Accelerated stability studies test physical, chemical, and microbiological integrity under 40°C/75% RH over 0, 1, 2, 3, and 6 month sampling periods.',
      skillBoost: { skillName: 'Herbal Extraction & Formulation Stability', points: 9 }
    },
    {
      id: 'ht-3',
      domainId: 'herbal_tech',
      category: 'Heavy Metal Safety Limits',
      question: 'What is the maximum permissible limit for Lead (Pb) in ASU herbal formulations under Ministry of Ayush & Pharmacopoeia rules?',
      options: [
        '10.0 ppm (parts per million)',
        '50.0 ppm',
        '0.001 ppm',
        'No permissible limit exists'
      ],
      correctAnswer: 0,
      explanation: 'Permissible heavy metal limits for finished herbal formulations under Ayush regulations are: Lead (Pb) ≤ 10 ppm, Arsenic (As) ≤ 3 ppm, Cadmium (Cd) ≤ 0.3 ppm, and Mercury (Hg) ≤ 1 ppm.',
      skillBoost: { skillName: 'Good Manufacturing Practice (Schedule T)', points: 10 }
    },
    {
      id: 'ht-4',
      domainId: 'herbal_tech',
      category: 'Extraction Technology',
      question: 'Which green extraction technology provides supercritical solvent selectivity without leaving organic toxic solvent residues in standardized herbal extracts?',
      options: [
        'Supercritical Fluid Extraction using carbon dioxide (SFE-CO2)',
        'Open pan petroleum ether boiling',
        'Benzene reflux distillation',
        'Chloroform soaking for 30 days'
      ],
      correctAnswer: 0,
      explanation: 'Supercritical CO2 operates at mild critical temperatures (31.1°C), yields solvent-free botanical oleoresins/extracts, and preserves thermally labile phytomolecules.',
      skillBoost: { skillName: 'Herbal Extraction & Formulation Stability', points: 9 }
    }
  ],

  tele_ayush: [
    {
      id: 'ta-1',
      domainId: 'tele_ayush',
      category: 'Digital Health & ABDM',
      question: 'In digital Ayush electronic health records, which standardized clinical terminology portal ensures interoperability under Ayushman Bharat Digital Mission (ABDM)?',
      options: [
        'NAMASTE Portal (National Ayush Morbidity and Standardized Terminologies Electronic Portal) & ICD-11 Traditional Medicine Module',
        'Unencrypted Excel CSV files stored in Google Drive',
        'Standard ISO 9001 factory documentation',
        'Manual handwritten case registration registries'
      ],
      correctAnswer: 0,
      explanation: 'The Ministry of Ayush developed NAMASTE to assign standardized alphanumeric diagnostic and treatment codes seamlessly aligned with WHO ICD-11 Traditional Medicine chapter and FHIR standards.',
      skillBoost: { skillName: 'Tele-Ayush Systems & NAMASTE Coding', points: 10 }
    },
    {
      id: 'ta-2',
      domainId: 'tele_ayush',
      category: 'Interoperability Standards',
      question: 'Which international healthcare data exchange specification is mandated by ABDM for structured Ayush telehealth clinical artifacts?',
      options: [
        'HL7 FHIR (Fast Healthcare Interoperability Resources)',
        'Simple FTP plain text protocol',
        'PDF bitmap printouts',
        'POP3 mail protocol'
      ],
      correctAnswer: 0,
      explanation: 'HL7 FHIR defines modular JSON/XML health records (Care Plan, Diagnostic Report, Encounter) that allow Ayush clinics to interface with national health IDs (ABHA).',
      skillBoost: { skillName: 'FHIR EHR Standards & ABDM Compliance', points: 9 }
    },
    {
      id: 'ta-3',
      domainId: 'tele_ayush',
      category: 'Tele-Triage & Tele-Consultation',
      question: 'Under the Telemedicine Practice Guidelines issued for registered Ayush practitioners, which medicine category is strictly prohibited from prescription over audio-only consultations?',
      options: [
        'Schedule X medicines and habit-forming narcotic or psychotropic substances',
        'Classical Triphala Churna or Sitopaladi Churna',
        'Ayush 64 or Samshamani Vati',
        'Standard dietary and lifestyle modifications'
      ],
      correctAnswer: 0,
      explanation: 'Ayush Telemedicine Guidelines prohibit prescribing Schedule X drugs or restricted narcotics remotely; only List O (OTC/general remedies) and List A (routine remedies) can be prescribed upon clinical review.',
      skillBoost: { skillName: 'Tele-Ayush Systems & NAMASTE Coding', points: 8 }
    },
    {
      id: 'ta-4',
      domainId: 'tele_ayush',
      category: 'Digital Prakriti Assessment',
      question: 'When implementing AI algorithmic Prakriti assessment, which validation protocol prevents scoring bias across diverse clinical phenotypes?',
      options: [
        'Multi-factorial questionnaire validated against expert clinician consensus and genomic phenotyping correlations',
        'Relying solely on user-reported single question selfies',
        'Hardcoding a single dominant dosha for all users based on age',
        'Random dosha assignment using a dice algorithm'
      ],
      correctAnswer: 0,
      explanation: 'Ayurgenomics and digital health validation studies require multi-axial morphological, physiological, and psychological assessments benchmarked against triple-blinded clinician examinations.',
      skillBoost: { skillName: 'FHIR EHR Standards & ABDM Compliance', points: 9 }
    }
  ],

  clinical_research: [
    {
      id: 'cr-1',
      domainId: 'clinical_research',
      category: 'Clinical Trial Registry & Ethics',
      question: 'Before enrolling the first patient in a human clinical trial evaluating a novel Ayush formulation, where must the trial be prospectively registered in India?',
      options: [
        'Clinical Trials Registry - India (CTRI) hosted by ICMR-NIMS',
        'Social media research announcements',
        'Local commercial newspaper classifieds',
        'Internal college notice board only'
      ],
      correctAnswer: 0,
      explanation: 'Registration in CTRI (ctri.icmr.org.in) before first participant recruitment is mandatory under the Drugs and Cosmetics Act and ICMR/Ayush ethical guidelines.',
      skillBoost: { skillName: 'Ayush GCP & Clinical Trial Design', points: 10 }
    },
    {
      id: 'cr-2',
      domainId: 'clinical_research',
      category: 'Pharmacovigilance Program',
      question: 'Under the National Pharmacovigilance Programme for Ayush, what is the role of Intermediary Pharmacovigilance Centres (IPVCs)?',
      options: [
        'Collect, assess causality, and report adverse drug reactions (ADR) and misleading advertisements to the National Coordination Centre (AIIA)',
        'Directly manufacture ASU medicines without license',
        'Sell Ayush products directly to corporate retailers',
        'Conduct chemical synthesis of synthetic API drugs'
      ],
      correctAnswer: 0,
      explanation: 'IPVCs monitor regional Peripheral Pharmacovigilance Centres, review ADR notifications using WHO causality scales, and combat misleading ASU advertisements.',
      skillBoost: { skillName: 'Pharmacovigilance & Adverse Drug Reaction Reporting', points: 10 }
    },
    {
      id: 'cr-3',
      domainId: 'clinical_research',
      category: 'GCP & Informed Consent',
      question: 'According to Ayush Good Clinical Practice (GCP) guidelines, how long must clinical trial source data and investigator files be securely archived post-study completion?',
      options: [
        'Minimum of 5 years (or as mandated by regulatory authorities)',
        '30 days only',
        'Files must be discarded immediately upon statistical publication',
        'No retention is required if data is digitized'
      ],
      correctAnswer: 0,
      explanation: 'Ayush GCP and CDSCO regulations require retention of signed informed consent forms, case report forms (CRFs), and audit trails for at least 5 years.',
      skillBoost: { skillName: 'Ayush GCP & Clinical Trial Design', points: 8 }
    },
    {
      id: 'cr-4',
      domainId: 'clinical_research',
      category: 'Research Evidence Repositories',
      question: 'Which national digital repository developed by the Ministry of Ayush indexes peer-reviewed clinical studies and research on ASU medicines?',
      options: [
        'AYUSH Research Portal & DHARA (Digital Helpline for Ayurveda Research Articles)',
        'Commercial blog networks',
        'Wikipedia general medicine page',
        'Local library manual index cards'
      ],
      correctAnswer: 0,
      explanation: 'The AYUSH Research Portal catalogs over 40,000 verified research articles, experimental studies, and clinical trials categorized by system and disease.',
      skillBoost: { skillName: 'Ayush GCP & Clinical Trial Design', points: 9 }
    }
  ],

  bio_analytics: [
    {
      id: 'ba-1',
      domainId: 'bio_analytics',
      category: 'HPLC Method Development',
      question: 'What is the benchmark chromatographic resolution factor (Rs) between two adjacent critical marker peaks required to confirm complete baseline separation in HPLC analysis?',
      options: [
        'Rs ≥ 1.5',
        'Rs ≤ 0.1',
        'Rs = 0.0',
        'Resolution factor is not used in chromatography'
      ],
      correctAnswer: 0,
      explanation: 'In analytical HPLC validation (ICH Q2R1 / Ayush guidelines), an Rs of 1.5 or greater ensures that peak overlap is under 0.3%, enabling accurate baseline quantification.',
      skillBoost: { skillName: 'HPLC & LC-MS Quantitative Analysis', points: 10 }
    },
    {
      id: 'ba-2',
      domainId: 'bio_analytics',
      category: 'NABL & Contaminant Screening',
      question: 'Which analytical instrument is designated by Pharmacopoeia standards for ppb-level determination of heavy metals (Pb, Cd, As, Hg) in herbal formulations?',
      options: [
        'Inductively Coupled Plasma Mass Spectrometry (ICP-MS) or Atomic Absorption Spectroscopy (AAS)',
        'Visible Light Microscope with 10x ocular',
        'Hydrometer immersion test',
        'Simple pH paper strip immersion'
      ],
      correctAnswer: 0,
      explanation: 'ICP-MS and Flame/Hydride AAS provide ultra-trace sensitivity down to parts-per-billion (ppb), required to satisfy stringent domestic and export heavy metal limits.',
      skillBoost: { skillName: 'Aflatoxin & Pesticide Residue Profiling', points: 9 }
    },
    {
      id: 'ba-3',
      domainId: 'bio_analytics',
      category: 'Mycotoxin Analysis',
      question: 'Which class of potent carcinogenic fungal mycotoxins must be screened in raw herbal drugs susceptible to improper post-harvest storage under Ayush Pharmacopoeia guidelines?',
      options: [
        'Aflatoxins (B1, B2, G1, G2)',
        'Sodium chloride crystals',
        'Chlorophyll breakdown pigments',
        'Ascorbic acid monomers'
      ],
      correctAnswer: 0,
      explanation: 'Aflatoxins produced by Aspergillus flavus are strictly regulated; total aflatoxin content must not exceed 4 ppb (μg/kg) and B1 must not exceed 2 ppb.',
      skillBoost: { skillName: 'Aflatoxin & Pesticide Residue Profiling', points: 10 }
    }
  ],

  yoga_naturopathy: [
    {
      id: 'yn-1',
      domainId: 'yoga_naturopathy',
      category: 'Therapeutic Yoga Evidence',
      question: 'In managing metabolic syndrome and Type 2 Diabetes through Yoga protocols validated by S-VYASA and CCRYN, which physiological mechanism is primarily improved?',
      options: [
        'Downregulation of sympathetic tone, enhanced insulin receptor sensitivity, and cortisol reduction',
        'Permanent suppression of pancreatic enzyme secretion',
        'Rapid artificial elevation of lactic acid',
        'Immediate destruction of red blood cell membranes'
      ],
      correctAnswer: 0,
      explanation: 'Scientific clinical trials demonstrate that standardized yoga protocols (asanas, pranayama, meditation) decrease salivary cortisol, improve HOMA-IR, and regulate autonomic tone.',
      skillBoost: { skillName: 'Therapeutic Yoga Protocols for NCDs', points: 10 }
    },
    {
      id: 'yn-2',
      domainId: 'yoga_naturopathy',
      category: 'Shatkriyas & Detoxification',
      question: 'In classical Hatha Yoga and Naturopathy, which cleansing procedure (Shatkriya) involves rhythmic abdominal churning to stimulate digestive fire (Agni) and intestinal peristalsis?',
      options: [
        'Nauli Kriya',
        'Neti Kriya',
        'Trataka',
        'Kapalabhati'
      ],
      correctAnswer: 0,
      explanation: 'Nauli Kriya isolates and rotates the rectus abdominis muscles, creating intra-abdominal pressure that tones mesenteric blood flow and stimulates visceral motility.',
      skillBoost: { skillName: 'Naturopathic Dietetics & Hydrotherapy', points: 9 }
    },
    {
      id: 'yn-3',
      domainId: 'yoga_naturopathy',
      category: 'Hydrotherapy Principles',
      question: 'In clinical Naturopathy, what is the primary therapeutic vascular response provoked by alternate hot (38°C) and cold (15°C) compress applications?',
      options: [
        'Derivation and revulsion (alternating vasodilation and vasoconstriction creating vascular pumping action)',
        'Permanent vascular spasm',
        'Total capillary obliteration',
        'Immediate local hypothermia'
      ],
      correctAnswer: 0,
      explanation: 'Alternating thermal hydrotherapy stimulates active hyperemia, lymph drainage, and accelerated removal of cellular metabolites through controlled vascular oscillation.',
      skillBoost: { skillName: 'Naturopathic Dietetics & Hydrotherapy', points: 9 }
    }
  ],

  unani_siddha: [
    {
      id: 'us-1',
      domainId: 'unani_siddha',
      category: 'Unani Mizaj Diagnosis',
      question: 'In Unani Tibb medicine, which foundational concept dictates individualized temperament assessment and health equilibrium?',
      options: [
        'Mizaj (equilibrium of Hot, Cold, Wet, and Dry qualities in bodily humors/Akhlat)',
        'Bacterial colony count only',
        'Synthetic chemical stoichiometry',
        'Genetic chromosome numbering'
      ],
      correctAnswer: 0,
      explanation: 'Mizaj (Temperament) is the core diagnostic principle of Unani medicine, formed by the interaction of the four humors (Dam, Balgham, Safra, Sauda) and four primary qualities.',
      skillBoost: { skillName: 'Mizaj Assessment & Unani Pharmacotherapy', points: 10 }
    },
    {
      id: 'us-2',
      domainId: 'unani_siddha',
      category: 'Siddha Medicine Fundamentals',
      question: 'In Siddha clinical system, diagnosis relies heavily on Envagai Thervu (eight-fold diagnostic examination). What does "Naadi" evaluate?',
      options: [
        'Vatham, Pitham, and Kabam pulse rhythm and qualitative flow',
        'Bone density through ultrasound',
        'Hair follicle count under microscope',
        'Dental enamel thickness'
      ],
      correctAnswer: 0,
      explanation: 'In Siddha Envagai Thervu, Naadi (pulse examination) performed at the radial artery reveals derangements in Vatham, Pitham, and Kabam to formulate precise therapeutic regimens.',
      skillBoost: { skillName: 'Siddha Gunapadam & Thathu Formulations', points: 9 }
    }
  ],

  homeopathy: [
    {
      id: 'hom-1',
      domainId: 'homeopathy',
      category: 'Pharmacopoeial Standards',
      question: 'Which official publication governs the purity, preparation methods, and testing standards for homeopathic medicines manufactured in India?',
      options: [
        'Homoeopathic Pharmacopoeia of India (HPI) published by Ministry of Ayush',
        'United States Commercial Almanac',
        'Manual Book of General Chemistry',
        'Cosmetic Act Handbook'
      ],
      correctAnswer: 0,
      explanation: 'The HPI is the statutory standard recognized under the Drugs and Cosmetics Act 1940, defining monographs for mother tinctures, potencies, and vehicles.',
      skillBoost: { skillName: 'HPI Standards & Mother Tincture QA', points: 10 }
    },
    {
      id: 'hom-2',
      domainId: 'homeopathy',
      category: 'Dynamization & Potentization',
      question: 'In the preparation of centesimal potencies according to the Organon of Medicine, what is the exact drug-to-vehicle dilution ratio per successive potency step?',
      options: [
        '1 part medicinal substance to 99 parts dispensing alcohol/vehicle',
        '1 part medicinal substance to 9 parts vehicle (decimal scale)',
        '50 parts substance to 50 parts water',
        'Equal parts without dilution'
      ],
      correctAnswer: 0,
      explanation: 'The Centesimal scale (C-potency) introduced by Dr. Samuel Hahnemann employs a 1:99 ratio with standardized succussion strokes at each progressive dilution stage.',
      skillBoost: { skillName: 'HPI Standards & Mother Tincture QA', points: 9 }
    }
  ],

  regulatory_ip: [
    {
      id: 'reg-1',
      domainId: 'regulatory_ip',
      category: 'TKDL & Patent Defense',
      question: 'What is the primary function of India’s Traditional Knowledge Digital Library (TKDL) established by CSIR and Ministry of Ayush?',
      options: [
        'Provide prior art documentation to global patent offices to prevent biopiracy and invalid patent claims on traditional medicinal knowledge',
        'Sell Ayush formulations in overseas supermarket stores',
        'Replace all registered doctors with computer software',
        'Archive expired physical textbooks only'
      ],
      correctAnswer: 0,
      explanation: 'TKDL translates classical slokas and formulations into searchable English, Japanese, French, German, and Spanish patent search databases to defeat wrongful biopiracy patents internationally.',
      skillBoost: { skillName: 'TKDL Documentation & Prior Art Defense', points: 10 }
    },
    {
      id: 'reg-2',
      domainId: 'regulatory_ip',
      category: 'National Biodiversity Act (NBA)',
      question: 'Under the Biological Diversity Act 2002, what compliance is mandatory for commercial manufacturers before accessing Indian biological resources for Ayush formulations?',
      options: [
        'Prior intimation or approval from State Biodiversity Boards (SBB) / National Biodiversity Authority (NBA) and Access and Benefit Sharing (ABS) compliance',
        'No notification or approval is ever required',
        'Only clearance from local municipality market inspector',
        'A written receipt from any retail farmer'
      ],
      correctAnswer: 0,
      explanation: 'The Biological Diversity Act mandates prior intimation/approval from SBB/NBA to ensure sustainable conservation and equitable sharing of benefits with local indigenous communities.',
      skillBoost: { skillName: 'Ayush Premium Mark & Export Regulations', points: 9 }
    }
  ]
};

// Intelligently select exactly 10 questions tailored to the student's selected domains
export function getTenQuestionsForDomains(selectedDomainIds = []) {
  const domains = Array.isArray(selectedDomainIds) && selectedDomainIds.length > 0 
    ? selectedDomainIds 
    : ['ayurveda', 'phytochemistry', 'herbal_tech'];

  let gatheredQuestions = [];
  
  // First, gather all questions matching selected domains
  domains.forEach(domainId => {
    const pool = DOMAIN_QUESTION_BANK[domainId];
    if (pool && pool.length > 0) {
      gatheredQuestions.push(...pool);
    }
  });

  // If gathered questions are less than 10, fill from general core domains
  if (gatheredQuestions.length < 10) {
    const fallbackDomains = ['ayurveda', 'phytochemistry', 'herbal_tech', 'tele_ayush', 'clinical_research'];
    fallbackDomains.forEach(fid => {
      if (!domains.includes(fid)) {
        const pool = DOMAIN_QUESTION_BANK[fid];
        if (pool) gatheredQuestions.push(...pool);
      }
    });
  }

  // If still not enough, take everything available
  if (gatheredQuestions.length < 10) {
    Object.values(DOMAIN_QUESTION_BANK).forEach(pool => {
      gatheredQuestions.push(...pool);
    });
  }

  // Remove duplicates by id
  const uniqueQuestions = Array.from(new Map(gatheredQuestions.map(q => [q.id, q])).values());

  // Intelligently distribute: try to select balanced questions from student's selected domains
  const selectedPerDomain = {};
  domains.forEach(d => { selectedPerDomain[d] = []; });
  const otherQuestions = [];

  uniqueQuestions.forEach(q => {
    if (domains.includes(q.domainId)) {
      selectedPerDomain[q.domainId].push(q);
    } else {
      otherQuestions.push(q);
    }
  });

  const finalQuestions = [];
  let roundIndex = 0;
  let addedAny = true;

  // Round-robin selection across student's domains to ensure fair representation
  while (finalQuestions.length < 10 && addedAny) {
    addedAny = false;
    for (const d of domains) {
      if (finalQuestions.length >= 10) break;
      const list = selectedPerDomain[d];
      if (list && list[roundIndex]) {
        finalQuestions.push(list[roundIndex]);
        addedAny = true;
      }
    }
    roundIndex++;
  }

  // If still less than 10, fill from remaining
  if (finalQuestions.length < 10) {
    for (const q of otherQuestions) {
      if (finalQuestions.length >= 10) break;
      if (!finalQuestions.some(item => item.id === q.id)) {
        finalQuestions.push(q);
      }
    }
  }

  // Slice exactly 10 questions
  return finalQuestions.slice(0, 10);
}

// Generate dynamic competencies for the student's profile & radar based on their domains
export function generateStudentSkillsFromDomains(selectedDomainIds = []) {
  const domains = Array.isArray(selectedDomainIds) && selectedDomainIds.length > 0 
    ? selectedDomainIds 
    : ['ayurveda', 'phytochemistry', 'herbal_tech'];

  const skills = [];
  domains.forEach(domainId => {
    const domainDef = AYUSH_DOMAINS.find(d => d.id === domainId);
    if (domainDef && domainDef.defaultSkills) {
      skills.push(...domainDef.defaultSkills);
    }
  });

  // Guarantee at least 4-6 skills for radar chart aesthetics
  if (skills.length < 5) {
    const coreDefault = [
      { name: 'Phytochemistry & QC Monograph Standards', category: 'Lab & QC', currentLevel: 50, requiredLevel: 85 },
      { name: 'Good Manufacturing Practice (Schedule T)', category: 'GMP & Compliance', currentLevel: 55, requiredLevel: 90 },
      { name: 'Tele-Ayush Systems & NAMASTE Coding', category: 'Digital Health', currentLevel: 45, requiredLevel: 80 }
    ];
    coreDefault.forEach(cs => {
      if (!skills.some(s => s.name === cs.name)) {
        skills.push(cs);
      }
    });
  }

  return skills.slice(0, 7);
}

// Generate recommended bridging courses tailored to the student's selected domains
export function generateRecommendedCoursesFromDomains(selectedDomainIds = []) {
  const domains = Array.isArray(selectedDomainIds) && selectedDomainIds.length > 0 
    ? selectedDomainIds 
    : ['ayurveda', 'phytochemistry'];

  const courseCatalog = {
    ayurveda: {
      title: 'Advanced Dravyaguna & Clinical Formulations',
      provider: 'National Institute of Ayurveda (NIA) & Swayam',
      progress: 0,
      score: 'Enroll Now'
    },
    phytochemistry: {
      title: 'HPTLC Fingerprinting & Phytochemical Standardization',
      provider: 'PCIMH & CSIR-CIMAP',
      progress: 0,
      score: 'Enroll Now'
    },
    herbal_tech: {
      title: 'Schedule T GMP Compliance & Industrial Herbal Scale-Up',
      provider: 'Ayush Skill Council of India',
      progress: 0,
      score: 'Enroll Now'
    },
    tele_ayush: {
      title: 'ABDM Interoperability, NAMASTE Portal & Tele-Ayush EHR',
      provider: 'Ministry of Ayush & CDAC',
      progress: 0,
      score: 'Enroll Now'
    },
    clinical_research: {
      title: 'Ayush Good Clinical Practice (GCP) & Trial Methodology',
      provider: 'CCRAS & ICMR',
      progress: 0,
      score: 'Enroll Now'
    },
    bio_analytics: {
      title: 'Quantitative HPLC & LC-MS/MS Bio-Analytics for Botanicals',
      provider: 'CSIR-IHBT & NABL Academy',
      progress: 0,
      score: 'Enroll Now'
    },
    yoga_naturopathy: {
      title: 'Evidence-Based Yoga Therapy for Non-Communicable Diseases',
      provider: 'MDNIY & S-VYASA University',
      progress: 0,
      score: 'Enroll Now'
    },
    unani_siddha: {
      title: 'Mizaj Analysis & Classical Siddha-Unani Pharmacognosy',
      provider: 'NIUM Bangalore & NIS Chennai',
      progress: 0,
      score: 'Enroll Now'
    },
    homeopathy: {
      title: 'HPI Standards, Mother Tinctures & Dynamization Protocols',
      provider: 'NIH Kolkata & CCRH',
      progress: 0,
      score: 'Enroll Now'
    },
    regulatory_ip: {
      title: 'TKDL Documentation, Biodiversity Act (NBA) & Patent Strategy',
      provider: 'CSIR-TKDL & National Law School',
      progress: 0,
      score: 'Enroll Now'
    }
  };

  const courses = [];
  domains.forEach(d => {
    if (courseCatalog[d]) courses.push(courseCatalog[d]);
  });

  if (courses.length === 0) {
    courses.push(courseCatalog.ayurveda, courseCatalog.phytochemistry);
  }

  return courses.slice(0, 4);
}

// Clean initial student profile creator with NO mock data
export function createFreshStudentProfile(user = {}) {
  const domains = Array.isArray(user.interestedDomains) && user.interestedDomains.length > 0 
    ? user.interestedDomains 
    : ['ayurveda', 'phytochemistry'];

  const studentName = user.name || user.full_name || (user.email ? user.email.split('@')[0] : 'Ayush Scholar');
  const college = user.college || user.institution || 'Ayush Medical College & Research Institute';
  const degree = user.degree || 'B.A.M.S. (Bachelor of Ayurvedic Medicine & Surgery)';

  return {
    id: user.id || `STD-${Date.now().toString().slice(-6)}`,
    name: studentName,
    email: user.email || '',
    phone: user.phone || '',
    location: user.location || '',
    institution: college,
    college: college,
    degree: degree,
    year: user.year || '3rd Year',
    qualifications: user.qualifications || 'Higher Secondary (10+2 PCB) / B.A.M.S.',
    whatDone: user.whatDone || '',
    interestedDomains: domains,
    avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email || studentName}`,
    bio: user.bio || `Student scholar specializing in ${domains.join(', ')}. Passionate about traditional Ayush principles and scientific validation.`,
    skillScore: 0, // Starts fresh at 0 until AI diagnostic quiz is completed!
    readinessIndex: 'Diagnostic Pending (Take AI Quiz)',
    skills: generateStudentSkillsFromDomains(domains),
    verifiedCertifications: [], // Starts clean, earned via AI Diagnostic assessment!
    completedCourses: generateRecommendedCoursesFromDomains(domains)
  };
}
