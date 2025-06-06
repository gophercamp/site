import { randomBytes } from 'crypto';

/**
 * Generates a secure random token for email confirmation
 *
 * @param length - Length of the token (default: 32)
 * @returns Random string token
 */
export function generateToken(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * Creates a timestamp for token expiration
 *
 * @param hours - Hours until expiration (default: 48)
 * @returns ISO string of the expiration date
 */
export function createExpirationDate(hours: number = 48): string {
  const expirationDate = new Date();
  expirationDate.setHours(expirationDate.getHours() + hours);
  return expirationDate.toISOString();
}

/**
 * Checks if a token is expired
 *
 * @param expiresAt - ISO string expiration date
 * @returns Boolean indicating if the token is expired
 */
export function isTokenExpired(expiresAt: string): boolean {
  const expiration = new Date(expiresAt);
  const now = new Date();
  return now > expiration;
}
