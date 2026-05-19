// lib/api/students.ts
import axios from 'axios';

const api = axios.create({ baseURL: '/api/v1' });

export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  admissionNo: string;
  classId: string;
  section: string;
  status: 'ACTIVE' | 'INACTIVE' | 'TRANSFERRED';
}

export interface StudentListResponse {
  data: Student[];
  total: number;
  page: number;
  limit: number;
}

export interface StudentFilters {
  classId?: string;
  section?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export const studentApi = {
  getAll: (filters: StudentFilters) =>
    api.get<StudentListResponse>('/students', { params: filters }).then(r => r.data),

  getById: (id: string) =>
    api.get<Student>(`/students/${id}`).then(r => r.data),

  create: (data: Omit<Student, '_id'>) =>
    api.post<Student>('/students', data).then(r => r.data),

  update: (id: string, data: Partial<Student>) =>
    api.put<Student>(`/students/${id}`, data).then(r => r.data),

  delete: (id: string) =>
    api.delete(`/students/${id}`).then(r => r.data),
};