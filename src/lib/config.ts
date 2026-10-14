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
   * Set to `true` when the new edition's speakers, sessions, and program are ready.
   *
   * Enabling this will:
   * - Show speakers on the home page and speakers/program navigation
   * - Enable speaker, session, program, and program PDF routes
   *
   * Update sessionizeEventId and the /program page before enabling.
   */
  programReady: false,

  /**
   * Set to `true` once the conference program, sessions, and speakers are
   * finalised and no further changes are expected.
   *
   * Enabling this will remove all "subject to change" / "not final" notices
   * from the Program, Sessions, and Speakers pages, as well as from the
   * generated program PDF.
   */
  programFinal: false,

  /** URL to the CFP submission form */
  cfpUrl: 'https://sessionize.com/gophercamp27',

  /** Human-readable submission deadline shown in the UI */
  cfpDeadline: 'March 14, 2027',

  /**
   * ISO date-time string for the start of the conference (Europe/Prague time).
   * Used by the hero section countdown timer.
   * Update this for each new edition.
   */
  conferenceDate: '2027-04-22T08:30:00+02:00',

  /**
   * Set to `true` to show a live countdown to the conference in the hero section.
   * Set to `false` to show the past-event memories badge instead.
   *
   * Switch this to `false` once the conference has passed.
   */
  showCountdown: true,

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
  eventOver: false,

  /**
   * Next edition "Save the Date" configuration.
   *
   * Set `show` to `true` to display a Save the Date section on the home page.
   * This appears below the Thank You section when the current event is over.
   *
   * Update `year`, `dates`, and `dateRange` for each new edition.
   * `dateRange` is the machine-readable ISO date range (used for calendar links).
   */
  nextEdition: {
    /** Set to `true` to show the Save the Date section on the home page. */
    show: false,
    /** The edition year shown in the heading. */
    year: 2027,
    /** Human-readable date range shown on the page. */
    dates: 'April 22–23, 2027',
    /** ISO start date (used for Google Calendar / .ics links). */
    dateStart: '2027-04-22',
    /** ISO end date (exclusive for Google Calendar, inclusive for display). */
    dateEnd: '2027-04-23',
    /** Venue name */
    venue: 'Brno, Czech Republic',
  },

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
   * Ticket prices and independent sale windows from https://luma.com/gophercamp27.
   * Windows can overlap; keep them aligned with Luma when prices or dates change.
   */
  ticketsUrl: 'https://luma.com/gophercamp27',
  ticketTiers: [
    {
      title: 'Super Early Bird',
      price: 69,
      priceDescription: 'October 15 - December 31, 2026',
      startsAt: '2026-10-14T22:00:00.000Z',
      endsAt: '2026-12-31T22:59:59.000Z',
      buttonText: 'Buy Super Early Bird',
    },
    {
      title: 'Early Bird',
      price: 99,
      priceDescription: 'January 1 - February 28, 2027',
      startsAt: '2026-12-31T23:00:00.000Z',
      endsAt: '2027-02-28T22:59:59.000Z',
      buttonText: 'Buy Early Bird',
    },
    {
      title: 'Standard',
      price: 119,
      priceDescription: 'March 1 - April 18, 2027',
      startsAt: '2027-02-28T23:00:00.000Z',
      endsAt: '2027-04-18T21:59:59.000Z',
      buttonText: 'Buy Standard',
    },
    {
      title: 'Last Minute',
      price: 139,
      priceDescription: 'April 16 - April 23, 2027',
      startsAt: '2027-04-15T22:00:00.000Z',
      endsAt: '2027-04-23T21:59:59.000Z',
      buttonText: 'Buy Last Minute',
    },
  ],

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
