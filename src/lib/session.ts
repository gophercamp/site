import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

const SESSION_COOKIE = 'admin_session';

function getSecret(): Uint8Array {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error('SESSION_SECRET environment variable is not set');
  return new TextEncoder().encode(secret);
}

/**
 * Creates a signed JWT session cookie for the given admin email.
 */
export async function createSession(email: string): Promise<void> {
  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  });
}

/**
 * Deletes the session cookie.
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Reads and verifies the session cookie, returning the admin email or null.
 */
export async function getSessionUser(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return (payload.email as string) ?? null;
  } catch {
    return null;
  }
}

/**
 * Verifies a raw JWT token string — used in proxy.ts where cookies() is unavailable.
 */
export async function verifySessionToken(token: string): Promise<string | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return (payload.email as string) ?? null;
  } catch {
    return null;
  }
}
