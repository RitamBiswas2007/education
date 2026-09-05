import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowLeft,
  Award, 
  BookOpen, 
  Briefcase, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Download, 
  ExternalLink, 
  FileText, 
  Filter, 
  GraduationCap, 
  Layers, 
  Play, 
  Radar as RadarIcon, 
  Share2, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  TrendingUp, 
  Zap,
  School,
  AlertCircle,
  HelpCircle,
  Building2,
  DollarSign,
  MapPin,
  Laptop,
  Check,
  Edit3,
  AlertTriangle,
  X,
  Compass,
  Star,
  CheckCheck
} from 'lucide-react';
import { 
  getTenQuestionsForDomains, 
  generateStudentSkillsFromDomains, 
  generateRecommendedCoursesFromDomains,
  AYUSH_DOMAINS 
} from '../data/ayushQuestionBank';
import AISkillDiscoveryBox from './AISkillDiscoveryBox';
import { MASTER_DOMAINS } from '../data/skillCareerEngine';

export default function StudentPortal({ 
  studentProfile, 
  setStudentProfile, 
  jobs, 
  onApplyJob, 
  applications 
}) {
  const [tabHistory, setTabHistory] = useState(['radar']); // navigation history stack
  const activeTab = tabHistory[tabHistory.length - 1];

  const navigateTo = (tab) => {
    setTabHistory(prev => [...prev, tab]);
  };

  const navigateBack = () => {
    setTabHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };
  
  // Dynamic 10-question AI Skill Diagnostic Quiz based strictly on student's domains
  const studentDomains = useMemo(() => {
    return Array.isArray(studentProfile?.interestedDomains) && studentProfile.interestedDomains.length > 0
      ? studentProfile.interestedDomains
      : ['ayurveda', 'phytochemistry'];
  }, [studentProfile?.interestedDomains]);

  // Generate the 10 questions tailored specifically to these domains and added skills
  const assessmentQuestions = useMemo(() => {
    return getTenQuestionsForDomains(studentDomains, studentProfile?.skills || []);
  }, [studentDomains, studentProfile?.skills]);

  // Assessment State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState(null);
  const [missedQuestions, setMissedQuestions] = useState([]);

  // Job Search Filters
  const [jobSearch, setJobSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');
  const [workModeFilter, setWorkModeFilter] = useState('All');

  // Student Job & Internship Career Preferences
  const [jobPreferences, setJobPreferences] = useState(() => {
    return studentProfile?.jobPreferences || {
      targetRole: 'AI Health Informatics Specialist',
      domain: 'ai_healthtech',
      workMode: 'Hybrid',
      expectedSalary: '₹45,000 / month',
      preferredLocation: 'Bengaluru / Hybrid'
    };
  });
  const [isEditingPreferences, setIsEditingPreferences] = useState(false);
  const [prefForm, setPrefForm] = useState({ ...jobPreferences });
  const [prefSavedToast, setPrefSavedToast] = useState(false);

  useEffect(() => {
    if (studentProfile?.jobPreferences) {
      setJobPreferences(studentProfile.jobPreferences);
      setPrefForm(studentProfile.jobPreferences);
    }
  }, [studentProfile?.jobPreferences]);

  const handleSavePreferences = (e) => {
    if (e) e.preventDefault();
    setJobPreferences(prefForm);
    setStudentProfile(prev => ({
      ...prev,
      jobPreferences: prefForm
    }));
    if (prefForm.domain) {
      setDomainFilter(prefForm.domain);
    }
    setIsEditingPreferences(false);
    setPrefSavedToast(true);
    setTimeout(() => setPrefSavedToast(false), 3000);
  };

  // Handle skill/domain updates from AI Skill Discovery Box
  const handleUpdateProfileSkills = (newDomains, newSkillName, skillObj, explicitSkillsList = null) => {
    setStudentProfile(prev => {
      let updatedSkills = [];

      if (explicitSkillsList) {
        updatedSkills = explicitSkillsList;
      } else {
        const existingSkills = Array.isArray(prev.skills) ? [...prev.skills] : [];
        updatedSkills = [...existingSkills];

        if (newSkillName) {
          const existingIdx = updatedSkills.findIndex(s => 
            (typeof s === 'string' ? s : s.name).toLowerCase() === newSkillName.toLowerCase()
          );
          if (existingIdx === -1) {
            updatedSkills.unshift({
              name: newSkillName,
              category: skillObj?.category || 'Focus Skill',
              currentLevel: 55,
              requiredLevel: 90
            });
          }
        }

        const domainSkills = generateStudentSkillsFromDomains(newDomains);
        domainSkills.forEach(ds => {
          if (!updatedSkills.some(s => (typeof s === 'string' ? s : s.name).toLowerCase() === ds.name.toLowerCase())) {
            updatedSkills.push(ds);
          }
        });
      }

      // Reset quiz so student gets the fresh 10 questions based on their updated skills and domains
      setQuizIndex(0);
      setSelectedAnswer(null);
      setQuizScore(0);
      setMissedQuestions([]);
      setQuizCompleted(false);
      setQuizFeedback(null);

      return {
        ...prev,
        interestedDomains: newDomains,
        skills: updatedSkills.slice(0, 10),
        completedCourses: generateRecommendedCoursesFromDomains(newDomains)
      };
    });
  };

  const currentQ = assessmentQuestions[quizIndex] || assessmentQuestions[0];

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null || !currentQ) return;

    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    const newScore = isCorrect ? quizScore + 1 : quizScore;

    if (isCorrect) {
      setQuizScore(newScore);
      // Update student skills live based on question's skillBoost
      if (currentQ.skillBoost && Array.isArray(studentProfile.skills)) {
        const updatedSkills = studentProfile.skills.map(s => {
          if (s.name.toLowerCase().includes(currentQ.skillBoost.skillName.toLowerCase()) || 
              currentQ.skillBoost.skillName.toLowerCase().includes(s.category.toLowerCase())) {
            return { ...s, currentLevel: Math.min(100, s.currentLevel + currentQ.skillBoost.points) };
          }
          return s;
        });
        setStudentProfile(prev => ({
          ...prev,
          skills: updatedSkills
        }));
      }
      setQuizFeedback({ 
        type: 'success', 
        text: `Correct! Boosted ${currentQ.skillBoost?.skillName || 'competency'} rating.`,
        explanation: currentQ.explanation
      });
    } else {
      setMissedQuestions(prev => [
        ...prev,
        {
          question: currentQ.question,
          category: currentQ.category,
          userAnswer: currentQ.options[selectedAnswer],
          correctAnswer: currentQ.options[currentQ.correctAnswer],
          explanation: currentQ.explanation,
          skillBoost: currentQ.skillBoost
        }
      ]);
      setQuizFeedback({ 
        type: 'error', 
        text: `Incorrect. Correct answer: ${currentQ.options[currentQ.correctAnswer]}`,
        explanation: currentQ.explanation
      });
    }

    setTimeout(() => {
      setQuizFeedback(null);
      setSelectedAnswer(null);
      if (quizIndex + 1 < assessmentQuestions.length) {
        setQuizIndex(quizIndex + 1);
      } else {
        // Quiz completed! Calculate final metrics and award credential
        const finalCalculatedScore = Math.round((newScore / assessmentQuestions.length) * 100);
        const readinessRating = newScore >= 8 
          ? "High (Ready for Industry Placement)"
          : newScore >= 6 
            ? "Moderate (Placement Eligible)"
            : "Foundational (Bridging Required)";

        const newCertificate = {
          title: `Ayush Diagnostic Competency Certificate`,
          issuer: "Ministry of Ayush National Assessment Board",
          date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
          id: `AYUSH-EVAL-${Date.now().toString().slice(-6)}`,
          score: `${finalCalculatedScore}% (${newScore}/10)`,
          domains: studentDomains.map(d => {
            const dom = AYUSH_DOMAINS.find(item => item.id === d) || MASTER_DOMAINS.find(item => item.id === d);
            return dom ? dom.name.split('&')[0].trim() : d;
          }).join(', ')
        };

        setStudentProfile(prev => {
          const existingCerts = Array.isArray(prev.verifiedCertifications) ? prev.verifiedCertifications : [];
          return {
            ...prev,
            skillScore: finalCalculatedScore,
            readinessIndex: readinessRating,
            verifiedCertifications: [newCertificate, ...existingCerts.filter(c => c.id !== newCertificate.id)]
          };
        });

        setQuizCompleted(true);
      }
    }, 1800);
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setMissedQuestions([]);
    setQuizCompleted(false);
    setQuizFeedback(null);
  };

  // Grade and Quality Evaluation for Job Placement
  const gradeInfo = useMemo(() => {
    if (quizScore >= 9) return { 
      grade: 'A+', 
      title: 'Elite Industry Ready', 
      color: 'emerald', 
      badgeClass: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      summary: 'Exceptional mastery across specialized clinical algorithms, pharmacopoeial compliance, and computational frameworks.',
      hiringStatus: 'Top 5% Candidate Pool • Fast-track eligible for High-Tier Stipends & Corporate R&D Roles'
    };
    if (quizScore >= 8) return { 
      grade: 'A', 
      title: 'Industry Ready', 
      color: 'teal', 
      badgeClass: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
      summary: 'Strong grasp of core scientific & regulatory guidelines with solid analytical problem-solving capability in chosen domains.',
      hiringStatus: 'Fully Qualified for Direct Internship Placement & Graduate Trainee Positions'
    };
    if (quizScore >= 6) return { 
      grade: 'B', 
      title: 'Placement Eligible (Bridging Recommended)', 
      color: 'cyan', 
      badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      summary: 'Solid foundational baseline, but demonstrates gaps in advanced technical and clinical standardization competencies.',
      hiringStatus: 'Eligible for Developmental Internships • Complete 1-2 Recommended Bridge Modules to Boost Hiring Match'
    };
    if (quizScore >= 4) return { 
      grade: 'C', 
      title: 'Foundational (Domain Bridging Needed)', 
      color: 'amber', 
      badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      summary: 'Basic conceptual awareness, but notable skill gaps exist in applied real-world methodologies and compliance standards.',
      hiringStatus: 'Skill Enhancement Required Before Live Employer Interviews • Focus on Identified Gap Areas'
    };
    return { 
      grade: 'D', 
      title: 'Remediation Required', 
      color: 'rose', 
      badgeClass: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      summary: 'Critical skill gaps detected across tested domains. Immediate guided remediation suggested before recruiter assessment.',
      hiringStatus: 'Not Yet Placement-Ready • Recommended Retaking Assessment After Module Completion'
    };
  }, [quizScore]);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
                          job.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
                          job.description.toLowerCase().includes(jobSearch.toLowerCase());
    const matchesDomain = domainFilter === 'All' || 
                          job.domainId === domainFilter || 
                          job.domain === domainFilter ||
                          (domainFilter && job.domain.toLowerCase().includes(domainFilter.toLowerCase()));
    const matchesMode = workModeFilter === 'All' || job.mode === workModeFilter;
    return matchesSearch && matchesDomain && matchesMode;
  });

  // Calculate polygon points for competency radar dynamically based on student's actual skills
  const studentSkillsList = Array.isArray(studentProfile.skills) ? studentProfile.skills : [];
  const radarPoints = useMemo(() => {
    if (studentSkillsList.length === 0) return "100,100";
    const total = studentSkillsList.length;
    return studentSkillsList.map((skill, i) => {
      const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
      const radius = 20 + (skill.currentLevel / 100) * 65; // radius between 20 and 85
      const x = Math.round(100 + radius * Math.cos(angle));
      const y = Math.round(100 + radius * Math.sin(angle));
      return `${x},${y}`;
    }).join(' ');
  }, [studentSkillsList]);

  return (
    <div className="space-y-6">
      {/* Student Banner Header */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <img 
              src={studentProfile.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${studentProfile.email || 'student'}`} 
              alt={studentProfile.name} 
              className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400/40 shadow-lg shadow-emerald-950/40 shrink-0" 
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold text-white">{studentProfile.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-ayush flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{studentProfile.skillScore > 0 ? 'Diagnostic Assessed' : 'Scholar Workspace'}</span>
                </span>
                {studentProfile.year && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                    {studentProfile.year}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-slate-300 text-sm mt-0.5">
                {studentProfile.degree ? (
                  <strong className="text-white font-semibold">{studentProfile.degree}</strong>
                ) : (
                  <span className="text-amber-400 font-medium">Degree: Pending Selection</span>
                )}
                <span className="text-slate-500">•</span>
                {studentProfile.college || studentProfile.institution ? (
                  <span className="text-slate-200">{studentProfile.college || studentProfile.institution}</span>
                ) : (
                  <span className="text-amber-400 font-medium">College: Pending Verification</span>
                )}
                {studentProfile.academicVerified && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>AI Verified</span>
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-xs mt-1.5 max-w-xl line-clamp-2">
                {studentProfile.bio || 'Student scholar specializing in evidence-based scientific research and clinical excellence.'}
              </p>

              {/* Student Domains Pills */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {studentDomains.map(dId => {
                  const dObj = MASTER_DOMAINS.find(item => item.id === dId) || AYUSH_DOMAINS.find(item => item.id === dId);
                  return (
                    <span key={dId} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                      <span>{dObj?.icon || '🌿'}</span>
                      <span>{dObj?.name ? dObj.name.split('&')[0].trim() : dId}</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-xs text-slate-400 block">Diagnostic Score</span>
              <span className="text-2xl font-extrabold gradient-text-ayush">
                {studentProfile.skillScore > 0 ? `${studentProfile.skillScore}/100` : 'Pending'}
              </span>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-xs text-slate-400 block">Industry Readiness</span>
              <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>{studentProfile.readinessIndex ? studentProfile.readinessIndex.split(' ')[0] : 'Diagnostic Req.'}</span>
              </span>
            </div>
            <div className="text-center px-3">
              <span className="text-xs text-slate-400 block">Active Applications</span>
              <span className="text-2xl font-bold text-cyan-400">{applications.length}</span>
            </div>
          </div>
        </div>

        {/* Quick Career & Internship Preferences Summary Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-cyan-400" /> Target Career:
            </span>
            <span className="font-bold text-white bg-slate-800/90 px-2.5 py-0.5 rounded-lg border border-slate-700">
              {jobPreferences.targetRole}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-medium">Domain:</span>
            <span className="font-semibold text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/30">
              {MASTER_DOMAINS.find(d => d.id === jobPreferences.domain)?.name.split('&')[0] || jobPreferences.domain}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-medium">Mode:</span>
            <span className={`font-semibold px-2 py-0.5 rounded-md text-[11px] border ${
              jobPreferences.workMode === 'Remote' ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' :
              jobPreferences.workMode === 'Hybrid' ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30' :
              'bg-amber-500/10 text-amber-300 border-amber-500/30'
            }`}>
              {jobPreferences.workMode}
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-medium">Target Salary:</span>
            <span className="font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/30">
              {jobPreferences.expectedSalary}
            </span>
          </div>

          <button
            onClick={() => {
              navigateTo('jobs');
              setIsEditingPreferences(true);
            }}
            className="text-cyan-400 hover:text-cyan-300 font-bold text-xs flex items-center gap-1.5 hover:underline cursor-pointer ml-auto"
          >
            <Edit3 className="w-3.5 h-3.5" /> Edit Preferences
          </button>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800/80">
          {/* Back Button — shown when not on default tab */}
          {tabHistory.length > 1 && (
            <button
              onClick={navigateBack}
              className="px-3 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 shadow-sm group cursor-pointer"
              title="Go back to previous section"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back
            </button>
          )}
          <button
            onClick={() => navigateTo('radar')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'radar' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <RadarIcon className="w-4 h-4" /> Skill Gap & Competency Radar
          </button>
          <button
            onClick={() => navigateTo('assessment')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'assessment' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" /> AI Skill Diagnostic Quiz (10 MCQs)
          </button>
          <button
            onClick={() => navigateTo('jobs')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'jobs' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Internship Opportunities ({filteredJobs.length})
          </button>
          <button
            onClick={() => navigateTo('portfolio')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'portfolio' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-4 h-4 text-cyan-400" /> Verified Skill Passport
          </button>
        </div>
      </div>

      {/* AI Skill-to-Career & Domain Discovery Box */}
      <AISkillDiscoveryBox
        studentProfile={studentProfile}
        onUpdateProfileSkills={handleUpdateProfileSkills}
      />

      {/* TAB 1: SKILL GAP RADAR & DIAGNOSTICS */}
      {activeTab === 'radar' && (
        <div className="space-y-6">
          {/* Diagnostic Prompt Banner if score is 0 */}
          {studentProfile.skillScore === 0 && (
            <div className="glass-card rounded-2xl p-5 border border-amber-500/40 bg-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
                  <Sparkles className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">AI Skill Diagnostic Quiz Ready</h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    10 customized multiple-choice questions arranged for your selected domains ({studentDomains.join(', ')}). 
                    Take the assessment to compute your verified competency score!
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigateTo('assessment')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Start 10-MCQ Diagnostic</span>
              </button>
            </div>
          )}

          {/* Student "What I Have Done" Experience Card (if filled) */}
          {studentProfile.whatDone && (
            <div className="glass-panel rounded-2xl p-6 border border-emerald-500/30 bg-emerald-950/10">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-300 mb-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>What I Have Done (Clinical Exposure & Projects)</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                {studentProfile.whatDone}
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Competency Progress Bars */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-panel rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Target className="w-5 h-5 text-emerald-400" /> Domain Competency vs. Industry Standard
                    </h3>
                    <p className="text-slate-400 text-xs mt-1">
                      Mapped specifically to your chosen Ayush disciplines: {studentDomains.join(', ')}
                    </p>
                  </div>
                  <button 
                    onClick={() => navigateTo('assessment')}
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" /> Take Skill Diagnostic
                  </button>
                </div>

                <div className="space-y-4">
                  {studentSkillsList.map((skill, index) => {
                    const gap = skill.requiredLevel - skill.currentLevel;
                    const isMet = gap <= 0;
                    return (
                      <div key={index} className="space-y-2 p-3.5 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700 transition-all">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-200 text-xs sm:text-sm">{skill.name}</span>
                            <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-800 text-slate-400 border border-slate-700 hidden sm:inline">
                              {skill.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-slate-400">Current: <strong className="text-emerald-400">{skill.currentLevel}%</strong></span>
                            <span className="text-slate-400">Target: <strong className="text-cyan-400">{skill.requiredLevel}%</strong></span>
                            <span className={`px-2 py-0.5 rounded font-medium text-[11px] ${isMet ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                              {isMet ? 'Aligned' : `Gap: -${gap}%`}
                            </span>
                          </div>
                        </div>

                        {/* Dual Layer Progress Bar */}
                        <div className="relative w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
                          {/* Target Marker */}
                          <div 
                            className="absolute top-0 bottom-0 bg-cyan-500/30 rounded-full" 
                            style={{ width: `${skill.requiredLevel}%` }}
                          ></div>
                          {/* Current Level */}
                          <div 
                            className="absolute top-0 bottom-0 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" 
                            style={{ width: `${skill.currentLevel}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Course Recommendations tailored to domains */}
              <div className="glass-panel rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-cyan-400" /> Recommended Bridge Modules for Your Domains
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(studentProfile.completedCourses || []).map((course, idx) => (
                    <div key={idx} className="glass-card rounded-xl p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                          <span>{course.provider}</span>
                          <span className="text-emerald-400 font-semibold">{course.score}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white line-clamp-2">{course.title}</h4>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                        <div className="w-2/3 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${course.progress || 10}%` }}></div>
                        </div>
                        <button 
                          onClick={() => alert(`Enrolling in: ${course.title}`)}
                          className="text-xs text-emerald-400 font-medium hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          Access <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Interactive Visual Skill Radar */}
            <div className="space-y-6">
              <div className="glass-panel rounded-2xl p-6 text-center">
                <h3 className="text-md font-bold text-white flex items-center justify-center gap-2 mb-2">
                  <RadarIcon className="w-4 h-4 text-emerald-400" /> Competency Radar
                </h3>
                <p className="text-slate-400 text-xs mb-4">Multi-dimensional view of your selected domain proficiencies</p>

                {/* Dynamic SVG Radar Chart */}
                <div className="relative w-64 h-64 mx-auto my-4 flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Concentric Hexagons */}
                    <polygon points="100,20 170,60 170,140 100,180 30,140 30,60" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <polygon points="100,45 147,72 147,127 100,155 53,127 53,72" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    <polygon points="100,70 125,85 125,115 100,130 75,115 75,85" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                    
                    {/* Axis Lines */}
                    <line x1="100" y1="100" x2="100" y2="20" stroke="rgba(255,255,255,0.1)" />
                    <line x1="100" y1="100" x2="170" y2="60" stroke="rgba(255,255,255,0.1)" />
                    <line x1="100" y1="100" x2="170" y2="140" stroke="rgba(255,255,255,0.1)" />
                    <line x1="100" y1="100" x2="100" y2="180" stroke="rgba(255,255,255,0.1)" />
                    <line x1="100" y1="100" x2="30" y2="140" stroke="rgba(255,255,255,0.1)" />
                    <line x1="100" y1="100" x2="30" y2="60" stroke="rgba(255,255,255,0.1)" />

                    {/* Target Standard Polygon */}
                    <polygon points="100,24 163,64 163,136 100,172 37,136 37,64" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3,3" />

                    {/* Student Dynamic Score Polygon */}
                    <polygon points={radarPoints} fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="2.5" className="transition-all duration-700" />
                  </svg>

                  <div className="absolute bottom-1 right-1 text-[10px] text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1"></span> You
                    <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 mr-1 ml-2"></span> Target Standard
                  </div>
                </div>

                <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800 text-xs text-slate-300">
                  💡 <strong>AI Guidance:</strong> Complete the 10-question diagnostic assessment to boost your verified ranking and unlock top internship matches.
                </div>
              </div>

              {/* Quick Action Badge */}
              <div className="glass-panel-glow rounded-2xl p-6 text-center">
                <Award className="w-10 h-10 text-amber-400 mx-auto mb-2 animate-bounce" />
                <h4 className="font-bold text-white text-md">Verified Ayush Skill Passport</h4>
                <p className="text-slate-400 text-xs mt-1">Cryptographic verifiable credential for recruiters & institutions</p>
                <button 
                  onClick={() => navigateTo('portfolio')}
                  className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" /> View Digital Passport
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI SKILL DIAGNOSTIC QUIZ (10 MCQs ARRANGED BY STUDENT DOMAINS) */}
      {activeTab === 'assessment' && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <button
              onClick={navigateBack}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Skill Radar
            </button>

            {/* Domain & Skill tags being assessed */}
            <div className="flex flex-wrap items-center gap-1.5 justify-end">
              <span className="text-[11px] text-slate-400 hidden sm:inline font-medium">Assessing Disciplines:</span>
              {studentDomains.map(dId => {
                const domObj = MASTER_DOMAINS.find(d => d.id === dId) || AYUSH_DOMAINS.find(d => d.id === dId);
                return (
                  <span key={dId} className="px-2.5 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                    <span>{domObj?.icon || '⭐'}</span>
                    <span>{domObj?.badge || dId}</span>
                  </span>
                );
              })}
            </div>
          </div>

          {/* Target Job & Placement Preferences Form / Card */}
          <div className="glass-card rounded-2xl p-5 border border-cyan-500/30 bg-cyan-950/20 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                  <Target className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>Your Career & Job Target Preferences</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-normal">
                      Recruiter Scoring Benchmark
                    </span>
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Diagnostic assessment and quality grading evaluate you against this specific job role & salary expectation
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditingPreferences(!isEditingPreferences)}
                className="px-3 py-1 rounded-xl text-xs font-bold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 flex items-center gap-1.5 transition-all self-start sm:self-auto cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingPreferences ? 'Hide Editor' : 'Edit Target & Salary'}</span>
              </button>
            </div>

            {!isEditingPreferences ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Target Job Role</span>
                  <strong className="text-white text-xs line-clamp-1">{jobPreferences.targetRole}</strong>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Internship Domain</span>
                  <strong className="text-emerald-300 text-xs line-clamp-1">
                    {MASTER_DOMAINS.find(d => d.id === jobPreferences.domain)?.name.split('&')[0] || jobPreferences.domain}
                  </strong>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Work Mode</span>
                  <span className={`inline-block px-2 py-0.5 rounded font-bold text-[11px] ${
                    jobPreferences.workMode === 'Remote' ? 'bg-emerald-500/20 text-emerald-300' :
                    jobPreferences.workMode === 'Hybrid' ? 'bg-cyan-500/20 text-cyan-300' :
                    'bg-amber-500/20 text-amber-300'
                  }`}>
                    {jobPreferences.workMode}
                  </span>
                </div>
                <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Expected Salary / Stipend</span>
                  <strong className="text-amber-300 text-xs font-mono">{jobPreferences.expectedSalary}</strong>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSavePreferences} className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Target Job Role You Want</label>
                    <input
                      type="text"
                      value={prefForm.targetRole}
                      onChange={e => setPrefForm(prev => ({ ...prev, targetRole: e.target.value }))}
                      placeholder="e.g. AI Health Informatics Specialist"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                      required
                    />
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {['AI Health Informatics', 'Phytochemistry R&D', 'Clinical Research Associate', 'Data Analyst - Ayush', 'Tele-Ayush Engineer'].map(sugg => (
                        <button
                          type="button"
                          key={sugg}
                          onClick={() => setPrefForm(prev => ({ ...prev, targetRole: sugg }))}
                          className="text-[10px] px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 cursor-pointer"
                        >
                          + {sugg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Internship Focus Domain</label>
                    <select
                      value={prefForm.domain}
                      onChange={e => setPrefForm(prev => ({ ...prev, domain: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      {MASTER_DOMAINS.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.icon} {d.name} ({d.badge})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Preferred Work Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Remote', 'Hybrid', 'On-site'].map(mode => (
                        <button
                          type="button"
                          key={mode}
                          onClick={() => setPrefForm(prev => ({ ...prev, workMode: mode }))}
                          className={`py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                            prefForm.workMode === mode 
                              ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-extrabold shadow-sm' 
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Expected Salary / Stipend (Written)</label>
                    <input
                      type="text"
                      value={prefForm.expectedSalary}
                      onChange={e => setPrefForm(prev => ({ ...prev, expectedSalary: e.target.value }))}
                      placeholder="e.g. ₹45,000 / month (Stipend)"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                      required
                    />
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {['₹30,000 / month', '₹45,000 / month', '₹60,000 / month', '₹6.5 - 9 LPA'].map(sal => (
                        <button
                          type="button"
                          key={sal}
                          onClick={() => setPrefForm(prev => ({ ...prev, expectedSalary: sal }))}
                          className="text-[10px] px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 cursor-pointer"
                        >
                          {sal}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-cyan-500/20">
                  <button
                    type="button"
                    onClick={() => setIsEditingPreferences(false)}
                    className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Check className="w-3.5 h-3.5" /> Save Career Preferences
                  </button>
                </div>
              </form>
            )}

            {prefSavedToast && (
              <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Preferences saved! Test grading and matching internships are aligned.
              </div>
            )}
          </div>

          {!quizCompleted ? (
            <div>
              {/* Progress & Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                      Question {quizIndex + 1} of {assessmentQuestions.length} (10-MCQ Diagnostic)
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {currentQ.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                    {currentQ.category} Competency Evaluation
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">Current Score</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                    {quizScore} / {quizIndex}
                  </span>
                </div>
              </div>

              {/* Question Text */}
              <p className="text-slate-100 text-sm sm:text-base font-medium mb-6 leading-relaxed">
                {currentQ.question}
              </p>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAnswer(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer ${
                      selectedAnswer === idx 
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-950' 
                        : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <span className="leading-relaxed">{opt}</span>
                    {selectedAnswer === idx && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 ml-2" />}
                  </button>
                ))}
              </div>

              {/* Feedback Alert with Explanation */}
              {quizFeedback && (
                <div className={`p-4 rounded-xl mb-4 text-xs font-semibold space-y-1 ${
                  quizFeedback.type === 'success' 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 shrink-0" />
                    <span>{quizFeedback.text}</span>
                  </div>
                  {quizFeedback.explanation && (
                    <p className="text-[11px] text-slate-300 font-normal pt-1 border-t border-slate-800/60 leading-relaxed">
                      💡 <strong>Clinical / Pharmacopoeial Reference:</strong> {quizFeedback.explanation}
                    </p>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold text-sm hover:brightness-110 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{quizIndex + 1 === assessmentQuestions.length ? 'Submit Final Answer & Generate Job Readiness Grade' : 'Submit Answer & Next Question'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* COMPLETED TEST: JOB READINESS ASSESSMENT & QUALITY GRADING */
            <div className="space-y-6 pt-2">
              {/* Grade Header Card */}
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 to-slate-900/60 relative overflow-hidden text-center">
                <div className="absolute top-0 right-1/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>AI Diagnostic Competency & Job Quality Report</span>
                </div>

                {/* Big Letter Grade Display */}
                <div className="flex flex-col items-center justify-center my-4">
                  <div className="relative w-28 h-28 rounded-3xl bg-slate-900/90 border-2 border-emerald-400 flex flex-col items-center justify-center shadow-xl shadow-emerald-950/60">
                    <span className="text-4xl sm:text-5xl font-black gradient-text-ayush">
                      {gradeInfo.grade}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mt-0.5">
                      Grade
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-3">{gradeInfo.title}</h3>
                  <p className="text-xs text-slate-300 max-w-xl mx-auto mt-1 leading-relaxed">
                    {gradeInfo.summary}
                  </p>
                </div>

                {/* Score & Evaluation Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mt-6 text-left">
                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-0.5">Diagnostic Score</span>
                    <strong className="text-lg font-bold text-emerald-400 font-mono">
                      {quizScore} / {assessmentQuestions.length} ({Math.round((quizScore / assessmentQuestions.length) * 100)}%)
                    </strong>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-0.5">Target Job Role</span>
                    <strong className="text-xs font-bold text-white line-clamp-1">
                      {jobPreferences.targetRole}
                    </strong>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-0.5">Mode Alignment</span>
                    <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {jobPreferences.workMode} Ready
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 block mb-0.5">Target Salary</span>
                    <strong className="text-xs font-bold text-amber-300 font-mono">
                      {jobPreferences.expectedSalary}
                    </strong>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 max-w-2xl mx-auto text-xs text-slate-300 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span><strong>Recruiter Outlook:</strong> {gradeInfo.hiringStatus}</span>
                </div>
              </div>

              {/* Quality Improvement Section: What the student needs to improve to get hired */}
              <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
                <div className="flex items-center gap-2.5 pb-3 border-b border-slate-800">
                  <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <h4 className="text-base font-bold text-white">
                      Quality Assessment: Competencies to Improve for Landing Your Target Job
                    </h4>
                    <p className="text-xs text-slate-400">
                      Evaluation based on your answers and recruiters' quality requirements for {jobPreferences.targetRole}
                    </p>
                  </div>
                </div>

                {/* Missed Questions Breakdown */}
                {missedQuestions.length > 0 ? (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Identified Skill Gaps from Assessment ({missedQuestions.length} Areas Requiring Improvement):</span>
                    </div>

                    <div className="space-y-3">
                      {missedQuestions.map((mq, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-amber-500/30 space-y-2 text-xs">
                          <div className="flex items-start justify-between gap-2">
                            <span className="font-bold text-white leading-relaxed">
                              {idx + 1}. {mq.question}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-500/20 text-amber-300 shrink-0 border border-amber-500/30">
                              {mq.category}
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800">
                            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300">
                              <span className="text-[10px] text-slate-400 block font-semibold">Your Answer:</span>
                              <span>{mq.userAnswer}</span>
                            </div>
                            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                              <span className="text-[10px] text-slate-400 block font-semibold">Industry Correct Standard:</span>
                              <span>{mq.correctAnswer}</span>
                            </div>
                          </div>

                          {mq.explanation && (
                            <p className="text-[11px] text-slate-300 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800 leading-relaxed">
                              💡 <strong>Recruiter Quality Requirement:</strong> {mq.explanation}
                            </p>
                          )}

                          <div className="text-[11px] text-cyan-400 font-medium flex items-center gap-1 pt-1">
                            <span>Target Competency Needed:</span>
                            <strong className="text-white underline">{mq.skillBoost?.skillName || mq.category}</strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    <div>
                      <strong className="block text-sm text-white">Flawless Diagnostic Quality (10/10)!</strong>
                      <span>Zero critical skill gaps detected. You exceed recruiter baseline requirements for {jobPreferences.targetRole} and are directly eligible for top-tier stipends ({jobPreferences.expectedSalary}).</span>
                    </div>
                  </div>
                )}

                {/* 4-Pillar Quality Standards for Landing Job */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> Domain Theory & Standards
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${quizScore >= 8 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                        {quizScore >= 8 ? 'Meets Bar' : 'Gap Detected'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Familiarity with standardized regulatory frameworks (Ayush Grid, GCP, Pharmacopoeial markers).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-200 flex items-center gap-1.5">
                        <Laptop className="w-3.5 h-3.5 text-emerald-400" /> Placement Mode Readiness
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                        {jobPreferences.workMode} Ready
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Ability to execute asynchronous analysis, clinical trial documentation, and remote collaboration.
                    </p>
                  </div>
                </div>

                {/* Quality Improvement Roadmap */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs space-y-2">
                  <h5 className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" /> 3-Step Action Plan to Reach 100% Hiring Readiness:
                  </h5>
                  <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                    <li>Review the recommended modules under <strong className="text-white">Skill Gap & Competency Radar</strong>.</li>
                    <li>Retake the diagnostic to boost your score from <strong className="text-emerald-400">{quizScore}/10</strong> to <strong className="text-cyan-300">10/10 (Grade A+)</strong>.</li>
                    <li>Apply directly to matching corporate internships in <strong className="text-white">{jobPreferences.domain}</strong> below.</li>
                  </ol>
                </div>
              </div>

              {/* Call-to-action buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setDomainFilter(jobPreferences.domain);
                    navigateTo('jobs');
                  }}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-extrabold text-xs sm:text-sm hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
                >
                  <Briefcase className="w-4 h-4" />
                  <span>View Matching Internships for {jobPreferences.targetRole} ({filteredJobs.length} Available)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('radar')}
                  className="px-5 py-3 rounded-xl bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 font-bold text-xs transition-all border border-slate-700 cursor-pointer flex items-center gap-1.5"
                >
                  <RadarIcon className="w-4 h-4 text-emerald-400" /> View Competency Radar
                </button>

                <button
                  onClick={restartQuiz}
                  className="px-5 py-3 rounded-xl bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 font-semibold text-xs transition-all border border-slate-800 cursor-pointer"
                >
                  Retake Diagnostic Quiz
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: INTERNSHIPS & OPPORTUNITIES */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <button
              onClick={navigateBack}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Skill Radar
            </button>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>Showing</span>
              <strong className="text-emerald-400 font-mono text-sm">{filteredJobs.length}</strong>
              <span>Verified Corporate Opportunities</span>
            </div>
          </div>

          {/* Student Career & Internship Preferences Panel */}
          <div className="glass-panel-glow rounded-2xl p-6 border border-emerald-500/30 relative overflow-hidden space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold shrink-0 border border-emerald-500/40">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-white">Your Internship & Career Preferences</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Live Matching
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Internship opportunities below are filtered and ranked according to your selected domain, work mode, and salary expectations.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsEditingPreferences(!isEditingPreferences)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 flex items-center gap-1.5 transition-all self-start md:self-auto cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingPreferences ? 'Close Editor' : 'Edit Career Preferences'}</span>
              </button>
            </div>

            {/* Read-only preference summary */}
            {!isEditingPreferences ? (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs">
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Target Job Role</span>
                  <strong className="text-white text-xs block truncate">{jobPreferences.targetRole}</strong>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Internship Domain</span>
                  <strong className="text-emerald-300 text-xs block truncate">
                    {MASTER_DOMAINS.find(d => d.id === jobPreferences.domain)?.name.split('&')[0] || jobPreferences.domain}
                  </strong>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Work Mode</span>
                  <span className={`inline-block px-2.5 py-0.5 rounded font-bold text-[11px] ${
                    jobPreferences.workMode === 'Remote' ? 'bg-emerald-500/20 text-emerald-300' :
                    jobPreferences.workMode === 'Hybrid' ? 'bg-cyan-500/20 text-cyan-300' :
                    'bg-amber-500/20 text-amber-300'
                  }`}>
                    {jobPreferences.workMode}
                  </span>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                  <span className="text-[10px] text-slate-400 block mb-1">Expected Salary</span>
                  <strong className="text-amber-300 text-xs font-mono block truncate">{jobPreferences.expectedSalary}</strong>
                </div>

                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 col-span-2 md:col-span-1">
                  <span className="text-[10px] text-slate-400 block mb-1">Preferred Location</span>
                  <strong className="text-slate-200 text-xs block truncate">{jobPreferences.preferredLocation || 'Pan-India'}</strong>
                </div>
              </div>
            ) : (
              /* Inline Preferences Form */
              <form onSubmit={handleSavePreferences} className="space-y-4 pt-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Target Job Role</label>
                    <input
                      type="text"
                      value={prefForm.targetRole}
                      onChange={e => setPrefForm(prev => ({ ...prev, targetRole: e.target.value }))}
                      placeholder="e.g. AI Health Informatics Specialist"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {['AI Health Informatics', 'Phytochemistry R&D', 'Clinical Research', 'Data Analyst', 'Tele-Ayush'].map(sugg => (
                        <button
                          type="button"
                          key={sugg}
                          onClick={() => setPrefForm(prev => ({ ...prev, targetRole: sugg }))}
                          className="text-[10px] px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 cursor-pointer"
                        >
                          + {sugg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Internship Domain / Category</label>
                    <select
                      value={prefForm.domain}
                      onChange={e => setPrefForm(prev => ({ ...prev, domain: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500 cursor-pointer"
                    >
                      {MASTER_DOMAINS.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.icon} {d.name} ({d.badge})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Work Mode</label>
                    <div className="grid grid-cols-3 gap-2">
                      {['Remote', 'Hybrid', 'On-site'].map(mode => (
                        <button
                          type="button"
                          key={mode}
                          onClick={() => setPrefForm(prev => ({ ...prev, workMode: mode }))}
                          className={`py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                            prefForm.workMode === mode 
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold shadow-sm' 
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {mode}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Expected Salary / Stipend (Written)</label>
                    <input
                      type="text"
                      value={prefForm.expectedSalary}
                      onChange={e => setPrefForm(prev => ({ ...prev, expectedSalary: e.target.value }))}
                      placeholder="e.g. ₹45,000 / month"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                      required
                    />
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {['₹30,000 / month', '₹45,000 / month', '₹60,000 / month', '₹7.5 - 10 LPA'].map(sal => (
                        <button
                          type="button"
                          key={sal}
                          onClick={() => setPrefForm(prev => ({ ...prev, expectedSalary: sal }))}
                          className="text-[10px] px-1.5 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 cursor-pointer"
                        >
                          {sal}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Preferred Location</label>
                    <input
                      type="text"
                      value={prefForm.preferredLocation}
                      onChange={e => setPrefForm(prev => ({ ...prev, preferredLocation: e.target.value }))}
                      placeholder="e.g. Bengaluru / New Delhi (Open to Remote)"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsEditingPreferences(false)}
                    className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <Check className="w-3.5 h-3.5" /> Save Preferences & Filter Opportunities
                  </button>
                </div>
              </form>
            )}

            {prefSavedToast && (
              <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> Preferences updated! Filtered to your selected internship domain.
              </div>
            )}
          </div>

          {/* Search & Domain Filter Bar */}
          <div className="glass-panel rounded-2xl p-5 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search roles, companies, or skills..."
                  value={jobSearch}
                  onChange={e => setJobSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
                <Filter className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              </div>

              {/* Work Mode Toggle */}
              <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-xl border border-slate-800 self-stretch md:self-auto justify-center">
                <span className="text-[11px] text-slate-400 font-semibold px-2">Mode:</span>
                {['All', 'Remote', 'Hybrid', 'On-site'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setWorkModeFilter(mode)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      workModeFilter === mode
                        ? 'bg-emerald-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Domain Filter Pills for All Categories */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" /> Filter by Internship Category / Domain:
                </span>
                {domainFilter !== 'All' && (
                  <button
                    onClick={() => setDomainFilter('All')}
                    className="text-cyan-400 hover:underline text-[11px] font-medium cursor-pointer"
                  >
                    Show All Categories
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                <button
                  onClick={() => setDomainFilter('All')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    domainFilter === 'All'
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-950'
                      : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  🌐 All Categories ({jobs.length})
                </button>

                {MASTER_DOMAINS.map(domain => {
                  const isSelected = domainFilter === domain.id || domainFilter === domain.name;
                  const isUserTarget = jobPreferences.domain === domain.id;
                  const count = jobs.filter(j => j.domainId === domain.id || j.domain.toLowerCase().includes(domain.name.toLowerCase().split('&')[0].trim())).length;

                  return (
                    <button
                      key={domain.id}
                      onClick={() => setDomainFilter(domain.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md shadow-emerald-950'
                          : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                      }`}
                    >
                      <span>{domain.icon}</span>
                      <span>{domain.badge}</span>
                      {count > 0 && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-slate-950/40 text-emerald-100' : 'bg-slate-800 text-slate-400'}`}>
                          {count}
                        </span>
                      )}
                      {isUserTarget && (
                        <span className="text-[10px] text-amber-300 font-extrabold ml-1">★ Preferred</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Opportunities Grid */}
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map(job => {
                const isApplied = applications.includes(job.id);
                return (
                  <div key={job.id} className="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-ayush inline-block">
                              {job.domain}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                              job.mode === 'Remote' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                              job.mode === 'Hybrid' ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' :
                              'bg-amber-500/20 text-amber-300 border-amber-500/30'
                            }`}>
                              {job.mode || 'On-site'}
                            </span>
                          </div>
                          <h4 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">{job.title}</h4>
                          <p className="text-emerald-400 font-medium text-xs mt-0.5 flex items-center gap-1.5">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>{job.company}</span>
                          </p>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[10px] text-slate-400 block uppercase font-mono">AI Match</span>
                          <span className="text-xl font-black text-emerald-400">{job.matchScore}%</span>
                        </div>
                      </div>

                      <p className="text-slate-300 text-xs mt-3 line-clamp-3 leading-relaxed">
                        {job.description}
                      </p>

                      {/* Skills Required Tags */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {(job.skillsRequired || []).map((skill, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-slate-900 text-slate-300 border border-slate-800">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Details Footer with Written Salary / Stipend */}
                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="w-3.5 h-3.5 text-amber-400" />
                          <span className="text-slate-400 font-medium">Stipend:</span>
                          <strong className="text-amber-300 font-mono font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                            {job.stipend}
                          </strong>
                        </div>
                        <span className="text-slate-500 block flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400" /> {job.location} • {job.duration}
                        </span>
                      </div>

                      <button
                        onClick={() => onApplyJob(job.id)}
                        disabled={isApplied}
                        className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 ${
                          isApplied
                            ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                            : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:brightness-110 shadow-lg shadow-emerald-500/20'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Applied
                          </>
                        ) : (
                          <>
                            Apply 1-Click <ChevronRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="glass-panel rounded-2xl p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Briefcase className="w-6 h-6" />
              </div>
              <h4 className="text-base font-bold text-white">No Opportunities Found for this Filter</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                There are currently no openings matching "{domainFilter}" with "{workModeFilter}" mode.
              </p>
              <button
                onClick={() => {
                  setDomainFilter('All');
                  setWorkModeFilter('All');
                  setJobSearch('');
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-bold transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: VERIFIED DIGITAL PORTFOLIO */}
      {activeTab === 'portfolio' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={navigateBack}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Skill Radar
            </button>
            <span className="text-xs text-slate-400">Verifiable Credentials & Industry Badges</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Ayush Skill Passport */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-panel-glow rounded-2xl p-8 relative overflow-hidden">
                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-8 h-8 text-emerald-400" />
                    <div>
                      <h3 className="text-xl font-extrabold text-white">Digital Ayush Skill Passport</h3>
                      <p className="text-xs text-slate-400">Cryptographically Verified by Ministry of Ayush & Skill India</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => alert(`Downloading Verified Skill Passport JSON for: ${studentProfile.name}`)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700 cursor-pointer"
                  >
                    <Download className="w-4 h-4" /> Download Badge JSON
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 my-6 text-sm">
                  <div>
                    <span className="text-xs text-slate-400 block">Passport Holder</span>
                    <span className="font-bold text-white">{studentProfile.name}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Credential ID</span>
                    <span className="font-mono text-emerald-400 text-xs">
                      {studentProfile.verifiedCertifications?.[0]?.id || `AYUSH-STD-${studentProfile.id.slice(-6)}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Institution / College</span>
                    <span className="font-semibold text-slate-200">{studentProfile.institution || studentProfile.college}</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Verification Status</span>
                    <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold border ${
                      studentProfile.skillScore > 0 
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {studentProfile.skillScore > 0 ? 'Verified via 10-MCQ Diagnostic' : 'Profile Created (Assessment Pending)'}
                    </span>
                  </div>
                </div>

                {/* What I have done summary in passport */}
                {studentProfile.whatDone && (
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 my-4 text-xs">
                    <span className="text-slate-400 block font-semibold mb-1">Scholar Project & Clinical Dossier:</span>
                    <p className="text-slate-300">{studentProfile.whatDone}</p>
                  </div>
                )}

                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Verified Skill Micro-Credentials
                </h4>

                {Array.isArray(studentProfile.verifiedCertifications) && studentProfile.verifiedCertifications.length > 0 ? (
                  <div className="space-y-3">
                    {studentProfile.verifiedCertifications.map((cert, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                        <div>
                          <h5 className="font-bold text-white">{cert.title}</h5>
                          <span className="text-slate-400 text-[11px]">{cert.issuer} • Issued {cert.date}</span>
                          {cert.domains && (
                            <span className="block text-[10px] text-emerald-400 mt-0.5">Assessed Domains: {cert.domains}</span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="font-mono text-emerald-400 text-[11px] bg-slate-950 px-2 py-1 rounded border border-slate-800 block">
                            {cert.id}
                          </span>
                          {cert.score && (
                            <span className="text-[10px] text-slate-400 font-semibold mt-0.5 block">{cert.score}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-center space-y-3">
                    <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
                    <p className="text-xs text-slate-300">
                      No micro-credentials issued yet. Take the 10-Question AI Skill Diagnostic to earn your verified credential!
                    </p>
                    <button
                      onClick={() => navigateTo('assessment')}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs cursor-pointer"
                    >
                      Take Diagnostic Now
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Col: Share & QR Mockup */}
            <div className="space-y-6">
              <div className="glass-panel rounded-2xl p-6 text-center">
                <h4 className="text-sm font-bold text-white mb-2">Sharable Credential QR</h4>
                <p className="text-slate-400 text-xs mb-4">Recruiters can scan this QR code to verify your profile and assessment results.</p>
                
                {/* QR Mockup */}
                <div className="w-44 h-44 bg-white p-3 rounded-xl mx-auto flex items-center justify-center shadow-lg">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ayush-skill-portal.gov.in/verify/${encodeURIComponent(studentProfile.name)}`} 
                    alt="Skill QR Code"
                    className="w-full h-full object-contain" 
                  />
                </div>

                <button 
                  onClick={() => alert(`Sharable Link generated for: ${studentProfile.name}`)}
                  className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-emerald-400" /> Share on LinkedIn & Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
