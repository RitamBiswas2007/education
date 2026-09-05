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
  AlertCircle
} from 'lucide-react';
import { ROLES } from './RoleSelectionModal';

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
  // Form State
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [email] = useState(currentUser?.email || '');
  const [institution, setInstitution] = useState(currentUser?.institution || '');
  const [degree, setDegree] = useState(currentUser?.degree || '');
  const [bio, setBio] = useState(currentUser?.bio || 'Passionate about integrating classical Ayush science with modern bioinformatics, clinical trials, and digital health technology.');
  const [phone, setPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [location, setLocation] = useState(currentUser?.location || 'Jaipur, Rajasthan');
  const [avatar, setAvatar] = useState(currentUser?.avatar || PRESET_AVATARS[0]);

  // Role Switching State
  const [selectedNewRole, setSelectedNewRole] = useState(activeRole);
  const [roleSwitchSuccess, setRoleSwitchSuccess] = useState(false);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Handle Profile Save
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    const updatedProfile = {
      ...currentUser,
      name: fullName,
      institution,
      degree,
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

  return (
    <div className="fixed inset-0 z-50 bg-[#060a12]/95 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto font-sans">
      {/* Glow backgrounds */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 w-full max-w-3xl glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 my-8">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={avatar} 
                alt={fullName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500/60 shadow-lg shadow-emerald-500/20"
              />
              <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-slate-950">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white">{fullName || 'Ayush Member Profile'}</h2>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${currentRoleObj.badgeColor}`}>
                  {currentRoleObj.title}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">{email}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white text-xs font-bold border border-slate-800 transition-all cursor-pointer"
          >
            ✕ Close
          </button>
        </div>

        {/* Notifications */}
        {profileSaveSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile details updated and synchronized with Supabase cloud successfully!</span>
          </div>
        )}

        {roleSwitchSuccess && (
          <div className="p-3.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-xs font-semibold flex items-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span>Workspace successfully switched to {newRoleObj.title}! Loading portal...</span>
          </div>
        )}

        {/* SECTION 1: EDIT PROFILE FORM */}
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
              <label className="block text-slate-300 font-semibold mb-1">Full Legal Name *</label>
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

            {/* Institution / University */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Institution / University / Company *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                />
                <Building2 className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            {/* Degree / Designation */}
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Degree / Highest Qualification *</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                />
                <GraduationCap className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
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
          </div>

          {/* Professional Bio */}
          <div className="text-xs">
            <label className="block text-slate-300 font-semibold mb-1">Professional Bio & Research Focus</label>
            <textarea
              rows="2"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500 resize-none text-xs"
            ></textarea>
          </div>

          {/* Avatar Selector */}
          <div className="text-xs space-y-1.5">
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

          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>

        {/* SECTION 2: ROLE SWITCHING AT THE BOTTOM */}
        <div className="pt-6 border-t border-slate-800/80 space-y-4">
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

          {/* Switch Role Action */}
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
    </div>
  );
}
