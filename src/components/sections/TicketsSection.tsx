'use client';

import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { SectionProps, getSectionBackgroundClass } from './types';

/**
 * Props for a ticket offering feature item
 */
interface TicketFeature {
  text: string;
}

/**
 * Props for the TicketCard component
 */
interface TicketCardProps {
  /** Ticket title */
  title: string;
  /** Ticket price in euros */
  price: number;
  /** Price description/validity period */
  priceDescription: string;
  /** List of features included */
  features: TicketFeature[];
  /** Purchase URL */
  href: string;
  /** Button text */
  buttonText: string;
  /** Button variant */
  buttonVariant?: 'primary' | 'secondary' | 'outline';
  /** Optional badge text */
  badge?: string;
  /** Whether this ticket is enabled/available */
  enabled?: boolean;
  /** Animation delay for stagger effect */
  delay?: number;
}

/**
 * Reusable ticket card component
 */
function TicketCard({
  title,
  price,
  priceDescription,
  features,
  href,
  buttonText,
  buttonVariant = 'outline',
  badge,
  enabled = true,
  delay = 0,
}: TicketCardProps) {
  const borderColor = badge ? 'border-go-blue/20' : 'border-primary';
  const opacity = enabled ? 'opacity-100' : 'opacity-50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: '-100px' }}
      className={`bg-secondary rounded-lg border-2 ${borderColor} p-6 flex flex-col relative ${opacity} ${
        enabled ? '' : 'pointer-events-none'
      }`}
    >
      <div className="mb-4">
        {(badge || !enabled) && (
          <div className="inline-block bg-go-blue text-white text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase">
            {badge ? badge : 'Not Available Yet'}
          </div>
        )}
        <h3 className="text-2xl font-bold text-primary mb-2">{title}</h3>
        <div className="flex items-baseline gap-2">
          <span className={`text-4xl font-bold ${badge ? 'text-go-blue' : 'text-primary'}`}>
            €{price}
          </span>
        </div>
        <p className="text-sm text-secondary mt-1">{priceDescription}</p>
      </div>

      <ul className="space-y-3 mb-6 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <svg
              className="h-5 w-5 text-go-blue mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-secondary">{feature.text}</span>
          </li>
        ))}
      </ul>

      <Button href={href} variant={buttonVariant} size="lg" disabled={!enabled}>
        {buttonText}
      </Button>
    </motion.div>
  );
}

/**
 * Tickets section component displaying available ticket options
 */
export default function TicketsSection({ background }: SectionProps) {
  // Define ticket availability periods
  const EARLY_BIRD_END = new Date('2026-03-01'); // End of Feb 28, 2026
  const STANDARD_END = new Date('2026-04-21'); // April 21, 2026

  // Helper function to check if current date is within a period
  const now = new Date();
  const isEarlyBirdPeriod = now < EARLY_BIRD_END;
  const isStandardPeriod = now >= EARLY_BIRD_END && now < STANDARD_END;
  const isLastMinutePeriod = now >= STANDARD_END;

  // Common features for all tickets
  const standardFeatures: TicketFeature[] = [
    { text: 'Full conference access' },
    { text: 'All talks & workshops' },
    { text: 'Lunch & refreshments' },
    { text: 'Conference swag' },
  ];

  const bgClass = getSectionBackgroundClass(background, 'secondary');

  return (
    <section id="tickets" className={`py-20 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Get Your Tickets</h2>
            <p className="text-lg text-secondary">
              Join us for two days of Go programming, networking, and learning in Brno
            </p>
          </div>

          {/* Ticket Options */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <TicketCard
              title="Early Bird"
              price={69}
              priceDescription="Until February 28, 2026"
              features={standardFeatures}
              href="https://luma.com/gophercamp"
              buttonText="Buy Early Bird"
              buttonVariant="primary"
              badge="Limited time"
              enabled={isEarlyBirdPeriod}
              delay={0.1}
            />

            <TicketCard
              title="Standard"
              price={89}
              priceDescription="Standard pricing"
              features={standardFeatures}
              href="https://luma.com/gophercamp"
              buttonText="Buy Standard"
              buttonVariant="outline"
              enabled={isStandardPeriod}
              delay={0.2}
            />

            <TicketCard
              title="Last Minute"
              price={109}
              priceDescription="Available closer to event"
              features={standardFeatures}
              href="https://luma.com/gophercamp"
              buttonText="Buy Last Minute"
              buttonVariant="outline"
              enabled={isLastMinutePeriod}
              delay={0.3}
            />
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, margin: '-100px' }}
            className="bg-go-blue/5 p-6 rounded-lg border border-go-blue/20"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-go-blue flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h4 className="font-bold text-primary mb-1">Group Discounts</h4>
                  <p className="text-sm text-secondary">
                    Save 15% when buying 5+ tickets. Contact us for details.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-go-blue flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  />
                </svg>
                <div>
                  <h4 className="font-bold text-primary mb-1">Student Discounts</h4>
                  <p className="text-sm text-secondary">
                    Special pricing available for students with valid ID. Contact us for details.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
