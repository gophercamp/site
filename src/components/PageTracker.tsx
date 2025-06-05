"use client";

import { useAnalytics } from '@/hooks/useAnalytics';

/**
 * Client component to track page views automatically
 * This component should be included in the root layout
 */
export default function PageTracker() {
  useAnalytics();
  return null;
}
