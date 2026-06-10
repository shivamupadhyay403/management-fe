// ─── Role Definitions ────────────────────────────────────────────────────────
export type Role = 'school_admin' | 'teacher' | 'student' | 'parent' | string; // extensible: add any custom role

// ─── Route → Allowed Roles map ───────────────────────────────────────────────
// Order matters: more-specific paths first.
// '*' means "any authenticated user regardless of role"
export const ROLE_ROUTE_MAP: Array<{ prefix: string; roles: Role[] | '*' }> = [
  { prefix: '/school-admin', roles: ['school_admin'] },
  { prefix: '/teacher', roles: ['school_admin', 'teacher'] },
  { prefix: '/student', roles: ['school_admin', 'student'] },
  { prefix: '/parent', roles: ['school_admin', 'parent'] },
  { prefix: '/dashboard', roles: '*' }, // any authenticated user
  // Add your own routes here:
  // { prefix: '/reports',          roles: ['school_admin', 'teacher'] },
  // { prefix: '/fees',             roles: ['school_admin', 'parent'] },
];

// Public paths — middleware skips these entirely
export const PUBLIC_PATHS = [
  '/login',
  '/register',
  '/forgot-password',
  '/api/auth',
];

// Where each role lands after login
export const ROLE_HOME: Record<Role, string> = {
  school_admin: '/school-admin/dashboard',
  teacher: '/teacher/dashboard',
  student: '/student/dashboard',
  parent: '/parent/dashboard',
};

export const DEFAULT_HOME = '/dashboard';
export const LOGIN_PATH = '/login';
export const FORBIDDEN_PATH = '/403';
