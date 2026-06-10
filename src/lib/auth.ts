// lib/auth.ts

import { cookies } from 'next/headers';

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token');
  if (!token) return null;
  const response = await fetch(`${process.env.API_URL}/auth/me`, {
    headers: {
      Cookie: `access_token=${token.value}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) return null;

  return response.json();
}
