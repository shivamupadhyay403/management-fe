'use client';
import { StatCard } from '@/src/types/school-admin/AdminStudentTypes';

export default function StatsGrid({ stats }: { stats: StatCard[] }) {
  return (
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
  );
}