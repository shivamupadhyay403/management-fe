'use client';

import { useRouter } from 'next/navigation';

type NavItem = 'overview' | 'student' | 'teacher' | 'classes' | 'attendance' | 'fees' | 'results' | 'settings';

interface SidebarProps {
    active: NavItem;
    setActive: (key: NavItem) => void;
    sidebarOpen: boolean;
}

const navItems: { key: NavItem; label: string; icon: string }[] = [
    { key: 'overview', label: 'Overview', icon: '⬡' },
    { key: 'student', label: 'Students', icon: '◎' },
    { key: 'teacher', label: 'Teachers', icon: '◈' },
    { key: 'classes', label: 'Classes', icon: '▣' },
    { key: 'attendance', label: 'Attendance', icon: '◷' },
    { key: 'fees', label: 'Fees', icon: '◆' },
    { key: 'results', label: 'Results', icon: '◉' },
    { key: 'settings', label: 'Settings', icon: '◍' },
];

const Sidebar = ({ active, setActive, sidebarOpen }: SidebarProps) => {
    const router = useRouter();
    const handleClick = (key: NavItem) => {
        setActive(key);
        router.push(`/school-admin/${key}`)
    };

    return (
        <nav className="flex-1 px-2 py-4 space-y-0.5">
            {navItems.map(item => (
                <button
                    key={item.key}
                    onClick={() => handleClick(item.key)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${active === item.key
                        ? 'bg-violet-600/20 text-violet-400 font-medium'
                        : 'text-white/30 hover:text-white/60 hover:bg-white/[0.04]'
                        }`}
                >
                    <span className="text-base flex-shrink-0">{item.icon}</span>
                    {sidebarOpen && <span>{item.label}</span>}
                </button>
            ))}
        </nav>
    );
};

export default Sidebar;
export type { NavItem };