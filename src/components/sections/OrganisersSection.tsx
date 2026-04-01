'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface Organiser {
  name: string;
  /** Path to the organiser's photo, e.g. '/images/organisers/jan-bleha.jpg'. Set to null until a photo is available. */
  photo: string | null;
  email: string;
  website?: string;
  linkedin?: string;
  github?: string;
  bio: string[];
}

const organisers: Organiser[] = [
  {
    name: 'Jan Bleha',
    photo: '/images/organisers/jan-bleha.jpeg',
    email: 'jan@gophercamp.cz',
    website: 'https://www.janbleha.cz/',
    linkedin: 'https://www.linkedin.com/in/janbleha/',
    bio: [
      'Jan Bleha is one of the organizers of GopherCamp.cz, where he takes care of making the event actually happen — from working with partners to looking after attendees and spreading the word.',
      "He has over 10 years of experience building tech events and communities, with a background that includes Red Hat, Kiwi.com, Whalebone, and Datamole. Along the way, he's been involved in everything from small, focused groups around specific technologies to large conferences like DevConf.cz and Barcamp with thousands of participants.",
      'What he enjoys most is connecting people — bringing engineers, communities, and companies together in ways that feel natural and useful. He sees community building as something that grows over time, when people have the space to share, learn, and collaborate.',
    ],
  },
  {
    name: 'Jakub Coufal',
    photo: '/images/organisers/jakub-coufal.jpg',
    email: 'jakub@gophercamp.cz',
    github: 'https://github.com/coufalja',
    linkedin: 'https://www.linkedin.com/in/coufalja/',
    bio: [
      'Jakub Coufal is one of the organizers of GopherCamp.cz, where he takes care of the technical side of things — including this site — and is responsible for the sessions and conference program.',
      'Jakub is a Software Engineer at SentinelOne, where he drives engineering initiatives across identity, quality, and service reliability. With deep expertise in distributed systems, secure identity platforms, networks security, deployment automation, and configuration management.',
      'Jakub is also an active mentor and speaker, helping grow engineering talent and driving best practices in system design, collaboration, and AI‑augmented engineering. He is based in Brno and is passionate about building resilient systems, enabling safer deployments at scale, and elevating engineering excellence across organizations.',
    ],
  },
];

function OrganiserAvatar({ name, photo }: { name: string; photo: string | null }) {
  const initials = name
    .split(' ')
    .map(part => part.charAt(0))
    .join('');

  return (
    <div className="w-40 h-40 rounded-full overflow-hidden bg-go-blue/10 border-2 border-go-blue/20 flex items-center justify-center mx-auto mb-6 shrink-0">
      {photo ? (
        <Image
          src={photo}
          alt={`${name} photo`}
          width={400}
          height={400}
          quality={90}
          className="object-cover w-full h-full"
        />
      ) : (
        <span className="text-3xl font-bold text-go-blue/60">{initials}</span>
      )}
    </div>
  );
}

function OrganiserCard({ organiser, index }: { organiser: Organiser; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      className="bg-secondary rounded-lg border border-primary p-8 flex flex-col"
    >
      <OrganiserAvatar name={organiser.name} photo={organiser.photo} />
      <h3 className="text-xl font-bold text-primary text-center mb-2">{organiser.name}</h3>
      <a
        href={`mailto:${organiser.email}`}
        className="text-sm text-go-blue hover:text-go-blue-dark transition-colors text-center block mb-3"
      >
        {organiser.email}
      </a>
      {(organiser.website || organiser.linkedin || organiser.github) && (
        <div className="flex items-center justify-center gap-4 mb-6">
          {organiser.website && (
            <a
              href={organiser.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-go-blue transition-colors"
              aria-label={`${organiser.name}'s website`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </a>
          )}
          {organiser.linkedin && (
            <a
              href={organiser.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-go-blue transition-colors"
              aria-label={`${organiser.name} on LinkedIn`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          )}
          {organiser.github && (
            <a
              href={organiser.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:text-go-blue transition-colors"
              aria-label={`${organiser.name} on GitHub`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          )}
        </div>
      )}
      <div>
        {organiser.bio.map((paragraph, i) => (
          <p key={i} className="text-sm text-secondary leading-relaxed mb-4 last:mb-0">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  );
}

function PlaceholderCard({ index }: { index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
      viewport={{ once: true, margin: '-50px' }}
      className="bg-secondary rounded-lg border border-primary border-dashed p-8 flex flex-col items-center justify-center text-center min-h-64"
    >
      <div className="w-28 h-28 rounded-full bg-go-blue/5 border-2 border-dashed border-go-blue/20 flex items-center justify-center mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-go-blue/30"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
      <p className="text-secondary/50 text-sm italic">Coming soon</p>
    </motion.div>
  );
}

export default function OrganisersSection() {
  // Pad to always render two slots so the grid stays balanced
  const slots = [...organisers, ...Array(Math.max(0, 2 - organisers.length)).fill(null)];

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-primary text-center mb-12">
            Meet the Organisers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {slots.map((organiser, i) =>
              organiser ? (
                <OrganiserCard key={organiser.name} organiser={organiser} index={i} />
              ) : (
                <PlaceholderCard key={`placeholder-${i}`} index={i} />
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
