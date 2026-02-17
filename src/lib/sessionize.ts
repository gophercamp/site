/**
 * TypeScript types for Sessionize API data
 * @see https://sessionize.com/api/v2/6cf3uokt/view/Speakers
 * @see https://sessionize.com/api/v2/6cf3uokt/view/Sessions
 */

// =============================================================================
// Speaker API Types
// =============================================================================

/**
 * Represents a session reference in a speaker's profile
 */
export interface SessionizeSpeakerSession {
  id: number;
  name: string;
}

/**
 * Link types supported by Sessionize
 */
export type SessionizeLinkType =
  | 'Twitter'
  | 'LinkedIn'
  | 'Company_Website'
  | 'Blog'
  | 'Facebook'
  | 'Instagram'
  | 'Other';

/**
 * Represents a social or professional link for a speaker
 */
export interface SessionizeLink {
  title: string;
  url: string;
  linkType: SessionizeLinkType;
}

/**
 * Represents a question/answer pair from the speaker's profile
 */
export interface SessionizeQuestionAnswer {
  id: number;
  question: string;
  questionType: string;
  answer: string;
  sort: number;
  answerExtra?: string;
}

/**
 * Represents a category associated with a speaker
 */
export interface SessionizeCategory {
  id: number;
  name: string;
  categoryItems: SessionizeCategoryItem[];
  sort: number;
}

/**
 * Represents a category item
 */
export interface SessionizeCategoryItem {
  id: number;
  name: string;
}

/**
 * Represents a speaker from the Sessionize API
 */
export interface SessionizeSpeaker {
  /** Unique identifier for the speaker */
  id: string;
  /** Speaker's first name */
  firstName: string;
  /** Speaker's last name */
  lastName: string;
  /** Speaker's full name (combination of first and last) */
  fullName: string;
  /** Speaker's biography */
  bio: string;
  /** Short tagline describing the speaker */
  tagLine: string;
  /** URL to the speaker's profile picture */
  profilePicture: string;
  /** List of sessions the speaker is presenting */
  sessions: SessionizeSpeakerSession[];
  /** Whether the speaker is marked as a top/featured speaker */
  isTopSpeaker: boolean;
  /** Social and professional links */
  links: SessionizeLink[];
  /** Custom question answers from the speaker's profile */
  questionAnswers: SessionizeQuestionAnswer[];
  /** Categories associated with the speaker */
  categories: SessionizeCategory[];
}

// =============================================================================
// Sessions API Types
// =============================================================================

/**
 * Session status values from Sessionize
 */
export type SessionStatus = 'Accepted' | 'Declined' | 'Under Review' | string;

/**
 * Speaker reference within a session
 */
export interface SessionSpeakerRef {
  id: string;
  name: string;
}

/**
 * Represents a session from the Sessionize Sessions API
 */
export interface SessionizeSessionDetail {
  id: string;
  title: string;
  description: string | null;
  startsAt: string | null;
  endsAt: string | null;
  isServiceSession: boolean;
  isPlenumSession: boolean;
  speakers: SessionSpeakerRef[];
  categories: SessionizeCategory[];
  roomId: number | null;
  room: string | null;
  liveUrl: string | null;
  recordingUrl: string | null;
  status: SessionStatus;
  isInformed: boolean;
  isConfirmed: boolean;
  questionAnswers: SessionizeQuestionAnswer[];
}

/**
 * Represents a group of sessions from the Sessionize Sessions API
 */
export interface SessionizeSessionGroup {
  groupId: number | null;
  groupName: string;
  sessions: SessionizeSessionDetail[];
  isDefault: boolean;
}

// =============================================================================
// API Endpoints
// =============================================================================

/**
 * Sessionize API endpoint for speakers
 */
export const SESSIONIZE_SPEAKERS_API = 'https://sessionize.com/api/v2/6cf3uokt/view/Speakers';

/**
 * Sessionize API endpoint for sessions
 */
