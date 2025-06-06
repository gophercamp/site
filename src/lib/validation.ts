/**
 * Utility functions for input validation that can be used on both client and server
 */

/**
 * Validates an email address with a simple regex pattern
 * @param email Email address to validate
 * @returns Boolean indicating if email is valid
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
