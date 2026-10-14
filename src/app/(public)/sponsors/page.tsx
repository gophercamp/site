import { Metadata } from 'next';
import Image from 'next/image';

import { contactInfo } from '@/lib/social';

export const metadata: Metadata = {
  title: 'Past Sponsors | Gophercamp 2027',
  description:
    'Thank you to the organizations that supported Gophercamp 2026. Sponsor the 2027 edition!',
  openGraph: {
    title: 'Past Sponsors | Gophercamp 2027',
    description:
      'Thank you to the organizations that supported Gophercamp 2026. Sponsor the 2027 edition!',
  },
};

type Sponsor = {
  name: string;
  logo?: string; // path to image in /public
  url?: string;
  description?: string;
};

/**
 * Sponsors of the 2026 edition, not confirmed sponsors for 2027.
 */
const SPONSORS: Sponsor[] = [
  {
    name: 'Ardan Labs',
    logo: '/images/partners/ardanlabs.svg',
    url: 'https://www.ardanlabs.com/',
    description:
      "Ardan Labs is a software engineering firm built by engineers, for engineers. Since 2010, we've formed into a group of passionate engineers and business professionals focused on solving our client's problems based on core engineering values and community involvement. Our team combines decades of engineering experience with a deep passion for education, empowering developers and teams to build better systems.",
  },
  {
    name: 'SentinelOne',
    logo: '/images/partners/sentinelone.svg',
    url: 'https://www.sentinelone.com/careers/',
    description:
      'S1 is a company at the intersection of AI & security, pioneering a new operating model for cybersecurity; and building its biggest global R&D in CZ/SK. Our AI-native platform relies heavily on Go services (handling daily hundreds of billions of events and Petabytes of data), and unifies protection across endpoint, cloud, identity, data, and AI systems to deliver autonomous detection & response with clarity and speed. Leading organizations, incl. 4 of Fortune 10 or prominent governments, trust us to Secure Tomorrow™.',
  },
  {
    name: 'Outreach',
    logo: '/images/partners/outreach.svg',
    url: 'https://www.outreach.io/',
    description:
      'At Outreach, we build high-scale backend systems in Go, powering a platform used by global companies to run and optimize their revenue operations. Our engineers work on distributed microservices, real-time data, and AI-driven workflows that operate reliably at scale. Join our team!',
  },
];

/**
 * Individual sponsor card component
 */
function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  const card = (
    <div className="group bg-secondary rounded-lg border-2 border-primary overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-go-blue flex flex-col h-full">
      {/* Logo Section */}
      <div className="bg-white p-8 flex items-center justify-center h-40 md:h-48 border-b-2 border-primary flex-shrink-0">
        {sponsor.logo ? (
          <div className="relative w-full h-full">
            <Image
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        ) : (
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-primary">{sponsor.name}</p>
          </div>
        )}
      </div>

      {/* Description Section */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-go-blue transition-colors">
          {sponsor.name}
        </h3>
        {sponsor.description && (
          <p className="text-secondary text-sm leading-relaxed flex-1">{sponsor.description}</p>
        )}
        {sponsor.url && (
          <div className="mt-4 flex items-center text-go-blue text-sm font-semibold group-hover:text-go-blue-dark transition-colors">
            Visit website
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${sponsor.name} website`}
        className="block"
      >
        {card}
      </a>
    );
  }

  return card;
}

export default function SponsorsPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Past Sponsors</h1>
            <p className="text-xl md:text-2xl text-secondary mb-4 leading-relaxed">
              Thank you to the organizations and partners who supported Gophercamp 2026.
            </p>
            <p className="text-lg text-secondary mb-8">
              Their support helped us create an exceptional experience for the Go community.
              We&apos;ll announce the 2027 sponsors here as they join us.
            </p>

            {/* Quick CTA */}
            <div className="inline-flex items-center gap-2 bg-go-blue/10 border-2 border-go-blue/30 rounded-full px-6 py-3">
              <span className="text-secondary">Interested in sponsoring 2027?</span>
              <a
                href={`mailto:${contactInfo.email}?subject=Gophercamp%20Sponsorship%20Inquiry`}
                className="text-go-blue font-semibold hover:text-go-blue-dark underline"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsors Listing */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-primary mb-8">Gophercamp 2026 Sponsors</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {SPONSORS.map(sponsor => (
                <SponsorCard key={sponsor.name} sponsor={sponsor} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
