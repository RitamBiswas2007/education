import React, { useState, useEffect } from 'react';
import { 
  Award, 
  BarChart3, 
  Building2, 
  CheckCircle2, 
  Cpu, 
  Database, 
  GraduationCap, 
  Layers, 
  LayoutDashboard, 
  LogOut, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  Users, 
  Zap 
} from 'lucide-react';

import StudentPortal from './components/StudentPortal';
import IndustryPortal from './components/IndustryPortal';
import AcademicianPortal from './components/AcademicianPortal';
import InstitutionAnalytics from './components/InstitutionAnalytics';
import AuthScreen from './components/AuthScreen';

import { 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_INTERNSHIPS, 
  INITIAL_CANDIDATES 
} from './data/mockData';

import { supabase, isSupabaseConfigured } from './lib/supabase';

export default function App() {
  // Auth & Session State
  const [currentUser, setCurrentUser] = useState(null); // Authenticated User Profile
  const [session, setSession] = useState(null);

  // Active Persona Role State
  const [activeRole, setActiveRole] = useState('student'); // 'student', 'industry', 'academician', 'admin'

  // Global Stateful Data
  const [studentProfile, setStudentProfile] = useState(INITIAL_STUDENT_PROFILE);
  const [jobs, setJobs] = useState(INITIAL_INTERNSHIPS);
  const [applications, setApplications] = useState(['JOB-101']);
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);

  // Check Existing Supabase Auth Session on Load
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    // Fetch initial auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const profile = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          role: session.user.user_metadata?.role || 'student',
          institution: session.user.user_metadata?.institution || 'National Institute of Ayurveda',
          degree: 'Ayush Degree Specialist',
          skillScore: 85,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`
        };
        setCurrentUser(profile);
        setActiveRole(profile.role);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        const profile = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          role: session.user.user_metadata?.role || 'student',
          institution: session.user.user_metadata?.institution || 'National Institute of Ayurveda',
          degree: 'Ayush Degree Specialist',
          skillScore: 85,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`
        };
        setCurrentUser(profile);
        setActiveRole(profile.role);
      } else {
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sync Jobs from Supabase
  useEffect(() => {
    async function loadSupabaseJobs() {
      if (!isSupabaseConfigured || !supabase) return;
      try {
        const { data: dbJobs, error } = await supabase.from('jobs').select('*');
        if (!error && dbJobs && dbJobs.length > 0) {
          const formattedJobs = dbJobs.map(j => ({
            id: j.id,
            title: j.title,
            company: j.company,
            location: j.location,
            stipend: j.stipend,
            duration: j.duration,
            type: "Full-Time Internship",
            domain: j.domain,
            matchScore: j.match_score || 85,
            skillsRequired: j.skills_required || ["Phytochemistry & QC"],
            description: j.description,
            applicantsCount: j.applicants_count || 0,
            deadline: j.deadline || "30 Sep 2026",
            status: j.status || "Active"
          }));
          setJobs(formattedJobs);
        }
      } catch (err) {
        console.log("Using local state fallback:", err);
      }
    }

    loadSupabaseJobs();
  }, [currentUser]);

  // Log Out Handler
  const handleLogOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setCurrentUser(null);
    setSession(null);
  };

  // Auth Success Handler
  const handleAuthSuccess = (userProfile, userSession) => {
    setCurrentUser(userProfile);
    setSession(userSession);
    setActiveRole(userProfile.role || 'student');
    setStudentProfile(prev => ({
      ...prev,
      id: userProfile.id,
      name: userProfile.name,
      email: userProfile.email,
      institution: userProfile.institution,
      avatar: userProfile.avatar
    }));
  };

  // Guest Login Handler
  const handleGuestLogin = () => {
    const guestUser = {
      id: 'GUEST-USER-2026',
      email: 'evaluator@ayush.gov.in',
      name: 'Executive Guest User',
      role: 'student',
      institution: 'Ministry of Ayush Evaluation Desk',
      degree: 'Senior Evaluator',
      skillScore: 88,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    };
    setCurrentUser(guestUser);
  };

  // Apply Job Handler
  const handleApplyJob = async (jobId) => {
    if (!applications.includes(jobId)) {
      setApplications(prev => [...prev, jobId]);

      setJobs(prevJobs => prevJobs.map(j => {
        if (j.id === jobId) {
          return { ...j, applicantsCount: j.applicantsCount + 1 };
        }
        return j;
      }));

      const targetJob = jobs.find(j => j.id === jobId);
      const newCand = {
        id: currentUser ? currentUser.id : `STD-2026-${Math.floor(100 + Math.random() * 900)}`,
        name: currentUser ? currentUser.name : studentProfile.name,
        institution: currentUser ? currentUser.institution : studentProfile.institution,
        degree: studentProfile.degree,
        skillScore: studentProfile.skillScore,
        matchScore: targetJob ? targetJob.matchScore : 88,
        status: "Under Review",
        topSkills: ["Phytochemistry", "GMP Compliance", "Tele-Ayush"],
        appliedRole: targetJob ? targetJob.title : "Ayush Specialist"
      };
      setCandidates(prev => [newCand, ...prev]);

      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('job_applications').insert([{
            job_id: typeof jobId === 'string' && jobId.includes('-') ? null : jobId,
            student_id: currentUser?.id && !currentUser.id.startsWith('GUEST') ? currentUser.id : null,
            status: 'Under Review',
            match_score: targetJob ? targetJob.matchScore : 88
          }]);
        } catch (e) {
          console.log("Applied locally to state");
        }
      }
    }
  };

  // Add Job Handler (Industry Portal)
  const handleAddJob = async (newJob) => {
    setJobs(prev => [newJob, ...prev]);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('jobs').insert([{
          title: newJob.title,
          company: newJob.company,
          location: newJob.location,
          stipend: newJob.stipend,
          duration: newJob.duration,
          domain: newJob.domain,
          match_score: newJob.matchScore,
          skills_required: newJob.skillsRequired,
          description: newJob.description,
          deadline: newJob.deadline,
          status: newJob.status
        }]);
      } catch (e) {
        console.log("Job saved locally");
      }
    }
  };

  // Update Candidate Status (Industry Portal)
  const handleUpdateCandidateStatus = (candidateId, newStatus) => {
    setCandidates(prev => prev.map(c => {
      if (c.id === candidateId) {
        return { ...c, status: newStatus };
      }
      return c;
    }));
  };

  // Render Auth Screen if not signed in
  if (!currentUser) {
    return (
      <AuthScreen
        onAuthSuccess={handleAuthSuccess}
        onGuestLogin={handleGuestLogin}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 font-black">
              <Sparkles className="w-5 h-5 text-slate-950 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-tight text-white">
                  AYUSH<span className="gradient-text-ayush">SKILLBRIDGE</span>
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  OFFICIAL PORTAL
                </span>
                {isSupabaseConfigured && (
                  <span className="hidden sm:flex px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 items-center gap-1">
                    <Database className="w-3 h-3 text-cyan-400 animate-pulse" /> Cloud Connected
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 font-medium">
                Ministry of Ayush • National Academia-Industry Ecosystem
              </p>
            </div>
          </div>

          {/* Persona Role Switcher */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-2xl border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveRole('student')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                activeRole === 'student'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student</span>
            </button>

            <button
              onClick={() => setActiveRole('industry')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                activeRole === 'industry'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Industry</span>
            </button>

            <button
              onClick={() => setActiveRole('academician')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                activeRole === 'academician'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Academician</span>
            </button>

            <button
              onClick={() => setActiveRole('admin')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                activeRole === 'admin'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Admin</span>
            </button>
          </div>

          {/* Logged In User Profile & Log Out Button */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-emerald-400"
              />
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-white block leading-tight">{currentUser.name}</span>
                <span className="text-[10px] text-emerald-400 block font-mono leading-tight">{currentUser.email}</span>
              </div>
            </div>

            <button
              onClick={handleLogOut}
              title="Log Out of Session"
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-all font-bold text-xs flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Log Out</span>
            </button>
          </div>

        </div>
      </header>

      {/* Role Context Bar */}
      <div className="bg-slate-900/60 border-b border-slate-800/60 py-2 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Active Module:</span>
            {activeRole === 'student' && <span className="text-emerald-400 font-bold">🎓 Skill Assessment Diagnostics, Competency Mapping & Industry Opportunities</span>}
            {activeRole === 'industry' && <span className="text-cyan-400 font-bold">🏢 Corporate Recruiter Portal, Candidate AI Match Ranking & Talent Acquisition</span>}
            {activeRole === 'academician' && <span className="text-amber-400 font-bold">👨‍🏫 Faculty Sabbaticals, Research Grant Consultancy & Mentorship Hub</span>}
            {activeRole === 'admin' && <span className="text-indigo-400 font-bold">📊 Institutional Placement Readiness, Sector Deficiency Analytics & NAAC Audits</span>}
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-slate-500">
            <span>Ministry of Ayush National Infrastructure</span>
          </div>
        </div>
      </div>

      {/* Main Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeRole === 'student' && (
          <StudentPortal
            studentProfile={studentProfile}
            setStudentProfile={setStudentProfile}
            jobs={jobs}
            onApplyJob={handleApplyJob}
            applications={applications}
          />
        )}

        {activeRole === 'industry' && (
          <IndustryPortal
            jobs={jobs}
            onAddJob={handleAddJob}
            candidates={candidates}
            onUpdateCandidateStatus={handleUpdateCandidateStatus}
          />
        )}

        {activeRole === 'academician' && (
          <AcademicianPortal />
        )}

        {activeRole === 'admin' && (
          <InstitutionAnalytics />
        )}
      </main>

      {/* Footer Attribution Banner */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Ministry of Ayush, Government of India • National Skill Ecosystem Infrastructure</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Authenticated Account: <strong className="text-slate-300">{currentUser.email}</strong></span>
            {isSupabaseConfigured && (
              <span className="text-cyan-400 font-bold">⚡ Enterprise Cloud Active</span>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
