// lib/query-keys.ts
export const queryKeys = {
  students: {
    all:    ()                       => ['students']              as const,
    list:   (filters: StudentFilters)=> ['students', 'list', filters] as const,
    detail: (id: string)             => ['students', 'detail', id]   as const,
  },
  teachers: {
    all:    ()           => ['teachers']             as const,
    detail: (id: string) => ['teachers', 'detail', id] as const,
  },
  attendance: {
    byClass: (classId: string, date: string) =>
      ['attendance', 'class', classId, date] as const,
    byStudent: (studentId: string, from: string, to: string) =>
      ['attendance', 'student', studentId, from, to] as const,
  },
} as const;

// Types used in keys
interface StudentFilters {
  classId?: string;
  section?: string;
  status?: string;
  page?: number;
}