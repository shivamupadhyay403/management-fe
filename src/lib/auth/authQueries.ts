// lib/auth/authQueries.ts
//
// React Query owns all AUTH API calls.
// Redux owns the resulting STATE.
// This file is the bridge between the two.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { apiClient } from '@/src/services/api';
import {
  authLoading,
  sessionRestored,
  sessionCleared,
  SessionInfo,
} from '@/src/store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { ROLE_HOME, DEFAULT_HOME, Role } from './roles';
import { LoginApiResponse } from '@/src/store/slices/authSlice';
// ─── Query Keys ───────────────────────────────────────────────────────────────

export const AUTH_KEYS = {
  session: ['auth', 'session'] as const,
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface LoginPayload {
  email: string;
  password: string;
}

interface ApiErrorResponse {
  success: boolean;
  message: string;
}

// ─── useBootstrapSession ──────────────────────────────────────────────────────
// Called ONCE on app mount (inside RouteGuard / Providers).
// Hits POST /api/auth/refresh using the httpOnly cookie.
// On success → populates Redux with session info.
// On failure → sets Redux to 'unauthenticated'.

export function useBootstrapSession() {
  const dispatch = useDispatch();

  return useQuery<LoginApiResponse>({
    queryKey: AUTH_KEYS.session,
    queryFn: async () => {
      dispatch(authLoading());
      const { data } =
        await apiClient.post<LoginApiResponse>('/api/auth/refresh');
      return data;
    },
    retry: 1,
    retryDelay: 500,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    meta: {
      onSuccess: (response: LoginApiResponse) => {
        const { user, expiresAt } = response.data;
        dispatch(sessionRestored({ ...user, expiresAt }));
      },
      onError: () => {
        dispatch(sessionCleared('Session expired. Please log in again.'));
      },
    },
  });
}

// ─── useRefreshSession ────────────────────────────────────────────────────────
export function useRefreshSession() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  return useMutation<LoginApiResponse, AxiosError<ApiErrorResponse>>({
    mutationFn: async () => {
      const { data } =
        await apiClient.post<LoginApiResponse>('/api/auth/refresh');
      return data;
    },
    onMutate: () => {
      dispatch(authLoading());
    },
    onSuccess: (response) => {
      const { user, expiresAt } = response.data;
      dispatch(sessionRestored({ ...user, expiresAt }));
      queryClient.setQueryData(AUTH_KEYS.session, response);
    },
    onError: () => {
      dispatch(sessionCleared('Session expired.'));
      queryClient.removeQueries({ queryKey: AUTH_KEYS.session });
    },
  });
}

// ─── useLogin ─────────────────────────────────────────────────────────────────
// POST /api/auth/login
// Backend sets httpOnly cookies; returns session info in body.

export function useLogin() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation<
    LoginApiResponse,
    AxiosError<ApiErrorResponse>,
    LoginPayload
  >({
    mutationFn: async (payload) => {
      const { data } = await apiClient.post<LoginApiResponse>(
        '/auth/login',
        payload
      );
      return data;
    },
    onSuccess: (response) => {
      const { user, expiresAt } = response.data;

      dispatch(
        sessionRestored({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          schoolId: user.schoolId,
          expiresAt,
        })
      );

      queryClient.setQueryData(AUTH_KEYS.session, response);
      const redirect = new URLSearchParams(window.location.search).get(
        'redirect'
      );
      router.push(redirect ?? getRoleHome(user.role));
      router.refresh();
    },
    onError: () => {
      dispatch(sessionCleared());
    },
  });
}

// ─── useLogout ────────────────────────────────────────────────────────────────

export function useLogout() {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => apiClient.post('/auth/logout'),
    onSettled: () => {
      dispatch(sessionCleared());
      queryClient.clear();
      router.push('/login');
    },
  });
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function getRoleHome(role: Role): string {
  return ROLE_HOME[role] ?? DEFAULT_HOME;
}
