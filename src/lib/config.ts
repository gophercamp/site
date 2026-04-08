/**
 * Central site configuration for Gophercamp.
 *
 * This is the single place to toggle site-wide features between editions.
 */

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

  /** URL to the CFP submission form */
  cfpUrl: 'https://sessionize.com/gophercamp',

  /** Human-readable submission deadline shown in the UI */
  cfpDeadline: 'March 31, 2026',
};
