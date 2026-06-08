'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// ─── Types ────────────────────────────────────────────────────────────
type InstitutionType = 'school' | 'college' | 'coaching' | 'university';

interface FormData {
  // Step 1 – Institution info
  institutionName: string;
  institutionType: InstitutionType | '';
  affiliationBoard: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  website: string;

  // Step 2 – Admin account
  adminName: string;
  adminEmail: string;
  adminPhone: string;
  password: string;
  confirmPassword: string;

  // Step 3 – Verification
  regNumber: string;
  agreed: boolean;
}

const institutionTypes: { value: InstitutionType; label: string; icon: string }[] = [
  { value: 'school',     label: 'School',     icon: '◎' },
  { value: 'college',    label: 'College',    icon: '◈' },
  { value: 'coaching',   label: 'Coaching',   icon: '◆' },
  { value: 'university', label: 'University', icon: '⬡' },
];

const indianStates = [
  'Andhra Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal',
];

const STEPS = [
  { n: 1, title: 'Institution info',   desc: 'Name, type & location'   },
  { n: 2, title: 'Admin account',      desc: 'Primary admin credentials' },
  { n: 3, title: 'Verification',       desc: 'Registration & agreement'  },
];

const GRAD = 'from-violet-500 to-violet-700';
const RING = 'ring-violet-500/30';

