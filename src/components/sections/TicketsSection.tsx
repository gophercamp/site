'use client';

import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';

export default function TicketsSection() {
  return (
    <section id="tickets" className="py-20 bg-primary">
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
            {/* Early Bird Ticket */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-secondary rounded-lg border-2 border-go-blue/20 p-6 flex flex-col"
            >
              <div className="mb-4">
                <div className="inline-block bg-go-blue text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  LIMITED TIME
                </div>
                <h3 className="text-2xl font-bold text-primary mb-2">Super Early Bird</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-go-blue">€TBA</span>
                </div>
                <p className="text-sm text-secondary mt-1">Until January 18, 2026</p>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-start gap-2">
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
                  <span className="text-secondary">Full conference access</span>
                </li>
                <li className="flex items-start gap-2">
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
                  <span className="text-secondary">All talks & workshops</span>
                </li>
                <li className="flex items-start gap-2">
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
                  <span className="text-secondary">Lunch & refreshments</span>
                </li>
                <li className="flex items-start gap-2">
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
                  <span className="text-secondary">Conference swag</span>
                </li>
              </ul>

              <Button href="https://luma.com/d2kgz2d8" variant="primary" size="lg">
                Buy Super Early Bird
              </Button>
            </motion.div>

            {/* Regular Ticket */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-secondary rounded-lg border-2 border-primary p-6 flex flex-col relative"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-primary mb-2">Standard</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">€TBA</span>
                </div>
                <p className="text-sm text-secondary mt-1">Standard pricing</p>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-start gap-2">
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
                  <span className="text-secondary">Full conference access</span>
                </li>
                <li className="flex items-start gap-2">
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
                  <span className="text-secondary">All talks & workshops</span>
                </li>
                <li className="flex items-start gap-2">
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
                  <span className="text-secondary">Lunch & refreshments</span>
                </li>
                <li className="flex items-start gap-2">
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
                  <span className="text-secondary">Conference swag</span>
                </li>
              </ul>

              <Button href="https://luma.com/d2kgz2d8" variant="outline" size="lg">
                Buy Standard
              </Button>
            </motion.div>

            {/* Student/Community Ticket */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: '-100px' }}
              className="bg-secondary rounded-lg border-2 border-primary p-6 flex flex-col"
            >
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-primary mb-2">Last Minute</h3>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">€TBA</span>
                </div>
                <p className="text-sm text-secondary mt-1">Available closer to event</p>
              </div>

              <ul className="space-y-3 mb-6 flex-grow">
                <li className="flex items-start gap-2">
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
                  <span className="text-secondary">Full conference access</span>
                </li>
                <li className="flex items-start gap-2">
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
                  <span className="text-secondary">All talks & workshops</span>
                </li>
                <li className="flex items-start gap-2">
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
                  <span className="text-secondary">Lunch & refreshments</span>
                </li>
                <li className="flex items-start gap-2">
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
                  <span className="text-secondary">Conference swag</span>
                </li>
              </ul>

              <Button href="https://luma.com/d2kgz2d8" variant="outline" size="lg">
                Buy Last Minute
              </Button>
            </motion.div>
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
