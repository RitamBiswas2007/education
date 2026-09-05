import React, { useState } from 'react';
import { 
  AlertTriangle, 
  BarChart3, 
  Building, 
  CheckCircle2, 
  Download, 
  FileSpreadsheet, 
  GraduationCap, 
  PieChart, 
  ShieldAlert, 
  TrendingUp, 
  Users,
  ArrowLeft,
  FileCheck2
} from 'lucide-react';
import { INSTITUTION_ANALYTICS } from '../data/mockData';

export default function InstitutionAnalytics({ jobs = [], applications = [], studentProfile = null }) {
  const [tabHistory, setTabHistory] = useState(['overview']); // navigation history stack
  const activeTab = tabHistory[tabHistory.length - 1];

  const navigateTo = (tab) => {
    setTabHistory(prev => [...prev, tab]);
  };

  const navigateBack = () => {
    setTabHistory(prev => prev.length > 1 ? prev.slice(0, -1) : prev);
  };

  const { totalStudentsAssessed, overallReadinessRate, curriculumAlignmentIndex, industryPartnershipsCount, skillGapHeatmap, domainDemand } = INSTITUTION_ANALYTICS;

  // Compute live dynamic aggregates from real state
  const liveTotalAssessed = totalStudentsAssessed + (studentProfile && studentProfile.quizTaken ? 1 : 0);
  const liveActiveOpportunities = jobs.length || 8;
  const liveApplicationsCount = applications.length;

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-950/50 font-bold">
              <BarChart3 className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-white">Ministry of Ayush & Institutional Analytics</h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold badge-tech flex items-center gap-1">
                  National Analytics & Audit Engine
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-0.5">
                Batch Skill Mapping, Placement Readiness Metrics & Industry Alignment Trends
              </p>
            </div>
          </div>

          <button className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-xs hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-indigo-500/20">
            <Download className="w-4 h-4" /> Export NAAC / Ayush Audit Report
          </button>
        </div>

        {/* Sub Navigation Tabs */}
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
            onClick={() => navigateTo('overview')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" /> Skill Gap Heatmap & Readiness KPIs
          </button>

          <button
            onClick={() => navigateTo('sectors')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'sectors'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> High-Demand Ayush Sectors
          </button>

          <button
            onClick={() => navigateTo('compliance')}
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'compliance'
                ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileCheck2 className="w-4 h-4" /> NAAC / Ayush Compliance Audit
          </button>
        </div>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Students Assessed</span>
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mt-2">{liveTotalAssessed.toLocaleString()}</div>
          <span className="text-emerald-400 text-xs font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> Dynamic Live Tracking
          </span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-cyan-500">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Active Opportunities</span>
            <GraduationCap className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-400 mt-2">{liveActiveOpportunities}</div>
          <span className="text-slate-400 text-xs font-medium mt-1 block">
            Academic Labs & Corporate Openings
          </span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Real Applications Logged</span>
            <PieChart className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-indigo-300 mt-2">{liveApplicationsCount}</div>
          <span className="text-slate-400 text-xs font-medium mt-1 block">
            Synchronized Across Portals
          </span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Industry MoUs</span>
            <Building className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-extrabold text-amber-400 mt-2">{industryPartnershipsCount}</div>
          <span className="text-amber-400 text-xs font-medium mt-1 block">
            Active Corporate Partners
          </span>
        </div>
      </div>

      {/* TAB 1: OVERVIEW & HEATMAP */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Main Grid: Skill Gap Heatmap & Domain Demand Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Institutional Skill Gap Heatmap */}
            <div className="lg:col-span-2 glass-panel rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-amber-400" /> Institutional Skill Deficiency Index
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Aggregated skill gaps across all Ayush & Tech departments
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {skillGapHeatmap.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-200">{item.category}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-400">Avg Student Score: <strong className="text-emerald-400">{item.currentScore}%</strong></span>
                        <span className="text-slate-400">Industry Required: <strong className="text-cyan-400">{item.targetScore}%</strong></span>
                        <span className="px-2 py-0.5 rounded font-bold bg-rose-500/20 text-rose-300">
                          Deficiency: {item.gap}%
                        </span>
                      </div>
                    </div>

                    {/* Visual Progress Bar */}
                    <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 bottom-0 bg-cyan-500/30 rounded-full" 
                        style={{ width: `${item.targetScore}%` }}
                      ></div>
                      <div 
                        className="absolute top-0 bottom-0 bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full" 
                        style={{ width: `${item.currentScore}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-xs text-indigo-200 flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-indigo-300 font-bold mb-0.5">Curriculum Action Plan Recommended:</strong>
                  The institution exhibits a 23% gap in <em>Tele-Ayush & Digital Health</em> and <em>Data Science</em>. Introduce 15-hour credit micro-modules to bridge gap before upcoming hiring drive.
                </div>
              </div>
            </div>

            {/* Right Col: High Growth Domain Demand Preview */}
            <div className="glass-panel rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" /> High-Demand Ayush Sectors
                  </h3>
                  <p className="text-slate-400 text-xs">Sectoral hiring velocity</p>
                </div>
                <button
                  onClick={() => navigateTo('sectors')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  View All →
                </button>
              </div>

              <div className="space-y-4">
                {domainDemand.map((dom, idx) => (
                  <div key={idx} className="glass-card rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-xs">{dom.name}</h4>
                      <span className="text-slate-400 text-[11px] block mt-0.5">{dom.positions} Active Hiring Vacancies</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs">
                      {dom.growth}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <button 
                  onClick={() => navigateTo('compliance')}
                  className="w-full py-2.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 font-bold text-xs transition-all flex items-center justify-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4" /> View NAAC Audit Compliance
                </button>
                <button className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Download Full Analytics CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SECTORS */}
      {activeTab === 'sectors' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={navigateBack}
              className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </button>
            <span className="text-xs text-slate-400">National Ayush Industry Recruitment Data</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {domainDemand.map((dom, idx) => (
              <div key={idx} className="glass-panel rounded-2xl p-6 space-y-4 border border-slate-800">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white">{dom.name}</h3>
                    <p className="text-slate-400 text-xs mt-1">National corporate recruitment stream</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-sm">
                    {dom.growth}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs flex items-center justify-between">
                  <span className="text-slate-400">Total Open Roles:</span>
                  <span className="text-white font-extrabold text-sm">{dom.positions} Active Positions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: COMPLIANCE AUDIT */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={navigateBack}
              className="px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Overview</span>
            </button>
            <span className="text-xs text-slate-400">NAAC Criteria 1.1.3 & Ayush Skill Alignment</span>
          </div>

          <div className="glass-panel rounded-2xl p-6 space-y-6 border border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" /> National Accreditation Readiness Index
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">Audited for compliance against Ministry of Ayush 2026 guidelines</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-xs">
                Grade A+ Ready
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block mb-1">Curriculum Alignment</span>
                <span className="text-xl font-bold text-emerald-400">{curriculumAlignmentIndex}%</span>
                <span className="text-[11px] text-slate-500 block mt-1">Meets Industry Standard</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block mb-1">Active Industry MoUs</span>
                <span className="text-xl font-bold text-cyan-400">{industryPartnershipsCount} MOUs</span>
                <span className="text-[11px] text-slate-500 block mt-1">Dabur, Himalaya, Patanjali</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-400 block mb-1">Placement Eligibility</span>
                <span className="text-xl font-bold text-indigo-300">{overallReadinessRate}%</span>
                <span className="text-[11px] text-slate-500 block mt-1">Students Industry-Certified</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
