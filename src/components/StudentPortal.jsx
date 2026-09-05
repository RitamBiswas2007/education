import React, { useState } from 'react';
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
  Zap 
} from 'lucide-react';
import { SKILL_ASSESSMENT_QUESTIONS } from '../data/mockData';

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
  
  // Assessment State
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState(null);

  // Job Search Filters
  const [jobSearch, setJobSearch] = useState('');
  const [domainFilter, setDomainFilter] = useState('All');

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    const currentQ = SKILL_ASSESSMENT_QUESTIONS[quizIndex];
    const isCorrect = selectedAnswer === currentQ.correctAnswer;

    if (isCorrect) {
      setQuizScore(prev => prev + 1);
      // Update student skills live!
      const updatedSkills = studentProfile.skills.map(s => {
        if (s.name.toLowerCase().includes(currentQ.skillBoost.skillName.toLowerCase()) || 
            currentQ.skillBoost.skillName.toLowerCase().includes(s.category.toLowerCase())) {
          return { ...s, currentLevel: Math.min(100, s.currentLevel + currentQ.skillBoost.points) };
        }
        return s;
      });
      setStudentProfile(prev => ({
        ...prev,
        skillScore: Math.min(100, prev.skillScore + 3),
        skills: updatedSkills
      }));
      setQuizFeedback({ type: 'success', text: `Correct! Boosted ${currentQ.skillBoost.skillName} level.` });
    } else {
      setQuizFeedback({ type: 'error', text: `Incorrect. Correct answer: ${currentQ.options[currentQ.correctAnswer]}` });
    }

    setTimeout(() => {
      setQuizFeedback(null);
      setSelectedAnswer(null);
      if (quizIndex + 1 < SKILL_ASSESSMENT_QUESTIONS.length) {
        setQuizIndex(quizIndex + 1);
      } else {
        setQuizCompleted(true);
      }
    }, 1500);
  };

  const restartQuiz = () => {
    setQuizIndex(0);
    setSelectedAnswer(null);
    setQuizScore(0);
    setQuizCompleted(false);
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
                          job.company.toLowerCase().includes(jobSearch.toLowerCase()) ||
                          job.description.toLowerCase().includes(jobSearch.toLowerCase());
    const matchesDomain = domainFilter === 'All' || job.domain === domainFilter;
    return matchesSearch && matchesDomain;
  });

  return (
    <div className="space-y-6">
      {/* Student Banner Header */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <img 
              src={studentProfile.avatar} 
              alt={studentProfile.name} 
              className="w-20 h-20 rounded-2xl object-cover border-2 border-emerald-400/40 shadow-lg shadow-emerald-950/40" 
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-white">{studentProfile.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-ayush flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Ayush Skill Verified
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-0.5">{studentProfile.degree} • {studentProfile.institution}</p>
              <p className="text-slate-300 text-xs mt-2 max-w-xl line-clamp-2">{studentProfile.bio}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-xs text-slate-400 block">Overall Skill Score</span>
              <span className="text-2xl font-extrabold gradient-text-ayush">{studentProfile.skillScore}/100</span>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-xs text-slate-400 block">Industry Readiness</span>
              <span className="text-sm font-semibold text-emerald-400 flex items-center gap-1 mt-1">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> {studentProfile.readinessIndex.split(' ')[0]}
              </span>
            </div>
            <div className="text-center px-3">
              <span className="text-xs text-slate-400 block">Active Applications</span>
              <span className="text-2xl font-bold text-cyan-400">{applications.length}</span>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800/80">
          {/* Back Button — shown when not on default tab */}
          {tabHistory.length > 1 && (
            <button
              onClick={navigateBack}
              className="px-3 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 shadow-sm group"
              title="Go back to previous section"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back
            </button>
          )}
          <button
            onClick={() => navigateTo('radar')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === 'radar' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <RadarIcon className="w-4 h-4" /> Skill Gap & Competency Radar
          </button>
          <button
            onClick={() => navigateTo('assessment')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === 'assessment' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-400" /> AI Skill Diagnostic Quiz
          </button>
          <button
            onClick={() => navigateTo('jobs')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === 'jobs' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Briefcase className="w-4 h-4" /> Internship Opportunities ({filteredJobs.length})
          </button>
          <button
            onClick={() => navigateTo('portfolio')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === 'portfolio' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-4 h-4 text-cyan-400" /> Verified Skill Passport
          </button>
        </div>
      </div>

      {/* TAB 1: SKILL GAP RADAR & DIAGNOSTICS */}
      {activeTab === 'radar' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Competency Progress Bars */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-400" /> Real-Time Competency vs. Industry Standard
                  </h3>
                  <p className="text-slate-400 text-xs mt-1">
                    Mapped against Ayush Industry Skill Matrix (National Occupational Skill Standards)
                  </p>
                </div>
                <button 
                  onClick={() => navigateTo('assessment')}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 transition-all flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" /> Take Skill Diagnostic
                </button>
              </div>

              <div className="space-y-5">
                {studentProfile.skills.map((skill, index) => {
                  const gap = skill.requiredLevel - skill.currentLevel;
                  const isMet = gap <= 0;
                  return (
                    <div key={index} className="space-y-2 p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 hover:border-slate-700 transition-all">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-200">{skill.name}</span>
                          <span className="px-2 py-0.5 text-[10px] rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                            {skill.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs">
                          <span className="text-slate-400">Current: <strong className="text-emerald-400">{skill.currentLevel}%</strong></span>
                          <span className="text-slate-400">Target: <strong className="text-cyan-400">{skill.requiredLevel}%</strong></span>
                          <span className={`px-2 py-0.5 rounded font-medium ${isMet ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                            {isMet ? 'Aligned' : `Gap: -${gap}%`}
                          </span>
                        </div>
                      </div>

                      {/* Dual Layer Progress Bar */}
                      <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
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

            {/* AI Course Recommendations Matrix */}
            <div className="glass-panel rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-cyan-400" /> AI Skill-Gap Bridge Courses
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentProfile.completedCourses.map((course, idx) => (
                  <div key={idx} className="glass-card rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                        <span>{course.provider}</span>
                        <span className="text-emerald-400 font-semibold">{course.score}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white line-clamp-2">{course.title}</h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                      <div className="w-2/3 bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <button className="text-xs text-emerald-400 font-medium hover:underline flex items-center gap-1">
                        Continue <ChevronRight className="w-3 h-3" />
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
              <p className="text-slate-400 text-xs mb-4">Visual representation of your multidimensional profile</p>

              {/* Custom SVG Radar Chart */}
              <div className="relative w-64 h-64 mx-auto my-4 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Concentric Polygons */}
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

                  {/* Target Standard Overlay */}
                  <polygon points="100,24 163,64 163,136 100,172 37,136 37,64" fill="rgba(6,182,212,0.1)" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="3,3" />

                  {/* Student Score Polygon */}
                  <polygon points="100,32 155,68 150,130 100,160 45,128 42,66" fill="rgba(16,185,129,0.3)" stroke="#10b981" strokeWidth="2.5" />
                </svg>

                <div className="absolute bottom-1 right-1 text-[10px] text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-1"></span> You
                  <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 mr-1 ml-2"></span> Industry
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800 text-xs text-slate-300">
                💡 <strong>AI Recommendation:</strong> Up-skill in <em>Tele-Ayush Systems</em> and <em>Clinical Data Management</em> to unlock 15+ high-paying Ayush Tech roles.
              </div>
            </div>

            {/* Quick Action Badge */}
            <div className="glass-panel-glow rounded-2xl p-6 text-center">
              <Award className="w-10 h-10 text-amber-400 mx-auto mb-2 animate-bounce" />
              <h4 className="font-bold text-white text-md">Verified Ayush Skill Badge</h4>
              <p className="text-slate-400 text-xs mt-1">Ready for Export & LinkedIn Sharing</p>
              <button 
                onClick={() => navigateTo('portfolio')}
                className="mt-4 w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
              >
                <Share2 className="w-4 h-4" /> View Verified Passport
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI SKILL DIAGNOSTIC QUIZ */}
      {activeTab === 'assessment' && (
        <div className="glass-panel rounded-2xl p-8 max-w-3xl mx-auto">
          <div className="mb-4">
            <button
              onClick={navigateBack}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Skill Radar
            </button>
          </div>

          {!quizCompleted ? (
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    Question {quizIndex + 1} of {SKILL_ASSESSMENT_QUESTIONS.length}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {SKILL_ASSESSMENT_QUESTIONS[quizIndex].category} Diagnostic
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700">
                  Score: {quizScore}
                </span>
              </div>

              <p className="text-slate-200 text-base font-medium mb-6">
                {SKILL_ASSESSMENT_QUESTIONS[quizIndex].question}
              </p>

              <div className="space-y-3 mb-6">
                {SKILL_ASSESSMENT_QUESTIONS[quizIndex].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedAnswer(idx)}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-center justify-between ${
                      selectedAnswer === idx 
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-md shadow-emerald-950' 
                        : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    {selectedAnswer === idx && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  </button>
                ))}
              </div>

              {quizFeedback && (
                <div className={`p-3 rounded-xl mb-4 text-xs font-semibold flex items-center gap-2 ${
                  quizFeedback.type === 'success' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}>
                  <Sparkles className="w-4 h-4" /> {quizFeedback.text}
                </div>
              )}

              <button
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm hover:brightness-110 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                Submit Answer & Calculate Skill Impact <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-400/40">
                <Sparkles className="w-10 h-10 text-emerald-400 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold text-white">Diagnostic Assessment Complete!</h3>
              <p className="text-slate-400 text-sm mt-2">
                You scored <strong className="text-emerald-400">{quizScore}/{SKILL_ASSESSMENT_QUESTIONS.length}</strong>. Your competency profile and skill radar have been updated live!
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigateTo('radar')}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20"
                >
                  View Updated Skill Radar
                </button>
                <button
                  onClick={restartQuiz}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 font-semibold text-sm transition-all"
                >
                  Retake Diagnostic
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: INTERNSHIPS & OPPORTUNITIES */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={navigateBack}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Skill Radar
            </button>
            <span className="text-xs text-slate-400">Verified Corporate Ayush Opportunities</span>
          </div>

          {/* Filters Bar */}
          <div className="glass-panel rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="relative w-full md:w-96">
              <input
                type="text"
                placeholder="Search roles, skills, or companies..."
                value={jobSearch}
                onChange={e => setJobSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
              <Filter className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              <span className="text-xs text-slate-400 font-semibold uppercase">Domain:</span>
              {['All', 'Ayush Bio-Tech', 'Digital Health & Tech', 'Bio-Analytics', 'Data Science & Clinical'].map(domain => (
                <button
                  key={domain}
                  onClick={() => setDomainFilter(domain)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    domainFilter === domain
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* Opportunities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredJobs.map(job => {
              const isApplied = applications.includes(job.id);
              return (
                <div key={job.id} className="glass-card rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-ayush inline-block mb-2">
                        {job.domain}
                      </span>
                      <h4 className="text-lg font-bold text-white">{job.title}</h4>
                      <p className="text-emerald-400 font-medium text-xs mt-0.5">{job.company}</p>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400 block">AI Match</span>
                      <span className="text-lg font-black text-emerald-400">{job.matchScore}%</span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs mt-3 line-clamp-3 leading-relaxed">
                    {job.description}
                  </p>

                  {/* Skills Required Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {job.skillsRequired.map((skill, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-slate-900 text-slate-300 border border-slate-800">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Details Footer */}
                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="space-y-1">
                      <span className="text-slate-400 block font-medium">Stipend: <strong className="text-white">{job.stipend}</strong></span>
                      <span className="text-slate-500 block">Location: {job.location} • {job.duration}</span>
                    </div>

                    <button
                      onClick={() => onApplyJob(job.id)}
                      disabled={isApplied}
                      className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
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
                <button className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-2 border border-slate-700">
                  <Download className="w-4 h-4" /> Download Badge JSON
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 my-6 text-sm">
                <div>
                  <span className="text-xs text-slate-400 block">Passport Holder</span>
                  <span className="font-bold text-white">{studentProfile.name}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Unique Credential ID</span>
                  <span className="font-mono text-emerald-400 text-xs">AYUSH-PASSPORT-2026-X992</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Primary Specialization</span>
                  <span className="font-semibold text-slate-200">Phytochemistry & Herbal Bio-Analytics</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Verification Status</span>
                  <span className="inline-block px-2 py-0.5 rounded text-xs bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                    Active & Validated
                  </span>
                </div>
              </div>

              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Verified Skill Micro-Credentials
              </h4>
              <div className="space-y-3">
                {studentProfile.verifiedCertifications.map((cert, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <h5 className="font-bold text-white">{cert.title}</h5>
                      <span className="text-slate-400 text-[11px]">{cert.issuer} • Issued {cert.date}</span>
                    </div>
                    <span className="font-mono text-emerald-400 text-[11px] bg-slate-950 px-2 py-1 rounded border border-slate-800">
                      {cert.id}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Share & QR Mockup */}
          <div className="space-y-6">
            <div className="glass-panel rounded-2xl p-6 text-center">
              <h4 className="text-sm font-bold text-white mb-2">Sharable Credential QR</h4>
              <p className="text-slate-400 text-xs mb-4">Recruiters can scan this QR code to instantly verify skill credentials.</p>
              
              {/* QR Mockup */}
              <div className="w-44 h-44 bg-white p-3 rounded-xl mx-auto flex items-center justify-center shadow-lg">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://ayush-skill-portal.gov.in/verify/AYUSH-PASSPORT-2026-X992" 
                  alt="Skill QR Code"
                  className="w-full h-full object-contain" 
                />
              </div>

              <button className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2">
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
