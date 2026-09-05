import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Award, 
  BookOpen, 
  Building2, 
  CheckCircle2, 
  GraduationCap, 
  Layers, 
  MapPin, 
  Phone, 
  School, 
  ShieldCheck, 
  Sparkles, 
  Target, 
  User, 
  AlertCircle,
  Search,
  Cpu,
  RefreshCw,
  Check,
  Plus,
  Compass,
  X
} from 'lucide-react';
import { MASTER_DOMAINS } from '../data/skillCareerEngine';
import { ROLES } from './RoleSelectionModal';
import { 
  STANDARDIZED_DEGREES, 
  POPULAR_RECOGNIZED_COLLEGES, 
  verifyAcademicCredentials 
} from '../lib/academicAIVerifier';

export default function ProfileSetupModal({
  currentUser,
  currentRole,
  onSaveProfileSetup,
  onClose,
  canClose = false
}) {
  // 3-Step Guided Wizard: 1 = Degrees, 2 = College & Year, 3 = Domains & AI Verification
  const [currentStep, setCurrentStep] = useState(1);

  const [selectedRole, setSelectedRole] = useState(currentRole || currentUser?.role || 'student');
  const [fullName, setFullName] = useState(currentUser?.name || currentUser?.full_name || '');
  const [email] = useState(currentUser?.email || '');

  // Degrees Selected (Array)
  const [selectedDegrees, setSelectedDegrees] = useState(() => {
    if (currentUser?.degree && currentUser.degree.trim() && currentUser.degree !== 'Senior Ayush Scholar') {
      return [currentUser.degree];
    }
    return [];
  });
  const [customDegreeInput, setCustomDegreeInput] = useState('');
  const [showCustomDegreeInput, setShowCustomDegreeInput] = useState(false);

  // College / University Input with smart autocomplete
  const [collegeInput, setCollegeInput] = useState(() => {
    if (currentUser?.college && currentUser.college.trim() && !currentUser.college.includes('Evaluation Desk')) {
      return currentUser.college;
    }
    return '';
  });
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);

  // Domains Selected - NO PRE-SELECTION
  const [selectedDomains, setSelectedDomains] = useState(() => {
    if (Array.isArray(currentUser?.interestedDomains) && currentUser.interestedDomains.length > 0) {
      return currentUser.interestedDomains;
    }
    return [];
  });

  // Academic Stage & Portfolio Details - NO PRE-SELECTION
  const [academicYear, setAcademicYear] = useState(currentUser?.year || '');
  const [whatDone, setWhatDone] = useState(currentUser?.whatDone || '');

  // AI Verification State
  const [isVerifyingAI, setIsVerifyingAI] = useState(false);
  const [aiVerificationResult, setAiVerificationResult] = useState(null);
  const [stepError, setStepError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtered College Suggestions
  const filteredColleges = useMemo(() => {
    const q = collegeInput.trim().toLowerCase();
    if (!q) return POPULAR_RECOGNIZED_COLLEGES.slice(0, 6);
    return POPULAR_RECOGNIZED_COLLEGES.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.authority.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [collegeInput]);

  // Degree Toggle
  const handleToggleDegree = (degName) => {
    setStepError('');
    setSelectedDegrees(prev => {
      if (prev.includes(degName)) {
        return prev.filter(d => d !== degName);
      } else {
        return [...prev, degName];
      }
    });
  };

  // Add Custom Degree
  const handleAddCustomDegree = (e) => {
    if (e) e.preventDefault();
    const clean = customDegreeInput.trim();
    if (!clean) return;
    if (!selectedDegrees.includes(clean)) {
      setSelectedDegrees(prev => [...prev, clean]);
    }
    setCustomDegreeInput('');
    setShowCustomDegreeInput(false);
  };

  // Remove degree
  const handleRemoveDegree = (degName) => {
    setSelectedDegrees(prev => prev.filter(d => d !== degName));
  };

  // Select College from dropdown
  const handleSelectCollege = (name) => {
    setCollegeInput(name);
    setShowCollegeDropdown(false);
    setStepError('');
    setAiVerificationResult(null);
  };

  // Toggle Domain
  const handleToggleDomain = (domainId) => {
    setStepError('');
    setSelectedDomains(prev => {
      if (prev.includes(domainId)) {
        return prev.filter(id => id !== domainId);
      } else {
        return [...prev, domainId];
      }
    });
    setAiVerificationResult(null);
  };

  // Step 1 Validation & Proceed
  const handleProceedFromStep1 = () => {
    if (selectedDegrees.length === 0) {
      setStepError('Please select at least one degree you hold or are currently enrolled in.');
      return;
    }
    setStepError('');
    setCurrentStep(2);
  };

  // Step 2 Validation & Proceed
  const handleProceedFromStep2 = () => {
    if (!collegeInput.trim()) {
      setStepError('Please enter or select your college/university name.');
      return;
    }
    setStepError('');
    setCurrentStep(3);
  };

  // Run AI Verification
  const handleRunAIVerification = async () => {
    if (!collegeInput.trim()) {
      setStepError('Please specify your college before verifying.');
      return;
    }

    setStepError('');
    setIsVerifyingAI(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      const result = await verifyAcademicCredentials({
        college: collegeInput,
        degrees: selectedDegrees,
        domains: selectedDomains,
        role: selectedRole
      });
      setAiVerificationResult(result);
    } catch (e) {
      setStepError('AI verification service could not be reached. You can still confirm.');
    } finally {
      setIsVerifyingAI(false);
    }
  };

  // Final Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedDomains.length === 0) {
      setStepError('Please select at least 1 career domain for your 10-MCQ diagnostic assessment.');
      return;
    }

    setIsSubmitting(true);
    setStepError('');

    // If AI verification was not run yet, run it seamlessly
    let finalVerification = aiVerificationResult;
    if (!finalVerification) {
      setIsVerifyingAI(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      finalVerification = await verifyAcademicCredentials({
        college: collegeInput,
        degrees: selectedDegrees,
        domains: selectedDomains,
        role: selectedRole
      });
      setAiVerificationResult(finalVerification);
      setIsVerifyingAI(false);
    }

    const compiledDegreeStr = selectedDegrees.join(' & ');

    const compiledProfile = {
      ...currentUser,
      id: currentUser?.id || `USER-${Date.now().toString().slice(-6)}`,
      name: fullName.trim() || currentUser?.name || 'Ayush Scholar',
      email,
      phone: currentUser?.phone || '+91 98765 43210',
      location: currentUser?.location || 'India',
      role: selectedRole,
      institution: collegeInput.trim(),
      college: collegeInput.trim(),
      degree: compiledDegreeStr,
      qualifications: compiledDegreeStr,
      degreesList: selectedDegrees,
      year: academicYear,
      whatDone: whatDone.trim(),
      interestedDomains: selectedDomains,
      academicVerified: finalVerification ? finalVerification.isValid : true,
      verificationDetails: finalVerification ? {
        status: finalVerification.status,
        confidenceScore: finalVerification.confidenceScore,
        governingBody: finalVerification.governingBody,
        institutionType: finalVerification.institutionType,
        verifiedAt: new Date().toISOString()
      } : null,
      profileCompleted: true
    };

    setTimeout(() => {
      onSaveProfileSetup(compiledProfile);
      setIsSubmitting(false);
    }, 350);
  };

  const roleObj = ROLES.find(r => r.id === selectedRole) || ROLES[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#04070f]/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-5 overflow-y-auto font-sans">
      <div className="relative z-10 w-full max-w-3xl glass-panel rounded-3xl border border-slate-800 shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 shadow-md shadow-emerald-500/20 font-black">
              <Sparkles className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span>Academic & Career Setup</span>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  AI Verified
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Configure your verified credentials before entering your workspace
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`hidden sm:inline-block px-2.5 py-1 rounded-lg text-xs font-bold border ${roleObj.badgeColor}`}>
              {roleObj.title}
            </span>
            {canClose && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3-Step Interactive Progress Stepper */}
        <div className="px-6 py-3 bg-slate-900/50 border-b border-slate-800/60 shrink-0">
          <div className="flex items-center justify-between max-w-xl mx-auto">
            {/* Step 1 Tab */}
            <div 
              onClick={() => setCurrentStep(1)}
              className={`flex items-center gap-2 cursor-pointer transition-all ${
                currentStep === 1 
                  ? 'text-emerald-400 font-bold' 
                  : currentStep > 1 
                    ? 'text-slate-300 hover:text-white' 
                    : 'text-slate-500'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 1 
                  ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/40' 
                  : currentStep > 1 
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' 
                    : 'bg-slate-800 text-slate-400'
              }`}>
                {currentStep > 1 ? '✓' : '1'}
              </div>
              <span className="text-xs">Degrees</span>
            </div>

            <div className={`flex-1 h-0.5 mx-3 transition-colors ${currentStep >= 2 ? 'bg-emerald-500/50' : 'bg-slate-800'}`}></div>

            {/* Step 2 Tab */}
            <div 
              onClick={() => { if (selectedDegrees.length > 0) setCurrentStep(2); }}
              className={`flex items-center gap-2 cursor-pointer transition-all ${
                currentStep === 2 
                  ? 'text-cyan-400 font-bold' 
                  : currentStep > 2 
                    ? 'text-slate-300 hover:text-white' 
                    : 'text-slate-500'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 2 
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40' 
                  : currentStep > 2 
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/40' 
                    : 'bg-slate-800 text-slate-400'
              }`}>
                {currentStep > 2 ? '✓' : '2'}
              </div>
              <span className="text-xs">College</span>
            </div>

            <div className={`flex-1 h-0.5 mx-3 transition-colors ${currentStep >= 3 ? 'bg-emerald-500/50' : 'bg-slate-800'}`}></div>

            {/* Step 3 Tab */}
            <div 
              onClick={() => { if (selectedDegrees.length > 0 && collegeInput.trim()) setCurrentStep(3); }}
              className={`flex items-center gap-2 cursor-pointer transition-all ${
                currentStep === 3 
                  ? 'text-teal-400 font-bold' 
                  : 'text-slate-500'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                currentStep === 3 
                  ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/40' 
                  : 'bg-slate-800 text-slate-400'
              }`}>
                3
              </div>
              <span className="text-xs">Domains & AI</span>
            </div>
          </div>
        </div>

        {/* Validation Error Banner */}
        {stepError && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-medium flex items-center gap-2 shrink-0 animate-shake">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{stepError}</span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          
          {/* STEP 1: Select Degree(s) */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <span>Step 1: Select Your Degree(s)</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click the degree(s) you hold or are pursuing. Multi-degree scholars can choose more than one.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowCustomDegreeInput(!showCustomDegreeInput)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Custom Degree</span>
                </button>
              </div>

              {/* Custom Degree Input Field */}
              {showCustomDegreeInput && (
                <div className="p-3 rounded-xl bg-slate-900/90 border border-emerald-500/40 flex items-center gap-2 animate-fadeIn">
                  <input
                    type="text"
                    placeholder="Type degree name (e.g. B.Sc. Chemistry, M.S. Health Informatics...)"
                    value={customDegreeInput}
                    onChange={e => setCustomDegreeInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddCustomDegree())}
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomDegree}
                    className="px-3.5 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold cursor-pointer transition-all"
                  >
                    Add
                  </button>
                </div>
              )}

              {/* Categorized Degree Pills */}
              <div className="space-y-3.5">
                {STANDARDIZED_DEGREES.map((cat, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {cat.category}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {cat.degrees.map(deg => {
                        const isSelected = selectedDegrees.includes(deg.name);
                        return (
                          <button
                            key={deg.id}
                            type="button"
                            onClick={() => handleToggleDegree(deg.name)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-2 cursor-pointer text-left ${
                              isSelected
                                ? 'bg-emerald-500/20 border-emerald-400 text-emerald-200 shadow-sm shadow-emerald-950 ring-1 ring-emerald-400/40'
                                : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                            }`}
                          >
                            <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'
                            }`}>
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3] text-slate-950" />}
                            </div>
                            <span>{deg.name}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Degrees Badges */}
              {selectedDegrees.length > 0 && (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-slate-400 font-semibold">Active Selection ({selectedDegrees.length}):</span>
                  {selectedDegrees.map((deg, i) => (
                    <span 
                      key={i} 
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold"
                    >
                      <span>{deg}</span>
                      <button 
                        type="button" 
                        onClick={() => handleToggleDegree(deg)}
                        className="hover:text-rose-400 cursor-pointer ml-1 text-sm leading-none"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 2: College / University & Academic Stage */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <School className="w-4 h-4 text-cyan-400" />
                  <span>Step 2: Enter College / Institute Name</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Type your college name or pick from recognized statutory institutions. Stored for your verified credential.
                </p>
              </div>

              {/* College Input Field */}
              <div className="relative">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  College / University / Institute <span className="text-emerald-400">*</span>
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. National Institute of Ayurveda, Jaipur / All India Institute of Ayurveda / IIT Delhi..."
                    value={collegeInput}
                    onChange={(e) => {
                      setCollegeInput(e.target.value);
                      setShowCollegeDropdown(true);
                      setStepError('');
                      setAiVerificationResult(null);
                    }}
                    onFocus={() => setShowCollegeDropdown(true)}
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-medium"
                  />
                  {collegeInput && (
                    <button
                      type="button"
                      onClick={() => {
                        setCollegeInput('');
                        setShowCollegeDropdown(false);
                      }}
                      className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 text-sm cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Live Suggestions Dropdown */}
                {showCollegeDropdown && filteredColleges.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-slate-950 border border-slate-700 rounded-xl shadow-2xl max-h-48 overflow-y-auto p-1 divide-y divide-slate-800/60">
                    <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-900/90 sticky top-0">
                      Recognized Statutory Institutions ({filteredColleges.length})
                    </div>
                    {filteredColleges.map((col, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleSelectCollege(col.name)}
                        className="px-3 py-2 hover:bg-emerald-950/40 hover:text-emerald-300 cursor-pointer rounded-lg text-xs transition-colors flex items-center justify-between"
                      >
                        <div>
                          <span className="font-semibold text-slate-200 block">{col.name}</span>
                          <span className="text-[10px] text-slate-400 block">{col.authority}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-mono shrink-0 ml-2">
                          {col.type}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Pick Buttons */}
              <div className="space-y-1.5">
                <span className="text-[11px] text-slate-400 font-medium">Quick Picks:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "National Institute of Ayurveda (NIA), Jaipur",
                    "All India Institute of Ayurveda (AIIA), New Delhi",
                    "Institute of Medical Sciences, BHU, Varanasi",
                    "Rajiv Gandhi University of Health Sciences (RGUHS)",
                    "IIT Delhi",
                    "Manipal Academy of Higher Education (MAHE)"
                  ].map((name, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSelectCollege(name)}
                      className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-all cursor-pointer"
                    >
                      {name.split(' (')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Academic Stage & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/60">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Academic Stage / Professional Year
                  </label>
                  <select
                    value={academicYear}
                    onChange={e => setAcademicYear(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="1st Professional Year">1st Professional Year</option>
                    <option value="2nd Professional Year">2nd Professional Year</option>
                    <option value="3rd Professional Year">3rd Professional Year</option>
                    <option value="Final Professional Year">Final Professional Year</option>
                    <option value="Rotatory Clinical Intern">Rotatory Clinical Intern</option>
                    <option value="Post-Graduate Scholar (MD/MS/M.Tech)">Post-Graduate Scholar (MD/MS/M.Tech)</option>
                    <option value="Ph.D. Research Scholar">Ph.D. Research Scholar</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Work / Projects Done So Far (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Clinical postings, HPTLC lab, ML dataset, pilot paper..."
                    value={whatDone}
                    onChange={e => setWhatDone(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Career Domains & AI Verification */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Target className="w-4 h-4 text-amber-400" />
                  <span>Step 3: Choose Career Domains & Verify with AI</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select your disciplines. Your <strong>10-MCQ AI Diagnostic Quiz</strong>, radar chart, and jobs map to these choices.
                </p>
              </div>

              {/* Compact Domains Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {MASTER_DOMAINS.map(domain => {
                  const isSelected = selectedDomains.includes(domain.id);
                  return (
                    <div
                      key={domain.id}
                      onClick={() => handleToggleDomain(domain.id)}
                      className={`cursor-pointer rounded-xl p-2.5 border transition-all flex items-start gap-2 select-none ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-500/70 text-white shadow-sm ring-1 ring-emerald-500/40'
                          : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-900/80 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-base shrink-0 mt-0.5">{domain.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="text-[11px] font-bold truncate text-slate-200">
                            {domain.name}
                          </h4>
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'
                          }`}>
                            {isSelected && <Check className="w-2.5 h-2.5 stroke-[3] text-slate-950" />}
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">
                          {domain.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AI Verification Section */}
              <div className="p-4 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-emerald-950/20 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <div>
                      <span className="text-xs font-bold text-white block">
                        AI Academic Credential & Institution Verification
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Validates {collegeInput || 'your institution'} against UGC / NCISM / AICTE registries
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleRunAIVerification}
                    disabled={isVerifyingAI}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all disabled:opacity-50 shrink-0 self-start sm:self-auto"
                  >
                    {isVerifyingAI ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Verify with AI</span>
                      </>
                    )}
                  </button>
                </div>

                {/* AI Result Card */}
                {aiVerificationResult && (
                  <div className={`p-3 rounded-xl border animate-fadeIn text-xs ${
                    aiVerificationResult.feedbackType === 'verified'
                      ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200'
                      : 'bg-amber-950/40 border-amber-500/60 text-amber-200'
                  }`}>
                    <div className="flex items-start gap-2">
                      {aiVerificationResult.feedbackType === 'verified' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-[11px] uppercase tracking-wide">
                            {aiVerificationResult.status} ({aiVerificationResult.confidenceScore}% Confidence)
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Council: {aiVerificationResult.governingBody}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300">
                          {aiVerificationResult.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-4 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between gap-3 shrink-0">
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => { setStepError(''); setCurrentStep(prev => prev - 1); }}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Previous Step</span>
              </button>
            ) : (
              <span className="text-[11px] text-slate-500">
                Step 1 of 3: Select Academic Qualifications
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {currentStep === 1 && (
              <button
                type="button"
                onClick={handleProceedFromStep1}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 text-xs font-bold shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Continue to College Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {currentStep === 2 && (
              <button
                type="button"
                onClick={handleProceedFromStep2}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Continue to Domain Mapping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {currentStep === 3 && (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/30 flex items-center gap-2 cursor-pointer transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Launching Workspace...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Launch Workspace</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
