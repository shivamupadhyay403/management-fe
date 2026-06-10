// store/authSlice.ts
//
// Single source of truth for auth state in Redux.
// Session lives IN MEMORY only — never localStorage, never sessionStorage.
// Tokens live in httpOnly cookies (unreadable by JS).

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Role } from '@/src/lib/auth/roles';

// ─── Types ────────────────────────────────────────────────────────────────────

/** What the API returns in the response body */
export interface LoginApiResponse {
  success:  boolean;
  message:  string;
  data: {
    user: {
      id:       string;
      name:     string;
      email:    string;
      role:     Role;
      schoolId: string | null;
    };
    expiresAt: number;
  };
}

/** What Redux actually stores — flat, clean, no API envelope */
export interface SessionInfo {
  id:        string;
  name:      string;
  email:     string;
  role:      Role;
  schoolId:  string | null;
  expiresAt: number;
}

export type AuthStatus =
  | 'idle'            // app just mounted, haven't checked yet
  | 'loading'         // checking / refreshing session
  | 'authenticated'
  | 'unauthenticated';

export interface AuthState {
  status:  AuthStatus;
  session: SessionInfo | null;
  error:   string | null;
}

// ─── Initial State ────────────────────────────────────────────────────────────

const initialState: AuthState = {
  status:  'idle',
  session: null,
  error:   null,
};

// ─── Slice ────────────────────────────────────────────────────────────────────

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Called when starting any session check / refresh
    authLoading(state) {
      state.status = 'loading';
      state.error  = null;
    },

    // Called after successful login OR successful token refresh
    // Accepts the flat SessionInfo shape — callers unwrap the API envelope first
    sessionRestored(state, action: PayloadAction<SessionInfo>) {
      state.status  = 'authenticated';
      state.session = action.payload;
      state.error   = null;
    },

    // Called after logout or failed refresh
    sessionCleared(state, action: PayloadAction<string | undefined>) {
      state.status  = 'unauthenticated';
      state.session = null;
      state.error   = action.payload ?? null;
    },

    // Patch individual fields (e.g. name change from profile update)
    sessionPatched(state, action: PayloadAction<Partial<SessionInfo>>) {
      if (state.session) {
        state.session = { ...state.session, ...action.payload };
      }
    },
  },
});

export const { authLoading, sessionRestored, sessionCleared, sessionPatched } =
  authSlice.actions;
export default authSlice.reducer;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectSession    = (s: { auth: AuthState }) => s.auth.session;
export const selectAuthStatus = (s: { auth: AuthState }) => s.auth.status;
export const selectRole       = (s: { auth: AuthState }) => s.auth.session?.role ?? null;
export const selectIsAuthed   = (s: { auth: AuthState }) => s.auth.status === 'authenticated';

/** True if the access token will expire in less than `thresholdSeconds` */
export const selectTokenExpiringSoon =
  (thresholdSeconds = 60) =>
  (s: { auth: AuthState }): boolean => {
    const exp = s.auth.session?.expiresAt;
    if (!exp) return false;
    return exp - Date.now() / 1000 < thresholdSeconds;
  };