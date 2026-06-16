import { Student, StatCard } from '@/src/types/school-admin/AdminStudentTypes';

export const stats: StatCard[] = [
  { label: 'Total Students', value: '1,284', delta: '+12 this month',       up: true,  icon: '◎', color: 'from-amber-400 to-orange-500' },
  { label: 'Teachers',       value: '86',    delta: '+3 new',               up: true,  icon: '◈', color: 'from-teal-400 to-teal-600'   },
  { label: 'Classes',        value: '32',    delta: 'Same as last term',    up: false, icon: '⬡', color: 'from-violet-500 to-violet-700' },
  { label: 'Fee Collection', value: '₹8.4L', delta: '+18% vs last month',  up: true,  icon: '◆', color: 'from-rose-400 to-rose-600'    },
];

export const students: Student[] = [
  { id: '001', name: 'Aarav Sharma',  class: '12 Science A',  roll: '2024CS001', attendance: 94, fee: 'Paid',    avatar: 'AS' },
  { id: '002', name: 'Priya Mehta',   class: '11 Commerce B', roll: '2024CM015', attendance: 88, fee: 'Pending', avatar: 'PM' },
  { id: '003', name: 'Rohan Verma',   class: '10 A',          roll: '2024MA003', attendance: 73, fee: 'Overdue', avatar: 'RV' },
  { id: '004', name: 'Sneha Patel',   class: '12 Science B',  roll: '2024CS022', attendance: 97, fee: 'Paid',    avatar: 'SP' },
  { id: '005', name: 'Karan Gupta',   class: '9 B',           roll: '2024JU011', attendance: 81, fee: 'Paid',    avatar: 'KG' },
  { id: '006', name: 'Ananya Singh',  class: '11 Science A',  roll: '2024SC007', attendance: 91, fee: 'Pending', avatar: 'AS' },
];

export const navItems = [
  { key: 'overview'    as const, label: 'Overview',    icon: '⬡' },
  { key: 'students'    as const, label: 'Students',    icon: '◎' },
  { key: 'teachers'    as const, label: 'Teachers',    icon: '◈' },
  { key: 'classes'     as const, label: 'Classes',     icon: '▣' },
  { key: 'attendance'  as const, label: 'Attendance',  icon: '◷' },
  { key: 'fees'        as const, label: 'Fees',        icon: '◆' },
  { key: 'results'     as const, label: 'Results',     icon: '◉' },
  { key: 'settings'    as const, label: 'Settings',    icon: '◍' },
];

export const recentActivity = [
  { text: 'New student Arjun Nair enrolled in Class 10A',          time: '2m ago', type: 'enroll' },
  { text: 'Fee payment received from Sneha Patel – ₹12,500',       time: '18m ago', type: 'fee'    },
  { text: 'Attendance marked for Class 12 Science A',              time: '1h ago', type: 'attend' },
  { text: 'Teacher Rekha Joshi uploaded results for Class 9B',     time: '2h ago', type: 'result' },
  { text: 'Holiday notice published: 15 Aug – Independence Day',   time: '3h ago', type: 'notice' },
];

export const weekData   = [72, 85, 91, 78, 95, 88, 83];
export const weekLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const activityColors: Record<string, string> = {
  enroll: 'bg-violet-500',
  fee:    'bg-teal-500',
  attend: 'bg-amber-500',
  result: 'bg-sky-500',
  notice: 'bg-slate-500',
};

export const feeColors: Record<string, string> = {
  Paid:    'bg-teal-500/15 text-teal-400 border-teal-500/20',
  Pending: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
  Overdue: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
};