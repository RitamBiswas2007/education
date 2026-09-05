import React, { useState } from 'react';
import {
  Building2,
  CheckCircle2,
  ChevronRight,
  Clock,
  FilePlus,
  Filter,
  Layers,
  PlusCircle,
  Search,
  Sparkles,
  Star,
  UserCheck,
  Users
} from 'lucide-react';

export default function IndustryPortal({
  jobs,
  onAddJob,
  candidates,
  onUpdateCandidateStatus,
  currentUser
}) {
  const [activeSubTab, setActiveSubTab] = useState('candidates'); // 'candidates', 'post-job', 'my-listings'

  // Post Job Form State
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState(currentUser?.institution || 'Dabur Research & Development Centre');
  const [domain, setDomain] = useState('Ayush Bio-Tech');
  const [stipend, setStipend] = useState('₹30,000 / month');
  const [duration, setDuration] = useState('6 Months');
  const [location, setLocation] = useState('Sahibabad, UP / Remote');
  const [skillsRequired, setSkillsRequired] = useState('Phytochemistry & QC, Good Manufacturing Practice (GMP)');
  const [description, setDescription] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handlePostJob = (e) => {
    e.preventDefault();
    if (!jobTitle || !description) return;

    const newJob = {
      id: `JOB-${Math.floor(100 + Math.random() * 900)}`,
      title: jobTitle,
      company: companyName,
      location,
      stipend,
      duration,
      type: "Full-Time Internship",
      domain,
      matchScore: 88,
      skillsRequired: skillsRequired.split(',').map(s => s.trim()),
      description,
      applicantsCount: 1,
      deadline: "30 Sep 2026",
      status: "Active"
    };

    onAddJob(newJob);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setActiveSubTab('my-listings');
      setJobTitle('');
      setDescription('');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Industry Header */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-950/50">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-white">Dabur & Ayush Industry Portal</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-tech flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Industry Partner
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-0.5">Recruitment, AI Candidate Matching & Research Sabbaticals Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveSubTab('post-job')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <PlusCircle className="w-4 h-4" /> Post New Ayush Internship
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setActiveSubTab('candidates')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${activeSubTab === 'candidates'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
          >
            <Users className="w-4 h-4" /> Candidate AI Matcher & Applications
          </button>
          <button
            onClick={() => setActiveSubTab('my-listings')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${activeSubTab === 'my-listings'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
          >
            <Layers className="w-4 h-4" /> Active Posted Opportunities ({jobs.length})
          </button>
          <button
            onClick={() => setActiveSubTab('post-job')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 ${activeSubTab === 'post-job'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
          >
            <FilePlus className="w-4 h-4" /> Post Opportunity Wizard
          </button>
        </div>
      </div>

      {/* SUBTAB 1: CANDIDATE MATCH & RANKING TABLE */}
      {activeSubTab === 'candidates' && (
        <div className="space-y-6">
          <div className="glass-panel rounded-2xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" /> AI Candidate Match Matrix
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Automated skill overlap score comparing student diagnostic profiles against job criteria
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">Candidate Name</th>
                    <th className="py-3 px-4 font-semibold">Institution & Degree</th>
                    <th className="py-3 px-4 font-semibold">Applied Role</th>
                    <th className="py-3 px-4 font-semibold">Verified Skills</th>
                    <th className="py-3 px-4 font-semibold">AI Match Score</th>
                    <th className="py-3 px-4 font-semibold">Application Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {candidates.map(cand => (
                    <tr key={cand.id} className="hover:bg-slate-800/30 transition-all">
                      <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-extrabold text-xs">
                          {cand.name.charAt(0)}
                        </div>
                        {cand.name}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        <div>{cand.degree}</div>
                        <div className="text-[11px] text-slate-500">{cand.institution}</div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-slate-200">{cand.appliedRole}</td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {cand.topSkills.map((sk, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[10px]">
                              {sk}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="font-extrabold text-emerald-400 text-sm">{cand.matchScore}%</span>
                          <span className="text-[10px] text-slate-500">High Match</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${cand.status === 'Shortlisted' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                            cand.status === 'Interview Scheduled' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                              'bg-slate-800 text-slate-400'
                          }`}>
                          {cand.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={cand.status}
                          onChange={(e) => onUpdateCandidateStatus(cand.id, e.target.value)}
                          className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-cyan-500"
                        >
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted">Shortlisted</option>
                          <option value="Interview Scheduled">Interview Scheduled</option>
                          <option value="Accepted">Accepted</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: MY LISTINGS */}
      {activeSubTab === 'my-listings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map(job => (
            <div key={job.id} className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-ayush inline-block mb-2">
                    {job.domain}
                  </span>
                  <h4 className="text-lg font-bold text-white">{job.title}</h4>
                  <p className="text-slate-400 text-xs mt-0.5">{job.company} • {job.location}</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                  {job.status}
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-slate-300 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block text-[10px]">Stipend</span>
                  <span className="font-semibold">{job.stipend}</span>
                </div>
                <div className="border-l border-slate-800 pl-4">
                  <span className="text-slate-500 block text-[10px]">Applicants</span>
                  <span className="font-semibold text-cyan-400">{job.applicantsCount} Candidates</span>
                </div>
                <div className="border-l border-slate-800 pl-4">
                  <span className="text-slate-500 block text-[10px]">Deadline</span>
                  <span className="font-semibold text-slate-300">{job.deadline}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBTAB 3: POST JOB WIZARD */}
      {activeSubTab === 'post-job' && (
        <div className="glass-panel rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-emerald-400" /> Post New Ayush Internship / Job Opportunity
          </h3>
          <p className="text-slate-400 text-xs mb-6">
            The platform will automatically calculate AI skill matches for candidates based on your required skill tags.
          </p>

          {formSubmitted ? (
            <div className="p-6 text-center bg-emerald-500/10 rounded-xl border border-emerald-500/30">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-2" />
              <h4 className="text-lg font-bold text-white">Opportunity Successfully Posted!</h4>
              <p className="text-slate-400 text-xs mt-1">Redirecting to active listings...</p>
            </div>
          ) : (
            <form onSubmit={handlePostJob} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Opportunity Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Phytopharmaceutical QA & Chromatography Associate"
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Domain Classification</label>
                  <select
                    value={domain}
                    onChange={e => setDomain(e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Ayush Bio-Tech">Ayush Bio-Tech</option>
                    <option value="Digital Health & Tech">Digital Health & Tech</option>
                    <option value="Bio-Analytics">Bio-Analytics</option>
                    <option value="Data Science & Clinical">Data Science & Clinical</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Stipend / Compensation</label>
                  <input
                    type="text"
                    value={stipend}
                    onChange={e => setStipend(e.target.value)}
                    className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Required Skills (Comma Separated) *</label>
                <input
                  type="text"
                  required
                  value={skillsRequired}
                  onChange={e => setSkillsRequired(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Role Description & Responsibilities *</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Outline analytical techniques, Ayush GMP compliance, or technical requirements..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-cyan-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-sm hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20"
              >
                Publish Job & Match AI Candidates
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
