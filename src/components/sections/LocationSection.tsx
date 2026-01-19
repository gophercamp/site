'use client';

import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function LocationSection() {
  return (
    <section id="location" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Location</h2>
            <p className="text-lg text-secondary">
              Join us at Clubco Brno, a modern coworking space in the heart of Brno
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Clubco Photo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-go-blue/20 to-go-blue/10"
            >
              <Image
                src="/images/clubco.jpg"
                alt="Clubco Brno - Conference Venue"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2606.6847516886826!2d16.614781576923447!3d49.189698371332314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471295e59b9ac4e9%3A0x8a934dd181c8d98e!2sClubco!5e0!3m2!1sen!2scz!4v1647890123456!5m2!1sen!2scz"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Clubco Brno Location Map"
              ></iframe>
            </motion.div>
          </div>

          {/* Location Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true, margin: '-100px' }}
            className="bg-secondary rounded-lg p-6 md:p-8"
          >
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Address */}
              <div className="flex gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-go-blue flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div>
                  <h4 className="font-bold text-primary mb-1">Address</h4>
                  <p className="text-secondary">Vlněna 5</p>
                  <p className="text-secondary">602 00 Brno-střed</p>
                  <p className="text-secondary">Czech Republic</p>
                </div>
              </div>

              {/* Getting There */}
              <div className="flex gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-go-blue flex-shrink-0 mt-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h4 className="font-bold text-primary mb-1">Getting There</h4>
                  <p className="text-secondary">5 minutes walk from Brno main station</p>
                  <p className="text-secondary">Accessible by tram and bus</p>
                  <p className="text-secondary">Parking available nearby</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <Button href="/location" variant="primary" size="lg">
                View Detailed Directions
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
