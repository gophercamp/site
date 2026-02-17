import { Metadata } from 'next';
import { fetchSpeakersWithAcceptedSessions } from '@/lib/sessionize';
import SpeakersGrid from '@/components/speakers/SpeakersGrid';

export const metadata: Metadata = {
  title: 'Speakers | Gophercamp 2026',
  description:
    'Meet the amazing speakers at Gophercamp 2026. Industry experts and Go enthusiasts sharing their knowledge and experiences.',
  openGraph: {
    title: 'Speakers | Gophercamp 2026',
    description:
      'Meet the amazing speakers at Gophercamp 2026. Industry experts and Go enthusiasts sharing their knowledge and experiences.',
  },
};

export default async function SpeakersPage() {
  const speakers = await fetchSpeakersWithAcceptedSessions();

  // Sort speakers alphabetically by full name
  const sortedSpeakers = [...speakers].sort((a, b) => a.fullName.localeCompare(b.fullName));

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 py-12 bg-gradient-to-br from-go-blue/10 to-go-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Speakers</h1>
            <p className="text-lg text-secondary mb-2">
              Meet the amazing people sharing their knowledge at Gophercamp 2026
            </p>
            <p className="text-sm text-secondary mb-2">
              {speakers.length} speaker{speakers.length !== 1 ? 's' : ''} confirmed
            </p>
            <p className="text-xs text-secondary italic">
              This list is not final and subject to change.
            </p>
          </div>
        </div>
      </section>

      {/* Speakers Grid Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4">
          <SpeakersGrid speakers={sortedSpeakers} />
        </div>
      </section>

      {/* Call for Papers Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Announcement Badge */}
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 bg-go-blue text-white px-6 py-2 rounded-full font-semibold shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                <span>Call for Papers Now Open!</span>
              </div>
            </div>

            {/* Main Content */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                Want to Speak at Gophercamp?
              </h2>
              <p className="text-lg md:text-xl text-secondary mb-4">
                We&apos;re looking for passionate speakers to share their experiences, insights, and
                innovations with the Go community.
              </p>
              <p className="text-base text-secondary">
                Whether you&apos;re a seasoned expert or sharing your first talk, we want to hear
                from you!
              </p>
            </div>

            {/* What We're Looking For */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="bg-primary p-6 rounded-lg border border-primary">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-go-blue"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                  Talk Topics
                </h3>
                <ul className="space-y-2 text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-go-blue">•</span>
                    <span>Go language features and best practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-go-blue">•</span>
                    <span>Cloud-native development and microservices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-go-blue">•</span>
                    <span>Performance optimization and debugging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-go-blue">•</span>
                    <span>Real-world case studies and experiences</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-go-blue">•</span>
                    <span>Testing, tooling, and DevOps</span>
                  </li>
                </ul>
              </div>

              <div className="bg-primary p-6 rounded-lg border border-primary">
                <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-go-blue"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Session Formats
                </h3>
                <ul className="space-y-2 text-secondary">
                  <li className="flex items-start gap-2">
                    <span className="text-go-blue">•</span>
                    <span>
                      <strong>Regular Talk:</strong> 30 minutes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-go-blue">•</span>
                    <span>
                      <strong>Lightning Talk:</strong> 10 minutes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-go-blue">•</span>
                    <span>
                      <strong>Workshop:</strong> 90+ minutes
                    </span>
                  </li>
                </ul>
                <div className="mt-4 p-3 bg-go-blue/10 rounded border border-go-blue/20">
                  <p className="text-sm text-secondary">
                    <strong>First-time speakers welcome!</strong> We provide speaker coaching and
                    support.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="https://sessionize.com/gophercamp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-go-blue focus:ring-offset-2 bg-go-blue hover:bg-go-blue-dark text-white border border-transparent px-8 py-4 text-lg"
              >
                Submit Your Proposal
              </a>
              <p className="mt-4 text-secondary text-sm">
                Submission deadline: <strong className="text-primary">March 31, 2026</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
