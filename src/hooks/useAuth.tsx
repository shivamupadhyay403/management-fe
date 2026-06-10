// hooks/useAuth.ts
//
// Single hook for any component that needs auth state or actions.
// Combines Redux selectors + React Query mutations into one API.
//
// Usage:
//   const { session, role, isAuthed, login, logout, isLoggingIn, loginError } = useAuth();

import React from 'react';
import { useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import {
  selectSession,
  selectAuthStatus,
  selectRole,
  selectIsAuthed,
} from '@/src/store/slices/authSlice';
import { useLogin, useLogout, useRefreshSession } from '@/src/lib/auth/authQueries';
import type { Role } from '@/src/lib/auth/roles';
import { ROLE_HOME, DEFAULT_HOME } from '@/src/lib/auth/roles';

export function useAuth() {
  const session = useSelector(selectSession);
  const status = useSelector(selectAuthStatus);
  const role = useSelector(selectRole);
  const isAuthed = useSelector(selectIsAuthed);

  const loginMutation = useLogin();
  const logoutMutation = useLogout();
  const refreshMutation = useRefreshSession();

  // Extract the server-provided message from an Axios error response,
  // falling back to the generic error message string.
  const loginError = (() => {
    const err = loginMutation.error;
    if (!err) return null;
    if (err instanceof AxiosError) {
      return err.response?.data?.message ?? err.message ?? 'Something went wrong';
    }
  })();

  return {
    // ── State ──────────────────────────────────────────────────────────────
    session,
    status,
    role,
    isAuthed,
    isLoading: status === 'loading' || status === 'idle',
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError,

    // ── Actions ────────────────────────────────────────────────────────────
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    refresh: refreshMutation.mutate,
    loginReset: loginMutation.reset,

    // ── Helpers ────────────────────────────────────────────────────────────
    /** true if the user has at least one of the given roles */
    hasRole: (...roles: Role[]) => !!role && roles.includes(role),

    /** The dashboard path for the current user's role */
    homePath: role ? (ROLE_HOME[role] ?? DEFAULT_HOME) : '/login',
  };
}

// ─── RoleGate — inline conditional rendering ──────────────────────────────────
//
// <RoleGate allow={['school_admin', 'teacher']}>
//   <DeleteButton />
// </RoleGate>

interface RoleGateProps {
  allow: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function RoleGate({ allow, children, fallback = null }: RoleGateProps) {
  const { role } = useAuth();
  if (!role || !allow.includes(role)) return <>{fallback}</>;
  return <>{children}</>;
}