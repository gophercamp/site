'use server';

import { createSession, deleteSession } from '@/lib/session';
import { pbkdf2 as pbkdf2Cb, timingSafeEqual } from 'crypto';
import { redirect } from 'next/navigation';
import { promisify } from 'util';

const pbkdf2 = promisify(pbkdf2Cb);

/**
 * Derives a 32-byte PBKDF2 key for a password using the lowercased email as
 * salt. Returns the raw key buffer (not hex) so callers can compare bytes
 * directly via timingSafeEqual.
 */
async function hashPassword(password: string, email: string): Promise<Buffer> {
  const salt = Buffer.from(email.toLowerCase().trim());
  return pbkdf2(password, salt, 100_000, 32, 'sha256');
}

/**
 * Verifies admin credentials against the ADMIN_CREDENTIALS environment variable
 * and creates a session cookie on success.
 *
 * ADMIN_CREDENTIALS format (comma-separated): "email1:hex_hash1,email2:hex_hash2"
 * Generate a hash: node -e "require('crypto').pbkdf2('yourpassword','your@email.com',100000,32,'sha256',(e,k)=>console.log(k.toString('hex')))"
 */
export async function loginAction(email: string, password: string): Promise<{ error?: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  const credentials = process.env.ADMIN_CREDENTIALS ?? '';

  for (const pair of credentials.split(',')) {
    const colonIndex = pair.indexOf(':');
    if (colonIndex === -1) continue;
    const credEmail = pair.slice(0, colonIndex).trim().toLowerCase();
    const credHashHex = pair.slice(colonIndex + 1).trim();

    if (credEmail !== normalizedEmail) continue;

    // Decode the stored hex hash and the derived hash to raw bytes before
    // comparing, so timingSafeEqual operates on the actual key material.
    const derivedKey = await hashPassword(password, credEmail);
    const storedKey = Buffer.from(credHashHex, 'hex');

    if (storedKey.length === derivedKey.length && timingSafeEqual(storedKey, derivedKey)) {
      await createSession(credEmail);
      return {};
    }
  }

  return { error: 'Invalid email or password' };
}

/**
 * Destroys the current session and redirects to the login page.
 */
export async function logoutAction(): Promise<never> {
  await deleteSession();
  redirect('/admin/login');
}
