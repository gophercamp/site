"use client";

import { GoogleAnalytics } from '@next/third-parties/google';
import { ANALYTICS_CONFIG, isAnalyticsEnabled } from '@/lib/analytics';

/**
 * Analytics component that handles Google Analytics integration
 * with privacy-first approach and conditional loading
 */
export default function Analytics() {
  // Only render analytics in production or when explicitly enabled
  if (!isAnalyticsEnabled()) {
    return null;
  }

  return (
    <GoogleAnalytics 
      gaId={ANALYTICS_CONFIG.GA_MEASUREMENT_ID}
      dataLayerName="dataLayer"
    />
  );
}
