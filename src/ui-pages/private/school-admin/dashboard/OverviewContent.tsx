'use client';
import StatsGrid from './StatsGrid';
import AttendanceChart from './AttendanceChart';
import RecentActivity from './RecentActivity';
import { stats } from '@/src/data/school-admin/dashboardData';
export default function OverviewContent() {
  return (
    <div className="space-y-6">
      <StatsGrid stats={stats} />
      <div className="grid xl:grid-cols-3 gap-4">
        <AttendanceChart />
        <RecentActivity />
      </div>
    </div>
  );
}