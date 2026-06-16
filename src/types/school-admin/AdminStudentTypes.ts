export interface Student {
  id: string;
  name: string;
  class: string;
  roll: string;
  attendance: number;
  fee: 'Paid' | 'Pending' | 'Overdue';
  avatar: string;
}

export interface StatCard {
  label: string;
  value: string;
  delta: string;
  up: boolean;
  icon: string;
  color: string;
}

export type NavItem =
  | 'overview' | 'students' | 'teachers' | 'classes'
  | 'attendance' | 'fees' | 'results' | 'settings';