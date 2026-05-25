'use server';

import { createSession, deleteSession } from '@/lib/session';
import { pbkdf2 as pbkdf2Cb, timingSafeEqual } from 'crypto';
import { redirect } from 'next/navigation';
import { promisify } from 'util';

const pbkdf2 = promisify(pbkdf2Cb);

/**
 * Derives a hex hash for a password. Uses the lowercased email as salt so
 * the same password produces different hashes for different admins.
 * Output is plain hex — no special characters, safe in env files without quoting.
 */
async function hashPassword(password: string, email: string): Promise<string> {
  const salt = Buffer.from(email.toLowerCase().trim());
  const key = await pbkdf2(password, salt, 100_000, 32, 'sha256');
  return key.toString('hex');
}

/**
 * Verifies admin credentials against the ADMIN_CREDENTIALS environment variable
 * and creates a session cookie on success.
 *
 * ADMIN_CREDENTIALS format (comma-separated): "email1:hex_hash1,email2:hex_hash2"
 * Generate a hash: node -e "require('crypto').pbkdf2('yourpassword','your@email.com',100000,32,'sha256',(e,k)=>console.log(k.toString('hex')))"
 */
export async function loginAction(email: string, password: string): Promise<{ error?: string }> {
  const credentials = process.env.ADMIN_CREDENTIALS ?? '';

  for (const pair of credentials.split(',')) {
    const colonIndex = pair.indexOf(':');
    if (colonIndex === -1) continue;
    const credEmail = pair.slice(0, colonIndex).trim();
    const credHash = pair.slice(colonIndex + 1).trim();

    const hash = await hashPassword(password, credEmail);
    const hashMatches =
      credHash.length === hash.length && timingSafeEqual(Buffer.from(credHash), Buffer.from(hash));

    if (credEmail === email.trim() && hashMatches) {
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
