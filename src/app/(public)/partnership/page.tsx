import { Metadata } from 'next';
import Image from 'next/image';

import { contactInfo } from '@/lib/social';

export const metadata: Metadata = {
  title: 'Partnership | Gophercamp 2027',
  description:
    'Partner with Gophercamp 2027 and join the organizations that have supported our community.',
  openGraph: {
    title: 'Partnership | Gophercamp 2027',
    description:
      'Partner with Gophercamp 2027 and join the organizations that have supported our community.',
  },
};

type PastPartner = {
  name: string;
  logo: string;
  url: string;
};

/**
 * Organizations that sponsored a previous Gophercamp edition.
 * They are not confirmed partners for 2027.
 */
const PAST_PARTNERS: PastPartner[] = [
  {
    name: 'Ardan Labs',
    logo: '/images/partners/ardanlabs.svg',
    url: 'https://www.ardanlabs.com/',
  },
  {
    name: 'SentinelOne',
    logo: '/images/partners/sentinelone.svg',
    url: 'https://www.sentinelone.com/careers/',
  },
  {
    name: 'Outreach',
    logo: '/images/partners/outreach.svg',
    url: 'https://www.outreach.io/',
  },
  {
    name: 'Microsoft',
    logo: '/images/partners/microsoft-2025.png',
    url: 'https://www.microsoft.com/',
  },
  {
    name: 'Whalebone',
    logo: '/images/partners/whalebone-2025.png',
    url: 'https://www.whalebone.io/',
  },
  {
    name: 'Oddin.gg',
    logo: '/images/partners/oddin-2025.webp',
    url: 'https://oddin.gg/',
  },
  {
    name: 'Kiwi.com',
    logo: '/images/partners/kiwi-2025.png',
    url: 'https://www.kiwi.com/',
  },
  {
    name: 'OVHcloud',
    logo: '/images/partners/ovhcloud-2025.png',
    url: 'https://www.ovhcloud.com/',
  },
];

export default function PartnershipPage() {
  return (
    <>
      <section className="bg-primary pt-24 pb-20" aria-labelledby="past-partners">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-5">Partnership</h1>
            <p className="text-xl md:text-2xl text-secondary leading-relaxed">
              Help us bring the Go community together for a memorable conference in Brno.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="max-w-2xl mx-auto text-center mb-8">
              <p className="text-go-blue font-semibold uppercase tracking-wider mb-2">
                Trusted support
              </p>
              <h2 id="past-partners" className="text-2xl md:text-3xl font-bold text-primary mb-3">
                Past Partners
              </h2>
              <p className="text-secondary">
                We&apos;re proud to have partnered with these organizations to grow the Go
                community.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {PAST_PARTNERS.map(partner => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${partner.name} website`}
                  className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border-2 border-primary bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-go-blue hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-blue focus-visible:ring-offset-2"
                >
                  <div className="absolute -left-8 -top-8 h-20 w-20 rounded-full bg-go-blue/10 transition-transform duration-500 group-hover:scale-125" />
                  <div className="absolute -bottom-10 -right-8 h-24 w-24 rounded-full border-12 border-go-blue/10 transition-transform duration-500 group-hover:scale-110" />
                  <div className="relative z-10 h-full w-full transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      className="object-contain"
                    />
                  </div>
                </a>
              ))}
            </div>

            <div className="max-w-3xl mx-auto mt-10 rounded-2xl border-2 border-go-blue/30 bg-go-blue/5 px-6 py-6 md:px-8 md:py-7 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
              <div>
                <h2 className="text-xl font-bold text-primary mb-1">
                  Partner with Gophercamp 2027
                </h2>
                <p className="text-secondary">Connect with Go developers from around the world.</p>
              </div>
              <a
                href={`mailto:${contactInfo.email}?subject=Gophercamp%20Partnership%20Inquiry`}
                className="shrink-0 rounded-md bg-go-blue px-5 py-3 font-semibold text-white transition-colors hover:bg-go-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-go-blue focus-visible:ring-offset-2"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
