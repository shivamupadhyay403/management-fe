'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Role = 'admin' | 'teacher' | 'student';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: Role;
  // role-specific
  department?: string;
  employeeId?: string;
  rollNumber?: string;
  class?: string;
  institutionCode: string;
}

const roleConfig = {
  admin: {
    label: 'Admin',
    desc: 'Manage the entire institution',
    color: 'border-violet-500 bg-violet-50 text-violet-700',
    btn: 'bg-violet-600 hover:bg-violet-700',
    badge: 'bg-violet-100 text-violet-700',
    extra: ['department'],
  },
  teacher: {
    label: 'Teacher',
    desc: 'Manage classes and students',
    color: 'border-emerald-500 bg-emerald-50 text-emerald-700',
    btn: 'bg-emerald-600 hover:bg-emerald-700',
    badge: 'bg-emerald-100 text-emerald-700',
    extra: ['department', 'employeeId'],
  },
  student: {
    label: 'Student',
    desc: 'View results and timetable',
    color: 'border-sky-500 bg-sky-50 text-sky-700',
    btn: 'bg-sky-600 hover:bg-sky-700',
    badge: 'bg-sky-100 text-sky-700',
    extra: ['rollNumber', 'class'],
  },
};

const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'English', 'History', 'Commerce', 'Biology'];
const classes = ['Class 9A', 'Class 9B', 'Class 10A', 'Class 10B', 'Class 11 Science', 'Class 11 Commerce', 'Class 12 Science', 'Class 12 Commerce'];

export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [form, setForm] = useState<FormData>({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '',
    role: 'student', department: '', employeeId: '', rollNumber: '', class: '', institutionCode: '',
  });

  const set = (key: keyof FormData, val: string) => {
    setForm((f) => ({ ...f, [key]: val }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep1 = () => {
    const e: Partial<FormData> = {};
    if (!form.fullName.trim()) e.fullName = 'Full name is required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (form.phone.length < 10) e.phone = 'Valid phone required';
    if (form.password.length < 6) e.password = 'Minimum 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.institutionCode.trim()) {
      setErrors({ institutionCode: 'Institution code is required' });
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    router.push('/login');
  };

  const cfg = roleConfig[form.role];

  const InputField = ({
    label, field, type = 'text', placeholder, children,
  }: { label: string; field: keyof FormData; type?: string; placeholder?: string; children?: React.ReactNode }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      {children ?? (
        <input
          type={type}
          value={form[field] as string}
          onChange={(e) => set(field, e.target.value)}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 rounded-lg border text-slate-900 placeholder:text-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 transition-all ${
            errors[field] ? 'border-red-400 bg-red-50' : 'border-slate-200 focus:border-violet-400'
          }`}
        />
      )}
      {errors[field] && <p className="text-red-500 text-xs mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid lg:grid-cols-5 bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">

        {/* ── Sidebar ── */}
        <div className="lg:col-span-2 bg-slate-900 p-8 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-violet-600/15" />

          <div>
            <div className="flex items-center gap-2 mb-10">
              <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-sm">EX</div>
              <span className="text-white font-semibold">EduExcel</span>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Join your institution</h2>
            <p className="text-slate-400 text-sm mb-8">Create your account and get access to your personalized dashboard.</p>

            {/* Steps */}
            <div className="space-y-4">
              {[
                { n: 1, title: 'Personal details', desc: 'Name, email, password' },
                { n: 2, title: 'Role & institution', desc: 'Your role and school code' },
              ].map((s) => (
                <div key={s.n} className="flex items-start gap-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 transition-colors ${
                    step > s.n ? 'bg-green-500 text-white' :
                    step === s.n ? 'bg-violet-500 text-white' :
                    'bg-white/10 text-slate-400'
                  }`}>
                    {step > s.n ? '✓' : s.n}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${step >= s.n ? 'text-white' : 'text-slate-500'}`}>{s.title}</p>
                    <p className="text-xs text-slate-500">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="relative text-xs text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-violet-400 hover:underline">Sign in here</Link>
          </p>
        </div>

        {/* ── Form ── */}
        <div className="lg:col-span-3 p-8">
          {/* Role picker always visible */}
          <div className="mb-6">
            <p className="text-xs font-medium text-slate-500 mb-2">I am a</p>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(roleConfig) as Role[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => set('role', r)}
                  className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                    form.role === r ? roleConfig[r].color : 'border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  {roleConfig[r].label}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-1.5">{cfg.desc}</p>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-800 text-lg mb-1">Personal details</h3>

                <InputField label="Full name" field="fullName" placeholder="John Smith" />
                <InputField label="Email address" field="email" type="email" placeholder="john@school.edu" />
                <InputField label="Phone number" field="phone" type="tel" placeholder="+91 98765 43210" />

                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Password" field="password" type="password" placeholder="Min 6 characters" />
                  <InputField label="Confirm password" field="confirmPassword" type="password" placeholder="Repeat password" />
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className={`w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-all mt-2 ${cfg.btn}`}
                >
                  Continue →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-slate-400 hover:text-slate-600 text-sm"
                  >
                    ← Back
                  </button>
                  <h3 className="font-semibold text-slate-800 text-lg">Role & institution</h3>
                </div>

                {/* Role-specific fields */}
                {(form.role === 'teacher' || form.role === 'admin') && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Department</label>
                    <select
                      value={form.department}
                      onChange={(e) => set('department', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all"
                    >
                      <option value="">Select department</option>
                      {departments.map((d) => <option key={d}>{d}</option>)}
                    </select>
                  </div>
                )}

                {form.role === 'teacher' && (
                  <InputField label="Employee ID" field="employeeId" placeholder="EMP-2024-001" />
                )}

                {form.role === 'student' && (
                  <>
                    <InputField label="Roll number" field="rollNumber" placeholder="2024CS001" />
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Class / Section</label>
                      <select
                        value={form.class}
                        onChange={(e) => set('class', e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-400 transition-all"
                      >
                        <option value="">Select your class</option>
                        {classes.map((c) => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </>
                )}

                <InputField label="Institution code" field="institutionCode" placeholder="e.g. SCH-MH-2024" />
                <p className="text-xs text-slate-400 -mt-2">Get this code from your institution's admin.</p>

                <div className="flex items-start gap-2 mt-1">
                  <input type="checkbox" required id="terms" className="w-4 h-4 mt-0.5 rounded border-slate-300 accent-violet-600" />
                  <label htmlFor="terms" className="text-xs text-slate-500">
                    I agree to the{' '}
                    <a href="#" className="text-violet-600 hover:underline">Terms of Service</a>{' '}
                    and{' '}
                    <a href="#" className="text-violet-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-all disabled:opacity-70 ${cfg.btn}`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                      Creating account...
                    </span>
                  ) : (
                    `Create ${cfg.label} account`
                  )}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}