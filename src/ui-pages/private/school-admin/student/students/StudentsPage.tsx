'use client';

import { useState } from 'react';
import StudentsTable from './StudentsTable';
import { Student } from "@/src/types/school-admin/AdminStudentTypes"
import SidebarWrapper from '../../SidebarWrapper';

const students: Student[] = [
  { id: '001', name: 'Aarav Sharma', class: '12 Science A', roll: '2024CS001', attendance: 94, fee: 'Paid', avatar: 'AS' },
  { id: '002', name: 'Priya Mehta', class: '11 Commerce B', roll: '2024CM015', attendance: 88, fee: 'Pending', avatar: 'PM' },
  { id: '003', name: 'Rohan Verma', class: '10 A', roll: '2024MA003', attendance: 73, fee: 'Overdue', avatar: 'RV' },
  { id: '004', name: 'Sneha Patel', class: '12 Science B', roll: '2024CS022', attendance: 97, fee: 'Paid', avatar: 'SP' },
  { id: '005', name: 'Karan Gupta', class: '9 B', roll: '2024JU011', attendance: 81, fee: 'Paid', avatar: 'KG' },
  { id: '006', name: 'Ananya Singh', class: '11 Science A', roll: '2024SC007', attendance: 91, fee: 'Pending', avatar: 'AS' },
];

export default function StudentsPage() {
  const [search, setSearch] = useState('');

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.class.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SidebarWrapper>
      {(active) => (
          <StudentsTable
            students={filtered}
            search={search}
            setSearch={setSearch}
            title="All Students"
          />
      )}
    </SidebarWrapper>
  );
}