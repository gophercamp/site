import { Metadata } from 'next';
import { fetchSpeakersWithAcceptedSessions } from '@/lib/sessionize';
import SpeakersGrid from '@/components/speakers/SpeakersGrid';
import CFPSection from '@/components/sections/CFPSection';
import { siteConfig } from '@/lib/config';

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

      {/* Call for Speakers — only shown while CFP is open */}
      {siteConfig.cfpOpen && <CFPSection background="secondary" />}
    </>
  );
}
