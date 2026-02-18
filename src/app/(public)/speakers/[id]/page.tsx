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
import { TwitterIcon, LinkedInIcon, WebsiteIcon } from '@/components/ui/icons';

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
                  <Link
                    key={session.id}
                    href={`/sessions/${session.id}`}
                    className="block bg-primary rounded-lg p-6 border border-primary hover:border-go-blue/50 transition-colors group"
                  >
                    <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-go-blue transition-colors">
                      {session.title}
                    </h3>
                    {session.description && (
                      <p className="text-secondary whitespace-pre-line line-clamp-3">
                        {session.description}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
