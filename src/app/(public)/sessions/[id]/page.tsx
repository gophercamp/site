import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { fetchAcceptedSessions, fetchSpeakersWithAcceptedSessions } from '@/lib/sessionize';

interface SessionPageProps {
  params: Promise<{ id: string }>;
}

/**
 * Generate static params for all accepted sessions
 */
export async function generateStaticParams() {
  const sessions = await fetchAcceptedSessions();
  return sessions.map(session => ({
    id: session.id,
  }));
}

/**
 * Generate metadata for the session page
 */
export async function generateMetadata({ params }: SessionPageProps): Promise<Metadata> {
  const { id } = await params;
  const sessions = await fetchAcceptedSessions();
  const session = sessions.find(s => s.id === id);

  if (!session) {
    return {
      title: 'Session Not Found | Gophercamp 2026',
    };
  }

  const speakerNames = session.speakers.map(s => s.name).join(', ');

  return {
    title: `${session.title} | Gophercamp 2026`,
    description: session.description || `${session.title} by ${speakerNames}`,
    openGraph: {
      title: `${session.title} | Gophercamp 2026`,
      description: session.description || `${session.title} by ${speakerNames}`,
    },
  };
}

/**
 * Helper function to get category value by category name
 */
function getCategoryValue(
  categories: { name: string; categoryItems: { name: string }[] }[],
  categoryName: string
): string | undefined {
  const category = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
  return category?.categoryItems[0]?.name;
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { id } = await params;
  const [sessions, speakers] = await Promise.all([
    fetchAcceptedSessions(),
    fetchSpeakersWithAcceptedSessions(),
  ]);

  const session = sessions.find(s => s.id === id);

  if (!session) {
    notFound();
  }

  // Get full speaker details for this session
  const sessionSpeakers = speakers.filter(speaker =>
    session.speakers.some(s => s.id === speaker.id)
  );

  const sessionFormat = getCategoryValue(session.categories, 'Session format');
  const level = getCategoryValue(session.categories, 'Level');

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 py-12 bg-gradient-to-br from-go-blue/10 to-go-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back link */}
            <Link
              href="/sessions"
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
              Back to all sessions
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {sessionFormat && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-go-blue/10 text-go-blue border border-go-blue/20">
                  {sessionFormat}
                </span>
              )}
              {level && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-secondary border border-primary">
                  {level}
                </span>
              )}
            </div>

            {/* Session Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{session.title}</h1>

            {/* Speaker Names */}
            {session.speakers.length > 0 && (
              <p className="text-lg text-secondary">
                by{' '}
                {session.speakers.map((speaker, index) => (
                  <span key={speaker.id}>
                    <Link
                      href={`/speakers/${speaker.id}`}
                      className="text-go-blue hover:text-go-blue-dark transition-colors"
                    >
                      {speaker.name}
                    </Link>
                    {index < session.speakers.length - 1 && ', '}
                  </span>
                ))}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-6">About this Session</h2>
            <div className="prose prose-lg max-w-none">
              {session.description ? (
                <p className="text-secondary whitespace-pre-line">{session.description}</p>
              ) : (
                <p className="text-secondary italic">No description available.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
      {sessionSpeakers.length > 0 && (
        <section className="py-12 bg-secondary">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-primary mb-6">
                {sessionSpeakers.length === 1 ? 'Speaker' : 'Speakers'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sessionSpeakers.map(speaker => (
                  <Link
                    key={speaker.id}
                    href={`/speakers/${speaker.id}`}
                    className="flex items-start gap-4 bg-primary rounded-lg p-4 border border-primary hover:border-go-blue/50 transition-colors group"
                  >
                    {/* Profile Picture */}
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-go-blue/20 to-go-blue/10">
                      {speaker.profilePicture ? (
                        <Image
                          src={speaker.profilePicture}
                          alt={`${speaker.fullName} profile picture`}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-xl text-go-blue/30">
                            {speaker.firstName.charAt(0)}
                            {speaker.lastName.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Speaker Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-primary group-hover:text-go-blue transition-colors">
                        {speaker.fullName}
                      </h3>
                      <p className="text-sm text-go-blue truncate">{speaker.tagLine}</p>
                    </div>
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
