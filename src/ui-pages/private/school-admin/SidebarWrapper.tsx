// SidebarWrapper.tsx
'use client';
import { useState } from 'react';
import Sidebar, { NavItem } from './Sidebar';

interface SidebarWrapperProps {
  children: (active: NavItem) => React.ReactNode;
}

export default function SidebarWrapper({ children }: SidebarWrapperProps) {
  const [active, setActive] = useState<NavItem>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#0b0d11] flex font-[family-name:var(--font-geist-sans)] text-white">
      <aside className={`${sidebarOpen ? 'w-60' : 'w-16'} flex-shrink-0 border-r border-white/[0.06] flex flex-col transition-all duration-300 bg-[#0e1015]`}>
        <div className="h-16 flex items-center px-4 border-b border-white/[0.06] gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white font-black text-xs flex-shrink-0">
            EX
          </div>
          {sidebarOpen && <span className="font-semibold text-sm tracking-tight text-white/90">EduExcel</span>}
        </div>

        <Sidebar active={active} setActive={setActive} sidebarOpen={sidebarOpen} />

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

      {children(active)}
    </div>
  );
}