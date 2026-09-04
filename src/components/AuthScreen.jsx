import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Eye, 
  EyeOff, 
  GraduationCap, 
  Lock, 
  LogOut, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  User, 
  UserPlus, 
  Users 
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export default function AuthScreen({ onAuthSuccess, onGuestLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState('student'); // 'student', 'industry', 'academician', 'admin'
  const [institution, setInstitution] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Handle Google OAuth Sign In
  const handleGoogleSignIn = async () => {
    setErrorMsg('');
    if (!isSupabaseConfigured || !supabase) {
      setErrorMsg('Supabase is not configured yet. Please check your .env.local file.');
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin
        }
      });
      if (error) throw error;
    } catch (err) {
      setErrorMsg(err.message || 'Failed to initialize Google Sign-In.');
    } finally {
      setLoading(false);
    }
  };

  // Handle Email / Password Auth Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    // Validate Gmail email
    if (!email.toLowerCase().includes('@gmail.com') && !email.includes('@')) {
      setErrorMsg('Please enter a valid Gmail address (e.g. user@gmail.com).');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        // Sign Up Flow
        if (!fullName) {
          setErrorMsg('Full Name is required for registration.');
          setLoading(false);
          return;
        }

        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
                role,
                institution: institution || 'National Institute of Ayurveda, Jaipur'
              }
            }
          });

          if (error) throw error;

          // Check if user already exists or needs email confirmation
          if (data?.user && data.user.identities && data.user.identities.length === 0) {
            setErrorMsg('This Gmail address is already registered. Please click "Sign In" instead.');
            setLoading(false);
            return;
          }

          setSuccessMsg('Account created successfully! Logging you in...');
          
          // Auto login created user
          const newUserProfile = {
            id: data.user?.id || `USER-${Date.now()}`,
            email: email,
            name: fullName,
            role: role,
            institution: institution || 'National Institute of Ayurveda, Jaipur',
            degree: role === 'student' ? 'B.A.M.S. & M.Sc. Herbal Bio-Tech' : 'Ph.D. Phytochemistry',
            skillScore: 82,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName}`
          };

          setTimeout(() => {
            onAuthSuccess(newUserProfile, data.session);
          }, 1000);
        } else {
          // Local fallback registration
          const mockUserProfile = {
            id: `LOCAL-${Date.now()}`,
            email,
            name: fullName,
            role,
            institution: institution || 'National Institute of Ayurveda, Jaipur',
            degree: 'B.A.M.S. Student',
            skillScore: 80,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${fullName}`
          };
          onAuthSuccess(mockUserProfile, null);
        }
      } else {
        // Sign In Flow
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
          });

          if (error) throw error;

          const loggedInUser = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.user_metadata?.full_name || data.user.email.split('@')[0],
            role: data.user.user_metadata?.role || 'student',
            institution: data.user.user_metadata?.institution || 'National Institute of Ayurveda',
            degree: 'Ayush Degree Specialist',
            skillScore: 85,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.email}`
          };

          setSuccessMsg('Welcome back! Loading your profile...');
          setTimeout(() => {
            onAuthSuccess(loggedInUser, data.session);
          }, 800);
        } else {
          // Local Sign In fallback
          const loggedInUser = {
            id: `USER-LOCAL-${Date.now()}`,
            email,
            name: email.split('@')[0],
            role: 'student',
            institution: 'National Institute of Ayurveda',
            degree: 'B.A.M.S.',
            skillScore: 80,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
          };
          onAuthSuccess(loggedInUser, null);
        }
      }
    } catch (err) {
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080c14] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Glow Background Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="glass-panel rounded-3xl p-8 max-w-md w-full relative z-10 border border-slate-800 shadow-2xl space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/20 mx-auto font-black">
            <Sparkles className="w-7 h-7 text-slate-950 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            AYUSH<span className="gradient-text-ayush">SKILLBRIDGE</span>
          </h2>
          <p className="text-xs text-slate-400">
            Official Gateway • Ministry of Ayush Skill Ecosystem
          </p>
        </div>

        {/* Auth Mode Toggle Tabs */}
        <div className="grid grid-cols-2 gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2 rounded-lg transition-all ${
              !isSignUp 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setErrorMsg(''); setSuccessMsg(''); }}
            className={`py-2 rounded-lg transition-all ${
              isSignUp 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold transition-all flex items-center justify-center gap-3 shadow-md"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z" />
            <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.31 24 12 24z" />
            <path fill="#FBBC05" d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z" />
            <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z" />
          </svg>
          Sign {isSignUp ? 'Up' : 'In'} with Google Gmail
        </button>

        <div className="relative flex items-center justify-center my-2">
          <div className="border-t border-slate-800 w-full"></div>
          <span className="bg-[#0f172a] px-3 text-[11px] text-slate-500 font-semibold uppercase">Or use Gmail & Password</span>
          <div className="border-t border-slate-800 w-full"></div>
        </div>

        {/* Error / Success Alerts */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 text-xs font-semibold">
            ⚠️ {errorMsg}
          </div>
        )}
        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold">
            ✅ {successMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {isSignUp && (
            <>
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Ananya Sharma"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Account Role *</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'student', label: '🎓 Student' },
                    { id: 'industry', label: '🏢 Recruiter' },
                    { id: 'academician', label: '👨‍🏫 Faculty' },
                    { id: 'admin', label: '📊 Admin' }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`p-2 rounded-lg font-bold text-xs text-left border transition-all ${
                        role === r.id
                          ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Institution / Organization</label>
                <input
                  type="text"
                  placeholder="e.g. National Institute of Ayurveda, Jaipur"
                  value={institution}
                  onChange={e => setInstitution(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Gmail Address *</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="your.name@gmail.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Each Gmail address can only be registered once.</span>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 focus:outline-none focus:border-emerald-500"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : isSignUp ? 'Create Account' : 'Sign In to Portal'}
          </button>
        </form>

        {/* Guest Login Option */}
        <div className="pt-2 border-t border-slate-800 text-center">
          <button
            type="button"
            onClick={onGuestLogin}
            className="text-xs text-slate-400 hover:text-emerald-400 font-semibold transition-all underline"
          >
            ⚡ Continue as Guest
          </button>
        </div>
      </div>
    </div>
  );
}
