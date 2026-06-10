// lib/permissions.ts

export const can = (permissions: string[], permission: string) => {
  return permissions.includes(permission);
};
