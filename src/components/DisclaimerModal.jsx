import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  Building2, 
  GraduationCap, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function DisclaimerModal({ onAccept, onClose, canCloseWithoutAccept = false }) {
  const [agreed, setAgreed] = useState(false);

  const handleAccept = () => {
    localStorage.setItem('ayush_disclaimer_accepted', 'true');
    onAccept();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#060a12]/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto font-sans">
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 my-8">
        {/* Header Branding */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 font-black shrink-0">
              <Scale className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-white">
                  AYUSH<span className="gradient-text-ayush">SKILLBRIDGE</span>
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  LEGAL & PRIVACY NOTICE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Ministry of Ayush National Academia-Industry Skill Ecosystem
              </p>
            </div>
          </div>

          {canCloseWithoutAccept && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white text-xs font-semibold p-1 rounded-lg hover:bg-slate-800 transition-all"
            >
              ✕ Close
            </button>
          )}
        </div>

        {/* Scrollable Terms & Policy Body */}
        <div className="max-h-[360px] overflow-y-auto space-y-4 pr-2 text-xs text-slate-300 custom-scrollbar">
          {/* Section 1: Official Disclaimer */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <ShieldCheck className="w-4 h-4" />
              <span>1. Official Platform Disclaimer</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Ayush SkillBridge operates under the standardized digital skill benchmarking guidelines of the Ministry of Ayush, Government of India. This portal is designed exclusively to bridge academia, clinical research institutions, and certified industrial manufacturers (Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homoeopathy).
            </p>
            <ul className="space-y-1.5 text-[11px] text-slate-400 list-disc list-inside">
              <li>Skill scores, diagnostic quizzes, and competency passports serve as educational benchmarks and industry recommendations.</li>
              <li>Job listings, industrial internships, and corporate research grants are directly sponsored by participating corporate entities and institutional partners.</li>
              <li>The Ministry and platform developers do not guarantee unilateral employment but provide verified credential verification to employers.</li>
            </ul>
          </div>

          {/* Section 2: Privacy Policy & DPDP Act Compliance */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Lock className="w-4 h-4" />
              <span>2. Privacy Policy & Data Protection (DPDP Act 2023)</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              In strict adherence to the <strong>Digital Personal Data Protection (DPDP) Act 2023</strong> and <strong>Ayushman Bharat Digital Mission (ABDM)</strong> health data guidelines, your data privacy is protected with enterprise isolation:
            </p>
            <ul className="space-y-1.5 text-[11px] text-slate-400 list-disc list-inside">
              <li><strong>Row-Level Security (RLS):</strong> Candidate profiles, contact credentials, and individual assessment logs are strictly isolated and never accessible across unauthorized third-party accounts.</li>
              <li><strong>Role-Based Segregation:</strong> A registered account can strictly hold only one active persona (Student, Teacher/Academician, Recruiter, or Admin) at any given time.</li>
              <li><strong>No Data Monetization:</strong> Your submitted resumes, scientific papers, and academic transcripts will never be sold or used for commercial advertising.</li>
              <li><strong>Encrypted Transport:</strong> All communication between your client device and Supabase cloud infrastructure is encrypted using SSL/TLS 256-bit encryption.</li>
            </ul>
          </div>

          {/* Section 3: User Obligations */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <AlertCircle className="w-4 h-4" />
              <span>3. User Code of Conduct & Academic Integrity</span>
            </div>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              By using this portal, candidates and institutional users agree to submit authentic academic degrees, truthful analytical laboratory experience, and genuine corporate job postings. Submitting fraudulent pharmacopoeia certificates or plagiarized research proposals will result in permanent suspension.
            </p>
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
          <input
            id="terms-checkbox"
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-950 cursor-pointer"
          />
          <label htmlFor="terms-checkbox" className="text-xs text-slate-300 cursor-pointer select-none">
            I have reviewed and acknowledge the <strong className="text-white">Ministry of Ayush Ecosystem Disclaimer</strong> and agree to the <strong className="text-white">Privacy Policy</strong> in accordance with national digital data regulations.
          </label>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <span className="text-[11px] text-slate-500 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            DPDP Act 2023 & ABDM FHIR Standards Aligned
          </span>

          <button
            onClick={handleAccept}
            disabled={!agreed}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
          >
            <span>Accept & Proceed</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
