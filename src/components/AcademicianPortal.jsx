import React, { useState } from 'react';
import { 
  Award, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Cpu, 
  FileText, 
  FlaskConical, 
  GraduationCap, 
  Lightbulb, 
  Send, 
  Sparkles, 
  Users 
} from 'lucide-react';
import { INITIAL_FACULTY_PROGRAMS, INITIAL_RESEARCH_CHALLENGES } from '../data/mockData';

export default function AcademicianPortal({ currentUser }) {
  const [activeTab, setActiveTab] = useState('fdp'); // 'fdp', 'research', 'guest'

  const [appliedFdp, setAppliedFdp] = useState([]);
  const [submittedProposals, setSubmittedProposals] = useState([]);

  // Proposal Modal State
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [proposalText, setProposalText] = useState('');
  const [proposalSuccess, setProposalSuccess] = useState(false);

  const facultyName = currentUser?.name || "Dr. Rajeshwari V. Sen";
  const facultyInstitution = currentUser?.institution || "National Institute of Ayurveda, Jaipur";

  const handleApplyFdp = (id) => {
    if (!appliedFdp.includes(id)) {
      setAppliedFdp(prev => [...prev, id]);
    }
  };

  const handleSubmitProposal = (e) => {
    e.preventDefault();
    if (!selectedChallenge || !proposalText) return;

    setSubmittedProposals(prev => [...prev, selectedChallenge.id]);
    setProposalSuccess(true);
    setTimeout(() => {
      setProposalSuccess(false);
      setSelectedChallenge(null);
      setProposalText('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Academician Banner */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-950/50 font-bold">
              <GraduationCap className="w-9 h-9" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-white">{facultyName}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-ayush flex items-center gap-1">
                  Professor & Head of Department
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-0.5">
                Dept. of Dravyaguna & Phytochemistry • {facultyInstitution}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-xs text-slate-400 block">FDP Credits</span>
              <span className="text-xl font-bold text-amber-400">45 Credits</span>
            </div>
            <div className="text-center px-3">
              <span className="text-xs text-slate-400 block">Research Grants</span>
              <span className="text-xl font-bold text-emerald-400">₹24.5 Lakhs</span>
            </div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('fdp')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === 'fdp' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Faculty Development & Industry Sabbaticals
          </button>
          <button
            onClick={() => setActiveTab('research')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === 'research' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FlaskConical className="w-4 h-4" /> Industry Research & Consultancy Grants
          </button>
          <button
            onClick={() => setActiveTab('guest')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${
              activeTab === 'guest' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" /> Guest Speaker & Mentorship Desk
          </button>
        </div>
      </div>

      {/* TAB 1: FACULTY DEVELOPMENT & SABBATICALS */}
      {activeTab === 'fdp' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_FACULTY_PROGRAMS.map(fdp => {
            const isApplied = appliedFdp.includes(fdp.id);
            return (
              <div key={fdp.id} className="glass-card rounded-2xl p-6 flex flex-col justify-between space-y-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-ayush inline-block mb-2">
                    {fdp.mode}
                  </span>
                  <h4 className="text-lg font-bold text-white">{fdp.title}</h4>
                  <p className="text-amber-400 text-xs font-medium mt-1">{fdp.organizer}</p>
                  <p className="text-slate-400 text-xs mt-2">{fdp.targetFaculty}</p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {fdp.skillsCovered.map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-300 border border-slate-800">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 block">{fdp.duration}</span>
                    <span className="text-emerald-400 font-semibold">{fdp.stipendProvided}</span>
                  </div>

                  <button
                    onClick={() => handleApplyFdp(fdp.id)}
                    disabled={isApplied}
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 ${
                      isApplied 
                        ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-lg shadow-amber-500/20'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Sabbatical Registered
                      </>
                    ) : (
                      <>
                        Apply for Sabbatical <ChevronRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: RESEARCH & CONSULTANCY MARKETPLACE */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {INITIAL_RESEARCH_CHALLENGES.map(res => {
              const isSubmitted = submittedProposals.includes(res.id);
              return (
                <div key={res.id} className="glass-panel rounded-2xl p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2 py-0.5 rounded text-[11px] bg-slate-800 text-cyan-300 font-semibold border border-slate-700">
                        {res.sponsor}
                      </span>
                      <h4 className="text-base font-bold text-white mt-2">{res.title}</h4>
                    </div>
                    <span className="text-emerald-400 font-extrabold text-sm">{res.grantAmount}</span>
                  </div>

                  <p className="text-slate-400 text-xs">
                    Target Domain: {res.requiredDomain} • Timeline: {res.timeline}
                  </p>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{res.proposalsCount} Proposals Submitted</span>

                    <button
                      onClick={() => setSelectedChallenge(res)}
                      disabled={isSubmitted}
                      className={`px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                        isSubmitted
                          ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                          : 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:brightness-110 shadow-lg'
                      }`}
                    >
                      {isSubmitted ? 'Proposal Under Review' : 'Submit Consultancy Proposal'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Proposal Submission Modal */}
          {selectedChallenge && (
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="glass-panel rounded-2xl p-6 max-w-lg w-full space-y-4 border border-amber-500/30">
                <h3 className="text-lg font-bold text-white">
                  Submit Proposal: {selectedChallenge.title}
                </h3>
                <p className="text-xs text-amber-400 font-semibold">Grant Value: {selectedChallenge.grantAmount}</p>

                {proposalSuccess ? (
                  <div className="p-4 text-center bg-emerald-500/20 text-emerald-300 rounded-xl">
                    <CheckCircle2 className="w-8 h-8 mx-auto mb-1" /> Proposal Submitted to {selectedChallenge.sponsor}!
                  </div>
                ) : (
                  <form onSubmit={handleSubmitProposal} className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-300 font-semibold mb-1">Abstract & Methodology Outline</label>
                      <textarea
                        rows="5"
                        required
                        placeholder="Summarize your department's analytical facilities, proposed experimental protocol, and expected milestones..."
                        value={proposalText}
                        onChange={e => setProposalText(e.target.value)}
                        className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-amber-500"
                      ></textarea>
                    </div>

                    <div className="flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedChallenge(null)}
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:brightness-110"
                      >
                        Submit Final Proposal
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: GUEST SPEAKER & MENTORSHIP DESK */}
      {activeTab === 'guest' && (
        <div className="glass-panel rounded-2xl p-6">
          <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" /> Book Industry Experts for Campus Guest Lectures
          </h3>
          <p className="text-slate-400 text-xs mb-6">
            Directly invite verified Ayush industry R&D directors, biostatisticians, and digital health leads to address your students.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Dr. Arvind Vaidya", role: "VP of Quality Control", company: "Himalaya Wellness", topic: "HPLC Method Validation in Phytopharmaceuticals" },
              { name: "Sunita Deshmukh", role: "Director of Digital Health", company: "Tele-Ayush India", topic: "ABDM Interoperability & FHIR Standards" },
              { name: "Dr. K. N. Swamy", role: "Principal Scientist", company: "CSIR-CIMAP", topic: "Botanical Marker Standardization" }
            ].map((speaker, idx) => (
              <div key={idx} className="glass-card rounded-xl p-4 space-y-3">
                <h4 className="font-bold text-white text-sm">{speaker.name}</h4>
                <p className="text-xs text-amber-400">{speaker.role} • {speaker.company}</p>
                <p className="text-slate-300 text-xs font-medium">Lecture Topic: "{speaker.topic}"</p>
                <button className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-400 text-xs font-bold transition-all">
                  Request Session Slot
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
