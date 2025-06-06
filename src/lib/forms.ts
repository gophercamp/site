'use client';

/**
 * Utility functions for form handling
 */

import { validateEmail as validateEmailFn } from '@/lib/validation';

/**
 * Re-export validateEmail for client components
 */
export const validateEmail = validateEmailFn;

/**
 * Sends a newsletter subscription request to the API
 * @param email Email address to subscribe
 * @returns Promise with subscription result
 */
export const subscribeToNewsletter = async (
  email: string
): Promise<{
  success: boolean;
  message: string;
  alreadySubscribed?: boolean;
}> => {
  try {
    const response = await fetch('/api/newsletter/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    // Return API response data
    return {
      success: result.success,
      message: result.message,
      alreadySubscribed: result.alreadySubscribed,
    };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.',
    };
  }
};
