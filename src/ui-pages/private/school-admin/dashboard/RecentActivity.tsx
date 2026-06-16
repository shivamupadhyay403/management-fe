'use client';
import { recentActivity, activityColors } from '@/src/data/school-admin/dashboardData';

export default function RecentActivity() {
  return (
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
  );
}