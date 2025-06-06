# Analytics Implementation Guide

This document describes the Google Analytics 4 (GA4) implementation for the Gophercamp 2026 website.

## Features

- **Privacy-First**: Respects Do Not Track headers and GDPR compliance
- **Type-Safe**: Full TypeScript support with custom event types
- **Performance Optimized**: Uses Next.js third-party optimization
- **Environment-Based**: Only loads in production unless explicitly enabled
- **Custom Events**: Tracks newsletter signups, social clicks, contact interactions

## Setup

### 1. Get Google Analytics Measurement ID

1. Create a Google Analytics 4 property at [analytics.google.com](https://analytics.google.com)
2. Go to Admin → Data Streams → Web
3. Copy your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Configure Environment Variables

Create or update `.env.local`:

```bash
# Google Analytics Configuration
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional: Enable in development
NEXT_PUBLIC_ANALYTICS_ENABLED=false
```

### 3. Verify Implementation

The analytics system is automatically initialized when:

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
- Running in production OR `NEXT_PUBLIC_ANALYTICS_ENABLED=true`
- User hasn't enabled Do Not Track

## Tracked Events

### Automatic Events

- **Page Views**: Tracked on every route change
- **Core Web Vitals**: Automatically tracked by GA4

### Custom Events

- **Newsletter Signup**: When users subscribe to newsletter
- **Social Clicks**: Clicks on social media links
- **Contact Clicks**: Clicks on email/contact methods
- **External Links**: Clicks on external website links

## Usage in Components

### Using Tracking Hooks

```tsx
import { useTrackingEvents } from '@/hooks/useAnalytics';

function MyComponent() {
  const { trackSocialClick, trackContactClick } = useTrackingEvents();

  const handleSocialClick = (platform: string) => {
    trackSocialClick(platform);
  };

  return <button onClick={() => handleSocialClick('twitter')}>Follow on Twitter</button>;
}
```

### Direct Function Calls

```tsx
import { trackNewsletterSignup, trackExternalLink } from '@/lib/analytics';

// Track newsletter signup
trackNewsletterSignup('user@example.com');

// Track external link click
trackExternalLink('https://example.com', 'Example Link');
```

## Privacy Compliance

### GDPR Compliance

- Analytics only load when user hasn't opted out
- IP addresses are anonymized by default
- Respects Do Not Track browser settings

### Data Collection

The system tracks:

- Page views and navigation patterns
- Custom events (newsletter, social clicks)
- Performance metrics (Core Web Vitals)

The system does NOT track:

- Personal information
- Form input data
- Detailed user behavior when DNT is enabled

## Development

### Testing Analytics

1. Set `NEXT_PUBLIC_ANALYTICS_ENABLED=true` in `.env.local`
2. Add your GA4 Measurement ID
3. Run `npm run dev`
4. Open browser dev tools → Network tab
5. Look for requests to `google-analytics.com`

### Debugging

Check browser console for analytics messages:

- Analytics initialization status
- Event tracking confirmations
- Privacy setting notifications

## Files Structure

```
src/
├── components/
│   ├── Analytics.tsx          # Main analytics component
│   └── PageTracker.tsx        # Page view tracking
├── hooks/
│   └── useAnalytics.ts        # React hooks for tracking
└── lib/
    └── analytics.ts           # Core analytics functions
```

## Best Practices

1. **Test Before Deployment**: Always test analytics in staging environment
2. **Monitor Performance**: Check that analytics don't impact page speed
3. **Privacy Compliance**: Ensure compliance with local privacy laws
4. **Event Naming**: Use consistent, descriptive event names
5. **Documentation**: Document any new custom events added

## Troubleshooting

### Analytics Not Loading

- Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set correctly
- Verify you're in production or have `NEXT_PUBLIC_ANALYTICS_ENABLED=true`
- Check browser's Do Not Track setting

### Events Not Tracking

- Open browser dev tools → Console
- Look for analytics error messages
- Verify event parameters are correct
- Check GA4 real-time reports (can take a few minutes)

### Build Errors

- Ensure all TypeScript types are properly defined
- Run `npm run lint` to check for ESLint issues
- Verify imports are correct

## Support

For issues with this analytics implementation, check:

1. Browser dev tools console for errors
2. GA4 real-time reports for data verification
3. Next.js documentation for third-party integration
4. Google Analytics documentation for GA4 setup
