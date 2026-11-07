import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, AlertCircle, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { loginWithPassword, authError, clearAuthError } = useAuth();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) return;

    const success = loginWithPassword(password);
    if (success) {
      setPassword('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-sm w-full p-6 sm:p-8 shadow-2xl border border-slate-100">
        
        {/* Close Button */}
        <button
          onClick={() => {
            clearAuthError();
            setPassword('');
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 text-slate-700 hover:text-black flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Title */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#542C91] to-[#6E3CB8] text-white flex items-center justify-center shadow-md mb-3">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-[#191624]">
            Admin Portal
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-xs">
            Enter your administrator password to unlock the dashboard.
          </p>
        </div>

        {/* Error Alert */}
        {authError && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{authError}</span>
          </div>
        )}

        {/* Passcode Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (authError) clearAuthError();
                }}
                placeholder="Enter admin password"
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#542C91]/30 focus:border-[#542C91]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#542C91] hover:bg-[#432373] text-white text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Unlock Admin Portal</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </form>

      </div>
    </div>
  );
};
