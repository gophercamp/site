import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  fetchSpeakersWithAcceptedSessions,
  fetchAcceptedSessions,
  getSpeakerTwitter,
  getSpeakerLinkedIn,
  getSpeakerCompanyWebsite,
  SessionizeSpeaker,
  SessionizeSessionDetail,
} from '@/lib/sessionize';

interface SpeakerPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate static params for all speakers with accepted sessions
 */
export async function generateStaticParams() {
  const speakers = await fetchSpeakersWithAcceptedSessions();
  return speakers.map(speaker => ({
    id: speaker.id,
  }));
}

/**
 * Generate metadata for the speaker page
 */
export async function generateMetadata({ params }: SpeakerPageProps): Promise<Metadata> {
  const { id } = await params;
  const speakers = await fetchSpeakersWithAcceptedSessions();
  const speaker = speakers.find(s => s.id === id);

  if (!speaker) {
    return {
      title: 'Speaker Not Found | Gophercamp 2026',
    };
  }

  return {
    title: `${speaker.fullName} | Gophercamp 2026`,
    description: speaker.bio || `${speaker.fullName} - ${speaker.tagLine}`,
    openGraph: {
      title: `${speaker.fullName} | Gophercamp 2026`,
      description: speaker.bio || `${speaker.fullName} - ${speaker.tagLine}`,
      images: speaker.profilePicture ? [speaker.profilePicture] : undefined,
    },
  };
}

/**
 * Twitter/X icon component
 */
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/**
 * LinkedIn icon component
 */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/**
 * Globe/Website icon component
 */
function WebsiteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  );
}

/**
 * Get session details for a speaker's sessions
 */
async function getSpeakerSessionDetails(
  speaker: SessionizeSpeaker
): Promise<SessionizeSessionDetail[]> {
  const acceptedSessions = await fetchAcceptedSessions();
  const speakerSessionIds = new Set(speaker.sessions.map(s => String(s.id)));
  return acceptedSessions.filter(session => speakerSessionIds.has(session.id));
}

export default async function SpeakerPage({ params }: SpeakerPageProps) {
  const { id } = await params;
  const speakers = await fetchSpeakersWithAcceptedSessions();
  const speaker = speakers.find(s => s.id === id);

  if (!speaker) {
    notFound();
  }

  const sessionDetails = await getSpeakerSessionDetails(speaker);
  const twitterUrl = getSpeakerTwitter(speaker);
  const linkedInUrl = getSpeakerLinkedIn(speaker);
  const websiteUrl = getSpeakerCompanyWebsite(speaker);

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 py-12 bg-gradient-to-br from-go-blue/10 to-go-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link
              href="/speakers"
              className="inline-flex items-center text-go-blue hover:text-go-blue-dark transition-colors mb-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to all speakers
            </Link>

            {/* Speaker Header */}
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Profile Picture */}
              <div className="relative w-48 h-48 md:w-64 md:h-64 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-go-blue/20 to-go-blue/10 shadow-lg">
                {speaker.profilePicture ? (
                  <Image
                    src={speaker.profilePicture}
                    alt={`${speaker.fullName} profile picture`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 192px, 256px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-6xl text-go-blue/30">
                      {speaker.firstName.charAt(0)}
                      {speaker.lastName.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Speaker Info */}
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {speaker.fullName}
                </h1>
                <p className="text-lg text-go-blue mb-4">{speaker.tagLine}</p>

                {/* Social Links */}
                {(twitterUrl || linkedInUrl || websiteUrl) && (
                  <div className="flex items-center gap-4">
                    {twitterUrl && (
                      <a
                        href={twitterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-secondary hover:text-go-blue transition-colors"
                        aria-label={`${speaker.fullName} on X (Twitter)`}
                      >
                        <TwitterIcon className="w-5 h-5" />
                        <span className="text-sm">X / Twitter</span>
                      </a>
                    )}
                    {linkedInUrl && (
                      <a
                        href={linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-secondary hover:text-go-blue transition-colors"
                        aria-label={`${speaker.fullName} on LinkedIn`}
                      >
                        <LinkedInIcon className="w-5 h-5" />
                        <span className="text-sm">LinkedIn</span>
                      </a>
                    )}
                    {websiteUrl && (
                      <a
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-secondary hover:text-go-blue transition-colors"
                        aria-label={`${speaker.fullName}'s website`}
                      >
                        <WebsiteIcon className="w-5 h-5" />
                        <span className="text-sm">Website</span>
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-6">About</h2>
            <div className="prose prose-lg max-w-none">
              {speaker.bio ? (
                <p className="text-secondary whitespace-pre-line">{speaker.bio}</p>
              ) : (
                <p className="text-secondary italic">No bio available.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sessions Section */}
      {sessionDetails.length > 0 && (
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-primary mb-6">
                {sessionDetails.length === 1 ? 'Session' : 'Sessions'} at Gophercamp 2026
              </h2>
              <div className="space-y-6">
                {sessionDetails.map(session => (
                  <div key={session.id} className="bg-primary rounded-lg p-6 border border-primary">
                    <h3 className="text-xl font-bold text-primary mb-3">{session.title}</h3>
                    {session.description && (
                      <p className="text-secondary whitespace-pre-line">{session.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
