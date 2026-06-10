'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/src/hooks/useAuth';

export default function Login() {
  const { login, isLoggingIn, loginReset, loginError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    loginReset()
    // Client-side guard
    if (!email || !password) { setLocalError('Both fields are required'); return; }
    if (!email.includes('@')) { setLocalError('Enter a valid email address'); return; }

    // Fire the React Query mutation — redirect handled in onSuccess inside useLogin
    login({ email, password });
  };

  // Local validation errors take priority; fall back to server error
  const displayError = localError || loginError;

  return (
    <div className="min-h-screen bg-[#0b0d11] flex items-center justify-center p-4 font-[family-name:var(--font-geist-sans)]">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-15 bg-gradient-to-br from-violet-500 to-violet-800" />
      </div>

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-black text-sm shadow-lg">
            EX
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">EduExcel</span>
        </div>

        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
          <p className="text-white/35 text-sm mb-8">Sign in to your institution's admin panel</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-white/35 mb-1.5 uppercase tracking-widest">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setLocalError(''); }}
                placeholder="admin@yourschool.edu"
                autoComplete="email"
                disabled={isLoggingIn}
                className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/25 focus:bg-white/[0.08] transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[10px] font-semibold text-white/35 uppercase tracking-widest">Password</label>
                <Link href="/forgot" className="text-[11px] text-white/30 hover:text-white/55 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => { setPassword(e.target.value); setLocalError(''); }}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  disabled={isLoggingIn}
                  className="w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-white/25 focus:bg-white/[0.08] transition-all pr-16 disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-white/25 hover:text-white/55 transition-colors tracking-wider"
                >
                  {showPass ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            {displayError && (
              <div className="bg-rose-500/10 border border-rose-500/20 rounded-xl px-4 py-3 text-rose-400 text-xs flex items-center gap-2">
                <span>⚠</span> {displayError}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-br from-violet-500 to-violet-700 shadow-lg hover:opacity-90 transition-all disabled:opacity-55 disabled:cursor-not-allowed mt-1"
            >
              {isLoggingIn ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign in'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-white/20 text-[10px]">OR</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          <p className="text-center text-xs text-white/25">
            New institution?{' '}
            <Link href="/register" className="text-violet-400 hover:text-violet-300 transition-colors underline underline-offset-2">
              Register here
            </Link>
          </p>
        </div>

        <div className="mt-6 bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3">
          <p className="text-center text-white/20 text-[11px] leading-relaxed">
            Members (teachers & students) are added by the admin.<br />
            Contact your institution admin to get access.
          </p>
        </div>
      </div>
    </div>
  );
}