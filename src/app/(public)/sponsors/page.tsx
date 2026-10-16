import { Metadata } from 'next';
import Link from 'next/link';

import { contactInfo } from '@/lib/social';

export const metadata: Metadata = {
  title: 'Partners & Sponsors | Gophercamp 2027',
  description: 'Meet the partners and sponsors helping make Gophercamp 2027 possible.',
  openGraph: {
    title: 'Partners & Sponsors | Gophercamp 2027',
    description: 'Meet the partners and sponsors helping make Gophercamp 2027 possible.',
  },
};

export default function SponsorsPage() {
  return (
    <>
      <section className="pt-24 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-go-blue font-semibold uppercase tracking-wider mb-4">
              Gophercamp 2027
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Partners &amp; Sponsors
            </h1>
            <p className="text-xl md:text-2xl text-secondary leading-relaxed">
              Gophercamp is built with the support of organizations that care about the Go
              community, knowledge sharing, and meaningful connections.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-secondary rounded-lg border-2 border-primary p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Become a partner</h2>
            <p className="text-secondary text-lg leading-relaxed mb-8">
              We are welcoming sponsors and community partners for Gophercamp 2027. Partner with us
              to connect with Go developers from across Central Europe.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${contactInfo.email}?subject=Gophercamp%202027%20Partnership%20Inquiry`}
                className="inline-flex items-center justify-center rounded-md bg-go-blue px-6 py-3 font-semibold text-white transition-colors hover:bg-go-blue-dark"
              >
                Get in touch
              </a>
              <Link
                href="/partnership"
                className="font-semibold text-go-blue hover:text-go-blue-dark underline"
              >
                Learn about partnership
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
