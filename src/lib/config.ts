/**
 * Central site configuration for Gophercamp.
 *
 * This is the single place to toggle site-wide features between editions.
 */

/**
 * A single dismissable alert shown in the top banner.
 */
export interface SiteAlert {
  /** Unique string ID — used as the localStorage dismiss key. */
  id: string;
  /** The message text shown in the banner. */
  message: string;
  /**
   * Visual variant controlling the banner colour.
   * @default 'info'
   */
  variant?: 'info' | 'success' | 'warning' | 'error';
  /** Optional inline call-to-action link rendered after the message. */
  link?: {
    href: string;
    label: string;
  };
}

export const siteConfig = {
  /**
   * The Sessionize event ID — the slug found in the API URLs.
   * Update this for each new conference edition.
   *
   * Example URL: https://sessionize.com/api/v2/{eventId}/view/Speakers
   */
  sessionizeEventId: '6cf3uokt',

  /**
   * Set to `true` when the Call for Speakers is open.
   *
   * Enabling this will:
   * - Show the CFP section on the home page
   * - Show the "Submit Your Talk" button and banner in the hero section
   * - Show the CFP call-to-action at the bottom of the /speakers page
   * - Show the CFP call-to-action at the bottom of the /sessions page
   *
   * Also remember to re-enable the /cfp redirect in netlify.toml.
   */
  cfpOpen: false,

  /**
   * Set to `true` when the conference program is ready to be published.
   *
   * Enabling this will:
   * - Replace the "Sessions" link in the header and footer with "Program" → /program
   *
   * Also make sure the /program page has its content filled in before enabling.
   */
  programReady: true,

  /**
   * Set to `true` once the conference program, sessions, and speakers are
   * finalised and no further changes are expected.
   *
   * Enabling this will remove all "subject to change" / "not final" notices
   * from the Program, Sessions, and Speakers pages, as well as from the
   * generated program PDF.
   */
  programFinal: true,

  /** URL to the CFP submission form */
  cfpUrl: 'https://sessionize.com/gophercamp',

  /** Human-readable submission deadline shown in the UI */
  cfpDeadline: 'March 31, 2026',

  /**
   * ISO date-time string for the start of the conference (Europe/Prague time).
   * Used by the hero section countdown timer.
   * Update this for each new edition.
   */
  conferenceDate: '2026-04-24T08:30:00+02:00',

  /**
   * Set to `true` to show a live countdown to the conference in the hero section.
   * Set to `false` to show the past-event memories badge instead.
   *
   * Switch this to `false` once the conference has passed.
   */
  showCountdown: false,

  /**
   * Set to `true` once the conference has finished.
   *
   * Enabling this will:
   * - Hide the Tickets section on the home page
   * - Hide the "Get Tickets" button in the hero section
   * - Show a "Thank You" section on the home page in place of tickets
   * - Replace the countdown circle in the hero with the YouTube memories link
   *   (overrides `showCountdown` even if it is still set to `true`)
   */
  eventOver: true,

  /**
   * List of dismissable alert banners shown at the top of every page.
   * Each alert is individually dismissable and the dismissal is persisted
   * in localStorage using the alert's `id`.
   *
   * Add an object here to show a new alert. Remove it (or clear the array)
   * to stop showing it for everyone, including users who haven't dismissed it.
   *
   * Example:
   *   { id: 'tickets-live', message: 'Tickets are now on sale!', variant: 'info', link: { href: '/tickets', label: 'Get yours' } }
   */
  /**
   * Ticket sale period configuration.
   *
   * - Early Bird runs until `earlyBirdEnd` (exclusive).
   * - Standard runs from `earlyBirdEnd` until `standardEnd` (exclusive).
   * - Last Minute runs from `standardEnd` onwards.
   *
   * Update these values for each new conference edition.
   */
  ticketPeriods: {
    /** Start of the Standard tier — also the end of the Early Bird tier. */
    earlyBirdEnd: new Date('2026-03-01'),
    /** Start of the Last Minute tier — also the end of the Standard tier. */
    standardEnd: new Date('2026-04-22'),

    tiers: {
      earlyBird: {
        title: 'Early Bird',
        price: 69,
        priceDescription: 'Until February 28, 2026',
        href: 'https://luma.com/gophercamp',
        buttonText: 'Buy Early Bird',
        badge: 'Limited time',
      },
      standard: {
        title: 'Standard',
        price: 89,
        priceDescription: 'March 1 - April 21, 2026',
        href: 'https://luma.com/gophercamp',
        buttonText: 'Buy Standard',
        badge: 'Available Now',
      },
      lastMinute: {
        title: 'Last Minute',
        price: 109,
        priceDescription: 'From April 22, 2026',
        href: 'https://luma.com/gophercamp',
        buttonText: 'Buy Last Minute',
        badge: 'Available Now',
      },
    },
  },

  alerts: [
    // {
    //   id: 'workshop-venue-change-2026',
    //   variant: 'info',
    //   message:
    //     '📍 Venue update: The Ultimate Private AI hands-on workshop has moved to JIC INTECH 2, U Vodárny 2, Brno (larger venue).',
    //   link: { href: 'https://luma.com/ultimateai', label: 'Event details' },
    // },
    // {
    //   id: 'download-app-2026',
    //   variant: 'success',
    //   message:
    //     'Download the official Gophercamp 2026 app for the full schedule, speaker info, and more!',
    //   link: { href: '/app', label: 'App' },
    // },
  ] as SiteAlert[],
};
