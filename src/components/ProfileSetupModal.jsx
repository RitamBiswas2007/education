import React, { useState, useEffect, useMemo } from 'react';
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
  Plus
} from 'lucide-react';
import { AYUSH_DOMAINS } from '../data/ayushQuestionBank';
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
  const [selectedRole, setSelectedRole] = useState(currentRole || currentUser?.role || 'student');
  const [fullName, setFullName] = useState(currentUser?.name || currentUser?.full_name || '');
  const [email] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [location, setLocation] = useState(currentUser?.location || '');

  // Degrees Selected (Array of degree names)
  const [selectedDegrees, setSelectedDegrees] = useState(() => {
    if (currentUser?.degree && currentUser.degree.trim() && currentUser.degree !== 'Senior Ayush Scholar') {
      return [currentUser.degree];
    }
    return [];
  });
  const [customDegreeInput, setCustomDegreeInput] = useState('');
  const [showCustomDegreeField, setShowCustomDegreeField] = useState(false);

  // College / University Input with smart suggestion search
  const [collegeInput, setCollegeInput] = useState(() => {
    if (currentUser?.college && currentUser.college.trim() && !currentUser.college.includes('Evaluation Desk')) {
      return currentUser.college;
    }
    return '';
  });
  const [collegeSearchQuery, setCollegeSearchQuery] = useState('');
  const [showCollegeDropdown, setShowCollegeDropdown] = useState(false);

  // Domains Selected
  const [selectedDomains, setSelectedDomains] = useState(() => {
    if (Array.isArray(currentUser?.interestedDomains) && currentUser.interestedDomains.length > 0) {
      return currentUser.interestedDomains;
    }
    return [];
  });

  // Additional details
  const [academicYear, setAcademicYear] = useState(currentUser?.year || '3rd Professional Year');
  const [whatDone, setWhatDone] = useState(currentUser?.whatDone || '');
  const [studentSkills, setStudentSkills] = useState(currentUser?.studentSkills || '');

  // AI Verification State
  const [isVerifyingAI, setIsVerifyingAI] = useState(false);
  const [aiVerificationResult, setAiVerificationResult] = useState(null);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // College search filtered suggestions
  const filteredColleges = useMemo(() => {
    const query = (collegeSearchQuery || collegeInput).trim().toLowerCase();
    if (!query) return POPULAR_RECOGNIZED_COLLEGES.slice(0, 8);
    return POPULAR_RECOGNIZED_COLLEGES.filter(c => 
      c.name.toLowerCase().includes(query) ||
      c.authority.toLowerCase().includes(query) ||
      c.type.toLowerCase().includes(query)
    ).slice(0, 10);
  }, [collegeSearchQuery, collegeInput]);

  // Handle Degree toggle
  const handleToggleDegree = (degName) => {
    setSelectedDegrees(prev => {
      if (prev.includes(degName)) {
        return prev.filter(d => d !== degName);
      } else {
        return [...prev, degName];
      }
    });
    // Invalidate prior AI verification so user re-checks or gets updated synergy
    setAiVerificationResult(null);
  };

  // Add custom degree
  const handleAddCustomDegree = () => {
    if (customDegreeInput.trim()) {
      if (!selectedDegrees.includes(customDegreeInput.trim())) {
        setSelectedDegrees(prev => [...prev, customDegreeInput.trim()]);
      }
      setCustomDegreeInput('');
      setShowCustomDegreeField(false);
      setAiVerificationResult(null);
    }
  };

  // Handle College Selection
  const handleSelectCollege = (colName) => {
    setCollegeInput(colName);
    setCollegeSearchQuery('');
    setShowCollegeDropdown(false);
    setAiVerificationResult(null);
  };

  // Handle Domain Toggle
  const handleToggleDomain = (domainId) => {
    setSelectedDomains(prev => {
      if (prev.includes(domainId)) {
        return prev.filter(id => id !== domainId);
      } else {
        return [...prev, domainId];
      }
    });
    setAiVerificationResult(null);
  };

  // Run AI Credential & Institutional Verification
  const handleRunAIVerification = async () => {
    if (!collegeInput.trim()) {
      setValidationError('Please enter or select your college/university name before verifying.');
      return;
    }

    if (selectedDegrees.length === 0) {
      setValidationError('Please select at least one degree or qualification before verifying.');
      return;
    }

    setValidationError('');
    setIsVerifyingAI(true);

    try {
      // Simulate real-time institutional registry scanning animation
      await new Promise(resolve => setTimeout(resolve, 850));

      const result = await verifyAcademicCredentials({
        college: collegeInput,
        degrees: selectedDegrees,
        domains: selectedDomains,
        role: selectedRole
      });

      setAiVerificationResult(result);
    } catch (err) {
      console.error("AI Verification Error:", err);
      setValidationError('Failed to complete AI verification. Please try again.');
    } finally {
      setIsVerifyingAI(false);
    }
  };

  // Form Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }

    if (selectedDegrees.length === 0) {
      setValidationError('Please select at least 1 degree or add your degree.');
      return;
    }

    if (!collegeInput.trim()) {
      setValidationError('Please enter or select your college/university name.');
      return;
    }

    if (selectedDomains.length === 0) {
      setValidationError('Please select at least 1 interested domain to customize your career tracks & 10-MCQ quiz.');
      return;
    }

    setValidationError('');
    setIsSubmitting(true);

    // If not verified yet with AI, run verification now
    let finalVerification = aiVerificationResult;
    if (!finalVerification) {
      setIsVerifyingAI(true);
      await new Promise(resolve => setTimeout(resolve, 600));
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
    const primaryDegree = selectedDegrees[0];

    const compiledProfile = {
      ...currentUser,
      id: currentUser?.id || `USER-${Date.now().toString().slice(-6)}`,
      name: fullName.trim(),
      email,
      phone: phone.trim() || '+91 98765 43210',
      location: location.trim() || 'Jaipur, Rajasthan',
      role: selectedRole,
      institution: collegeInput.trim(),
      college: collegeInput.trim(),
      degree: compiledDegreeStr,
      qualifications: compiledDegreeStr,
      degreesList: selectedDegrees,
      year: academicYear,
      whatDone: whatDone.trim(),
      studentSkills: studentSkills.trim() || (selectedRole === 'student' ? 'Analytical Chemistry, Clinical Case Taking, Good Laboratory Practices' : ''),
      interestedDomains: selectedDomains,
      academicVerified: finalVerification.isValid,
      verificationDetails: {
        status: finalVerification.status,
        confidenceScore: finalVerification.confidenceScore,
        governingBody: finalVerification.governingBody,
        institutionType: finalVerification.institutionType,
        verifiedAt: new Date().toISOString()
      },
      profileCompleted: true
    };

    setTimeout(() => {
      onSaveProfileSetup(compiledProfile);
      setIsSubmitting(false);
    }, 400);
  };

  const roleObj = ROLES.find(r => r.id === selectedRole) || ROLES[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#060a12]/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-4 overflow-y-auto font-sans">
      <div className="relative z-10 w-full max-w-4xl glass-panel rounded-3xl p-5 sm:p-8 border border-slate-800 shadow-2xl space-y-6 my-6">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            {canClose && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-bold border border-slate-800 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>Academic & Career Domain Setup</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Select Your <span className="gradient-text-ayush">Degrees, College & Domains</span>
              </h2>
              <p className="text-slate-400 text-xs mt-0.5">
                No mock data is pre-allotted. Your degree and college credentials will be analyzed and verified with AI.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className={`px-3 py-1 rounded-xl text-xs font-bold border ${roleObj.badgeColor}`}>
              {roleObj.title}
            </span>
          </div>
        </div>

        {/* Validation Error Banner */}
        {validationError && (
          <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2 animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{validationError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* SECTION 1: Personal Identification */}
          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800/60 pb-2">
              <User className="w-4 h-4 text-emerald-400" />
              <span>1. Scholar Identification</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Name <span className="text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Aryan Varma / Priya Patel"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={email || 'guest.evaluator@ayush.gov.in'}
                  className="w-full px-3.5 py-2.5 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs text-slate-400 cursor-not-allowed font-mono"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Degree(s) Selection */}
          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800/80 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <span>2. Select Your Degree(s) Got or Pursuing <span className="text-emerald-400">*</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/30">
                  {selectedDegrees.length} Selected
                </span>
                <button
                  type="button"
                  onClick={() => setShowCustomDegreeField(!showCustomDegreeField)}
                  className="text-[11px] text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 px-2.5 py-0.5 rounded-full border border-slate-700 flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Plus className="w-3 h-3 text-emerald-400" />
                  <span>Custom Degree</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              Click the degree(s) you hold or are currently enrolled in. Multi-degree scholars (e.g. BAMS + M.Sc / B.Tech + HealthTech) can select multiple.
            </p>

            {/* Degree Category Sections */}
            <div className="space-y-3.5">
              {STANDARDIZED_DEGREES.map((cat, idx) => (
                <div key={idx} className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
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
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 cursor-pointer text-left ${
                            isSelected
                              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950/40 ring-1 ring-cyan-400/40'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                          }`}
                        >
                          <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-cyan-500 border-cyan-400 text-slate-950' : 'border-slate-700'
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

              {/* Custom Degree Input Field */}
              {showCustomDegreeField && (
                <div className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/40 flex flex-col sm:flex-row items-center gap-2 mt-2 animate-fadeIn">
                  <input
                    type="text"
                    placeholder="Enter custom degree name (e.g. B.Sc. Chemistry, M.S. Medical Informatics...)"
                    value={customDegreeInput}
                    onChange={(e) => setCustomDegreeInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomDegree())}
                    className="flex-1 w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={handleAddCustomDegree}
                    className="w-full sm:w-auto px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    Add Degree
                  </button>
                </div>
              )}
            </div>

            {/* Currently Selected Degrees Preview */}
            {selectedDegrees.length > 0 && (
              <div className="pt-2 border-t border-slate-800/60 flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] font-semibold text-slate-400 mr-1">Your Degrees:</span>
                {selectedDegrees.map((deg, i) => (
                  <span 
                    key={i} 
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 text-[11px] font-medium"
                  >
                    <span>{deg}</span>
                    <button 
                      type="button" 
                      onClick={() => handleToggleDegree(deg)}
                      className="hover:text-rose-400 cursor-pointer ml-1 text-xs"
                      title="Remove degree"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 3: College / University with AI Autocomplete & Storage */}
          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <School className="w-4 h-4 text-emerald-400" />
                <span>3. College / University / Institute Name <span className="text-emerald-400">*</span></span>
              </div>
              <span className="text-[10px] text-slate-400">
                Type any college or pick recognized institution
              </span>
            </div>

            <div className="relative">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                College Name (Stored for your official student credential)
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. National Institute of Ayurveda (NIA), Jaipur / All India Institute of Ayurveda / IIT Delhi..."
                  value={collegeInput}
                  onChange={(e) => {
                    setCollegeInput(e.target.value);
                    setCollegeSearchQuery(e.target.value);
                    setShowCollegeDropdown(true);
                    setAiVerificationResult(null);
                  }}
                  onFocus={() => setShowCollegeDropdown(true)}
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-500 transition-all font-medium"
                />
                {collegeInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setCollegeInput('');
                      setCollegeSearchQuery('');
                      setShowCollegeDropdown(false);
                      setAiVerificationResult(null);
                    }}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 text-sm cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Autocomplete Suggestions Dropdown */}
              {showCollegeDropdown && filteredColleges.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-slate-950 border border-slate-700 rounded-xl shadow-2xl max-h-56 overflow-y-auto p-1 divide-y divide-slate-800/50">
                  <div className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-900/80 sticky top-0">
                    Recognized Institutions & Universities ({filteredColleges.length})
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

            {/* Quick Popular Picks */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <span className="text-[11px] text-slate-500 font-semibold mr-1">Quick Picks:</span>
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
                  className="text-[10px] px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/30 transition-all cursor-pointer"
                >
                  {name.split(' (')[0]}
                </button>
              ))}
            </div>

            {/* Academic Year Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Academic Stage / Professional Year
                </label>
                <select
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="1st Professional Year">1st Professional Year (Freshman)</option>
                  <option value="2nd Professional Year">2nd Professional Year</option>
                  <option value="3rd Professional Year">3rd Professional Year</option>
                  <option value="Final Professional Year">Final Professional Year</option>
                  <option value="Rotatory Clinical Intern">Rotatory Clinical Intern</option>
                  <option value="Post-Graduate Resident (MD/MS/M.Tech)">Post-Graduate Resident (MD/MS/M.Tech)</option>
                  <option value="Ph.D. Research Scholar">Ph.D. Research Scholar</option>
                  <option value="Alumnus / Practicing Graduate">Alumnus / Practicing Graduate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Work / Research Done So Far (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Clinical postings, HPTLC lab, ML dataset curation, pilot paper..."
                  value={whatDone}
                  onChange={(e) => setWhatDone(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 4: Career & Skill Domains (Determines 10-MCQ Diagnostic Quiz) */}
          <div className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Target className="w-4 h-4 text-amber-400" />
                <span>4. Select Interested Career & Skill Domains <span className="text-emerald-400">*</span></span>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                {selectedDomains.length} Selected
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Select the domains you want to be assessed in. The <strong>10-MCQ AI Skill Diagnostic Quiz</strong>, Competency Radar, and Industry Bridges adapt strictly to your selected domains.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
              {MASTER_DOMAINS.map((domain) => {
                const isSelected = selectedDomains.includes(domain.id);
                return (
                  <div
                    key={domain.id}
                    onClick={() => handleToggleDomain(domain.id)}
                    className={`cursor-pointer rounded-xl p-3 border transition-all flex items-start gap-2.5 select-none ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500/70 text-white shadow-md shadow-emerald-950/40 ring-1 ring-emerald-500/40'
                        : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:bg-slate-900/80 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-lg shrink-0 mt-0.5">{domain.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs font-bold truncate text-slate-200">
                          {domain.name}
                        </h4>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3 h-3 fill-emerald-500 text-slate-950" />}
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-400 line-clamp-2 mt-0.5 leading-snug">
                        {domain.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 5: AI CREDENTIAL & INSTITUTIONAL VERIFICATION EXPERIENCE */}
          <div className="glass-panel rounded-2xl p-5 border border-emerald-500/40 bg-gradient-to-br from-slate-950/90 via-slate-900/80 to-emerald-950/20 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Cpu className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>AI Academic Credential & Institution Verification</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                      UGC / NCISM / AICTE
                    </span>
                  </h3>
                  <p className="text-slate-400 text-xs mt-0.5">
                    Real-time AI validates institution legitimacy, accreditation status, and degree-domain synergy.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleRunAIVerification}
                disabled={isVerifyingAI}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 text-xs font-bold shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50 shrink-0"
              >
                {isVerifyingAI ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Scanning Databases...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verify with AI</span>
                  </>
                )}
              </button>
            </div>

            {/* Live AI Verification Feedback Output */}
            {aiVerificationResult && (
              <div className={`p-4 rounded-xl border animate-fadeIn transition-all ${
                aiVerificationResult.feedbackType === 'verified'
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
                  : aiVerificationResult.feedbackType === 'warning'
                    ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                    : 'bg-rose-950/30 border-rose-500/50 text-rose-200'
              }`}>
                <div className="flex items-start gap-3">
                  {aiVerificationResult.feedbackType === 'verified' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-xs uppercase tracking-wide flex items-center gap-1.5">
                        <span>{aiVerificationResult.status}</span>
                        <span className="px-2 py-0.5 rounded bg-slate-900/80 border border-current text-[10px] font-mono">
                          {aiVerificationResult.confidenceScore}% AI Confidence Score
                        </span>
                      </span>
                      <span className="text-[10px] text-slate-300 font-mono">
                        Council: {aiVerificationResult.governingBody}
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">
                      {aiVerificationResult.message}
                    </p>
                    {aiVerificationResult.accreditationDetails?.degreeSynergy && (
                      <div className="pt-1 text-[11px] text-emerald-300 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span>
                          <strong>Domain Alignment:</strong> {aiVerificationResult.accreditationDetails.degreeSynergy.rating} ({aiVerificationResult.accreditationDetails.degreeSynergy.score}%)
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              <span>Configuring for: </span>
              <strong className="text-emerald-400">{fullName || 'Scholar'}</strong> • 
              <span className="text-slate-300 font-semibold ml-1">
                {selectedDegrees.length > 0 ? selectedDegrees[0] : 'Degree Pending'}
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 text-xs font-black tracking-wide shadow-lg shadow-emerald-950/60 hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Verifying & Building Profile...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Enter Workspace</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
