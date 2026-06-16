'use client';
import OverviewContent from './OverviewContent';
import { NavItem } from '../Sidebar';

// Import navItems from Sidebar's source of truth, or re-export from there
const navItems: { key: NavItem; label: string; icon: string }[] = [
  { key: 'overview',   label: 'Overview',   icon: '⬡' },
  { key: 'student',    label: 'Students',   icon: '◎' },
  { key: 'teacher',    label: 'Teachers',   icon: '◈' },
  { key: 'classes',    label: 'Classes',    icon: '▣' },
  { key: 'attendance', label: 'Attendance', icon: '◷' },
  { key: 'fees',       label: 'Fees',       icon: '◆' },
  { key: 'results',    label: 'Results',    icon: '◉' },
  { key: 'settings',   label: 'Settings',   icon: '◍' },
];

interface MainContentProps {
  active: NavItem;
}

const MainContent = ({ active }: MainContentProps) => {
  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <header className="h-16 border-b border-white/[0.06] flex items-center justify-between px-6 bg-[#0e1015] flex-shrink-0">
        <div>
          <h1 className="font-bold text-white text-base">
            {navItems.find(n => n.key === active)?.label ?? 'Overview'}
          </h1>
          <p className="text-white/30 text-xs">St. Xavier's High School · Admin Panel</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white/70 text-xs transition-colors">◉</button>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-bold text-xs">AK</div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        {active === 'overview' && <OverviewContent />}

        {active !== 'overview' && (
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
  );
};

export default MainContent;