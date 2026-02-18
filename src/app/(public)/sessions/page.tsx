import { Metadata } from 'next';
import { fetchAcceptedSessions } from '@/lib/sessionize';
import SessionsGrid from '@/components/sessions/SessionsGrid';

export const metadata: Metadata = {
  title: 'Sessions | Gophercamp 2026',
  description:
    'Explore the sessions at Gophercamp 2026. Talks, workshops, and lightning talks covering Go language features, cloud-native development, and more.',
  openGraph: {
    title: 'Sessions | Gophercamp 2026',
    description:
      'Explore the sessions at Gophercamp 2026. Talks, workshops, and lightning talks from Go experts and community members.',
  },
};

export default async function SessionsPage() {
  const sessions = await fetchAcceptedSessions();

  // Sort sessions alphabetically by title
  const sortedSessions = [...sessions].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 py-12 bg-gradient-to-br from-go-blue/10 to-go-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Sessions</h1>
            <p className="text-lg text-secondary mb-2">
              Discover the talks, workshops, and lightning talks at Gophercamp 2026
            </p>
            <p className="text-sm text-secondary mb-2">
              {sessions.length} session{sessions.length !== 1 ? 's' : ''} confirmed
            </p>
            <p className="text-xs text-secondary italic">
              This list is not final and subject to change.
            </p>
          </div>
        </div>
      </section>

      {/* Sessions Grid Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <SessionsGrid sessions={sortedSessions} />
        </div>
      </section>

      {/* Call for Papers Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Want to Present at Gophercamp?
            </h2>
            <p className="text-secondary mb-6">
              We&apos;re still accepting proposals! Share your Go knowledge and experiences with the
              community.
            </p>
            <a
              href="https://sessionize.com/gophercamp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-go-blue focus:ring-offset-2 bg-go-blue hover:bg-go-blue-dark text-white border border-transparent px-6 py-3 text-lg"
            >
              Submit Your Proposal
            </a>
            <p className="mt-4 text-secondary text-sm">
              Submission deadline: <strong className="text-primary">March 31, 2026</strong>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
