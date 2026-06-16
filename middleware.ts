// MIDDLEWARE STRATEGY
// ┌─────────────────────────────────────────────────────────────────────────┐
// │ 1. Guest-only pages (/login, /register) → redirect authed users away   │
// │ 2. Public paths → always allow                                          │
// │ 3. Protected routes → verify access token                               │
// │    a. Valid token → role check → allow or redirect to /forbidden        │
// │    b. Expired token → silent refresh via backend                        │
// │       • Refresh ok  → role check → set new cookies → continue          │
// │       • Refresh fail → clear cookies → redirect to /login               │
// │ 4. Forward x-user-role / x-user-id headers to server components        │
// └─────────────────────────────────────────────────────────────────────────┘

import { NextRequest, NextResponse } from 'next/server';
import {
  ROLE_ROUTE_MAP,
  PUBLIC_PATHS,
  LOGIN_PATH,
  FORBIDDEN_PATH,
  ROLE_HOME,
  DEFAULT_HOME,
  Role,
} from '@/src/lib/auth/roles';

// ─── Constants ────────────────────────────────────────────────────────────────

/** Pages only guests should see — logged-in users are bounced to their dashboard */
const GUEST_ONLY_PATHS = ['/login', '/register', '/forgot'];

const COOKIE = {
  access:  'edu_excel_acc_token',
  refresh: 'edu_excel_ref_token',
} as const;

const isProd = process.env.NODE_ENV === 'production';

// ─── JWT helpers (Edge-safe, no crypto needed — verification is on backend) ──

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const base64 = token.split('.')[1];
    if (!base64) return null;
    const json = atob(base64.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function isExpired(payload: Record<string, unknown>): boolean {
  const exp = payload.exp as number | undefined;
  if (!exp) return true;
  return Date.now() / 1000 > exp;
}

// ─── Token helpers ────────────────────────────────────────────────────────────

/** Attempt a silent token refresh against the Node backend */
async function tryRefresh(
  refreshToken: string
): Promise<{ accessToken: string; refreshToken?: string } | null> {
  try {
    const base = process.env.BACKEND_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${base}/api/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `${COOKIE.refresh}=${refreshToken}`,
      },
    });

    if (!res.ok) return null;

    const data = await res.json();
    if (!data?.accessToken) return null;

    return {
      accessToken:  data.accessToken,
      refreshToken: data.refreshToken,
    };
  } catch {
    return null;
  }
}

/** Write fresh tokens onto a response */
function setTokenCookies(
  response: NextResponse,
  accessToken: string,
  refreshToken?: string
): void {
  response.cookies.set(COOKIE.access, accessToken, {
    httpOnly: true,
    secure:   isProd,
    sameSite: 'strict',
    maxAge:   15 * 60,
    path:     '/',
  });

  if (refreshToken) {
    response.cookies.set(COOKIE.refresh, refreshToken, {
      httpOnly: true,
      secure:   isProd,
      sameSite: 'strict',
      maxAge:   7 * 24 * 60 * 60,
      path:     '/api/auth/refresh',
    });
  }
}

/** Clear both auth cookies (on forced logout) */
function clearTokenCookies(response: NextResponse): void {
  response.cookies.delete(COOKIE.access);
  response.cookies.delete(COOKIE.refresh);
}

// ─── Route helpers ────────────────────────────────────────────────────────────

function isGuestOnlyPath(pathname: string): boolean {
  return GUEST_ONLY_PATHS.some((p) => pathname.startsWith(p));
}

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p));
}

function matchProtectedRoute(pathname: string) {
  return ROLE_ROUTE_MAP.find((r) => pathname.startsWith(r.prefix));
}

function isRoleAllowed(role: Role, rule: ReturnType<typeof matchProtectedRoute>): boolean {
  if (!rule) return false;
  return rule.roles === '*' || rule.roles.includes(role);
}

function redirectToLogin(req: NextRequest, pathname: string): NextResponse {
  const url = new URL(LOGIN_PATH, req.url);
  url.searchParams.set('redirect', pathname);
  return NextResponse.redirect(url);
}

// ─── Middleware ───────────────────────────────────────────────────────────────

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const accessToken  = req.cookies.get(COOKIE.access)?.value;
  const refreshToken = req.cookies.get(COOKIE.refresh)?.value;

  // ── 1. Guest-only paths (/login, /register, /forgot) ─────────────────────
  // If the user already has a valid access token, send them to their dashboard.
  if (isGuestOnlyPath(pathname)) {
    if (accessToken) {
      const payload = decodeJwtPayload(accessToken);
      if (payload && !isExpired(payload)) {
        const role = payload.role as Role;
        const home = ROLE_HOME[role] ?? DEFAULT_HOME;
        return NextResponse.redirect(new URL(home, req.url));
      }
    }
    return NextResponse.next();
  }

  // ── 2. Public paths ───────────────────────────────────────────────────────
  if (isPublicPath(pathname)) return NextResponse.next();

  // ── 3. Unprotected routes (not in ROLE_ROUTE_MAP) ────────────────────────
  const routeRule = matchProtectedRoute(pathname);
  if (!routeRule) return NextResponse.next();

  // ── 4. No tokens at all → login ───────────────────────────────────────────
  if (!accessToken && !refreshToken) {
    return redirectToLogin(req, pathname);
  }

  // ── 5. Try to use the access token ───────────────────────────────────────
  const payload = accessToken ? decodeJwtPayload(accessToken) : null;
  const tokenValid = payload && !isExpired(payload);

  if (tokenValid) {
    // Happy path — token is fine, check role
    const role = payload.role as Role;

    if (!isRoleAllowed(role, routeRule)) {
      return NextResponse.redirect(new URL(FORBIDDEN_PATH, req.url));
    }

    const response = NextResponse.next();
    response.headers.set('x-user-role', role);
    response.headers.set('x-user-id', String(payload.sub ?? ''));
    return response;
  }

  // ── 6. Access token missing/expired → silent refresh ─────────────────────
  if (!refreshToken) {
    return redirectToLogin(req, pathname);
  }

  const refreshed = await tryRefresh(refreshToken);

  if (!refreshed) {
    // Refresh token also dead → force re-login, clear stale cookies
    const response = redirectToLogin(req, pathname);
    clearTokenCookies(response);
    return response;
  }

  // ── 7. Refresh succeeded → role check → attach new cookies ───────────────
  const newPayload = decodeJwtPayload(refreshed.accessToken);

  if (!newPayload) {
    return redirectToLogin(req, pathname);
  }

  const role = newPayload.role as Role;

  const response = isRoleAllowed(role, routeRule)
    ? NextResponse.next()
    : NextResponse.redirect(new URL(FORBIDDEN_PATH, req.url));

  setTokenCookies(response, refreshed.accessToken, refreshed.refreshToken);
  response.headers.set('x-user-role', role);
  response.headers.set('x-user-id', String(newPayload.sub ?? ''));
  return response;
}

// ─── Matcher ──────────────────────────────────────────────────────────────────

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};