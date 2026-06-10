// components/RouteGuard.tsx
//
// Drop this ONCE in your root layout, wrapping all children.
// It handles:
//   ✓ Session bootstrap on first load
//   ✓ Token refresh on every route change
//   ✓ Proactive refresh when token is near expiry
//   ✓ Tab visibility refresh
//   ✓ Redirect to /login when unauthenticated
//   ✓ Redirect to /403 when authenticated but wrong role
//   ✓ Loading skeleton while session resolves
//   ✓ Redux state stays in sync via React Query mutations

'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useRefreshSession, useBootstrapSession } from '@/src/lib/auth/authQueries';
import { useSelector } from 'react-redux';
import {
  selectAuthStatus,
  selectSession,
  selectTokenExpiringSoon,
} from '@/src/store/slices/authSlice';
import {
  PUBLIC_PATHS,
  ROLE_ROUTE_MAP,
  LOGIN_PATH,
  FORBIDDEN_PATH,
  Role,
} from '@/src/lib/auth/roles';

// ─── Types ────────────────────────────────────────────────────────────────────

interface RouteGuardProps {
  children: React.ReactNode;
  /** Optional: custom full-screen loading UI while session bootstraps */
  loadingFallback?: React.ReactNode;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

function checkRoleAccess(pathname: string, role: Role): 'allowed' | 'forbidden' | 'public' {
  if (isPublicPath(pathname)) return 'public';

  const rule = ROLE_ROUTE_MAP.find((r) => pathname.startsWith(r.prefix));
  if (!rule) return 'allowed'; // unregistered route → no restriction

  if (rule.roles === '*') return 'allowed';
  return rule.roles.includes(role) ? 'allowed' : 'forbidden';
}

// ─── Default Loading Skeleton ─────────────────────────────────────────────────

function DefaultLoadingSkeleton() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        background: 'var(--background, #ffffff)',
      }}
      aria-label="Loading session…"
      role="status"
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {/* Simple animated spinner — replace with your design system spinner */}
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
          style={{ animation: 'spin 0.8s linear infinite' }}
        >
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <circle cx="16" cy="16" r="13" stroke="#e5e7eb" strokeWidth="3" />
          <path
            d="M16 3a13 13 0 0 1 13 13"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        <span style={{ fontSize: '14px', color: '#6b7280' }}>Loading…</span>
      </div>
    </div>
  );
}

// ─── RouteGuard ───────────────────────────────────────────────────────────────

export default function RouteGuard({
  children,
  loadingFallback,
}: RouteGuardProps) {
  const pathname   = usePathname();
  const router     = useRouter();
  const authStatus = useSelector(selectAuthStatus);
  const session    = useSelector(selectSession);
  const tokenExpiringSoon = useSelector(selectTokenExpiringSoon(60));

  // React Query hooks
  const bootstrap          = useBootstrapSession();
  const { mutate: refresh } = useRefreshSession();

  // Prevent concurrent refresh calls
  const isRefreshingRef = useRef(false);

  // ── Stable refresh callback ────────────────────────────────────────────────
  const tryRefresh = useCallback(() => {
    if (isRefreshingRef.current) return;
    isRefreshingRef.current = true;
    refresh(undefined, {
      onSettled: () => { isRefreshingRef.current = false; },
    });
  }, [refresh]);

  // ── 1. Bootstrap: runs once on mount ──────────────────────────────────────
  // useBootstrapSession() is a useQuery — it fires automatically.
  // We bridge its result to Redux via the meta callbacks in authQueries.ts.
  useEffect(() => {
    if (bootstrap.isSuccess && bootstrap.data) {
      // Already handled in onSuccess meta — nothing extra needed here.
    }
    if (bootstrap.isError) {
      // If the bootstrap itself fails, we'll redirect below once
      // authStatus becomes 'unauthenticated'.
    }
  }, [bootstrap.isSuccess, bootstrap.isError, bootstrap.data]);

  // ── 2. On every route change ───────────────────────────────────────────────
  useEffect(() => {
    if (isPublicPath(pathname)) return;

    // Session exists but token is nearly expired → proactive refresh
    if (authStatus === 'authenticated' && tokenExpiringSoon) {
      tryRefresh();
      return;
    }

    // Session is unauthenticated → try one refresh before redirecting
    // (handles the case where the Redux session was lost but cookie still valid)
    if (authStatus === 'unauthenticated') {
      tryRefresh();
    }
  }, [pathname]); // intentionally only pathname — re-run on every navigation

  // ── 3. Tab visibility: refresh when user returns to tab ───────────────────
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState !== 'visible') return;
      if (isPublicPath(pathname)) return;

      if (authStatus === 'authenticated' && tokenExpiringSoon) {
        tryRefresh();
      } else if (authStatus === 'unauthenticated') {
        tryRefresh();
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, [authStatus, tokenExpiringSoon, pathname, tryRefresh]);

  // ── 4. Redirect logic (runs after every status/pathname change) ───────────
  useEffect(() => {
    // Don't redirect while we're still bootstrapping
    if (authStatus === 'idle' || authStatus === 'loading') return;

    // Public paths — always allow
    if (isPublicPath(pathname)) return;

    // Not authenticated → send to login
    if (authStatus === 'unauthenticated') {
      router.replace(`${LOGIN_PATH}?redirect=${encodeURIComponent(pathname)}`);
      return;
    }

    // Authenticated — check role
    if (authStatus === 'authenticated' && session) {
      const access = checkRoleAccess(pathname, session.role);
      if (access === 'forbidden') {
        router.replace(FORBIDDEN_PATH);
      }
    }
  }, [authStatus, pathname, session, router]);

  // ── Render logic ──────────────────────────────────────────────────────────

  // Still bootstrapping for the first time — show loader
  if ((authStatus === 'idle' || authStatus === 'loading') && !isPublicPath(pathname)) {
    return <>{loadingFallback ?? <DefaultLoadingSkeleton />}</>;
  }

  // Authenticated or public path → render children
  // (redirect will fire in the effect above if role is wrong)
  return <>{children}</>;
}