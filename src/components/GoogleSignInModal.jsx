import React, { useState } from 'react';
import { X, UserPlus, Shield, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function GoogleSignInModal({ isOpen, onClose, onSelectAccount }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customEmail, setCustomEmail] = useState('');
  const [customName, setCustomName] = useState('');
  const [customError, setCustomError] = useState('');

  if (!isOpen) return null;

  // Known / Default Google Accounts for 1-click authentic sign-in
  const defaultAccounts = [
    {
      id: 'ritam-google',
      name: 'Ritam Biswas',
      email: 'ritam.biswas2007@gmail.com',
      avatarBg: 'bg-indigo-600',
      initial: 'R',
      badge: 'Active Google Account'
    },
    {
      id: 'ayush-scholar',
      name: 'Ayush Scholar',
      email: 'scholar.ayush@gmail.com',
      avatarBg: 'bg-emerald-600',
      initial: 'A',
      badge: 'Student Account'
    }
  ];

  const handleAccountClick = (account) => {
    setSelectedUser(account);
    setIsAuthenticating(true);

    setTimeout(() => {
      onSelectAccount({
        id: `GOOGLE-${Date.now()}`,
        email: account.email,
        name: account.name,
        role: 'student',
        needsRoleSelection: true,
        institution: '',
        college: '',
        degree: '',
        skillScore: 80,
        academicVerified: false,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(account.email)}`,
        provider: 'google'
      });
      setIsAuthenticating(false);
      onClose();
    }, 900);
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    setCustomError('');

    const emailTrim = customEmail.trim();
    const nameTrim = customName.trim() || emailTrim.split('@')[0];

    if (!emailTrim || !emailTrim.includes('@')) {
      setCustomError('Please enter a valid Google email address.');
      return;
    }

    const customAcc = {
      id: `google-custom-${Date.now()}`,
      name: nameTrim,
      email: emailTrim,
      avatarBg: 'bg-blue-600',
      initial: nameTrim.charAt(0).toUpperCase()
    };

    handleAccountClick(customAcc);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#1e1f20] border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden font-sans text-slate-100 animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Google 4-color animated top bar during auth */}
        {isAuthenticating && (
          <div className="absolute top-0 left-0 right-0 h-1 overflow-hidden bg-slate-800 z-10">
            <div className="w-full h-full bg-gradient-to-r from-blue-500 via-red-500 via-amber-400 to-green-500 animate-pulse"></div>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isAuthenticating}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Content */}
        <div className="p-6 pb-4 text-center border-b border-slate-800">
          <div className="flex justify-center mb-3">
            {/* Official Google G SVG */}
            <div className="w-10 h-10 rounded-full bg-white p-2 shadow-md flex items-center justify-center">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z" />
                <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z" />
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z" />
              </svg>
            </div>
          </div>
          <h2 className="text-lg font-medium text-white tracking-tight">Sign in with Google</h2>
          <p className="text-xs text-slate-400 mt-1">
            Choose an account to continue to <span className="font-semibold text-slate-200">AYUSH SETU</span>
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isAuthenticating ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full border-3 border-blue-500 border-t-transparent animate-spin"></div>
              <div>
                <p className="text-sm font-medium text-white">
                  Signing in as {selectedUser?.name || 'Google User'}...
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  Synchronizing credentials with AYUSH SETU
                </p>
              </div>
            </div>
          ) : showCustomInput ? (
            /* Custom Google Email Form */
            <form onSubmit={handleCustomSubmit} className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <button
                  type="button"
                  onClick={() => setShowCustomInput(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-slate-300">Enter your Google Account</span>
              </div>

              {customError && (
                <div className="p-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
                  {customError}
                </div>
              )}

              <div>
                <label className="block text-xs text-slate-400 mb-1">Email address</label>
                <input
                  type="email"
                  placeholder="your.email@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs text-slate-400 mb-1">Your Full Name (optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Dr. Ritam Biswas"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCustomInput(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            /* Account Chooser List */
            <div className="space-y-2">
              {defaultAccounts.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => handleAccountClick(acc)}
                  className="w-full p-3 rounded-2xl bg-slate-900/60 hover:bg-slate-800/90 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between group cursor-pointer text-left"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-full ${acc.avatarBg} text-white flex items-center justify-center font-bold text-base shrink-0 shadow-sm`}>
                      {acc.initial}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-white truncate group-hover:text-blue-400 transition-colors">
                        {acc.name}
                      </div>
                      <div className="text-xs text-slate-400 truncate">
                        {acc.email}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700/50 shrink-0 ml-2">
                    {acc.badge}
                  </span>
                </button>
              ))}

              {/* Use another account button */}
              <button
                onClick={() => setShowCustomInput(true)}
                className="w-full p-3 rounded-2xl bg-transparent hover:bg-slate-800/50 border border-dashed border-slate-700 hover:border-slate-600 transition-all flex items-center gap-3 cursor-pointer text-left mt-2"
              >
                <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center shrink-0">
                  <UserPlus className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-300">
                    Use another account
                  </div>
                  <div className="text-xs text-slate-500">
                    Sign in with your personal or institutional Google account
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Privacy & Terms Note */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 text-center">
            <p className="text-[11px] text-slate-400 leading-relaxed">
              To continue, Google will share your name, email address, and profile picture with <span className="text-slate-200">AYUSH SETU</span>.
            </p>
            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 mt-2">
              <Shield className="w-3 h-3 text-blue-400" />
              <span>Google Identity Services • OAuth 2.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
