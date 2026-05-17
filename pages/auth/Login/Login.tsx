'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Role = 'admin' | 'teacher' | 'student';

const roles: { value: Role; label: string; color: string; activeClass: string }[] = [
  { value: 'admin',   label: 'Admin',   color: 'text-violet-600', activeClass: 'border-violet-500 bg-violet-50 text-violet-700' },
  { value: 'teacher', label: 'Teacher', color: 'text-emerald-600', activeClass: 'border-emerald-500 bg-emerald-50 text-emerald-700' },
  { value: 'student', label: 'Student', color: 'text-sky-600', activeClass: 'border-sky-500 bg-sky-50 text-sky-700' },
];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('admin');
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const accentColors: Record<Role, string> = {
    admin:   'bg-violet-600 hover:bg-violet-700',
    teacher: 'bg-emerald-600 hover:bg-emerald-700',
    student: 'bg-sky-600 hover:bg-sky-700',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 flex-col justify-between p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-violet-600/20" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-violet-600/10" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-violet-600 flex items-center justify-center text-white font-bold">
            EX
          </div>
          <span className="text-white font-semibold text-lg">EduExcel</span>
        </div>

        {/* Center content */}
        <div className="relative">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Welcome back to
            <br />
            <span className="text-violet-400">your dashboard</span>
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Manage students, teachers, attendance, exams, and fees — all from one place.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2">
            {['Student Records', 'Attendance', 'Exam Results', 'Fee Tracking', 'Timetable'].map((f) => (
              <span key={f} className="text-xs bg-white/10 text-slate-300 border border-white/10 px-3 py-1.5 rounded-full">
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="relative grid grid-cols-3 gap-4">
          {[
            { label: 'Students', val: '1,284' },
            { label: 'Teachers', val: '64' },
            { label: 'Pass Rate', val: '98%' },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <p className="text-2xl font-bold text-white">{s.val}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-sm">EX</div>
            <span className="font-semibold text-slate-800">EduExcel</span>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-1">Sign in</h1>
          <p className="text-slate-500 text-sm mb-8">
            Don't have an account?{' '}
            <Link href="/register" className="text-violet-600 hover:underline font-medium">Register here</Link>
          </p>

          {/* Role selector */}
          <div className="mb-6">
            <p className="text-xs font-medium text-slate-500 mb-2">Sign in as</p>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setRole(r.value)}
                  className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                    role === r.value ? r.activeClass : 'border-slate-200 text-slate-500 hover:border-slate-300 bg-white'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={`${role}@school.edu`}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-xs text-violet-600 hover:underline">Forgot password?</a>
              </div>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 transition-all pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  {showPass ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input id="remember" type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-violet-600" />
              <label htmlFor="remember" className="text-sm text-slate-600">Remember me for 30 days</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed ${accentColors[role]}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                `Sign in as ${role.charAt(0).toUpperCase() + role.slice(1)}`
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-xl">
            <p className="text-xs font-medium text-slate-500 mb-2">Demo credentials</p>
            <div className="space-y-1 text-xs text-slate-600">
              <p><span className="font-medium text-violet-600">Admin:</span> admin@school.edu / admin123</p>
              <p><span className="font-medium text-emerald-600">Teacher:</span> teacher@school.edu / teacher123</p>
              <p><span className="font-medium text-sky-600">Student:</span> student@school.edu / student123</p>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-8">
            Protected by 256-bit SSL encryption
          </p>
        </div>
      </div>
    </div>
  );
}