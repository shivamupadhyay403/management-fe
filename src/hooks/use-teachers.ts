// hooks/use-students.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/src/lib/query-keys';
import { studentApi, type StudentFilters } from '@/src/lib/api/students';

// ── Queries ───────────────────────────────────────────────────────────────

export function useStudents(filters: StudentFilters = {}) {
  return useQuery({
    queryKey: queryKeys.students.list(filters),
    queryFn:  () => studentApi.getAll(filters),
    placeholderData: (prev) => prev, // keeps old data while fetching next page
  });
}

export function useStudent(id: string) {
  return useQuery({
    queryKey: queryKeys.students.detail(id),
    queryFn:  () => studentApi.getById(id),
    enabled:  Boolean(id), // don't run if id is empty
  });
}

// ── Mutations ─────────────────────────────────────────────────────────────

export function useCreateStudent() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: studentApi.create,
    onSuccess: () => {
      // Invalidate all student list queries so they refetch
      qc.invalidateQueries({ queryKey: queryKeys.students.all() });
    },
  });
}

export function useUpdateStudent(id: string) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (data: Parameters<typeof studentApi.update>[1]) =>
      studentApi.update(id, data),

    // Optimistic update — update cache before the server responds
    onMutate: async (newData) => {
      await qc.cancelQueries({ queryKey: queryKeys.students.detail(id) });
      const previous = qc.getQueryData(queryKeys.students.detail(id));
      qc.setQueryData(queryKeys.students.detail(id), (old: any) => ({
        ...old,
        ...newData,
      }));
      return { previous }; // context for rollback
    },

    onError: (_err, _vars, context) => {
      // Roll back on error
      if (context?.previous) {
        qc.setQueryData(queryKeys.students.detail(id), context.previous);
      }
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: queryKeys.students.detail(id) });
    },
  });
}

export function useDeleteStudent() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: studentApi.delete,
    onSuccess: (_data, deletedId) => {
      qc.removeQueries({ queryKey: queryKeys.students.detail(deletedId) });
      qc.invalidateQueries({ queryKey: queryKeys.students.all() });
    },
  });
}