export const SESSIONIZE_SESSIONS_API = 'https://sessionize.com/api/v2/6cf3uokt/view/Sessions';

// =============================================================================
// Fetch Functions
// =============================================================================

/**
 * Fetches all speakers from the Sessionize API
 * @returns Promise resolving to an array of speakers
 */
export async function fetchSpeakers(): Promise<SessionizeSpeaker[]> {
  const response = await fetch(SESSIONIZE_SPEAKERS_API, {
    next: {
      // Revalidate every hour to keep speaker data fresh
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch speakers: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches all sessions from the Sessionize API
 * @returns Promise resolving to an array of session groups
 */
export async function fetchSessions(): Promise<SessionizeSessionGroup[]> {
  const response = await fetch(SESSIONIZE_SESSIONS_API, {
    next: {
      // Revalidate every hour to keep session data fresh
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sessions: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches only accepted sessions from the Sessionize API
 * @returns Promise resolving to an array of accepted sessions
 */
export async function fetchAcceptedSessions(): Promise<SessionizeSessionDetail[]> {
  const sessionGroups = await fetchSessions();

  // Flatten all sessions from all groups and filter for accepted status
  return sessionGroups.flatMap(group =>
    group.sessions.filter(session => session.status === 'Accepted')
  );
}

/**
 * Fetches speakers who have at least one accepted session
 * @returns Promise resolving to an array of speakers with accepted sessions
 */
export async function fetchSpeakersWithAcceptedSessions(): Promise<SessionizeSpeaker[]> {
  // Fetch speakers and sessions in parallel
  const [speakers, acceptedSessions] = await Promise.all([
    fetchSpeakers(),
    fetchAcceptedSessions(),
  ]);

  // Create a Set of speaker IDs who have accepted sessions
  const speakerIdsWithAcceptedSessions = new Set<string>();
  for (const session of acceptedSessions) {
    for (const speaker of session.speakers) {
      speakerIdsWithAcceptedSessions.add(speaker.id);
    }
  }

  // Create a map of accepted session IDs for quick lookup
  const acceptedSessionIds = new Set(acceptedSessions.map(s => s.id));

  // Filter speakers to only include those with accepted sessions
  // and filter their sessions to only include accepted ones
  return speakers
    .filter(speaker => speakerIdsWithAcceptedSessions.has(speaker.id))
    .map(speaker => ({
      ...speaker,
      // Only include sessions that are accepted
      sessions: speaker.sessions.filter(session => acceptedSessionIds.has(String(session.id))),
    }));
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Helper function to get a specific link type from a speaker's links
 * @param speaker - The speaker object
 * @param linkType - The type of link to find
 * @returns The URL if found, undefined otherwise
 */
export function getSpeakerLink(
  speaker: SessionizeSpeaker,
  linkType: SessionizeLinkType
): string | undefined {
  return speaker.links.find(link => link.linkType === linkType)?.url;
}

/**
 * Helper function to get the Twitter/X link from a speaker
 * @param speaker - The speaker object
 * @returns The Twitter URL if found, undefined otherwise
 */
export function getSpeakerTwitter(speaker: SessionizeSpeaker): string | undefined {
  return getSpeakerLink(speaker, 'Twitter');
}

/**
 * Helper function to get the LinkedIn link from a speaker
 * @param speaker - The speaker object
 * @returns The LinkedIn URL if found, undefined otherwise
 */
export function getSpeakerLinkedIn(speaker: SessionizeSpeaker): string | undefined {
  return getSpeakerLink(speaker, 'LinkedIn');
}

/**
 * Helper function to get the company website from a speaker
 * @param speaker - The speaker object
 * @returns The company website URL if found, undefined otherwise
 */
export function getSpeakerCompanyWebsite(speaker: SessionizeSpeaker): string | undefined {
  return getSpeakerLink(speaker, 'Company_Website');
}
