import React, { useState } from 'react';
import { 
  Award, 
  BarChart3, 
  Building2, 
  CheckCircle2, 
  Cpu, 
  GraduationCap, 
  Layers, 
  LayoutDashboard, 
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

import { 
  INITIAL_STUDENT_PROFILE, 
  INITIAL_INTERNSHIPS, 
  INITIAL_CANDIDATES 
} from './data/mockData';

export default function App() {
  // Active Persona Role State
  const [activeRole, setActiveRole] = useState('student'); // 'student', 'industry', 'academician', 'admin'

  // Global Stateful Data
  const [studentProfile, setStudentProfile] = useState(INITIAL_STUDENT_PROFILE);
  const [jobs, setJobs] = useState(INITIAL_INTERNSHIPS);
  const [applications, setApplications] = useState(['JOB-101']);
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);

  // Apply Job Handler
  const handleApplyJob = (jobId) => {
    if (!applications.includes(jobId)) {
      setApplications(prev => [...prev, jobId]);

      // Increment job applicant count
      setJobs(prevJobs => prevJobs.map(j => {
        if (j.id === jobId) {
          return { ...j, applicantsCount: j.applicantsCount + 1 };
        }
        return j;
      }));

      // Add student to candidate pool in Industry portal
      const targetJob = jobs.find(j => j.id === jobId);
      const newCand = {
        id: `STD-2026-${Math.floor(100 + Math.random() * 900)}`,
        name: studentProfile.name,
        institution: studentProfile.institution,
        degree: studentProfile.degree,
        skillScore: studentProfile.skillScore,
        matchScore: targetJob ? targetJob.matchScore : 88,
        status: "Under Review",
        topSkills: ["Phytochemistry", "GMP Compliance", "Tele-Ayush"],
        appliedRole: targetJob ? targetJob.title : "Ayush Specialist"
      };
      setCandidates(prev => [newCand, ...prev]);
    }
  };

  // Add Job Handler (Industry Portal)
  const handleAddJob = (newJob) => {
    setJobs(prev => [newJob, ...prev]);
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

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 font-black">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-black tracking-tight text-white">
                  AYUSH<span className="gradient-text-ayush">SKILLBRIDGE</span>
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  SIH26044
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Ministry of Ayush • Academia-Industry Skill Mapping Platform
              </p>
            </div>
          </div>

          {/* Persona Role Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveRole('student')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeRole === 'student'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Student</span>
            </button>

            <button
              onClick={() => setActiveRole('industry')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeRole === 'industry'
                  ? 'bg-gradient-to-r from-cyan-500 to-indigo-500 text-white shadow-md shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Industry</span>
            </button>

            <button
              onClick={() => setActiveRole('academician')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeRole === 'academician'
                  ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Academician</span>
            </button>

            <button
              onClick={() => setActiveRole('admin')}
              className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeRole === 'admin'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Institution Admin</span>
            </button>
          </div>

        </div>
      </header>

      {/* Role Context Bar */}
      <div className="bg-slate-900/60 border-b border-slate-800/60 py-2.5 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">Active Persona Workflow:</span>
            {activeRole === 'student' && <span className="text-emerald-400 font-bold">🎓 Student Diagnostics, Skill Radar & 1-Click Internship Applications</span>}
            {activeRole === 'industry' && <span className="text-cyan-400 font-bold">🏢 Recruiter Portal, AI Candidate Match Ranking & Job Posting</span>}
            {activeRole === 'academician' && <span className="text-amber-400 font-bold">👨‍🏫 Faculty Sabbaticals, Research Grant Proposals & Mentorship</span>}
            {activeRole === 'admin' && <span className="text-indigo-400 font-bold">📊 Institutional Placement Readiness, Skill Heatmaps & NAAC Audit</span>}
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-slate-500">
            <span>SIH 2026 Problem Statement SIH26044</span>
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
            <span>Smart India Hackathon 2026 (SIH26044) • Ministry of Ayush Solution</span>
          </div>
          <div>
            Built with React, Vite, Tailwind CSS & Real-time AI Skill Assessment Engine
          </div>
        </div>
      </footer>
    </div>
  );
}
