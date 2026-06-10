'use client';

import { useAuth } from '@/src/hooks/useAuth';
import Link from 'next/link';

const stats = [
  { value: '12,000+', label: 'Students Enrolled' },
  { value: '480+', label: 'Faculty Members' },
  { value: '98%', label: 'Pass Rate' },
  { value: '50+', label: 'Departments' },
];

const features = [
  {
    icon: '🎓',
    title: 'Student Management',
    desc: 'Manage admissions, profiles, grades, and academic records in one place.',
  },
  {
    icon: '📋',
    title: 'Attendance Tracking',
    desc: 'Mark and monitor daily attendance with automated alerts for absentees.',
  },
  {
    icon: '📅',
    title: 'Smart Timetable',
    desc: 'Auto-generate conflict-free timetables for classes and faculty.',
  },
  {
    icon: '💳',
    title: 'Fee Management',
    desc: 'Collect fees, generate invoices, and track payment history effortlessly.',
  },
  {
    icon: '📊',
    title: 'Exam & Results',
    desc: 'Schedule exams, enter marks, and publish results with one click.',
  },
  {
    icon: '📢',
    title: 'Announcements',
    desc: 'Send notices to students, parents, and staff instantly.',
  },
];

const roles = [
  {
    title: 'Admin',
    color: 'bg-violet-600',
    lightColor: 'bg-violet-50 text-violet-700 border-violet-200',
    desc: 'Full system access — manage everything from users to reports.',
    items: ['Manage all users', 'System configuration', 'Reports & analytics', 'Fee structure'],
  },
  {
    title: 'Teacher',
    color: 'bg-emerald-600',
    lightColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    desc: 'Classroom tools — attendance, marks, and student communication.',
    items: ['Mark attendance', 'Enter exam marks', 'View timetable', 'Student profiles'],
  },
  {
    title: 'Student',
    color: 'bg-sky-600',
    lightColor: 'bg-sky-50 text-sky-700 border-sky-200',
    desc: 'Personal dashboard — results, timetable, and fee status.',
    items: ['View results', 'Fee payments', 'Timetable', 'Announcements'],
  },
];

export default function HomePage() {
  const { isAuthed } = useAuth()
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center text-white font-bold text-sm">
              EX
            </div>
            <span className="font-semibold text-slate-800 text-lg">EduExcel</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#roles" className="hover:text-slate-900 transition-colors">Roles</a>
            <a href="#stats" className="hover:text-slate-900 transition-colors">About</a>
          </div>
          {isAuthed ? <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5"
            >
              Sign in
            </Link>
            <Link
              href="/register"
              className="text-sm bg-violet-600 hover:bg-violet-700 text-white px-4 py-1.5 rounded-lg transition-colors font-medium"
            >
              Get started
            </Link>
          </div> :
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5"
              >
                Dashboard
              </Link>
            </div>}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative max-w-6xl mx-auto px-6 pt-24 pb-20 text-center overflow-hidden">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-violet-50 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-200 text-violet-700 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
          Now with AI-powered analytics
        </div>

        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
          The smarter way to
          <br />
          <span className="text-violet-600">run your institution</span>
        </h1>

        <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
          EduExcel brings students, teachers, and admins onto one unified platform —
          attendance, results, fees, and more, all in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/register"
            className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            Start free trial
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto bg-white border border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-3 rounded-xl font-semibold text-sm transition-all hover:shadow-sm"
          >
            Sign in to dashboard →
          </Link>
        </div>

        {/* Dashboard preview mockup */}
        <div className="mt-16 rounded-2xl border border-slate-200 shadow-xl overflow-hidden text-left">
          <div className="bg-slate-800 px-4 py-3 flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-yellow-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-4 text-slate-400 text-xs">eduexcel.app/dashboard</span>
          </div>
          <div className="bg-slate-50 p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Total Students', val: '1,284', color: 'text-violet-600' },
                { label: 'Teachers', val: '64', color: 'text-emerald-600' },
                { label: "Today's Attendance", val: '94%', color: 'text-sky-600' },
                { label: 'Pending Fees', val: '₹2.4L', color: 'text-rose-500' },
              ].map((s) => (
                <div key={s.label} className="bg-white rounded-xl border border-slate-200 p-4">
                  <p className="text-xs text-slate-400 mb-1">{s.label}</p>
                  <p className={`text-xl font-bold ${s.color}`}>{s.val}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-medium text-slate-500 mb-3">Attendance this week</p>
                <div className="flex items-end gap-2 h-20">
                  {[72, 85, 91, 88, 94, 78, 90].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-violet-100 relative" style={{ height: `${h}%` }}>
                      <div className="absolute bottom-0 w-full rounded-t bg-violet-500" style={{ height: `${h * 0.6}%` }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4">
                <p className="text-xs font-medium text-slate-500 mb-3">Quick actions</p>
                {['Mark attendance', 'Add student', 'Fee receipt'].map((a) => (
                  <div key={a} className="text-xs text-slate-600 py-1.5 border-b border-slate-100 last:border-0 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section id="stats" className="bg-violet-600 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-bold text-white mb-1">{s.value}</p>
              <p className="text-violet-200 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-14">
          <p className="text-violet-600 text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Everything you need to manage</h2>
          <p className="text-slate-500 mt-3 max-w-lg mx-auto">
            A complete suite of tools built specifically for educational institutions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="group p-6 rounded-2xl border border-slate-200 hover:border-violet-300 hover:shadow-md transition-all bg-white cursor-default"
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className="font-semibold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Roles ── */}
      <section id="roles" className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-violet-600 text-sm font-semibold uppercase tracking-widest mb-3">Access levels</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Built for every role</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {roles.map((r) => (
              <div key={r.title} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className={`${r.color} px-6 py-5`}>
                  <h3 className="text-white font-bold text-xl">{r.title}</h3>
                  <p className="text-white/80 text-sm mt-1">{r.desc}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {r.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                        <span className="text-green-500 font-bold">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/register"
                    className={`mt-5 inline-block w-full text-center text-sm font-medium border rounded-lg px-4 py-2 transition-colors hover:bg-slate-50 ${r.lightColor}`}
                  >
                    Register as {r.title}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="bg-violet-600 rounded-3xl px-8 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to modernize your institution?
          </h2>
          <p className="text-violet-200 mb-8 max-w-md mx-auto">
            Join thousands of schools already using EduExcel to streamline their operations.
          </p>
          <Link
            href="/register"
            className="inline-block bg-white text-violet-600 font-semibold px-8 py-3 rounded-xl hover:bg-violet-50 transition-colors text-sm"
          >
            Get started for free →
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-violet-600 flex items-center justify-center text-white font-bold text-xs">EX</div>
            <span className="text-sm font-medium text-slate-700">EduExcel</span>
          </div>
          <p className="text-slate-400 text-xs">© 2025 EduExcel. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-slate-400">
            <a href="#" className="hover:text-slate-600">Privacy</a>
            <a href="#" className="hover:text-slate-600">Terms</a>
            <a href="#" className="hover:text-slate-600">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}