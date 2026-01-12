'use client';

import { trackPageView } from '@/lib/analytics';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Client component to track page views automatically
 * This component should be included in the root layout
 */
export default function PageTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view when pathname changes
    if (pathname) {
      trackPageView(pathname);
    }
  }, [pathname]);
  return null;
}
