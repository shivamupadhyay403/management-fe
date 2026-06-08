'use client';

import { useState } from 'react';

// ─── Types ───────────────────────────────────────────────────────────
type NavItem = 'overview' | 'students' | 'teachers' | 'classes' | 'attendance' | 'fees' | 'results' | 'settings';

interface StatCard {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  icon: string;
  color: string;
}

interface Student {
  id: string;
  name: string;
  class: string;
  roll: string;
  attendance: number;
  fee: 'Paid' | 'Pending' | 'Overdue';
  avatar: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────
const stats: StatCard[] = [
  { label: 'Total Students', value: '1,284', delta: '+12 this month', up: true, icon: '◎', color: 'from-amber-400 to-orange-500' },
  { label: 'Teachers', value: '86', delta: '+3 new', up: true, icon: '◈', color: 'from-teal-400 to-teal-600' },
  { label: 'Classes', value: '32', delta: 'Same as last term', up: false, icon: '⬡', color: 'from-violet-500 to-violet-700' },
  { label: 'Fee Collection', value: '₹8.4L', delta: '+18% vs last month', up: true, icon: '◆', color: 'from-rose-400 to-rose-600' },
];

const students: Student[] = [
  { id: '001', name: 'Aarav Sharma', class: '12 Science A', roll: '2024CS001', attendance: 94, fee: 'Paid', avatar: 'AS' },
  { id: '002', name: 'Priya Mehta', class: '11 Commerce B', roll: '2024CM015', attendance: 88, fee: 'Pending', avatar: 'PM' },
  { id: '003', name: 'Rohan Verma', class: '10 A', roll: '2024MA003', attendance: 73, fee: 'Overdue', avatar: 'RV' },
  { id: '004', name: 'Sneha Patel', class: '12 Science B', roll: '2024CS022', attendance: 97, fee: 'Paid', avatar: 'SP' },
  { id: '005', name: 'Karan Gupta', class: '9 B', roll: '2024JU011', attendance: 81, fee: 'Paid', avatar: 'KG' },
  { id: '006', name: 'Ananya Singh', class: '11 Science A', roll: '2024SC007', attendance: 91, fee: 'Pending', avatar: 'AS' },
];

const navItems: { key: NavItem; label: string; icon: string }[] = [
  { key: 'overview', label: 'Overview', icon: '⬡' },
  { key: 'students', label: 'Students', icon: '◎' },
  { key: 'teachers', label: 'Teachers', icon: '◈' },
  { key: 'classes', label: 'Classes', icon: '▣' },
  { key: 'attendance', label: 'Attendance', icon: '◷' },
  { key: 'fees', label: 'Fees', icon: '◆' },
  { key: 'results', label: 'Results', icon: '◉' },
  { key: 'settings', label: 'Settings', icon: '◍' },
];

const recentActivity = [
  { text: 'New student Arjun Nair enrolled in Class 10A', time: '2m ago', type: 'enroll' },
  { text: 'Fee payment received from Sneha Patel – ₹12,500', time: '18m ago', type: 'fee' },
  { text: 'Attendance marked for Class 12 Science A', time: '1h ago', type: 'attend' },
  { text: 'Teacher Rekha Joshi uploaded results for Class 9B', time: '2h ago', type: 'result' },
  { text: 'Holiday notice published: 15 Aug – Independence Day', time: '3h ago', type: 'notice' },
];

const feeColors: Record<string, string> = {
  Paid: 'bg-teal-500/15 text-teal-400 border-teal-500/20',
  Pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  Overdue: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
};

const activityColors: Record<string, string> = {
  enroll: 'bg-violet-500',
  fee: 'bg-teal-500',
  attend: 'bg-amber-500',
  result: 'bg-sky-500',
  notice: 'bg-slate-500',
};

// ─── Mini Bar Chart ───────────────────────────────────────────────────
const weekData = [72, 85, 91, 78, 95, 88, 83];
const weekLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

// ─── Component ────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [active, setActive] = useState<NavItem>('overview');
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0b0d11] flex font-[family-name:var(--font-geist-sans)] text-white">
      {/* ── Sidebar ── */}
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} flex-shrink-0 border-r border-white/[0.06] flex flex-col transition-all duration-300 bg-[#0e1015]`}>
        {/* Logo */}
        <div className="h-16 flex items-center px-4 border-b border-white/[0.06] gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-black text-xs flex-shrink-0">
            EX
          </div>
          {sidebarOpen && <span className="font-semibold text-sm tracking-tight text-white/90">EduExcel</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-0.5">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => setActive(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                active === item.key
                  ? 'bg-violet-600/20 text-violet-400 font-medium'
                  : 'text-white/30 hover:text-white/60 hover:bg-white/[0.04]'
              }`}
            >
              <span className="text-base flex-shrink-0">{item.icon}</span>
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Collapse toggle */}
        <div className="px-2 pb-4">
          <button
            onClick={() => setSidebarOpen(o => !o)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-white/20 hover:text-white/50 hover:bg-white/[0.04] text-sm transition-all"
          >
            <span className="text-base flex-shrink-0">{sidebarOpen ? '◁' : '▷'}</span>
            {sidebarOpen && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 bg-[#0e1015] flex-shrink-0">
          <div>
            <h1 className="font-bold text-white text-base">
              {navItems.find(n => n.key === active)?.label ?? 'Overview'}
            </h1>
            <p className="text-white/30 text-xs">St. Xavier's High School · Admin Panel</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 text-xs transition-colors">
              ◉
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-bold text-xs">
              AK
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {active === 'overview' && (
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map(stat => (
                  <div key={stat.label} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5 hover:bg-white/[0.05] transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-white/40 text-xs font-medium uppercase tracking-wider">{stat.label}</p>
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white text-sm`}>
                        {stat.icon}
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                    <p className={`text-xs ${stat.up ? 'text-teal-400' : 'text-white/30'}`}>
                      {stat.up ? '↑' : '—'} {stat.delta}
                    </p>
                  </div>
                ))}
              </div>

              {/* Attendance Chart + Activity */}
              <div className="grid xl:grid-cols-3 gap-4">
                {/* Chart */}
                <div className="xl:col-span-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-sm font-semibold text-white">Weekly Attendance</h3>
                      <p className="text-xs text-white/30">School-wide average %</p>
                    </div>
                    <span className="text-xs bg-teal-500/15 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full">This week</span>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {weekData.map((v, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                        <span className="text-[10px] text-white/30">{v}%</span>
                        <div
                          className="w-full rounded-t-lg bg-gradient-to-t from-violet-700 to-violet-500 transition-all"
                          style={{ height: `${v}%` }}
                        />
                        <span className="text-[10px] text-white/30">{weekLabels[i]}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Activity */}
                <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-white mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivity.map((a, i) => (
                      <div key={i} className="flex gap-3">
                        <div className={`w-2 h-2 rounded-full ${activityColors[a.type]} flex-shrink-0 mt-1.5`} />
                        <div className="min-w-0">
                          <p className="text-xs text-white/60 leading-relaxed">{a.text}</p>
                          <p className="text-[10px] text-white/25 mt-0.5">{a.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Students table preview */}
              <StudentsTable students={filtered.slice(0, 5)} search={search} setSearch={setSearch} title="Recent Students" />
            </div>
          )}

          {active === 'students' && (
            <StudentsTable students={filtered} search={search} setSearch={setSearch} title="All Students" />
          )}

          {(active !== 'overview' && active !== 'students') && (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="text-6xl mb-4 opacity-20">
                  {navItems.find(n => n.key === active)?.icon}
                </div>
                <p className="text-white/30 text-sm">
                  {navItems.find(n => n.key === active)?.label} module coming soon
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Students Sub-Component ───────────────────────────────────────────
function StudentsTable({
  students, search, setSearch, title,
}: {
  students: Student[];
  search: string;
  setSearch: (v: string) => void;
  title: string;
}) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden">
      <div className="p-5 border-b border-white/[0.06] flex items-center justify-between gap-4">
        <h3 className="text-sm font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-3 ml-auto">
          <div className="relative">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search students..."
              className="bg-white/[0.05] border border-white/[0.08] rounded-xl pl-4 pr-4 py-2 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 w-48 transition-all"
            />
          </div>
          <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 rounded-xl text-xs font-semibold text-white transition-colors">
            + Add Student
          </button>
        </div>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b border-white/[0.04]">
            {['Student', 'Class', 'Roll No.', 'Attendance', 'Fee Status', ''].map(h => (
              <th key={h} className="text-left text-[10px] text-white/25 font-semibold uppercase tracking-widest px-5 py-3">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr
              key={s.id}
              className={`border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors last:border-0 ${
                i % 2 === 0 ? '' : 'bg-white/[0.01]'
              }`}
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/40 to-violet-700/40 border border-violet-500/20 flex items-center justify-center text-violet-300 text-xs font-bold flex-shrink-0">
                    {s.avatar}
                  </div>
                  <span className="text-sm text-white/80 font-medium">{s.name}</span>
                </div>
              </td>
              <td className="px-5 py-4 text-sm text-white/40">{s.class}</td>
              <td className="px-5 py-4 text-sm text-white/40 font-mono">{s.roll}</td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-white/[0.08] rounded-full overflow-hidden w-16">
                    <div
                      className={`h-full rounded-full ${
                        s.attendance >= 90 ? 'bg-teal-500' : s.attendance >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${s.attendance}%` }}
                    />
                  </div>
                  <span className="text-xs text-white/40">{s.attendance}%</span>
                </div>
              </td>
              <td className="px-5 py-4">
                <span className={`text-xs px-2.5 py-1 rounded-lg border font-medium ${feeColors[s.fee]}`}>
                  {s.fee}
                </span>
              </td>
              <td className="px-5 py-4">
                <button className="text-white/20 hover:text-white/60 text-xs transition-colors">
                  View →
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {students.length === 0 && (
        <div className="py-12 text-center text-white/25 text-sm">No students found</div>
      )}
    </div>
  );
}