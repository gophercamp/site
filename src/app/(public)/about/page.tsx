import { Metadata } from 'next';
import OrganisersSection from '@/components/sections/OrganisersSection';

export const metadata: Metadata = {
  title: 'About | Gophercamp 2026',
  description:
    'Learn about Gophercamp — the Go programming language conference in the Czech Republic.',
  openGraph: {
    title: 'About | Gophercamp 2026',
    description:
      'Learn about Gophercamp — the Go programming language conference in the Czech Republic.',
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 py-12 bg-gradient-to-br from-go-blue/10 to-go-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">About Gophercamp</h1>
            <p className="text-lg text-secondary">
              The Go programming language conference in the Czech Republic
            </p>
          </div>
        </div>
      </section>

      <OrganisersSection />
    </>
  );
}