// ─── Component ────────────────────────────────────────────────────────
export default function Register() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  const [form, setForm] = useState<FormData>({
    institutionName: '', institutionType: '', affiliationBoard: '',
    address: '', city: '', state: '', pincode: '', phone: '', website: '',
    adminName: '', adminEmail: '', adminPhone: '', password: '', confirmPassword: '',
    regNumber: '', agreed: false,
  });

  const set = (key: keyof FormData, val: string | boolean) => {
    setForm(f => ({ ...f, [key]: val }));
    setErrors(e => ({ ...e, [key]: undefined }));
  };

  // ── Validation ──────────────────────────────────────────────────────
  const validateStep1 = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.institutionName.trim())  e.institutionName  = 'Institution name is required';
    if (!form.institutionType)         e.institutionType  = 'Select institution type';
    if (!form.city.trim())             e.city             = 'City is required';
    if (!form.state)                   e.state            = 'State is required';
    if (form.pincode.length !== 6)     e.pincode          = 'Enter valid 6-digit pincode';
    if (form.phone.length < 10)        e.phone            = 'Enter valid phone number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Partial<Record<keyof FormData, string>> = {};
    if (!form.adminName.trim())          e.adminName     = 'Admin name is required';
    if (!form.adminEmail.includes('@'))  e.adminEmail    = 'Valid email required';
    if (form.adminPhone.length < 10)     e.adminPhone    = 'Valid phone required';
    if (form.password.length < 8)        e.password      = 'Minimum 8 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    if (step === 2 && validateStep2()) setStep(3);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.regNumber.trim()) { setErrors({ regNumber: 'Registration number is required' }); return; }
    if (!form.agreed) { setErrors({ agreed: 'You must agree to proceed' }); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 1600));
    setLoading(false);
    router.push('/login');
  };

  // ── Field helpers ───────────────────────────────────────────────────
  const Field = ({
    label, field, type = 'text', placeholder, half,
  }: { label: string; field: keyof FormData; type?: string; placeholder?: string; half?: boolean }) => (
    <div className={half ? '' : ''}>
      <label className="block text-[10px] font-semibold text-white/35 mb-1.5 uppercase tracking-widest">{label}</label>
      <input
        type={type}
        value={form[field] as string}
        onChange={e => set(field, e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-2.5 rounded-xl border text-white text-sm placeholder:text-white/20 bg-white/[0.05] focus:outline-none focus:border-white/25 focus:bg-white/[0.08] transition-all ${
          errors[field] ? 'border-rose-500/40 bg-rose-500/5' : 'border-white/[0.08]'
        }`}
      />
      {errors[field] && <p className="text-rose-400 text-[11px] mt-1">{errors[field]}</p>}
    </div>
  );

  const SelectField = ({ label, field, options, placeholder }: {
    label: string; field: keyof FormData; options: string[]; placeholder: string;
  }) => (
    <div>
      <label className="block text-[10px] font-semibold text-white/35 mb-1.5 uppercase tracking-widest">{label}</label>
      <select
        value={form[field] as string}
        onChange={e => set(field, e.target.value)}
        className={`w-full px-4 py-2.5 rounded-xl border bg-[#12141a] text-sm focus:outline-none focus:border-white/25 transition-all appearance-none ${
          errors[field]
            ? 'border-rose-500/40 text-white'
            : form[field]
              ? 'border-white/[0.08] text-white'
              : 'border-white/[0.08] text-white/30'
        }`}
      >
        <option value="" disabled className="text-white/30">{placeholder}</option>
        {options.map(o => <option key={o} value={o} className="text-white bg-[#12141a]">{o}</option>)}
      </select>
      {errors[field] && <p className="text-rose-400 text-[11px] mt-1">{errors[field]}</p>}
    </div>
  );

  // ── Render ──────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#0b0d11] flex items-center justify-center p-4 py-10 font-[family-name:var(--font-geist-sans)]">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] opacity-10 bg-gradient-to-br from-violet-500 to-violet-800" />
      </div>

      <div className="relative w-full max-w-5xl">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-black text-sm shadow-lg">
            EX
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">EduExcel</span>
        </div>

        <div className="grid lg:grid-cols-5 bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">

          {/* ── Left Sidebar ── */}
          <div className="lg:col-span-2 bg-white/[0.02] border-r border-white/[0.05] p-8 flex flex-col justify-between">
            <div>
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-1">Register your institution</h2>
                <p className="text-white/30 text-sm leading-relaxed">
                  Set up your institution on EduExcel. An admin account will be created automatically — you can then invite teachers and students from your dashboard.
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-1 mb-10">
                {STEPS.map((s, i) => {
                  const state = step > s.n ? 'done' : step === s.n ? 'active' : 'idle';
                  return (
                    <div key={s.n}>
                      <div className="flex items-start gap-4 py-3">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 transition-all duration-300 ${
                          state === 'done'   ? 'bg-teal-500 text-white' :
                          state === 'active' ? `bg-gradient-to-br ${GRAD} text-white ring-2 ${RING}` :
                          'bg-white/[0.06] text-white/20 border border-white/[0.08]'
                        }`}>
                          {state === 'done' ? '✓' : s.n}
                        </div>
                        <div className="flex-1">
                          <p className={`text-sm font-medium ${state !== 'idle' ? 'text-white' : 'text-white/25'}`}>{s.title}</p>
                          <p className="text-xs text-white/25">{s.desc}</p>
                        </div>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className={`ml-[13px] w-px h-4 transition-colors ${step > s.n ? 'bg-teal-500/40' : 'bg-white/[0.06]'}`} />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Info box */}
              <div className="bg-violet-500/8 border border-violet-500/15 rounded-xl p-4">
                <p className="text-violet-300/80 text-xs font-semibold mb-1.5 uppercase tracking-wider">How it works</p>
                <ul className="space-y-1.5 text-[11px] text-white/35 leading-relaxed">
                  <li className="flex gap-2"><span className="text-violet-400 flex-shrink-0">①</span> Register your institution with an admin account</li>
                  <li className="flex gap-2"><span className="text-violet-400 flex-shrink-0">②</span> Log in as Admin to your dashboard</li>
                  <li className="flex gap-2"><span className="text-violet-400 flex-shrink-0">③</span> Add teachers, students and custom roles</li>
                  <li className="flex gap-2"><span className="text-violet-400 flex-shrink-0">④</span> Share the institution code with members</li>
                </ul>
              </div>
            </div>

            <p className="text-xs text-white/20 mt-8">
              Already registered?{' '}
              <Link href="/login" className="text-white/50 hover:text-white/80 underline underline-offset-2 transition-colors">
                Sign in as Admin
              </Link>
            </p>
          </div>

          {/* ── Right Form ── */}
          <div className="lg:col-span-3 p-8">

            {/* Step header */}
            <div className="mb-6">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(s => (s - 1) as 1 | 2 | 3)}
                  className="text-white/30 hover:text-white/60 text-xs mb-3 transition-colors flex items-center gap-1"
                >
                  ← Back
                </button>
              )}
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${GRAD} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                  {step}
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{STEPS[step - 1].title}</h3>
                  <p className="text-white/30 text-xs">Step {step} of 3</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>

              {/* ── STEP 1: Institution Info ── */}
              {step === 1 && (
                <div className="space-y-4">
                  <Field label="Institution name" field="institutionName" placeholder="St. Xavier's High School" />

                  {/* Type picker */}
                  <div>
                    <label className="block text-[10px] font-semibold text-white/35 mb-2 uppercase tracking-widest">Institution type</label>
                    <div className="grid grid-cols-4 gap-2">
                      {institutionTypes.map(t => (
                        <button
                          key={t.value}
                          type="button"
                          onClick={() => set('institutionType', t.value)}
                          className={`flex flex-col items-center gap-1 py-3 rounded-xl border text-xs font-medium transition-all ${
                            form.institutionType === t.value
                              ? `bg-gradient-to-br ${GRAD} border-transparent text-white ring-2 ${RING}`
                              : 'border-white/[0.07] text-white/35 hover:border-white/15 hover:text-white/55 bg-white/[0.02]'
                          }`}
                        >
                          <span className="text-base">{t.icon}</span>
                          {t.label}
                        </button>
                      ))}
                    </div>
                    {errors.institutionType && <p className="text-rose-400 text-[11px] mt-1">{errors.institutionType}</p>}
                  </div>

                  <Field label="Affiliation / Board (optional)" field="affiliationBoard" placeholder="e.g. CBSE, ICSE, State Board" />

                  <Field label="Address" field="address" placeholder="Street address" />

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="City" field="city" placeholder="Mumbai" />
                    <SelectField label="State" field="state" options={indianStates} placeholder="Select state" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Pincode" field="pincode" placeholder="400001" type="tel" />
                    <Field label="Phone" field="phone" placeholder="+91 98765 43210" type="tel" />
                  </div>

                  <Field label="Website (optional)" field="website" placeholder="https://yourschool.edu.in" type="url" />

                  <button
                    type="button"
                    onClick={handleNext}
                    className={`w-full py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r ${GRAD} hover:opacity-90 transition-all mt-2 shadow-lg`}
                  >
                    Continue to Admin Setup →
                  </button>
                </div>
              )}

              {/* ── STEP 2: Admin Account ── */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 mb-2">
                    <p className="text-white/60 text-xs">
                      This creates the <span className="text-violet-400 font-semibold">primary admin</span> for your institution. The admin can log in and manage all members, roles and settings.
                    </p>
                  </div>

                  <Field label="Admin full name" field="adminName" placeholder="Rajesh Kumar" />

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Admin email" field="adminEmail" type="email" placeholder="admin@yourschool.edu" />
                    <Field label="Admin phone" field="adminPhone" type="tel" placeholder="+91 98765 43210" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Password" field="password" type="password" placeholder="Min 8 characters" />
                    <Field label="Confirm password" field="confirmPassword" type="password" placeholder="Repeat password" />
                  </div>

                  {/* Password strength hint */}
                  {form.password.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex gap-1">
                        {[1,2,3,4].map(i => (
                          <div
                            key={i}
                            className={`h-1 flex-1 rounded-full transition-colors ${
                              form.password.length >= i * 3
                                ? i <= 1 ? 'bg-rose-500' : i <= 2 ? 'bg-amber-500' : i <= 3 ? 'bg-teal-500' : 'bg-green-400'
                                : 'bg-white/[0.08]'
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-[10px] text-white/25">
                        {form.password.length < 4 ? 'Too short' : form.password.length < 7 ? 'Weak' : form.password.length < 10 ? 'Fair' : 'Strong'}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={handleNext}
                    className={`w-full py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r ${GRAD} hover:opacity-90 transition-all mt-2 shadow-lg`}
                  >
                    Continue to Verification →
                  </button>
                </div>
              )}

              {/* ── STEP 3: Verification ── */}
              {step === 3 && (
                <div className="space-y-4">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3 mb-2">
                    <p className="text-white/60 text-xs leading-relaxed">
                      Provide your institution's official registration number for verification. After submission, EduExcel will review and activate your account within <span className="text-white/80">24 hours</span>.
                    </p>
                  </div>

                  <Field
                    label="Institution registration number"
                    field="regNumber"
                    placeholder="e.g. MH/EDU/2024/00123"
                  />
                  <p className="text-[10px] text-white/20 -mt-2">
                    This is issued by your state education department or university authority.
                  </p>

                  {/* Summary card */}
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 space-y-2.5">
                    <p className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mb-3">Registration summary</p>
                    <SummaryRow label="Institution" value={form.institutionName || '—'} />
                    <SummaryRow label="Type" value={form.institutionType ? institutionTypes.find(t => t.value === form.institutionType)?.label ?? '—' : '—'} />
                    <SummaryRow label="Location" value={form.city && form.state ? `${form.city}, ${form.state}` : '—'} />
                    <SummaryRow label="Admin" value={form.adminName || '—'} />
                    <SummaryRow label="Admin email" value={form.adminEmail || '—'} />
                  </div>

                  <div className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={form.agreed}
                      onChange={e => set('agreed', e.target.checked)}
                      className="w-4 h-4 mt-0.5 rounded border-white/20 accent-violet-500 flex-shrink-0"
                    />
                    <label htmlFor="terms" className="text-xs text-white/40 leading-relaxed">
                      I confirm the above information is accurate and agree to{' '}
                      <a href="#" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">Terms of Service</a>
                      {' '}and{' '}
                      <a href="#" className="text-white/70 hover:text-white underline underline-offset-2 transition-colors">Privacy Policy</a>
                    </label>
                  </div>
                  {errors.agreed && <p className="text-rose-400 text-[11px] -mt-2">{errors.agreed}</p>}

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 rounded-xl text-white font-semibold text-sm bg-gradient-to-r ${GRAD} hover:opacity-90 transition-all disabled:opacity-50 shadow-lg`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Submitting registration...
                      </span>
                    ) : 'Submit institution registration →'}
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Summary row helper ───────────────────────────────────────────────
function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] text-white/30">{label}</span>
      <span className="text-[11px] text-white/70 font-medium truncate max-w-[55%] text-right">{value}</span>
    </div>
  );
}