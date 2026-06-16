'use client';
import { weekData, weekLabels } from '@/src/data/school-admin/dashboardData';

export default function AttendanceChart() {
  return (
    <div className="xl:col-span-2 bg-white/[0.03] border border-white/[0.07] rounded-2xl p-5">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-semibold text-white">Weekly Attendance</h3>
          <p className="text-xs text-white/30">School-wide average %</p>
        </div>
        <span className="text-xs bg-teal-500/15 text-teal-400 border border-teal-500/20 px-3 py-1 rounded-full">
          This week
        </span>
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
  );
}