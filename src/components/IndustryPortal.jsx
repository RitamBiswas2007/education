import React, { useState } from 'react';
import {
  ArrowLeft,
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
  Users,
  DollarSign,
  MapPin,
  Briefcase
} from 'lucide-react';
import { MASTER_DOMAINS } from '../data/skillCareerEngine';

export default function IndustryPortal({
  jobs = [],
  onAddJob,
  candidates = [],
  onUpdateCandidateStatus,
  currentUser,
  applications = []
}) {
  const [tabHistory, setTabHistory] = useState(['candidates']); // navigation history stack
  const activeSubTab = tabHistory[tabHistory.length - 1];

  const navigateTo = (tab) => {
    setTabHistory(prev => [...prev, tab]);
  };

  const navigateBack = () => {
    setTabHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };

  // Derive organization / recruiter name dynamically
  const orgName = currentUser?.institution || currentUser?.name || 'Ayush Industry Innovation Labs';

  // Post Job Form State
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState(orgName);
  const [domain, setDomain] = useState('phytochemistry');
  const [stipend, setStipend] = useState('₹35,000 / month (Stipend + Pre-Placement Offer)');
  const [duration, setDuration] = useState('6 Months');
  const [location, setLocation] = useState('Sahibabad, UP / Hybrid');
  const [workMode, setWorkMode] = useState('Hybrid');
  const [skillsRequired, setSkillsRequired] = useState('Phytochemistry & QC, Good Manufacturing Practice (Schedule T), HPTLC');
  const [description, setDescription] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter real applicants who applied to corporate postings
  const realApplicants = (applications || []).filter(app => {
    const cleanOrg = orgName.toLowerCase();
    if (cleanOrg && (
      (app.company && app.company.toLowerCase().includes(cleanOrg)) ||
      (app.posterName && app.posterName.toLowerCase().includes(cleanOrg))
    )) return true;
    if (currentUser?.id && app.posterId === currentUser.id) return true;
    if (app.posterType === 'industry') return true;
    return false;
  });

  // Candidates list: real applicants take precedence
  const displayCandidates = realApplicants.length > 0
    ? realApplicants.map(app => ({
        id: app.id,
        name: app.studentName || 'Student Candidate',
        institution: app.studentInstitution || 'Ayush Institute',
        degree: app.studentDegree || 'Degree in Progress',
        skillScore: app.studentScore || 0,
        matchScore: app.matchScore || 88,
        status: app.status || 'Under Review',
        topSkills: Array.isArray(app.studentSkills) && app.studentSkills.length > 0 
          ? app.studentSkills 
          : ['Phytochemistry', 'GMP Compliance'],
        appliedRole: app.jobTitle || 'Corporate Ayush Specialist',
        appliedDate: app.appliedDate || 'Recent',
        studentEmail: app.studentEmail || ''
      }))
    : candidates;

  const handlePostJob = (e) => {
    e.preventDefault();
    if (!jobTitle || !description) return;

    const domainObj = MASTER_DOMAINS.find(d => d.id === domain) || MASTER_DOMAINS[0];

    const newJob = {
      id: `JOB-IND-${Date.now().toString().slice(-6)}`,
      title: jobTitle,
      company: companyName,
      location: `${location} • ${workMode}`,
      mode: workMode,
      stipend,
      duration,
      type: "Corporate Internship to PPO",
      domain: domainObj?.name.split('&')[0].trim() || "Corporate Ayush",
      domainId: domain,
      matchScore: 90,
      skillsRequired: skillsRequired.split(',').map(s => s.trim()),
      description,
      applicantsCount: 0,
      deadline: "30 Oct 2026",
      status: "Active",
      posterType: "industry",
      posterRole: "Corporate Recruiter Partner",
      posterId: currentUser?.id || 'IND-RECRUITER',
      posterName: companyName
    };

    if (onAddJob) {
      onAddJob(newJob);
    }
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      navigateTo('my-listings');
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
                <h2 className="text-2xl font-bold text-white">{orgName}</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-tech flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Industry Partner
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-0.5">Corporate Recruitment, AI Candidate Matching & Placement Hub</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="text-center px-3 border-r border-slate-800">
                <span className="text-xs text-slate-400 block">Total Candidates</span>
                <span className="text-xl font-bold text-cyan-400">{displayCandidates.length}</span>
              </div>
              <div className="text-center px-3">
                <span className="text-xs text-slate-400 block">Active Postings</span>
                <span className="text-xl font-bold text-emerald-400">{jobs.length}</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('post-job')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> Post New Ayush Internship
            </button>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-slate-800/80">
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
            onClick={() => navigateTo('candidates')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${activeSubTab === 'candidates'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
          >
            <Users className="w-4 h-4" /> Candidate AI Matcher & Applications ({displayCandidates.length})
          </button>
          <button
            onClick={() => navigateTo('my-listings')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${activeSubTab === 'my-listings'
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
          >
            <Layers className="w-4 h-4" /> Active Posted Opportunities ({jobs.length})
          </button>
          <button
            onClick={() => navigateTo('post-job')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${activeSubTab === 'post-job'
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
                  <Sparkles className="w-5 h-5 text-cyan-400" /> AI Candidate Match Matrix & Live Applications
                </h3>
                <p className="text-slate-400 text-xs mt-1">
                  Automated skill overlap score comparing student diagnostic profiles against job criteria. Real student applications submitted from the Student Portal.
                </p>
              </div>

              <div className="text-xs text-slate-400">
                Total Candidates: <strong className="text-cyan-400">{displayCandidates.length}</strong>
              </div>
            </div>

            {displayCandidates.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                      <th className="py-3 px-4 font-semibold">Candidate Name</th>
                      <th className="py-3 px-4 font-semibold">Institution & Degree</th>
                      <th className="py-3 px-4 font-semibold">Applied Role</th>
                      <th className="py-3 px-4 font-semibold">Verified Skills</th>
                      <th className="py-3 px-4 font-semibold">Diagnostic & Match Score</th>
                      <th className="py-3 px-4 font-semibold">Application Status</th>
                      <th className="py-3 px-4 font-semibold text-right">Recruiter Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {displayCandidates.map(cand => (
                      <tr key={cand.id} className="hover:bg-slate-800/30 transition-all">
                        <td className="py-3.5 px-4 font-bold text-white">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-extrabold text-xs shrink-0">
                              {cand.name ? cand.name.charAt(0) : 'C'}
                            </div>
                            <div>
                              <div>{cand.name}</div>
                              {cand.studentEmail && (
                                <div className="text-[10px] text-slate-500 font-normal">{cand.studentEmail}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-slate-400">
                          <div className="font-semibold text-slate-200">{cand.degree}</div>
                          <div className="text-[11px] text-slate-500">{cand.institution}</div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-emerald-300">{cand.appliedRole}</td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {(cand.topSkills || []).slice(0, 3).map((sk, idx) => (
                              <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800 text-[10px]">
                                {sk}
                              </span>
                            ))}
                            {(cand.topSkills || []).length > 3 && (
                              <span className="text-[10px] text-slate-500">+{cand.topSkills.length - 3}</span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <span className="font-extrabold text-emerald-400 text-sm">{cand.matchScore}% Match</span>
                            {cand.skillScore > 0 && (
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300">
                                {cand.skillScore}% Diag.
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                            cand.status === 'Shortlisted' || cand.status === 'Shortlisted for Interview'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' 
                              : cand.status === 'Interview Scheduled' 
                                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40' 
                                : cand.status === 'Accepted' || cand.status === 'Offered'
                                  ? 'bg-emerald-500/30 text-emerald-200 border-emerald-400'
                                  : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}>
                            {cand.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <select
                            value={cand.status}
                            onChange={(e) => onUpdateCandidateStatus && onUpdateCandidateStatus(cand.id, e.target.value)}
                            className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-cyan-500 cursor-pointer"
                          >
                            <option value="Under Review">Under Review</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Accepted">Accepted / Offered</option>
                            <option value="Rejected">Not Selected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center space-y-3 bg-slate-900/40 rounded-xl border border-dashed border-slate-800">
                <Users className="w-10 h-10 text-slate-500 mx-auto" />
                <h4 className="text-white font-bold text-sm">No Student Candidates Have Applied Yet</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Opportunities posted by your organization are displayed directly in the Student Portal. Once students apply, their verified profiles and real diagnostic scores appear here in real time.
                </p>
                <button
                  onClick={() => navigateTo('post-job')}
                  className="px-4 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 text-xs font-bold transition-all cursor-pointer"
                >
                  + Post an Opportunity Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUBTAB 2: MY LISTINGS */}
      {activeSubTab === 'my-listings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-400" /> Active Corporate Internship Postings
            </h3>
            <button
              onClick={() => navigateTo('post-job')}
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Post New Role
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map(job => (
              <div key={job.id} className="glass-card rounded-2xl p-5 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-tech inline-block mb-1.5">
                        {job.domain}
                      </span>
                      <h4 className="text-base font-bold text-white">{job.title}</h4>
                      <p className="text-xs text-emerald-400 font-medium">{job.company}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      {job.status}
                    </span>
                  </div>

                  <p className="text-slate-300 text-xs mt-2 line-clamp-2">{job.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-amber-300 font-bold">{job.stipend}</span>
                    <span className="text-slate-400 block text-[11px]">{job.location}</span>
                  </div>

                  <button
                    onClick={() => navigateTo('candidates')}
                    className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 text-xs font-bold border border-slate-800 transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Users className="w-3 h-3" />
                    <span>{job.applicantsCount || 0} Applicants</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 3: POST JOB WIZARD */}
      {activeSubTab === 'post-job' && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FilePlus className="w-5 h-5 text-cyan-400" /> Post Corporate Internship / Placement Opportunity
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Published opportunities appear instantly in the Student Portal for eligible scholars with real-time AI skill compatibility matching.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Internship Opportunity Published Successfully!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Your posting is now live. When students apply from their portal, you can review and shortlist them in real time under <strong>Candidate AI Matcher</strong>.
              </p>
            </div>
          ) : (
            <form onSubmit={handlePostJob} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Opportunity / Role Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayush Bio-Analytics & HPLC QC Associate Intern"
                  value={jobTitle}
                  onChange={e => setJobTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Company / Enterprise Name</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Internship Category / Domain</label>
                  <select
                    value={domain}
                    onChange={e => setDomain(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 text-xs cursor-pointer"
                  >
                    {MASTER_DOMAINS.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.icon} {d.name} ({d.badge})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Monthly Stipend / Salary</label>
                  <input
                    type="text"
                    required
                    value={stipend}
                    onChange={e => setStipend(e.target.value)}
                    placeholder="e.g. ₹35,000 / month"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Duration</label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={e => setDuration(e.target.value)}
                    placeholder="e.g. 6 Months"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Work Mode</label>
                  <select
                    value={workMode}
                    onChange={e => setWorkMode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 text-xs cursor-pointer"
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Required Competencies (Comma-separated)</label>
                <input
                  type="text"
                  required
                  value={skillsRequired}
                  onChange={e => setSkillsRequired(e.target.value)}
                  placeholder="e.g. Phytochemistry & QC, HPLC, Schedule T GMP"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Role Overview & Responsibilities</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Describe the candidate's responsibilities, project deliverables, and learning outcomes..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 text-xs"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('candidates')}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold hover:brightness-110 shadow-lg shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" /> Publish to Student Marketplace
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
