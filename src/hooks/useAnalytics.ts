"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

/**
 * Custom hook to track page views automatically
 * This hook should be used in the root layout or main app component
 */
export function useAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view when pathname changes
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);
}

/**
 * Custom hook for tracking specific events
 * Returns tracking functions that can be used in components
 */
export function useTrackingEvents() {
  return {
    trackPageView,
    trackNewsletterSignup: (email?: string) => {
      // Import here to avoid circular dependencies
      import('@/lib/analytics').then(({ trackNewsletterSignup }) => {
        trackNewsletterSignup(email);
      });
    },
    trackSocialClick: (platform: string) => {
      import('@/lib/analytics').then(({ trackSocialClick }) => {
        trackSocialClick(platform);
      });
    },
    trackContactClick: (method: string) => {
      import('@/lib/analytics').then(({ trackContactClick }) => {
        trackContactClick(method);
      });
    },
    trackExternalLink: (url: string, linkText?: string) => {
      import('@/lib/analytics').then(({ trackExternalLink }) => {
        trackExternalLink(url, linkText);
      });
    },
  };
}
