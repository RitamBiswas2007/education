import React, { useState } from 'react';
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
  FileText,
  AlertCircle
} from 'lucide-react';
import { AYUSH_DOMAINS } from '../data/ayushQuestionBank';
import { ROLES } from './RoleSelectionModal';

export default function ProfileSetupModal({
  currentUser,
  currentRole,
  onSaveProfileSetup,
  onClose,
  canClose = false
}) {
  // Step navigation: 1 = Role Confirmation, 2 = Profile Form
  const [currentStep, setCurrentStep] = useState(2); // directly to profile form with role indicator

  // Form State - Common for all users
  const [selectedRole, setSelectedRole] = useState(currentRole || currentUser?.role || 'student');
  const [fullName, setFullName] = useState(currentUser?.name || currentUser?.full_name || '');
  const [email] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [location, setLocation] = useState(currentUser?.location || '');
  const [bio, setBio] = useState(currentUser?.bio || '');

  // Qualifications - Common for all users
  const [highestQualification, setHighestQualification] = useState(currentUser?.qualifications || (selectedRole === 'student' ? 'Higher Secondary (10+2 Science) / Undergraduate' : 'Post-Graduate / Ph.D.'));
  const [qualificationInstitution, setQualificationInstitution] = useState(currentUser?.institution || '');
  const [passingYear, setPassingYear] = useState(currentUser?.passingYear || '2025');

  // Interested Domains - Common for all users (Fixed domains for students)
  const [selectedDomains, setSelectedDomains] = useState(
    Array.isArray(currentUser?.interestedDomains) && currentUser.interestedDomains.length > 0
      ? currentUser.interestedDomains
      : ['ayurveda', 'phytochemistry']
  );

  // Student-Exclusive Fields
  const [collegeStudying, setCollegeStudying] = useState(currentUser?.college || currentUser?.institution || '');
  const [degreePursuing, setDegreePursuing] = useState(currentUser?.degree || 'B.A.M.S. (Bachelor of Ayurvedic Medicine & Surgery)');
  const [currentAcademicYear, setCurrentAcademicYear] = useState(currentUser?.year || '3rd Year');
  const [whatDone, setWhatDone] = useState(currentUser?.whatDone || '');
  const [studentSkills, setStudentSkills] = useState(currentUser?.studentSkills || 'Dravyaguna identification, HPTLC preparation, Herbarium collection');

  // UI state
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Toggle domain selection
  const handleToggleDomain = (domainId) => {
    setSelectedDomains(prev => {
      if (prev.includes(domainId)) {
        if (prev.length === 1) {
          setValidationError('Please keep at least 1 primary domain selected.');
          return prev;
        }
        setValidationError('');
        return prev.filter(id => id !== domainId);
      } else {
        setValidationError('');
        return [...prev, domainId];
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName.trim()) {
      setValidationError('Please enter your full name.');
      return;
    }

    if (selectedDomains.length === 0) {
      setValidationError('Please select at least 1 interested Ayush domain.');
      return;
    }

    if (selectedRole === 'student') {
      if (!collegeStudying.trim()) {
        setValidationError('Please specify the college/university you are currently studying in.');
        return;
      }
      if (!degreePursuing.trim()) {
        setValidationError('Please specify the degree you are currently pursuing.');
        return;
      }
    }

    setIsSubmitting(true);
    setValidationError('');

    const compiledProfile = {
      ...currentUser,
      id: currentUser?.id || `USER-${Date.now().toString().slice(-6)}`,
      name: fullName.trim(),
      email,
      phone: phone.trim() || '+91 98765 43210',
      location: location.trim() || 'Jaipur, Rajasthan',
      bio: bio.trim() || (selectedRole === 'student' ? 'Passionate Ayush scholar exploring classical knowledge with scientific research.' : 'Ayush ecosystem professional.'),
      role: selectedRole,
      qualifications: highestQualification,
      institution: selectedRole === 'student' ? collegeStudying.trim() : (qualificationInstitution.trim() || 'Ministry of Ayush Affiliated Institute'),
      college: collegeStudying.trim() || qualificationInstitution.trim(),
      degree: selectedRole === 'student' ? degreePursuing.trim() : highestQualification,
      year: currentAcademicYear,
      passingYear,
      whatDone: whatDone.trim(),
      studentSkills: studentSkills.trim(),
      interestedDomains: selectedDomains,
      profileCompleted: true
    };

    setTimeout(() => {
      onSaveProfileSetup(compiledProfile);
      setIsSubmitting(false);
    }, 400);
  };

  const isStudent = selectedRole === 'student';
  const roleObj = ROLES.find(r => r.id === selectedRole) || ROLES[0];

  return (
    <div className="fixed inset-0 z-50 bg-[#060a12]/95 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="relative z-10 w-full max-w-4xl glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 my-8">
        
        {/* Header Bar with Back Button */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
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
                <span>Official Profile Setup</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-1">
                Complete Your <span className="gradient-text-ayush">Ayush Profile</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
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
          
          {/* SECTION 1: Personal Details (For All Users) */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800/60 pb-2">
              <User className="w-4 h-4 text-emerald-400" />
              <span>1. Personal & Contact Details (All Users)</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="w-full px-3.5 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full px-3.5 py-2 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs text-slate-400 cursor-not-allowed font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Contact Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Location (City & State)
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="e.g. Jaipur, Rajasthan"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Professional Bio & Summary
                </label>
                <textarea
                  rows={2}
                  placeholder="Share a brief overview of your academic background, passions, and goals in the Ayush sector..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Qualifications & Academic Background (For All Users) */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800/60 pb-2">
              <GraduationCap className="w-4 h-4 text-cyan-400" />
              <span>2. Qualifications & Education Background (All Users)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Highest Qualification Achieved
                </label>
                <select
                  value={highestQualification}
                  onChange={(e) => setHighestQualification(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Higher Secondary (10+2 PCB / Science)">Higher Secondary (10+2 PCB / Science)</option>
                  <option value="B.A.M.S. (Bachelor of Ayurvedic Medicine & Surgery)">B.A.M.S. (Ayurveda)</option>
                  <option value="B.H.M.S. (Bachelor of Homeopathic Medicine & Surgery)">B.H.M.S. (Homeopathy)</option>
                  <option value="B.U.M.S. (Bachelor of Unani Medicine & Surgery)">B.U.M.S. (Unani)</option>
                  <option value="B.S.M.S. (Bachelor of Siddha Medicine & Surgery)">B.S.M.S. (Siddha)</option>
                  <option value="B.N.Y.S. (Bachelor of Naturopathy & Yogic Sciences)">B.N.Y.S. (Naturopathy & Yoga)</option>
                  <option value="B.Pharm (Ayurveda / Herbal)">B.Pharm (Ayurveda / Herbal)</option>
                  <option value="B.Sc. / B.Tech (Biotechnology / Botany)">B.Sc. / B.Tech (Biotechnology / Botany)</option>
                  <option value="M.D. / M.S. (Ayush Specialization)">M.D. / M.S. (Ayush Specialization)</option>
                  <option value="M.Sc. (Herbal Bio-Tech / Phytochemistry)">M.Sc. (Herbal Bio-Tech / Phytochemistry)</option>
                  <option value="Ph.D. (Dravyaguna / Phytopharmaceuticals)">Ph.D. (Dravyaguna / Phytopharmaceuticals)</option>
                  <option value="MBA / Industry Executive Degree">MBA / Industry Executive Degree</option>
                </select>
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Institution / University
                </label>
                <input
                  type="text"
                  placeholder="e.g. National Institute of Ayurveda, Jaipur"
                  value={qualificationInstitution}
                  onChange={(e) => setQualificationInstitution(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Passing / Completion Year
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2025"
                  value={passingYear}
                  onChange={(e) => setPassingYear(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: Interested Ayush Domains (Fixed for students, basis for 10-MCQ AI Diagnostic) */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Target className="w-4 h-4 text-amber-400" />
                <span>3. Interested Ayush Domains (Determines Your AI Skill Assessment)</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                {selectedDomains.length} Selected
              </span>
            </div>

            <p className="text-[11px] text-slate-400">
              Select the Ayush disciplines you specialize in or want to practice. 
              {isStudent && (
                <strong className="text-emerald-300 ml-1">
                  For students, your 10-question AI Skill Diagnostic Quiz and Competency Radar will be generated based on these domains!
                </strong>
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
              {AYUSH_DOMAINS.map((domain) => {
                const isSelected = selectedDomains.includes(domain.id);
                return (
                  <div
                    key={domain.id}
                    onClick={() => handleToggleDomain(domain.id)}
                    className={`cursor-pointer rounded-xl p-3 border transition-all flex items-start gap-2.5 select-none ${
                      isSelected
                        ? 'bg-emerald-950/30 border-emerald-500/70 text-white shadow-md shadow-emerald-950/30 ring-1 ring-emerald-500/40'
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

          {/* SECTION 4: Student-Exclusive Fields (Only for Students!) */}
          {isStudent && (
            <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 bg-emerald-950/10 space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  <span>4. Student Scholar Exclusive Information</span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                  Mandatory For Student Workspace
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    College / Institute Currently Studying In <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <School className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. National Institute of Ayurveda (Deemed to be University), Jaipur"
                      value={collegeStudying}
                      onChange={(e) => setCollegeStudying(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Current Academic Year / Semester <span className="text-emerald-400">*</span>
                  </label>
                  <select
                    value={currentAcademicYear}
                    onChange={(e) => setCurrentAcademicYear(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="1st Professional Year">1st Professional Year</option>
                    <option value="2nd Professional Year">2nd Professional Year</option>
                    <option value="3rd Professional Year">3rd Professional Year</option>
                    <option value="Final Professional Year">Final Professional Year</option>
                    <option value="Rotatory Clinical Intern">Rotatory Clinical Intern</option>
                    <option value="Post-Graduate Scholar (MD/MS)">Post-Graduate Scholar (MD/MS)</option>
                    <option value="Ph.D. Research Scholar">Ph.D. Research Scholar</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Degree Currently Pursuing <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. B.A.M.S. & M.Sc. Herbal Bio-Technology"
                    value={degreePursuing}
                    onChange={(e) => setDegreePursuing(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                    <span>What Have You Done So Far? (Projects, Clinical Exposure, Prior Experience)</span>
                    <span className="text-[10px] text-slate-400">Appears on your live Student Portfolio</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe what you have done so far: e.g. Clinical postings in Kayachikitsa/Panchakarma, preparation of herbarium collection (150+ species), HPLC testing workshop, pilot research paper, NSS Ayush camp volunteering..."
                    value={whatDone}
                    onChange={(e) => setWhatDone(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500 leading-relaxed"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Specialized Skills / Techniques You Know
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dravyaguna Identification, HPTLC Fingerprinting, Bhasma Quality Testing, Pulse Diagnosis"
                    value={studentSkills}
                    onChange={(e) => setStudentSkills(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Footer with Back & Submit Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-400 text-center sm:text-left">
              <span>Saving Profile for: </span>
              <strong className="text-emerald-400">{fullName || 'Student'}</strong> • 
              <span className="text-slate-300 font-semibold ml-1">{roleObj.title}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {canClose && onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Cancel / Back</span>
                </button>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Saving & Building Workspace...</span>
                ) : (
                  <>
                    <span>Complete Profile & Launch Workspace</span>
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
