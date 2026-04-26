'use client';

import { motion } from 'framer-motion';
import { SectionProps, getSectionBackgroundClass } from './types';
import Button from '@/components/ui/Button';

/**
 * Section shown on the home page once the conference has finished.
 * Replaces the Tickets section and thanks attendees for joining.
 */
export default function ThankYouSection({ background }: SectionProps) {
  const bgClass = getSectionBackgroundClass(background, 'secondary');

  return (
    <section id="thank-you" className={`py-20 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Gopher emoji / icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-7xl mb-6 select-none"
            aria-hidden="true"
          >
            🎉
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
          >
            Thank You, Gophers!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-lg text-secondary mb-4"
          >
            Gophercamp 2026 is a wrap. It was an incredible day of talks, workshops, and connecting
            with the Go community in Brno. We are grateful to every attendee, speaker, and sponsor
            who made it happen.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-secondary mb-10"
          >
            Stay tuned — we will be back. Subscribe to our newsletter to be the first to hear about
            the next edition.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button href="#newsletter" variant="primary" size="lg">
              Stay in the Loop
            </Button>
            <Button href="/sessions" variant="outline" size="lg">
              Browse Sessions
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
