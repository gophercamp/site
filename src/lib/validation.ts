/**
 * Utility functions for input validation that can be used on both client and server
 */

/**
 * Validates an email address with a simple regex pattern
 * @param email Email address to validate
 * @returns Boolean indicating if email is valid
 */
export const validateEmail = (email: string): boolean => {
  // More secure regex that avoids ReDoS vulnerability
  // Uses atomic groups (via character classes) and length limits
  if (!email || email.length > 254) {
    return false;
  }

  // Simple but safe email validation
  // Matches: localpart@domain.tld
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
};
