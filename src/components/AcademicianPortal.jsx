import React, { useState } from 'react';
import { 
  ArrowLeft,
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
  Users,
  PlusCircle,
  Briefcase,
  Layers,
  FilePlus,
  Clock,
  DollarSign,
  MapPin,
  Check,
  Building2,
  Filter
} from 'lucide-react';
import { INITIAL_FACULTY_PROGRAMS, INITIAL_RESEARCH_CHALLENGES } from '../data/mockData';
import { MASTER_DOMAINS } from '../data/skillCareerEngine';

export default function AcademicianPortal({ 
  currentUser,
  opportunities = [],
  onAddOpportunity,
  applications = [],
  onUpdateApplicationStatus
}) {
  const [tabHistory, setTabHistory] = useState(['fdp']); // navigation history stack
  const activeTab = tabHistory[tabHistory.length - 1];

  const navigateTo = (tab) => {
    setTabHistory(prev => [...prev, tab]);
  };

  const navigateBack = () => {
    setTabHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };

  const [appliedFdp, setAppliedFdp] = useState([]);
  const [submittedProposals, setSubmittedProposals] = useState([]);

  // Proposal Modal State
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [proposalText, setProposalText] = useState('');
  const [proposalSuccess, setProposalSuccess] = useState(false);

  // Post Research Internship Form State
  const facultyName = currentUser?.name || "Dr. Rajeshwari V. Sen";
  const facultyInstitution = currentUser?.institution || currentUser?.college || "National Institute of Ayurveda, Jaipur";

  const [projectTitle, setProjectTitle] = useState('');
  const [labDepartment, setLabDepartment] = useState(`Dept. of Dravyaguna & Phytochemistry, ${facultyInstitution}`);
  const [domain, setDomain] = useState('ayurveda');
  const [stipend, setStipend] = useState('₹25,000 / month (AYUSH Council Fellowship)');
  const [duration, setDuration] = useState('6 Months');
  const [workMode, setWorkMode] = useState('On-site Lab');
  const [skillsRequired, setSkillsRequired] = useState('Phytochemistry & QC, Chromatography (HPTLC), Dravyaguna Taxonomy');
  const [description, setDescription] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter opportunities posted by this academician / faculty member
  const myPostings = opportunities.filter(o => 
    o.posterType === 'academician' || 
    o.posterId === currentUser?.id || 
    (o.posterName && o.posterName.toLowerCase().includes(facultyName.toLowerCase())) ||
    (o.company && o.company.toLowerCase().includes(facultyInstitution.toLowerCase()))
  );

  // Filter real student applicants who applied to postings by this academician
  const myApplicants = applications.filter(app => {
    if (app.posterType === 'academician') return true;
    if (currentUser?.id && app.posterId === currentUser.id) return true;
    if (app.posterName && app.posterName.toLowerCase().includes(facultyName.toLowerCase())) return true;
    if (app.company && app.company.toLowerCase().includes(facultyInstitution.toLowerCase())) return true;
    return myPostings.some(p => p.id === app.jobId);
  });

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

  const handleCreateResearchInternship = (e) => {
    e.preventDefault();
    if (!projectTitle || !description) return;

    const domainObj = MASTER_DOMAINS.find(d => d.id === domain) || MASTER_DOMAINS[0];

    const newProject = {
      id: `JOB-ACAD-${Date.now().toString().slice(-6)}`,
      title: projectTitle,
      company: facultyInstitution,
      location: `${facultyInstitution.split(',')[0]} / ${workMode}`,
      mode: workMode,
      stipend,
      duration,
      type: "Academic Research Fellowship",
      domain: domainObj?.name.split('&')[0].trim() || "Academic Ayush Research",
      domainId: domain,
      matchScore: 92,
      skillsRequired: skillsRequired.split(',').map(s => s.trim()),
      description,
      applicantsCount: 0,
      deadline: "30 Oct 2026",
      status: "Active",
      posterType: "academician",
      posterRole: "Faculty Lab Fellowship",
      posterId: currentUser?.id || 'ACAD-FACULTY',
      posterName: facultyName
    };

    if (onAddOpportunity) {
      onAddOpportunity(newProject);
    }

    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setProjectTitle('');
      setDescription('');
      navigateTo('my-postings');
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
                  Professor & Research Principal Investigator
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-0.5">
                Dept. of Dravyaguna & Phytochemistry • {facultyInstitution}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
              <div className="text-center px-3 border-r border-slate-800">
                <span className="text-xs text-slate-400 block">Active Applicants</span>
                <span className="text-xl font-bold text-emerald-400">{myApplicants.length}</span>
              </div>
              <div className="text-center px-3 border-r border-slate-800">
                <span className="text-xs text-slate-400 block">My Lab Postings</span>
                <span className="text-xl font-bold text-cyan-400">{myPostings.length}</span>
              </div>
              <div className="text-center px-3">
                <span className="text-xs text-slate-400 block">FDP Credits</span>
                <span className="text-xl font-bold text-amber-400">45</span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('post-internship')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> Post Research Opportunity
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
            onClick={() => navigateTo('fdp')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'fdp' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Faculty Development & Industry Sabbaticals
          </button>

          <button
            onClick={() => navigateTo('post-internship')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'post-internship' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FilePlus className="w-4 h-4" /> Post Research Opportunity
          </button>

          <button
            onClick={() => navigateTo('applicants')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'applicants' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" /> Student Applicants ({myApplicants.length})
          </button>

          <button
            onClick={() => navigateTo('my-postings')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'my-postings' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Layers className="w-4 h-4" /> My Active Research Postings ({myPostings.length})
          </button>

          <button
            onClick={() => navigateTo('research')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'research' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FlaskConical className="w-4 h-4" /> Industry Grants ({INITIAL_RESEARCH_CHALLENGES.length})
          </button>

          <button
            onClick={() => navigateTo('guest')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'guest' 
                ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold shadow-lg' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" /> Guest Lecture Network
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
                    className={`px-4 py-2 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
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

      {/* TAB 2: POST RESEARCH INTERNSHIP / LAB FELLOWSHIP WIZARD */}
      {activeTab === 'post-internship' && (
        <div className="glass-panel rounded-2xl p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FilePlus className="w-5 h-5 text-amber-400" /> Post Academic Research Fellowship & Lab Internship
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Publish your laboratory's live research projects and clinical fellowships. The opportunity will appear instantly in the Student Portal for eligible scholars to apply with their verified diagnostic scores.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-lg font-bold text-white">Research Fellowship Published Successfully!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Your opportunity is now visible to all students across India. You will see student applicants under the <strong>Student Applicants</strong> tab.
              </p>
            </div>
          ) : (
            <form onSubmit={handleCreateResearchInternship} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Research Project / Internship Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Phytochemistry & Botanical Fingerprinting Research Fellow"
                  value={projectTitle}
                  onChange={e => setProjectTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Laboratory / Department / College</label>
                  <input
                    type="text"
                    required
                    value={labDepartment}
                    onChange={e => setLabDepartment(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Focus Discipline / Domain</label>
                  <select
                    value={domain}
                    onChange={e => setDomain(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs cursor-pointer"
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
                  <label className="text-slate-300 font-bold block">Fellowship Grant / Stipend</label>
                  <input
                    type="text"
                    required
                    value={stipend}
                    onChange={e => setStipend(e.target.value)}
                    placeholder="e.g. ₹25,000 / month (Council Grant)"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-bold block">Work Mode</label>
                  <select
                    value={workMode}
                    onChange={e => setWorkMode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs cursor-pointer"
                  >
                    <option value="On-site Lab">On-site Lab</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Required Skills (Comma-separated)</label>
                <input
                  type="text"
                  required
                  value={skillsRequired}
                  onChange={e => setSkillsRequired(e.target.value)}
                  placeholder="e.g. HPTLC, Phytochemistry, Extraction, Protocol QC"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-bold block">Research Description, Methodology & Eligibility</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Describe the research objective, expected analytical procedures, student responsibilities, and eligibility criteria..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:outline-none focus:border-amber-500 text-xs"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('fdp')}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold hover:brightness-110 shadow-lg shadow-amber-500/20 flex items-center gap-1.5 cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4" /> Publish to Student Marketplace
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TAB 3: STUDENT APPLICANTS & CANDIDATES TABLE */}
      {activeTab === 'applicants' && (
        <div className="glass-panel rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" /> Student Candidates for Your Research Fellowships
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Real student applications submitted from the Student Portal with their verified diagnostic scores and skills.
              </p>
            </div>
            <div className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              Total Applicants: <strong className="text-emerald-400">{myApplicants.length}</strong>
            </div>
          </div>

          {myApplicants.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">Scholar Candidate</th>
                    <th className="py-3 px-4 font-semibold">Institution & Degree</th>
                    <th className="py-3 px-4 font-semibold">Applied Research Fellowship</th>
                    <th className="py-3 px-4 font-semibold">Diagnostic & Match Score</th>
                    <th className="py-3 px-4 font-semibold">Verified Skills</th>
                    <th className="py-3 px-4 font-semibold">Application Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Faculty Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-slate-300">
                  {myApplicants.map(applicant => (
                    <tr key={applicant.id} className="hover:bg-slate-800/30 transition-all">
                      <td className="py-3.5 px-4 font-bold text-white">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center font-bold text-xs shrink-0">
                            {applicant.studentName ? applicant.studentName.charAt(0) : 'S'}
                          </div>
                          <div>
                            <div>{applicant.studentName}</div>
                            <div className="text-[10px] text-slate-500 font-normal">{applicant.studentEmail}</div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-300">
                        <div className="font-semibold text-slate-200">{applicant.studentDegree || 'Scholar Degree'}</div>
                        <div className="text-[11px] text-slate-500">{applicant.studentInstitution || 'Ayush Academy'}</div>
                      </td>

                      <td className="py-3.5 px-4 font-medium text-amber-300">
                        {applicant.jobTitle}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold text-emerald-400">
                            {applicant.studentScore > 0 ? `${applicant.studentScore}% Diagnostic` : 'Pending Score'}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono">
                            {applicant.matchScore}% Match
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {(applicant.studentSkills || []).slice(0, 3).map((sk, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-900 text-slate-300 border border-slate-800">
                              {sk}
                            </span>
                          ))}
                          {(applicant.studentSkills || []).length > 3 && (
                            <span className="text-[10px] text-slate-500">+{applicant.studentSkills.length - 3} more</span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${
                          applicant.status === 'Accepted into Lab' || applicant.status === 'Accepted'
                            ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                            : applicant.status === 'Shortlisted for Interview' || applicant.status === 'Interview Scheduled'
                              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}>
                          {applicant.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <select
                          value={applicant.status}
                          onChange={e => onUpdateApplicationStatus && onUpdateApplicationStatus(applicant.id, e.target.value)}
                          className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2.5 py-1 focus:outline-none focus:border-amber-500 cursor-pointer"
                        >
                          <option value="Under Review">Under Review</option>
                          <option value="Shortlisted for Interview">Shortlisted for Interview</option>
                          <option value="Accepted into Lab">Accepted into Lab</option>
                          <option value="Not Selected">Not Selected</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center space-y-3 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
              <Users className="w-10 h-10 text-slate-500 mx-auto" />
              <h4 className="text-white font-bold text-sm">No Student Candidates Have Applied Yet</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Once students browse your research fellowship and click "Apply 1-Click" in the Student Portal, their profiles and verified diagnostic scores will appear here in real time.
              </p>
              <button
                onClick={() => navigateTo('post-internship')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-amber-400 hover:text-amber-300 text-xs font-bold border border-slate-700 transition-all cursor-pointer"
              >
                + Post a Research Opportunity
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: MY ACTIVE RESEARCH POSTINGS */}
      {activeTab === 'my-postings' && (
        <div className="glass-panel rounded-2xl p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" /> Active Research Fellowships Posted by You
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                These opportunities are visible in the Student Portal under the "Internship Opportunities" catalog.
              </p>
            </div>

            <button
              onClick={() => navigateTo('post-internship')}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" /> Post Another Fellowship
            </button>
          </div>

          {myPostings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {myPostings.map(post => {
                const count = applications.filter(a => a.jobId === post.id).length;
                return (
                  <div key={post.id} className="glass-card rounded-xl p-5 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          {post.domain || 'Academic Research'}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                          {post.mode || 'On-site Lab'}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-base">{post.title}</h4>
                      <p className="text-slate-400 text-xs mt-1 line-clamp-2">{post.description}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-amber-400 font-bold">{post.stipend}</span>
                        <span className="text-slate-500 block text-[11px]">{post.duration}</span>
                      </div>

                      <button
                        onClick={() => navigateTo('applicants')}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>{count} {count === 1 ? 'Applicant' : 'Applicants'}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="p-8 text-center space-y-3 bg-slate-900/40 rounded-xl border border-dashed border-slate-800">
              <p className="text-xs text-slate-400">You haven't posted any research internships or lab fellowships yet.</p>
              <button
                onClick={() => navigateTo('post-internship')}
                className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all cursor-pointer"
              >
                + Post Your First Academic Fellowship
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 5: RESEARCH & CONSULTANCY MARKETPLACE */}
      {activeTab === 'research' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={navigateBack}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sabbaticals
            </button>
            <span className="text-xs text-slate-400">Industry Sponsored Research & Grant Calls</span>
          </div>

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
                      className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
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
            <div className="fixed inset-0 z-50 bg-[#060a12]/90 backdrop-blur-md flex items-center justify-center p-4">
              <div className="glass-panel rounded-2xl p-6 max-w-lg w-full space-y-4 border border-slate-800 shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedChallenge(null)}
                      className="px-2.5 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold border border-slate-800 transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> Back
                    </button>
                    <h3 className="text-sm font-bold text-white">Consultancy Proposal</h3>
                  </div>
                  <button 
                    onClick={() => setSelectedChallenge(null)}
                    className="text-slate-400 hover:text-white text-xs font-bold p-1 rounded-lg hover:bg-slate-800 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {selectedChallenge.title}
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
                        className="px-4 py-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:brightness-110 cursor-pointer"
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

      {/* TAB 6: GUEST SPEAKER & MENTORSHIP DESK */}
      {activeTab === 'guest' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <button
              onClick={navigateBack}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sabbaticals
            </button>
            <span className="text-xs text-slate-400">Campus Guest Lecture Network</span>
          </div>

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
                  <button className="w-full py-2 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-amber-400 text-xs font-bold transition-all cursor-pointer">
                    Request Session Slot
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
