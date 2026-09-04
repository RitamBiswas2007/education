import React from 'react';
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
  Users 
} from 'lucide-react';
import { INSTITUTION_ANALYTICS } from '../data/mockData';

export default function InstitutionAnalytics() {
  const { totalStudentsAssessed, overallReadinessRate, curriculumAlignmentIndex, industryPartnershipsCount, skillGapHeatmap, domainDemand } = INSTITUTION_ANALYTICS;

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
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-emerald-500">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Total Students Assessed</span>
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white mt-2">{totalStudentsAssessed.toLocaleString()}</div>
          <span className="text-emerald-400 text-xs font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14.2% this quarter
          </span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-cyan-500">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Placement Readiness</span>
            <GraduationCap className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-cyan-400 mt-2">{overallReadinessRate}%</div>
          <span className="text-slate-400 text-xs font-medium mt-1 block">
            Target: 80% Placement Eligibility
          </span>
        </div>

        <div className="glass-panel rounded-2xl p-5 border-l-4 border-l-indigo-500">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-semibold uppercase">Curriculum Alignment</span>
            <PieChart className="w-5 h-5 text-indigo-400" />
          </div>
          <div className="text-3xl font-extrabold text-indigo-300 mt-2">{curriculumAlignmentIndex}%</div>
          <span className="text-slate-400 text-xs font-medium mt-1 block">
            Ayush Industry Baseline Met
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

      {/* Main Grid: Skill Gap Heatmap & Domain Demand */}
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

        {/* Right Col: High Growth Domain Demand */}
        <div className="glass-panel rounded-2xl p-6 space-y-6">
          <h3 className="text-md font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> High-Demand Ayush Sectors
          </h3>
          <p className="text-slate-400 text-xs">Sectoral hiring velocity and open positions</p>

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

          <div className="pt-4 border-t border-slate-800 text-center">
            <button className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs transition-all flex items-center justify-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> Download Full Analytics CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
