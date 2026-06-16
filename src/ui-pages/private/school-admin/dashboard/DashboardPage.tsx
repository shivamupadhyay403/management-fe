// app/dashboard/page.tsx
'use client';
import SidebarWrapper from '../SidebarWrapper';
import MainContent from './MainContent';

export default function DashboardPage() {
  return (
    <SidebarWrapper>
      {(active) => <MainContent active={active} />}
    </SidebarWrapper>
  );
}