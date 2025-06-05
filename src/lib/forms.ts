"use client";

/**
 * Utility functions for form handling
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

/**
 * Simulates sending a newsletter subscription request
 * In production, this would be replaced with an actual API call
 * @param email Email address to subscribe
 * @returns Promise that resolves after a simulated delay
 */
export const subscribeToNewsletter = async (/* email */): Promise<{ success: boolean; message: string }> => {
  // This is a simulation - in production, you'd call an actual API with the email parameter
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate successful subscription (always succeeds in this mock)
      resolve({
        success: true,
        message: 'Thank you for subscribing to Gophercamp 2026 updates!',
      });
    }, 1000);
  });
};
