import "server-only";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE_NAME } from './constants';

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  const sessionValue = JSON.stringify({ userId, expires: expires.toISOString() });

  cookies().set(SESSION_COOKIE_NAME, sessionValue, {
    expires,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
  });
}

export async function getSession() {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const session = JSON.parse(sessionCookie);
    if (new Date(session.expires) > new Date()) {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

export async function deleteSession() {
  cookies().set(SESSION_COOKIE_NAME, '', { expires: new Date(0) });
}

export async function verifySession() {
  const session = await getSession();
  if (!session) {
    redirect('/l0gin');
  }
  return session;
}
