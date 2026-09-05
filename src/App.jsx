import React, { useState, useEffect } from 'react';
import { 
  Award, 
  BarChart3, 
  BookOpen,
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
  User,
  UserCheck, 
  Users, 
  Zap 
} from 'lucide-react';

import StudentPortal from './components/StudentPortal';
import IndustryPortal from './components/IndustryPortal';
import AcademicianPortal from './components/AcademicianPortal';
import InstitutionAnalytics from './components/InstitutionAnalytics';
import AuthScreen from './components/AuthScreen';
import RoleSelectionModal from './components/RoleSelectionModal';
import ProfileSetupModal from './components/ProfileSetupModal';
import DisclaimerModal from './components/DisclaimerModal';
import ProfileModal from './components/ProfileModal';

import { 
  INITIAL_INTERNSHIPS, 
  INITIAL_CANDIDATES 
} from './data/mockData';

import { createFreshStudentProfile } from './data/ayushQuestionBank';
import { supabase, isSupabaseConfigured } from './lib/supabase';

export default function App() {
  // Auth & Session State
  const [currentUser, setCurrentUser] = useState(null); // Authenticated User Profile
  const [session, setSession] = useState(null);

  // Disclaimer & Privacy Policy Modal State (Shown on first entry)
  const [showDisclaimer, setShowDisclaimer] = useState(
    () => localStorage.getItem('ayush_disclaimer_accepted') !== 'true'
  );

  // Profile Section Modal State
  const [showProfileModal, setShowProfileModal] = useState(false);

  // Active Persona Role State (Locked strictly to the user's chosen role)
  const [activeRole, setActiveRole] = useState('student'); // 'student', 'industry', 'academician', 'admin'
  const [showRoleSelection, setShowRoleSelection] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  // Global Stateful Data - Clean initial student profile without mock data
  const [studentProfile, setStudentProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('ayush_active_student_profile');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return createFreshStudentProfile({
      name: 'Ayush Scholar',
      college: 'National Institute of Ayurveda, Jaipur',
      degree: 'B.A.M.S. & M.Sc. Herbal Bio-Technology',
      interestedDomains: ['ayurveda', 'phytochemistry']
    });
  });

  const [jobs, setJobs] = useState(INITIAL_INTERNSHIPS);
  const [applications, setApplications] = useState(['JOB-101']);
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);

  // Check Existing Supabase Auth Session on Load
  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;

    // Fetch initial auth session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        const userId = session.user.id;
        const localSavedRole = localStorage.getItem(`ayush_role_${userId}`);
        const localRoleConfirmed = localStorage.getItem(`ayush_role_selected_${userId}`) === 'true';
        const localProfileDone = localStorage.getItem(`ayush_profile_completed_${userId}`) === 'true';

        let userRole = localSavedRole || session.user.user_metadata?.role;
        let isRoleChosen = localRoleConfirmed || Boolean(session.user.user_metadata?.role_selected);

        // Check Supabase public.profiles table
        try {
          const { data: dbProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .maybeSingle();

          if (dbProfile?.role) {
            userRole = dbProfile.role;
            if (localRoleConfirmed || session.user.user_metadata?.role_selected) {
              isRoleChosen = true;
            }
          }
        } catch (e) {
          console.warn("Could not query profile role:", e);
        }

        const finalRole = userRole || 'student';
        
        // Retrieve local saved profile if available
        let savedProfileData = {};
        try {
          const raw = localStorage.getItem(`ayush_profile_${userId}`);
          if (raw) savedProfileData = JSON.parse(raw);
        } catch (e) {}

        const profile = {
          id: userId,
          email: session.user.email,
          name: savedProfileData.name || session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          role: finalRole,
          institution: savedProfileData.institution || session.user.user_metadata?.institution || 'National Institute of Ayurveda, Jaipur',
          college: savedProfileData.college || savedProfileData.institution || 'National Institute of Ayurveda, Jaipur',
          degree: savedProfileData.degree || (finalRole === 'academician' ? 'Ph.D. Dravyaguna & Phytochemistry' : 'B.A.M.S. & M.Sc. Herbal Bio-Tech'),
          qualifications: savedProfileData.qualifications || 'B.A.M.S.',
          whatDone: savedProfileData.whatDone || '',
          interestedDomains: savedProfileData.interestedDomains || ['ayurveda', 'phytochemistry'],
          skillScore: savedProfileData.skillScore || 0,
          avatar: savedProfileData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`
        };

        setCurrentUser(profile);
        setActiveRole(finalRole);

        if (finalRole === 'student') {
          const freshStudent = createFreshStudentProfile(profile);
          // preserve any already saved quiz scores
          try {
            const savedStudent = localStorage.getItem(`ayush_student_profile_${userId}`);
            if (savedStudent) {
              setStudentProfile(JSON.parse(savedStudent));
            } else {
              setStudentProfile(freshStudent);
            }
          } catch (e) {
            setStudentProfile(freshStudent);
          }
        }

        // Check onboarding step
        if (!isRoleChosen) {
          setShowRoleSelection(true);
        } else {
          setShowRoleSelection(false);
        }
        setShowProfileSetup(false);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session?.user) {
        const userId = session.user.id;
        const localSavedRole = localStorage.getItem(`ayush_role_${userId}`);
        const localRoleConfirmed = localStorage.getItem(`ayush_role_selected_${userId}`) === 'true';
        const localProfileDone = localStorage.getItem(`ayush_profile_completed_${userId}`) === 'true';

        const finalRole = localSavedRole || session.user.user_metadata?.role || 'student';
        const isRoleChosen = localRoleConfirmed || Boolean(session.user.user_metadata?.role_selected);

        let savedProfileData = {};
        try {
          const raw = localStorage.getItem(`ayush_profile_${userId}`);
          if (raw) savedProfileData = JSON.parse(raw);
        } catch (e) {}

        const profile = {
          id: userId,
          email: session.user.email,
          name: savedProfileData.name || session.user.user_metadata?.full_name || session.user.email.split('@')[0],
          role: finalRole,
          institution: savedProfileData.institution || session.user.user_metadata?.institution || 'National Institute of Ayurveda, Jaipur',
          college: savedProfileData.college || savedProfileData.institution || 'National Institute of Ayurveda, Jaipur',
          degree: savedProfileData.degree || (finalRole === 'academician' ? 'Ph.D. Dravyaguna & Phytochemistry' : 'B.A.M.S. & M.Sc. Herbal Bio-Tech'),
          qualifications: savedProfileData.qualifications || 'B.A.M.S.',
          whatDone: savedProfileData.whatDone || '',
          interestedDomains: savedProfileData.interestedDomains || ['ayurveda', 'phytochemistry'],
          skillScore: savedProfileData.skillScore || 0,
          avatar: savedProfileData.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.email}`
        };

        setCurrentUser(profile);
        setActiveRole(finalRole);

        if (finalRole === 'student') {
          const freshStudent = createFreshStudentProfile(profile);
          try {
            const savedStudent = localStorage.getItem(`ayush_student_profile_${userId}`);
            if (savedStudent) {
              setStudentProfile(JSON.parse(savedStudent));
            } else {
              setStudentProfile(freshStudent);
            }
          } catch (e) {
            setStudentProfile(freshStudent);
          }
        }

        if (!isRoleChosen) {
          setShowRoleSelection(true);
        } else {
          setShowRoleSelection(false);
        }
        setShowProfileSetup(false);
      } else {
        setCurrentUser(null);
        setShowRoleSelection(false);
        setShowProfileSetup(false);
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
            type: j.type || "Full-Time Internship",
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
    setShowRoleSelection(false);
    setShowProfileSetup(false);
  };

  // Auth Success Handler
  const handleAuthSuccess = (userProfile, userSession, isNewUser = false) => {
    setCurrentUser(userProfile);
    setSession(userSession);

    const userId = userProfile.id;
    const localSavedRole = localStorage.getItem(`ayush_role_${userId}`);
    const localRoleConfirmed = localStorage.getItem(`ayush_role_selected_${userId}`) === 'true';
    const localProfileDone = localStorage.getItem(`ayush_profile_completed_${userId}`) === 'true';

    const chosenRole = localSavedRole || userProfile.role || 'student';
    setActiveRole(chosenRole);

    if (!localRoleConfirmed || isNewUser || userProfile.needsRoleSelection) {
      setShowRoleSelection(true);
    } else {
      setShowRoleSelection(false);
    }
    setShowProfileSetup(false);

    if (chosenRole === 'student') {
      const fresh = createFreshStudentProfile(userProfile);
      try {
        const savedStudent = localStorage.getItem(`ayush_student_profile_${userId}`);
        if (savedStudent) setStudentProfile(JSON.parse(savedStudent));
        else setStudentProfile(fresh);
      } catch (e) {
        setStudentProfile(fresh);
      }
    }
  };

  // Guest Login Handler (Remembers previously selected role and profile)
  const handleGuestLogin = () => {
    const hasSelectedGuestRole = localStorage.getItem('ayush_guest_role_selected') === 'true';
    const savedGuestRole = localStorage.getItem('ayush_guest_role');
    const savedGuestInst = localStorage.getItem('ayush_guest_institution');

    let savedGuestProfile = {};
    try {
      const raw = localStorage.getItem('ayush_profile_GUEST-USER-2026');
      if (raw) savedGuestProfile = JSON.parse(raw);
    } catch (e) {}

    const guestRole = savedGuestRole || 'student';
    const guestUser = {
      id: 'GUEST-USER-2026',
      email: 'guest.evaluator@ayush.gov.in',
      name: savedGuestProfile.name || 'Guest Evaluator',
      role: guestRole,
      institution: savedGuestProfile.institution || savedGuestInst || 'Ministry of Ayush Evaluation Desk',
      college: savedGuestProfile.college || savedGuestInst || 'Ministry of Ayush Evaluation Desk',
      degree: savedGuestProfile.degree || (guestRole === 'academician' ? 'Faculty Evaluator' : guestRole === 'industry' ? 'Corporate Talent Lead' : 'Senior Ayush Scholar'),
      qualifications: savedGuestProfile.qualifications || 'Ayush Evaluation Specialist',
      whatDone: savedGuestProfile.whatDone || '',
      interestedDomains: savedGuestProfile.interestedDomains || ['ayurveda', 'phytochemistry'],
      skillScore: savedGuestProfile.skillScore || 0,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    };

    setCurrentUser(guestUser);
    setActiveRole(guestRole);

    if (guestRole === 'student') {
      const fresh = createFreshStudentProfile(guestUser);
      try {
        const savedStudent = localStorage.getItem('ayush_student_profile_GUEST-USER-2026');
        if (savedStudent) setStudentProfile(JSON.parse(savedStudent));
        else setStudentProfile(fresh);
      } catch (e) {
        setStudentProfile(fresh);
      }
    }

    if (!hasSelectedGuestRole || !savedGuestRole) {
      setShowRoleSelection(true);
    } else {
      setShowRoleSelection(false);
    }
    setShowProfileSetup(false);
  };

  // Role Confirmation Handler (Saves permanently and triggers Profile Setup Form if needed)
  const handleConfirmRole = async (selectedRole, institutionInput) => {
    setActiveRole(selectedRole);
    setShowRoleSelection(false);

    const roleDegreeMap = {
      student: 'B.A.M.S. & M.Sc. Herbal Bio-Technology',
      academician: 'Ph.D. Dravyaguna & Phytochemistry',
      industry: 'Head of Talent Acquisition & R&D',
      admin: 'Dean of Academic & Clinical Affairs'
    };

    const updatedInst = institutionInput || currentUser?.institution || 'National Institute of Ayurveda, Jaipur';

    const updatedUser = {
      ...(currentUser || {}),
      role: selectedRole,
      institution: updatedInst,
      college: updatedInst,
      degree: roleDegreeMap[selectedRole] || currentUser?.degree
    };

    setCurrentUser(updatedUser);

    const userId = currentUser?.id || 'GUEST-USER-2026';

    if (userId.startsWith('GUEST')) {
      localStorage.setItem('ayush_guest_role', selectedRole);
      localStorage.setItem('ayush_guest_role_selected', 'true');
      if (institutionInput) {
        localStorage.setItem('ayush_guest_institution', institutionInput);
      }
    } else {
      localStorage.setItem(`ayush_role_${userId}`, selectedRole);
      localStorage.setItem(`ayush_role_selected_${userId}`, 'true');

      if (isSupabaseConfigured && supabase) {
        try {
          await supabase.from('profiles').upsert({
            id: userId,
            email: currentUser.email,
            full_name: currentUser.name,
            role: selectedRole,
            institution: updatedInst,
            degree: roleDegreeMap[selectedRole] || 'Ayush Specialist'
          });

          await supabase.auth.updateUser({
            data: {
              role: selectedRole,
              role_selected: true,
              institution: updatedInst
            }
          });
        } catch (err) {
          console.warn("Failed to persist role in Supabase:", err);
        }
      }
    }

    // After role selection, prompt user to complete profile form if not already completed!
    setShowProfileSetup(false);
  };

  // Profile Setup Form Submission Handler (Mandatory Onboarding for All Users)
  const handleSaveProfileSetup = async (compiledProfile) => {
    setCurrentUser(compiledProfile);
    setActiveRole(compiledProfile.role);

    const userId = compiledProfile.id;
    localStorage.setItem(`ayush_profile_${userId}`, JSON.stringify(compiledProfile));
    localStorage.setItem(`ayush_profile_completed_${userId}`, 'true');
    localStorage.setItem(`ayush_role_${userId}`, compiledProfile.role);
    localStorage.setItem(`ayush_role_selected_${userId}`, 'true');

    if (compiledProfile.role === 'student') {
      const freshStudent = createFreshStudentProfile(compiledProfile);
      setStudentProfile(freshStudent);
      localStorage.setItem(`ayush_student_profile_${userId}`, JSON.stringify(freshStudent));
      localStorage.setItem('ayush_active_student_profile', JSON.stringify(freshStudent));
    }

    if (isSupabaseConfigured && supabase && !userId.startsWith('GUEST')) {
      try {
        await supabase.from('profiles').upsert({
          id: userId,
          email: compiledProfile.email,
          full_name: compiledProfile.name,
          role: compiledProfile.role,
          institution: compiledProfile.institution,
          degree: compiledProfile.degree,
          bio: compiledProfile.bio,
          avatar_url: compiledProfile.avatar
        });

        await supabase.auth.updateUser({
          data: {
            full_name: compiledProfile.name,
            role: compiledProfile.role,
            role_selected: true,
            profile_completed: true,
            institution: compiledProfile.institution,
            degree: compiledProfile.degree,
            domains: compiledProfile.interestedDomains
          }
        });
      } catch (err) {
        console.warn("Error updating profile in Supabase:", err);
      }
    }

    setShowProfileSetup(false);
  };

  // Profile Update Handler (From Header "My Profile" Modal)
  const handleSaveProfile = async (updatedData) => {
    setCurrentUser(updatedData);

    const userId = updatedData.id;
    if (updatedData.role === 'student' || activeRole === 'student') {
      setStudentProfile(prev => {
        const next = {
          ...prev,
          name: updatedData.name,
          email: updatedData.email,
          institution: updatedData.institution,
          college: updatedData.college || updatedData.institution,
          degree: updatedData.degree,
          year: updatedData.year || prev.year,
          bio: updatedData.bio,
          avatar: updatedData.avatar,
          whatDone: updatedData.whatDone || prev.whatDone,
          interestedDomains: updatedData.interestedDomains || prev.interestedDomains
        };
        localStorage.setItem(`ayush_student_profile_${userId}`, JSON.stringify(next));
        localStorage.setItem('ayush_active_student_profile', JSON.stringify(next));
        return next;
      });
    }

    if (userId) {
      localStorage.setItem(`ayush_profile_${userId}`, JSON.stringify(updatedData));
      if (isSupabaseConfigured && supabase && !userId.startsWith('GUEST')) {
        try {
          await supabase.from('profiles').upsert({
            id: userId,
            email: updatedData.email,
            full_name: updatedData.name,
            institution: updatedData.institution,
            degree: updatedData.degree,
            bio: updatedData.bio,
            avatar_url: updatedData.avatar
          });
        } catch (err) {
          console.warn("Error updating profile in Supabase:", err);
        }
      }
    }
  };

  // Persistent student profile updater
  const handleUpdateStudentProfile = (updater) => {
    setStudentProfile(prev => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      if (currentUser?.id) {
        localStorage.setItem(`ayush_student_profile_${currentUser.id}`, JSON.stringify(next));
      }
      localStorage.setItem('ayush_active_student_profile', JSON.stringify(next));
      return next;
    });
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
      <>
        <AuthScreen
          onAuthSuccess={handleAuthSuccess}
          onGuestLogin={handleGuestLogin}
        />

        {/* Disclaimer & Privacy Policy Modal on initial entry */}
        {showDisclaimer && (
          <DisclaimerModal
            onAccept={() => setShowDisclaimer(false)}
            onClose={() => setShowDisclaimer(false)}
            canCloseWithoutAccept={localStorage.getItem('ayush_disclaimer_accepted') === 'true'}
          />
        )}
      </>
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

          {/* Locked Persona Workspace Indicator (Strictly 1 role at a time, switcher removed from header as requested) */}
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm ${
              activeRole === 'student' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' :
              activeRole === 'academician' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' :
              activeRole === 'industry' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300' :
              'bg-indigo-500/10 border-indigo-500/30 text-indigo-300'
            }`}>
              {activeRole === 'student' && <GraduationCap className="w-4 h-4 text-emerald-400" />}
              {activeRole === 'academician' && <BookOpen className="w-4 h-4 text-amber-400" />}
              {activeRole === 'industry' && <Building2 className="w-4 h-4 text-cyan-400" />}
              {activeRole === 'admin' && <BarChart3 className="w-4 h-4 text-indigo-400" />}
              <span>
                {activeRole === 'student' && 'Student Workspace'}
                {activeRole === 'academician' && 'Teacher & Faculty Workspace'}
                {activeRole === 'industry' && 'Corporate Recruiter Workspace'}
                {activeRole === 'admin' && 'Institutional Admin Workspace'}
              </span>
            </div>
          </div>

          {/* Logged In User Profile, Edit Profile & Log Out */}
          <div className="flex items-center gap-3">
            {/* Clickable Profile Summary Badge */}
            <div 
              onClick={() => setShowProfileModal(true)}
              title="Click to view & edit your profile and switch roles"
              className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800/90 px-3 py-1.5 rounded-xl border border-slate-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-sm"
            >
              <img 
                src={currentUser.avatar} 
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover border border-emerald-400 group-hover:scale-105 transition-all"
              />
              <div className="hidden sm:block text-left">
                <span className="text-xs font-bold text-white group-hover:text-emerald-300 block leading-tight transition-colors">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-emerald-400 block font-mono leading-tight">
                  {currentUser.email}
                </span>
              </div>
            </div>

            {/* Dedicated My Profile Button */}
            <button
              onClick={() => setShowProfileModal(true)}
              title="Edit Profile & Role Settings"
              className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <User className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">My Profile</span>
            </button>

            {/* Log Out Button */}
            <button
              onClick={handleLogOut}
              title="Log Out of Session"
              className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-all font-bold text-xs flex items-center gap-1.5 cursor-pointer"
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
            <span className="font-semibold text-slate-300">Active Workspace:</span>
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

      {/* Main Content Body - Strictly segregated according to activeRole */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeRole === 'student' && (
          <StudentPortal
            studentProfile={studentProfile}
            setStudentProfile={handleUpdateStudentProfile}
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
            currentUser={currentUser}
          />
        )}

        {activeRole === 'academician' && (
          <AcademicianPortal currentUser={currentUser} />
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowDisclaimer(true)}
              className="hover:text-emerald-400 underline transition-colors cursor-pointer text-xs"
            >
              Disclaimer & Privacy Policy
            </button>
            <span>Authenticated Account: <strong className="text-slate-300">{currentUser.email}</strong></span>
            {isSupabaseConfigured && (
              <span className="text-cyan-400 font-bold">⚡ Enterprise Cloud Active</span>
            )}
          </div>
        </div>
      </footer>

      {/* Disclaimer & Privacy Policy Modal */}
      {showDisclaimer && (
        <DisclaimerModal
          onAccept={() => setShowDisclaimer(false)}
          onClose={() => setShowDisclaimer(false)}
          canCloseWithoutAccept={localStorage.getItem('ayush_disclaimer_accepted') === 'true'}
        />
      )}

      {/* User Profile & Role Switch Modal */}
      {showProfileModal && (
        <ProfileModal
          currentUser={currentUser}
          activeRole={activeRole}
          onSaveProfile={handleSaveProfile}
          onSwitchRole={handleConfirmRole}
          onClose={() => setShowProfileModal(false)}
        />
      )}

      {/* Role Selection Onboarding Modal */}
      {showRoleSelection && (
        <RoleSelectionModal
          currentUserName={currentUser?.name}
          userEmail={currentUser?.email}
          initialRole={activeRole}
          onConfirmRole={handleConfirmRole}
          onClose={currentUser?.role ? () => setShowRoleSelection(false) : undefined}
        />
      )}

      {/* Profile Setup Onboarding Modal (Mandatory Form for All Users, with Student Specializations) */}
      {showProfileSetup && (
        <ProfileSetupModal
          currentUser={currentUser}
          currentRole={activeRole}
          onSaveProfileSetup={handleSaveProfileSetup}
          canClose={true}
          onClose={() => {
            setShowProfileSetup(false);
            setShowRoleSelection(true);
          }}
        />
      )}
    </div>
  );
}
