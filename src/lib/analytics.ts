/**
 * Analytics configuration and tracking utilities
 * Supports Google Analytics 4 (GA4) with privacy-first approach
 */

// Analytics configuration
export const ANALYTICS_CONFIG = {
  GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
  // Enable analytics only in production or when explicitly enabled
  ENABLED: process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true',
  // Privacy settings
  ANONYMIZE_IP: true,
  RESPECT_DNT: true, // Respect Do Not Track header
} as const;

// Custom event types for type safety
export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Common event types for Gophercamp
export const ANALYTICS_EVENTS = {
  NEWSLETTER_SIGNUP: {
    action: 'newsletter_signup',
    category: 'engagement',
    label: 'newsletter_form',
  },
  SOCIAL_CLICK: {
    action: 'social_click',
    category: 'engagement',
  },
  EXTERNAL_LINK: {
    action: 'external_link_click',
    category: 'outbound',
  },
  PAGE_VIEW: {
    action: 'page_view',
    category: 'navigation',
  },
  CONTACT_CLICK: {
    action: 'contact_click',
    category: 'engagement',
  },
} as const;

/**
 * Check if analytics should be enabled
 * Respects user privacy preferences and DNT header
 */
export const isAnalyticsEnabled = (): boolean => {
  if (!ANALYTICS_CONFIG.ENABLED || !ANALYTICS_CONFIG.GA_MEASUREMENT_ID) {
    return false;
  }

  // Check for Do Not Track header in browser
  if (typeof window !== 'undefined' && ANALYTICS_CONFIG.RESPECT_DNT) {
    const dnt = navigator.doNotTrack || 
      (window as { doNotTrack?: string }).doNotTrack || 
      (navigator as { msDoNotTrack?: string }).msDoNotTrack;
    if (dnt === '1' || dnt === 'yes') {
      return false;
    }
  }

  return true;
};

/**
 * Track custom events with Google Analytics
 */
export const trackEvent = (event: AnalyticsEvent): void => {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') {
    return;
  }

  try {
    // Use gtag if available
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        // Custom parameters for Gophercamp tracking
        custom_parameter_1: 'gophercamp_2026',
      });
    }
  } catch (error) {
    console.warn('Analytics tracking error:', error);
  }
};

/**
 * Track page views
 */
export const trackPageView = (path: string, title?: string): void => {
  if (!isAnalyticsEnabled() || typeof window === 'undefined') {
    return;
  }

  try {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', ANALYTICS_CONFIG.GA_MEASUREMENT_ID, {
        page_path: path,
        page_title: title,
        anonymize_ip: ANALYTICS_CONFIG.ANONYMIZE_IP,
      });
    }
  } catch (error) {
    console.warn('Page view tracking error:', error);
  }
};

/**
 * Track newsletter signup conversions
 */
export const trackNewsletterSignup = (email?: string): void => {
  trackEvent({
    ...ANALYTICS_EVENTS.NEWSLETTER_SIGNUP,
    label: email ? 'with_email' : 'anonymous',
  });
};

/**
 * Track social media link clicks
 */
export const trackSocialClick = (platform: string): void => {
  trackEvent({
    ...ANALYTICS_EVENTS.SOCIAL_CLICK,
    label: platform,
  });
};

/**
 * Track external link clicks
 */
export const trackExternalLink = (url: string, linkText?: string): void => {
  trackEvent({
    ...ANALYTICS_EVENTS.EXTERNAL_LINK,
    label: linkText || url,
  });
};

/**
 * Track contact method clicks (email, phone, etc.)
 */
export const trackContactClick = (method: string): void => {
  trackEvent({
    ...ANALYTICS_EVENTS.CONTACT_CLICK,
    label: method,
  });
};

// Global gtag function declaration for TypeScript
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'consent',
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
  }
}
