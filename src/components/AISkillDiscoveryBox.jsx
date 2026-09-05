import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  Plus, 
  X, 
  CheckCircle2, 
  Briefcase, 
  ArrowRight, 
  Compass, 
  GraduationCap, 
  TrendingUp, 
  Zap,
  Cpu,
  Check,
  Layers
} from 'lucide-react';
import { 
  MASTER_DOMAINS, 
  searchSkillsAndDomains, 
  findDomainForSkill 
} from '../data/skillCareerEngine';

export default function AISkillDiscoveryBox({
  studentProfile,
  onUpdateProfileSkills
}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState(null);
  const containerRef = useRef(null);

  // Active domains from studentProfile
  const activeDomains = Array.isArray(studentProfile?.interestedDomains) && studentProfile.interestedDomains.length > 0
    ? studentProfile.interestedDomains
    : ['ayurveda', 'phytochemistry'];

  // Active skills from studentProfile
  const activeSkills = Array.isArray(studentProfile?.skills)
    ? studentProfile.skills.map(s => typeof s === 'string' ? s : s.name)
    : [];

  // Search results from AI engine
  const searchResults = searchSkillsAndDomains(query);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Add domain
  const handleAddDomain = (domainId) => {
    const domainObj = MASTER_DOMAINS.find(d => d.id === domainId);
    const domainName = domainObj?.name || domainId;

    if (!activeDomains.includes(domainId)) {
      const updatedDomains = [...activeDomains, domainId];
      const newSkillName = domainObj?.skills?.[0] || domainObj?.name;
      onUpdateProfileSkills(updatedDomains, newSkillName, {
        name: newSkillName,
        category: domainObj?.badge || 'Domain Competency',
        domainId
      });
      setFeedbackMsg({
        title: `Domain Linked: ${domainName.split('&')[0]}`,
        subtitle: '10-MCQ AI Diagnostic Quiz updated with questions from this discipline'
      });
    } else {
      setFeedbackMsg({
        title: `${domainName.split('&')[0]} is already active`,
        subtitle: 'Questions from this domain are included in your diagnostic quiz'
      });
    }

    setTimeout(() => setFeedbackMsg(null), 3200);
    setQuery('');
    setIsOpen(false);
  };

  // Remove domain
  const handleRemoveDomain = (domainId) => {
    if (activeDomains.length <= 1) {
      alert("Please keep at least 1 focus domain active for your diagnostic assessment.");
      return;
    }
    const updatedDomains = activeDomains.filter(d => d !== domainId);
    onUpdateProfileSkills(updatedDomains);
  };

  // Add a specific skill (from search result, click, or typing)
  const handleAddSkill = (skillItemOrName) => {
    const skillName = typeof skillItemOrName === 'string' 
      ? skillItemOrName.trim() 
      : skillItemOrName.name;

    if (!skillName) return;

    // Resolve target domain
    const targetDomainId = typeof skillItemOrName === 'object' && skillItemOrName.domainId
      ? skillItemOrName.domainId
      : findDomainForSkill(skillName);

    const updatedDomains = activeDomains.includes(targetDomainId)
      ? activeDomains
      : [...activeDomains, targetDomainId];

    const category = typeof skillItemOrName === 'object' && skillItemOrName.category
      ? skillItemOrName.category
      : (MASTER_DOMAINS.find(d => d.id === targetDomainId)?.badge || 'Focus Skill');

    onUpdateProfileSkills(updatedDomains, skillName, {
      name: skillName,
      category,
      domainId: targetDomainId
    });

    const domainObj = MASTER_DOMAINS.find(d => d.id === targetDomainId);

    setFeedbackMsg({
      title: `Skill Added: ${skillName}`,
      subtitle: `Mapped to ${domainObj?.name?.split('&')[0] || targetDomainId} • Assessment questions updated!`
    });
    setTimeout(() => setFeedbackMsg(null), 3500);

    setQuery('');
    setIsOpen(false);
  };

  // Remove a specific skill
  const handleRemoveSkill = (skillNameToRemove) => {
    if (activeSkills.length <= 1) {
      alert("Please keep at least 1 skill for your competency radar.");
      return;
    }

    const currentSkills = Array.isArray(studentProfile?.skills) ? studentProfile.skills : [];
    const updatedSkills = currentSkills.filter(s => {
      const sName = typeof s === 'string' ? s : s.name;
      return sName.toLowerCase() !== skillNameToRemove.toLowerCase();
    });

    onUpdateProfileSkills(activeDomains, null, null, updatedSkills);
  };

  // Submit search query via form button / enter key
  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    handleAddSkill(query.trim());
  };

  return (
    <div className="glass-panel-glow rounded-3xl p-6 sm:p-7 border border-emerald-500/30 relative overflow-visible space-y-5" ref={containerRef}>
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>AI Skill-to-Career & Domain Engine</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Discover Your Career Pathways & <span className="gradient-text-ayush">Skill Domains</span>
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm mt-0.5 max-w-2xl">
            Search or select any technology/skill (e.g. <strong>Machine Learning, Python, HPTLC, Molecular Docking, Clinical Trials</strong>) — 
            the AI links it directly to your profile and generates your <strong>10-MCQ Diagnostic Assessment</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>{activeDomains.length} Active Domains</span>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>{activeSkills.length} Tracked Skills</span>
          </span>
        </div>
      </div>

      {/* Feedback Toast Notification */}
      {feedbackMsg && (
        <div className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-400 text-xs animate-in fade-in slide-in-from-top-2 duration-300 flex items-start gap-2.5 shadow-lg shadow-emerald-950/50 relative z-30">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <span className="font-bold text-white block">{feedbackMsg.title}</span>
            <span className="text-[11px] text-emerald-200">{feedbackMsg.subtitle}</span>
          </div>
          <button 
            type="button" 
            onClick={() => setFeedbackMsg(null)}
            className="text-slate-400 hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Search Input Box with AI Dropdown */}
      <div className="relative z-20">
        <form onSubmit={handleCustomSubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-emerald-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search or enter any skill (e.g., Machine Learning, Python, HPTLC, Molecular Docking, Panchakarma)..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              className="w-full pl-12 pr-32 py-3.5 bg-slate-950/90 border-2 border-slate-800 hover:border-emerald-500/50 focus:border-emerald-500 rounded-2xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-xl"
            />
            <button
              type="submit"
              className="absolute right-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Skill</span>
            </button>
          </div>
        </form>

        {/* AI Skill & Career Discovery Panel (In-flow expansion, never overlaps content below) */}
        {isOpen && (
          <div className="mt-3.5 bg-slate-950/95 border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden divide-y divide-slate-800/80 animate-in fade-in duration-200">
            {/* Top Bar with Header & Close Button */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-slate-800">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>{query.trim() ? `AI Suggested Skills & Career Matches for "${query}"` : 'AI Recommended Career Domains & Skills'}</span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-[11px] text-slate-400 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800/60 hover:bg-slate-700 transition-all flex items-center gap-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
                <span>Close Panel</span>
              </button>
            </div>

            {/* 1. AI Detected Skills & Job Roles (Top Priority) */}
            <div className="p-3 sm:p-4 bg-slate-900/40">
              <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider px-2 pb-2 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI Detected Skills & Roles ({searchResults.suggestedSkills.length})</span>
                </span>
                <span className="text-[10px] text-slate-400 lowercase">Click "+ Add" to link to your assessment</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {searchResults.suggestedSkills.map((sk, idx) => {
                  const isSkillAdded = activeSkills.some(s => s.toLowerCase() === sk.name.toLowerCase());
                  return (
                    <div
                      key={idx}
                      onClick={() => handleAddSkill(sk)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between group select-none ${
                        isSkillAdded
                          ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                          : 'bg-slate-900/80 hover:bg-slate-800 border-slate-800 hover:border-cyan-500/50'
                      }`}
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <span className={`text-xs font-bold block truncate ${isSkillAdded ? 'text-emerald-300' : 'text-slate-200 group-hover:text-cyan-300'}`}>
                          {sk.name}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                          {sk.role}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddSkill(sk);
                        }}
                        className={`text-[11px] px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
                          isSkillAdded
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                            : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-sm'
                        }`}
                      >
                        {isSkillAdded ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3 stroke-[3]" />
                            <span>Add</span>
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Direct Career Pathways & Domains */}
            <div className="p-3 sm:p-4 max-h-[340px] overflow-y-auto">
              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-400 uppercase tracking-wider px-2 pb-2">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Matching Career Domains ({searchResults.matchingDomains.length})</span>
                </span>
                <span className="text-[10px] text-slate-500">Click card to link domain</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {searchResults.matchingDomains.map(domain => {
                  const isSelected = activeDomains.includes(domain.id);
                  return (
                    <div
                      key={domain.id}
                      onClick={() => handleAddDomain(domain.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-2.5 ${
                        isSelected 
                          ? 'bg-emerald-950/30 border-emerald-500/60 ring-1 ring-emerald-500/30' 
                          : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-xl shrink-0 mt-0.5">{domain.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-xs font-bold text-white truncate">{domain.name}</h4>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 shrink-0 font-mono">
                            {domain.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{domain.description}</p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {domain.careerRoles.slice(0, 2).map((role, idx) => (
                            <span key={idx} className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                              💼 {role}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 mt-1 ${
                        isSelected ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Selected Skills & Domains Display */}
      <div className="space-y-3 relative z-10 pt-2 border-t border-slate-800/80">
        
        {/* Active Skills List */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-300 font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Your Active Focus Skills ({activeSkills.length}):</span>
            </span>
            <span className="text-[11px] text-cyan-400 font-mono">
              Assessed in Diagnostic Quiz
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {activeSkills.map((skillName, idx) => {
              const domainId = findDomainForSkill(skillName);
              const domObj = MASTER_DOMAINS.find(d => d.id === domainId);
              return (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-cyan-950/40 text-cyan-200 border border-cyan-500/40 flex items-center gap-2 shadow-sm"
                >
                  <span className="text-sm">{domObj?.icon || '⚡'}</span>
                  <span>{skillName}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skillName)}
                    title={`Remove ${skillName}`}
                    className="hover:text-rose-400 hover:bg-rose-500/20 p-0.5 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        {/* Active Domains List */}
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-400 font-semibold flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              <span>Assessing Career Disciplines ({activeDomains.length}):</span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {activeDomains.map(domainId => {
              const dObj = MASTER_DOMAINS.find(d => d.id === domainId);
              if (!dObj) return null;
              return (
                <span
                  key={domainId}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-200 border border-emerald-500/40 flex items-center gap-2 shadow-sm"
                >
                  <span>{dObj.icon}</span>
                  <span>{dObj.name.split('&')[0]}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDomain(domainId)}
                    title="Remove domain"
                    className="hover:text-rose-400 hover:bg-rose-500/20 p-0.5 rounded-full transition-colors cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>

        {/* Diagnostic Quiz Guarantee Notice */}
        <div className="p-2.5 rounded-xl bg-emerald-500/8 border border-emerald-500/20 text-[11px] text-slate-300 flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>
            <strong>AI Quiz Synchronized:</strong> Every skill and domain active above is strictly evaluated in your 10-MCQ Diagnostic Assessment.
          </span>
        </div>
      </div>

      {/* Quick Discovery Chips for Instant Addition */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
        <span className="text-slate-500 font-medium">Quick Add:</span>
        {[
          { id: 'ai_healthtech', label: '🤖 AI & Machine Learning' },
          { id: 'data_science', label: '📊 Healthcare Data Science' },
          { id: 'bioinformatics', label: '🧬 Bioinformatics & Genomics' },
          { id: 'phytochemistry', label: '🧪 Phytochemistry & HPLC' },
          { id: 'herbal_tech', label: '💊 Herbal Drug Formulation' },
          { id: 'ayurveda', label: '🌿 Ayurveda Therapeutics' },
          { id: 'tele_ayush', label: '💻 Tele-Ayush & ABDM' },
          { id: 'clinical_research', label: '📋 Clinical Trials & GCP' }
        ].map(item => {
          const isAdded = activeDomains.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => isAdded ? handleRemoveDomain(item.id) : handleAddDomain(item.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                isAdded
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <span>{item.label}</span>
              {isAdded && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
