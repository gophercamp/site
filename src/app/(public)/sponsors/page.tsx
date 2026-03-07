import { Metadata } from 'next';
import Image from 'next/image';

import { contactInfo } from '@/lib/social';

export const metadata: Metadata = {
  title: 'Sponsors | Gophercamp 2026',
  description: 'Meet the organizations that support Gophercamp 2026. Thank you to our sponsors!',
  openGraph: {
    title: 'Sponsors | Gophercamp 2026',
    description: 'Meet the organizations that support Gophercamp 2026. Thank you to our sponsors!',
  },
};

type Sponsor = {
  name: string;
  logo?: string; // path to image in /public
  url?: string;
  description?: string;
};

/**
 * Official sponsors list.
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
    url: 'https://www.sentinelone.com/',
    description:
      "SentinelOne is the world's leading AI-powered cybersecurity platform. The SentinelOne Singularity platform, built on the first unified Data Lake, is revolutionizing security operations, with AI, solving use cases across Endpoint Protection, SIEM, Cloud Security, Identity Threat Detection and 24x7 Managed Threat Services.",
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
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">Our Sponsors</h1>
            <p className="text-xl md:text-2xl text-secondary mb-4 leading-relaxed">
              We&apos;re incredibly grateful to the organizations and partners who make Gophercamp
              possible.
            </p>
            <p className="text-lg text-secondary mb-8">
              Their support helps us keep ticket prices accessible and enables us to create an
              exceptional experience for the Go community.
            </p>

            {/* Quick CTA */}
            <div className="inline-flex items-center gap-2 bg-go-blue/10 border-2 border-go-blue/30 rounded-full px-6 py-3">
              <span className="text-secondary">Interested in sponsoring?</span>
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
