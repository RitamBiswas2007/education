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
  Cpu
} from 'lucide-react';
import { MASTER_DOMAINS, searchSkillsAndDomains } from '../data/skillCareerEngine';

export default function AISkillDiscoveryBox({
  studentProfile,
  onUpdateProfileSkills
}) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Active domains and skills from studentProfile
  const activeDomains = Array.isArray(studentProfile?.interestedDomains) && studentProfile.interestedDomains.length > 0
    ? studentProfile.interestedDomains
    : ['ayurveda', 'phytochemistry'];

  const activeSkills = Array.isArray(studentProfile?.skills)
    ? studentProfile.skills.map(s => typeof s === 'string' ? s : s.name)
    : [];

  // Search results
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
    if (!activeDomains.includes(domainId)) {
      const updatedDomains = [...activeDomains, domainId];
      const domainObj = MASTER_DOMAINS.find(d => d.id === domainId);
      
      // Auto-add default skill if available
      const newSkillName = domainObj?.skills?.[0] || domainObj?.name;
      onUpdateProfileSkills(updatedDomains, newSkillName);
    }
    setQuery('');
    setIsOpen(false);
  };

  // Remove domain
  const handleRemoveDomain = (domainId) => {
    if (activeDomains.length <= 1) {
      alert("Please keep at least 1 focus domain selected.");
      return;
    }
    const updatedDomains = activeDomains.filter(d => d !== domainId);
    onUpdateProfileSkills(updatedDomains);
  };

  // Select a skill from AI dropdown
  const handleSelectSkill = (skillObj) => {
    const updatedDomains = activeDomains.includes(skillObj.domainId)
      ? activeDomains
      : [...activeDomains, skillObj.domainId];

    onUpdateProfileSkills(updatedDomains, skillObj.name);
    setQuery('');
    setIsOpen(false);
  };

  // Submit custom written skill/domain
  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Check if query matches any domain directly or assign to smart general domain
    const matchedDomain = MASTER_DOMAINS.find(d => 
      d.name.toLowerCase().includes(query.toLowerCase()) || 
      d.id.toLowerCase().includes(query.toLowerCase()) ||
      d.careerRoles.some(r => r.toLowerCase().includes(query.toLowerCase()))
    );

    const targetDomainId = matchedDomain ? matchedDomain.id : (query.toLowerCase().includes('ai') || query.toLowerCase().includes('learn') || query.toLowerCase().includes('data') ? 'ai_healthtech' : 'phytochemistry');
    const updatedDomains = activeDomains.includes(targetDomainId)
      ? activeDomains
      : [...activeDomains, targetDomainId];

    onUpdateProfileSkills(updatedDomains, query.trim());
    setQuery('');
    setIsOpen(false);
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
            Type any skill (e.g. <strong>AI, Machine Learning, Python, HPTLC, Clinical Research, Bioinformatics</strong>) — 
            the AI dynamically recommends career tracks and maps your 10-MCQ Diagnostic Quiz!
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>{activeDomains.length} Active Domains</span>
          </span>
        </div>
      </div>

      {/* Search Input Box with AI Dropdown */}
      <div className="relative z-20">
        <form onSubmit={handleCustomSubmit} className="relative">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-emerald-400 absolute left-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Enter any skill or technology (e.g., AI, Machine Learning, HPTLC, Python, Genomics, Dravyaguna)..."
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

        {/* AI Dropdown Menu (Appears instantly as user types or focuses) */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-950/98 backdrop-blur-2xl border border-emerald-500/40 rounded-2xl shadow-2xl overflow-hidden z-50 max-h-[420px] overflow-y-auto divide-y divide-slate-800/80">
            {/* 1. Direct Career Pathways & Domains */}
            <div className="p-3">
              <div className="flex items-center justify-between text-[11px] font-bold text-emerald-400 uppercase tracking-wider px-2 pb-2">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Matching Career Domains ({searchResults.matchingDomains.length})</span>
                </span>
                <span className="text-[10px] text-slate-500">Click to link domain</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
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

            {/* 2. Specific Matching Skills & Job Roles */}
            <div className="p-3 bg-slate-900/40">
              <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider px-2 pb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>AI Detected Skills & Job Roles</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {searchResults.suggestedSkills.map((sk, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectSkill(sk)}
                    className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 block">{sk.name}</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Role: {sk.role}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 px-1.5 py-0.5 rounded bg-slate-950 group-hover:text-white border border-slate-800 shrink-0 ml-2">
                      + Add
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Active Selected Domains & Skills */}
      <div className="space-y-2 relative z-10 pt-1 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400 font-semibold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Your Selected Career Domains (Determines Quiz & Industry Radar):</span>
          </span>
          <span className="text-[11px] text-emerald-400 font-mono">
            {activeDomains.length} Active
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

      {/* Quick Discovery Chips for Instant Addition */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
        <span className="text-slate-500 font-medium">Quick Explore:</span>
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
