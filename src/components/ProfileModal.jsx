import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  GraduationCap, 
  Lock, 
  LogOut, 
  Mail, 
  MapPin, 
  Phone, 
  Save, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Users, 
  BarChart3, 
  BookOpen, 
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  Target,
  School,
  FileText
} from 'lucide-react';
import { ROLES } from './RoleSelectionModal';
import { AYUSH_DOMAINS } from '../data/ayushQuestionBank';

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
];

export default function ProfileModal({ 
  currentUser, 
  activeRole, 
  onSaveProfile, 
  onSwitchRole, 
  onClose 
}) {
  // Navigation History Stack inside Profile Modal
  const [tabHistory, setTabHistory] = useState(['profile']); // 'profile' | 'roles'
  const activeTab = tabHistory[tabHistory.length - 1];

  const navigateTo = (tab) => {
    setTabHistory(prev => [...prev, tab]);
  };

  const navigateBack = () => {
    if (tabHistory.length > 1) {
      setTabHistory(prev => prev.slice(0, -1));
    } else {
      onClose();
    }
  };

  // Form State - Common for all users
  const [fullName, setFullName] = useState(currentUser?.name || currentUser?.full_name || '');
  const [email] = useState(currentUser?.email || '');
  const [institution, setInstitution] = useState(currentUser?.institution || currentUser?.college || '');
  const [degree, setDegree] = useState(currentUser?.degree || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [location, setLocation] = useState(currentUser?.location || 'Jaipur, Rajasthan');
  const [avatar, setAvatar] = useState(currentUser?.avatar || PRESET_AVATARS[0]);

  // Qualifications & Domains
  const [qualifications, setQualifications] = useState(currentUser?.qualifications || degree || 'B.A.M.S.');
  const [passingYear, setPassingYear] = useState(currentUser?.passingYear || '2026');
  const [selectedDomains, setSelectedDomains] = useState(
    Array.isArray(currentUser?.interestedDomains) && currentUser.interestedDomains.length > 0
      ? currentUser.interestedDomains
      : ['ayurveda', 'phytochemistry']
  );

  // Student-Exclusive Fields
  const [collegeStudying, setCollegeStudying] = useState(currentUser?.college || currentUser?.institution || '');
  const [degreePursuing, setDegreePursuing] = useState(currentUser?.degree || 'B.A.M.S.');
  const [currentAcademicYear, setCurrentAcademicYear] = useState(currentUser?.year || '3rd Year');
  const [whatDone, setWhatDone] = useState(currentUser?.whatDone || '');
  const [studentSkills, setStudentSkills] = useState(currentUser?.studentSkills || '');

  // Role Switching State
  const [selectedNewRole, setSelectedNewRole] = useState(activeRole);
  const [roleSwitchSuccess, setRoleSwitchSuccess] = useState(false);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Toggle domain
  const handleToggleDomain = (domainId) => {
    setSelectedDomains(prev => {
      if (prev.includes(domainId)) {
        if (prev.length === 1) return prev; // keep at least 1
        return prev.filter(id => id !== domainId);
      } else {
        return [...prev, domainId];
      }
    });
  };

  // Handle Profile Save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedProfile = {
      ...currentUser,
      name: fullName,
      institution: activeRole === 'student' ? collegeStudying : institution,
      college: collegeStudying || institution,
      degree: activeRole === 'student' ? degreePursuing : degree,
      qualifications,
      passingYear,
      year: currentAcademicYear,
      whatDone,
      studentSkills,
      interestedDomains: selectedDomains,
      bio,
      phone,
      location,
      avatar
    };

    await onSaveProfile(updatedProfile);
    setIsSaving(false);
    setProfileSaveSuccess(true);
    setTimeout(() => {
      setProfileSaveSuccess(false);
    }, 2500);
  };

  // Handle Role Switch
  const handleExecuteRoleSwitch = async () => {
    if (selectedNewRole === activeRole) return;
    setIsSaving(true);
    await onSwitchRole(selectedNewRole, institution);
    setIsSaving(false);
    setRoleSwitchSuccess(true);
    setTimeout(() => {
      setRoleSwitchSuccess(false);
      onClose();
    }, 1200);
  };

  const currentRoleObj = ROLES.find(r => r.id === activeRole) || ROLES[0];
  const newRoleObj = ROLES.find(r => r.id === selectedNewRole) || ROLES[0];
  const isStudent = activeRole === 'student';

  return (
    <div className="fixed inset-0 z-50 bg-[#060a12]/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-5 font-sans overflow-hidden">
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-3xl max-h-[92vh] glass-panel rounded-3xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden my-auto">
        
        {/* Sticky Header Bar — Always pinned at the top */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/80 shrink-0">
          <div className="flex items-center gap-3">
            {/* Back Button */}
            <button
              type="button"
              onClick={navigateBack}
              className="px-3 py-2 rounded-xl font-medium text-xs sm:text-sm transition-all flex items-center gap-1.5 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 shadow-sm group cursor-pointer"
              title={tabHistory.length > 1 ? "Go back to previous section" : "Go back to workspace"}
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              Back
            </button>

            <div className="relative">
              <img 
                src={avatar} 
                alt={fullName}
                className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl object-cover border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/20"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-slate-950">
                <CheckCircle2 className="w-3 h-3" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-lg font-bold text-white leading-tight">{fullName || 'Ayush Member Profile'}</h2>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${currentRoleObj.badgeColor}`}>
                  {currentRoleObj.title}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">{email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold border border-slate-800 transition-all cursor-pointer"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Sticky Tab Switcher Bar — Always pinned below header */}
        <div className="px-6 py-2.5 bg-slate-950/50 border-b border-slate-800/60 shrink-0">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
            <button
              type="button"
              onClick={() => navigateTo('profile')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>My Profile & Qualifications</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('roles')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                activeTab === 'roles'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Role Settings (Strict Segregation)</span>
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 custom-scrollbar">
          {/* Success Notifications */}
          {profileSaveSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Profile and domain preferences successfully updated!</span>
            </div>
          )}

          {roleSwitchSuccess && (
            <div className="p-3.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Workspace successfully switched to {newRoleObj.title}! Loading portal...</span>
            </div>
          )}

          {/* SECTION 1: EDIT PROFILE FORM */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-400" /> Personal & Institutional Profile
              </h3>
              <span className="text-[11px] text-slate-500">Edit information visible on certifications & applications</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {/* Full Name */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              {/* Email (Locked) */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1 flex items-center justify-between">
                  <span>Email Address (Verified)</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Secured</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    disabled
                    value={email}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 cursor-not-allowed opacity-80"
                  />
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location (City, State)</label>
                <div className="relative">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              {/* Institution / University */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isStudent ? 'Current College / University *' : 'Affiliated Institution / Organization *'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={isStudent ? collegeStudying : institution}
                    onChange={(e) => isStudent ? setCollegeStudying(e.target.value) : setInstitution(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              {/* Degree / Designation */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  {isStudent ? 'Degree Pursuing *' : 'Highest Qualification Achieved *'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={isStudent ? degreePursuing : degree}
                    onChange={(e) => isStudent ? setDegreePursuing(e.target.value) : setDegree(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              {/* Student Academic Year */}
              {isStudent && (
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Current Academic Year</label>
                  <select
                    value={currentAcademicYear}
                    onChange={(e) => setCurrentAcademicYear(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
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
              )}

              {/* Passing Year / Experience */}
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Completion / Passing Year</label>
                <input
                  type="text"
                  value={passingYear}
                  onChange={(e) => setPassingYear(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* Student "What Have You Done" section */}
            {isStudent && (
              <div className="text-xs space-y-1">
                <label className="block text-emerald-400 font-semibold flex items-center justify-between">
                  <span>What Have You Done So Far? (Projects, Clinical Postings, Research, Experience)</span>
                  <span className="text-[10px] text-slate-400">Displayed on your Student Portfolio</span>
                </label>
                <textarea
                  rows="3"
                  placeholder="Share details of your clinical exposure, herbarium collections, trial postings, workshops, or academic projects..."
                  value={whatDone}
                  onChange={(e) => setWhatDone(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 text-xs"
                />
              </div>
            )}

            {/* Professional Bio */}
            <div className="text-xs">
              <label className="block text-slate-300 font-semibold mb-1">Professional Bio</label>
              <textarea
                rows="2"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 resize-none text-xs"
              ></textarea>
            </div>

            {/* Interested Ayush Domains Selection */}
            <div className="text-xs space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <label className="block text-slate-300 font-semibold flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-amber-400" />
                  <span>Interested Ayush Domains ({selectedDomains.length} selected)</span>
                </label>
                <span className="text-[10px] text-slate-400">Controls your personalized AI Quiz questions</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {AYUSH_DOMAINS.map(d => {
                  const isSel = selectedDomains.includes(d.id);
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => handleToggleDomain(d.id)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 ${
                        isSel
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                          : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
                      }`}
                    >
                      <span>{d.icon}</span>
                      <span>{d.name.split('&')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Avatar Selector */}
            <div className="text-xs space-y-1.5 pt-2 border-t border-slate-800">
              <label className="block text-slate-300 font-semibold">Choose Avatar</label>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {PRESET_AVATARS.map((av, idx) => (
                  <img
                    key={idx}
                    src={av}
                    alt="avatar option"
                    onClick={() => setAvatar(av)}
                    className={`w-10 h-10 rounded-xl object-cover cursor-pointer border-2 transition-all ${
                      avatar === av ? 'border-emerald-400 scale-105 shadow-md shadow-emerald-500/30' : 'border-slate-800 hover:border-slate-600 opacity-70'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Form Action Buttons with Back button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Workspace</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => navigateTo('roles')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Switch Role</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  type="submit"
                  disabled={isSaving}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* SECTION 2: ROLE SWITCHING */}
        {activeTab === 'roles' && (
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white">Workspace Role & Ecosystem Persona</h3>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  <strong>Strict Exclusivity:</strong> A registered account can strictly operate as only <strong>one</strong> role at a time (Student, Teacher/Academician, Recruiter, or Admin).
                </p>
              </div>

              <div className="text-right shrink-0">
                <span className="text-[10px] text-slate-500 block uppercase font-mono">Current Active Role</span>
                <span className="text-xs font-bold text-emerald-400">{currentRoleObj.title}</span>
              </div>
            </div>

            {/* Mutually Exclusive Role Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ROLES.map((role) => {
                const Icon = role.icon;
                const isSelected = selectedNewRole === role.id;
                const isCurrent = activeRole === role.id;

                return (
                  <div
                    key={role.id}
                    onClick={() => setSelectedNewRole(role.id)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-950/20 shadow-md ring-1 ring-cyan-500/50'
                        : 'border-slate-800 bg-slate-900/40 hover:bg-slate-900 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${role.iconBg} flex items-center justify-center font-bold shadow`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-white">{role.title}</h4>
                          {isCurrent && (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                              Current
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1">{role.subtitle}</p>
                      </div>
                    </div>

                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-cyan-400 bg-cyan-500 text-slate-950' : 'border-slate-700 bg-slate-900'
                    }`}>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 fill-cyan-500 text-slate-950" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Switch Role Action with Back buttons */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-300 text-left">
                <AlertCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="text-[11px]">
                  {selectedNewRole === activeRole ? (
                    <>You are currently operating inside the <strong>{currentRoleObj.title}</strong> workspace.</>
                  ) : (
                    <>Switching role to <strong>{newRoleObj.title}</strong> will grant exclusive access to that portal.</>
                  )}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
                <button
                  type="button"
                  onClick={navigateBack}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Profile</span>
                </button>

                <button
                  onClick={handleExecuteRoleSwitch}
                  disabled={selectedNewRole === activeRole || isSaving}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-xs hover:brightness-110 disabled:opacity-40 disabled:hover:brightness-100 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSaving ? 'animate-spin' : ''}`} />
                  <span>Switch to {newRoleObj.badge}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
}
