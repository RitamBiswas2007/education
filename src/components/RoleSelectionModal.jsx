import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  ChevronRight, 
  GraduationCap, 
  Shield, 
  Sparkles, 
  Users, 
  BarChart3, 
  BookOpen,
  ArrowRight,
  School
} from 'lucide-react';

export const ROLES = [
  {
    id: 'student',
    title: 'Ayush Student / Scholar',
    subtitle: 'Undergraduate, Post-Graduate (BAMS, MD, PhD), or Ayush Intern',
    badge: 'Student Portal',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    borderActive: 'border-emerald-500 bg-emerald-950/20 shadow-emerald-500/10',
    icon: GraduationCap,
    iconBg: 'from-emerald-500 to-teal-500 text-slate-950',
    highlights: [
      'Take AI Skill Diagnostic Tests & calculate industry readiness',
      'Verified Ayush Skill Passport & NABL compliance tracking',
      'Direct internship applications (Dabur, Himalaya, Patanjali)',
      'Job matching & stipend opportunities'
    ],
    defaultDegree: 'B.A.M.S. & M.Sc. Herbal Bio-Technology'
  },
  {
    id: 'academician',
    title: 'Teacher / Academician',
    subtitle: 'Professor, Department Head, Ayush Faculty, or Educator',
    badge: 'Faculty Portal',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    borderActive: 'border-amber-500 bg-amber-950/20 shadow-amber-500/10',
    icon: BookOpen,
    iconBg: 'from-amber-500 to-orange-500 text-slate-950',
    highlights: [
      'Apply for industry sabbaticals (CSIR-CIMAP, IIT Kharagpur)',
      'Submit consultancy proposals for industrial research grants',
      'Access UGC/AICTE accredited FDP credits',
      'Book verified corporate guest speakers for student batches'
    ],
    defaultDegree: 'Ph.D. Dravyaguna & Phytochemistry'
  },
  {
    id: 'industry',
    title: 'Industry Recruiter',
    subtitle: 'Ayush Pharma, Biotech, Herbal Wellness, or Clinical R&D Recruiter',
    badge: 'Recruiter Portal',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    borderActive: 'border-cyan-500 bg-cyan-950/20 shadow-cyan-500/10',
    icon: Building2,
    iconBg: 'from-cyan-500 to-blue-600 text-white',
    highlights: [
      'Post verified internship & PPO listings to national talent pool',
      'Review applicant profiles with automated competency matching',
      'Filter candidates by HPTLC, GMP, or Tele-Ayush skill metrics',
      'Manage interview scheduling and candidate hiring status'
    ],
    defaultDegree: 'Talent Acquisition Director'
  },
  {
    id: 'admin',
    title: 'Institutional Admin / Auditor',
    subtitle: 'University Dean, NAAC Coordinator, or Ministry Evaluator',
    badge: 'Admin Portal',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    borderActive: 'border-indigo-500 bg-indigo-950/20 shadow-indigo-500/10',
    icon: BarChart3,
    iconBg: 'from-indigo-500 to-purple-600 text-white',
    highlights: [
      'Institutional skill gap heatmaps across Ayush faculties',
      'Curriculum alignment index & NAAC/Ayush audit readiness',
      'Placement velocity & sector hiring demand analytics',
      'Generate institutional accreditation audit reports'
    ],
    defaultDegree: 'Dean of Academic Affairs'
  }
];

export default function RoleSelectionModal({ 
  currentUserName, 
  userEmail, 
  initialRole = 'student',
  onConfirmRole 
}) {
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [institution, setInstitution] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmRole(selectedRole, institution);
    }, 400);
  };

  const selectedRoleObj = ROLES.find(r => r.id === selectedRole) || ROLES[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#060a12]/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto font-sans">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 my-8">
        {/* Header Branding */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-1">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>Ministry of Ayush • Official Onboarding Gateway</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Select Your Role in the <span className="gradient-text-ayush">Ayush Ecosystem</span>
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm">
            Welcome, <strong className="text-white">{currentUserName || userEmail || 'Colleague'}</strong>! 
            To personalize your workspace, please select your primary role. 
            <span className="text-emerald-400 font-semibold block mt-0.5">
              You will be granted exclusive access strictly to your selected portal.
            </span>
          </p>
        </div>

        {/* Roles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ROLES.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;

            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                className={`cursor-pointer rounded-2xl p-5 border transition-all duration-200 relative flex flex-col justify-between ${
                  isSelected
                    ? `${role.borderActive} shadow-lg ring-1 ring-emerald-500/50`
                    : 'border-slate-800/80 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${role.iconBg} flex items-center justify-center font-bold shadow-md`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white leading-tight">
                          {role.title}
                        </h3>
                        <p className="text-slate-400 text-[11px] leading-tight mt-0.5">
                          {role.subtitle}
                        </p>
                      </div>
                    </div>

                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${role.badgeColor} shrink-0`}>
                      {role.badge}
                    </span>
                  </div>

                  <ul className="space-y-1.5 mt-3 pt-3 border-t border-slate-800/60 text-xs text-slate-300">
                    {role.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px]">
                        <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isSelected ? 'text-emerald-400' : 'text-slate-500'}`} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/50 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-medium">
                    {isSelected ? '✓ Selected Workspace' : 'Click to select this role'}
                  </span>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected 
                      ? 'border-emerald-400 bg-emerald-500 text-slate-950' 
                      : 'border-slate-700 bg-slate-900'
                  }`}>
                    {isSelected && <CheckCircle2 className="w-4 h-4 fill-emerald-500 text-slate-950" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Institution / College Input (Optional) */}
        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-xs space-y-2">
          <label className="block text-slate-300 font-semibold flex items-center gap-1.5">
            <School className="w-4 h-4 text-emerald-400" />
            <span>Institution / University / Company Name (Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. National Institute of Ayurveda, Jaipur / Dabur R&D Centre"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
          />
          <p className="text-[11px] text-slate-500">
            This will appear on your verified certificates, job postings, or sabbatical requests.
          </p>
        </div>

        {/* Confirmation Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="text-xs text-slate-400 text-center sm:text-left">
            <span>Entering as: </span>
            <strong className="text-emerald-400">{selectedRoleObj.title}</strong>
            <span className="block text-[11px] text-slate-500">Your portal will remember this choice automatically.</span>
          </div>

          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            {isSubmitting ? (
              <span>Configuring Workspace...</span>
            ) : (
              <>
                <span>Access {selectedRoleObj.badge}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
