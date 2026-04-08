import { Metadata } from 'next';
import { fetchSchedule } from '@/lib/sessionize';
import ProgramGrid from '@/components/program/ProgramGrid';

export const metadata: Metadata = {
  title: 'Program | Gophercamp 2026',
  description:
    'The full conference program for Gophercamp 2026 — schedule, sessions, and workshops.',
  openGraph: {
    title: 'Program | Gophercamp 2026',
    description:
      'The full conference program for Gophercamp 2026 — schedule, sessions, and workshops.',
  },
};

export default async function ProgramPage() {
  const days = await fetchSchedule();

  return (
    <>
      {/* Hero Section */}
      <section className="pt-20 py-12 bg-gradient-to-br from-go-blue/10 to-go-blue/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Program</h1>
            <p className="text-lg text-secondary mb-6">
              The full schedule for Gophercamp 2026 — April 23–24, Brno
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-6 text-left">
              <div className="bg-primary rounded-lg border border-primary px-5 py-4">
                <p className="text-xs font-semibold text-go-blue uppercase tracking-wide mb-1">
                  Thursday, April 23
                </p>
                <p className="text-sm font-semibold text-primary mb-1">Full-Day Workshop</p>
                <p className="text-sm text-secondary">Ultimate Go by Bill Kennedy</p>
              </div>
              <div className="bg-primary rounded-lg border border-primary px-5 py-4">
                <p className="text-xs font-semibold text-go-blue uppercase tracking-wide mb-1">
                  Friday, April 24
                </p>
                <p className="text-sm font-semibold text-primary mb-1">Conference Day</p>
                <p className="text-sm text-secondary">Talks, lightning talks &amp; networking</p>
              </div>
            </div>
            <p className="text-xs text-secondary italic">
              This program is not final and subject to change.
            </p>
          </div>
        </div>
      </section>

      {/* Schedule Grid */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-4">
          <ProgramGrid days={days} />
        </div>
      </section>
    </>
  );
}
