import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Shield, 
  Building2, 
  Users, 
  Lock, 
  Mail, 
  User, 
  CheckCircle2, 
  ArrowRight, 
  Fingerprint, 
  Sparkles,
  MapPin
} from 'lucide-react';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, currentUser }) {
  const [role, setRole] = useState('officer'); // 'officer' | 'public'
  const [officerId, setOfficerId] = useState('ASI-OFFICER-031');
  const [officerCircle, setOfficerCircle] = useState('Delhi Circle');
  const [password, setPassword] = useState('••••••••••••');
  
  const [publicName, setPublicName] = useState('Aarav Patel');
  const [publicEmail, setPublicEmail] = useState('citizen.sentinel@heritageshield.gov.in');
  const [publicCity, setPublicCity] = useState('New Delhi, NCR');

  const [isLoading, setIsLoading] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);

  if (!isOpen) return null;

  const handleOfficerLogin = (e) => {
    e?.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthSuccess(true);
      setTimeout(() => {
        setAuthSuccess(false);
        onLoginSuccess({
          role: 'officer',
          name: 'Dr. Rajesh Sharma',
          title: 'ASI Lead Conservation Architect',
          id: officerId || 'ASI-OFFICER-031',
          circle: officerCircle,
          clearance: 'Level-3 Sovereign Security'
        });
        onClose();
      }, 700);
    }, 600);
  };

  const handlePublicLogin = (e) => {
    e?.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthSuccess(true);
      setTimeout(() => {
        setAuthSuccess(false);
        onLoginSuccess({
          role: 'public',
          name: publicName || 'Citizen Sentinel',
          title: 'Registered Heritage Guardian',
          id: 'CITIZEN-9421',
          city: publicCity,
          clearance: 'Public Sentinel Access'
        });
        onClose();
      }, 700);
    }, 600);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/90 backdrop-blur-2xl p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#0C0E16] border border-white/15 text-[#EDE8DE] rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl frosted-btn text-gray-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Modal Header */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-white/10 text-[#E06D44] border border-white/15">
                  <Shield className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono font-bold text-[#E06D44] uppercase tracking-wider">
                  Heritage Shield Authentication
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#FDFBF7]">
                Portal Login & Access
              </h2>
            </div>

            {/* Role Switcher Tabs */}
            <div className="grid grid-cols-2 p-1 bg-[#121522] border border-white/15 rounded-2xl">
              <button
                type="button"
                onClick={() => setRole('officer')}
                className={`py-3 px-4 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'officer'
                    ? 'terracotta-btn shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>🏛️ Official (ASI)</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('public')}
                className={`py-3 px-4 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'public'
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>👥 General Public</span>
              </button>
            </div>

            {/* FORM 1: OFFICIAL ASI PERSONNEL */}
            {role === 'officer' && (
              <form onSubmit={handleOfficerLogin} className="space-y-4">
                <div className="p-3 rounded-xl bg-[#121522] border border-white/10 flex items-center justify-between text-[11px] font-mono text-[#E5C07B]">
                  <span className="flex items-center gap-1.5">
                    <Fingerprint className="w-4 h-4 text-[#E06D44]" />
                    <span>Govt of India · Ministry of Culture</span>
                  </span>
                  <span className="bg-amber-900/60 px-2 py-0.5 rounded text-[10px] font-bold">2FA Enabled</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-gray-300 uppercase font-bold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#E06D44]" />
                    <span>Officer / Employee ID:</span>
                  </label>
                  <input
                    type="text"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    placeholder="e.g. ASI-OFFICER-031"
                    className="w-full bg-[#121522] border border-white/15 focus:border-[#E06D44] text-[#FDFBF7] text-xs font-mono px-3.5 py-2.5 rounded-xl focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-gray-300 uppercase font-bold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E06D44]" />
                    <span>Regional ASI Circle:</span>
                  </label>
                  <select
                    value={officerCircle}
                    onChange={(e) => setOfficerCircle(e.target.value)}
                    className="w-full bg-[#121522] border border-white/15 focus:border-[#E06D44] text-[#FDFBF7] text-xs font-mono px-3.5 py-2.5 rounded-xl focus:outline-none transition cursor-pointer"
                  >
                    <option value="Delhi Circle" className="bg-[#0C0E16]">Delhi Circle (Delhi NCR)</option>
                    <option value="Agra Circle" className="bg-[#0C0E16]">Agra Circle (Uttar Pradesh)</option>
                    <option value="Bhubaneswar Circle" className="bg-[#0C0E16]">Bhubaneswar Circle (Odisha)</option>
                    <option value="Hyderabad Circle" className="bg-[#0C0E16]">Hyderabad Circle (Telangana)</option>
                    <option value="Hampi Mini-Circle" className="bg-[#0C0E16]">Hampi Mini-Circle (Karnataka)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-gray-300 uppercase font-bold flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#E06D44]" />
                    <span>Secure Clearance Key / Password:</span>
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Security PIN"
                    className="w-full bg-[#121522] border border-white/15 focus:border-[#E06D44] text-[#FDFBF7] text-xs font-mono px-3.5 py-2.5 rounded-xl focus:outline-none transition"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-xl terracotta-btn text-xs font-mono font-bold tracking-wider uppercase transition flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                  >
                    {isLoading ? (
                      <span>Verifying Sovereign Credentials...</span>
                    ) : authSuccess ? (
                      <span className="flex items-center gap-1.5 text-black">
                        <CheckCircle2 className="w-4 h-4 text-emerald-900" />
                        <span>Authorized! Redirecting...</span>
                      </span>
                    ) : (
                      <>
                        <span>Sign In as ASI Official</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* FORM 2: GENERAL PUBLIC / CITIZEN SENTINEL */}
            {role === 'public' && (
              <form onSubmit={handlePublicLogin} className="space-y-4">
                <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-800/40 flex items-center justify-between text-[11px] font-mono text-emerald-300">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Citizen Science Sentinel Network</span>
                  </span>
                  <span className="bg-emerald-900/60 px-2 py-0.5 rounded text-[10px] font-bold">Open Public</span>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-gray-300 uppercase font-bold flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Your Full Name:</span>
                  </label>
                  <input
                    type="text"
                    value={publicName}
                    onChange={(e) => setPublicName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full bg-[#14171F] border border-[#2B313D] focus:border-emerald-500 text-gray-100 text-xs font-mono px-3.5 py-2.5 rounded-xl focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-gray-300 uppercase font-bold flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Email Address / Phone:</span>
                  </label>
                  <input
                    type="email"
                    value={publicEmail}
                    onChange={(e) => setPublicEmail(e.target.value)}
                    placeholder="citizen.sentinel@gmail.com"
                    className="w-full bg-[#14171F] border border-[#2B313D] focus:border-emerald-500 text-gray-100 text-xs font-mono px-3.5 py-2.5 rounded-xl focus:outline-none transition"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono text-gray-300 uppercase font-bold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Your City / State:</span>
                  </label>
                  <input
                    type="text"
                    value={publicCity}
                    onChange={(e) => setPublicCity(e.target.value)}
                    placeholder="e.g. New Delhi, NCR"
                    className="w-full bg-[#14171F] border border-[#2B313D] focus:border-emerald-500 text-gray-100 text-xs font-mono px-3.5 py-2.5 rounded-xl focus:outline-none transition"
                  />
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition flex items-center justify-center gap-2 shadow-xl cursor-pointer"
                  >
                    {isLoading ? (
                      <span>Connecting Sentinel Node...</span>
                    ) : authSuccess ? (
                      <span className="flex items-center gap-1.5 text-white">
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>Welcome Guardian! Redirecting...</span>
                      </span>
                    ) : (
                      <>
                        <span>Join as Public Sentinel</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
