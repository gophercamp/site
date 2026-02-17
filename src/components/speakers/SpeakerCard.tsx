'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  SessionizeSpeaker,
  getSpeakerTwitter,
  getSpeakerLinkedIn,
  getSpeakerCompanyWebsite,
} from '@/lib/sessionize';

interface SpeakerCardProps {
  speaker: SessionizeSpeaker;
  index: number;
}

/**
 * Twitter/X icon component
 */
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/**
 * LinkedIn icon component
 */
function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/**
 * Globe/Website icon component
 */
function WebsiteIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
      />
    </svg>
  );
}

/**
 * SpeakerCard component displays a speaker's information in a card format
 */
export default function SpeakerCard({ speaker, index }: SpeakerCardProps) {
  const twitterUrl = getSpeakerTwitter(speaker);
  const linkedInUrl = getSpeakerLinkedIn(speaker);
  const websiteUrl = getSpeakerCompanyWebsite(speaker);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, margin: '-50px' }}
      className="bg-secondary rounded-lg border border-primary overflow-hidden hover:border-go-blue/50 transition-colors group"
    >
      <Link href={`/speakers/${speaker.id}`} className="block">
        {/* Profile Picture */}
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-go-blue/20 to-go-blue/10">
          {speaker.profilePicture ? (
            <Image
              src={speaker.profilePicture}
              alt={`${speaker.fullName} profile picture`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl text-go-blue/30">
                {speaker.firstName.charAt(0)}
                {speaker.lastName.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Speaker Info */}
      <div className="p-4">
        <Link href={`/speakers/${speaker.id}`} className="block">
          <h3 className="text-lg font-bold text-primary mb-1 line-clamp-1 group-hover:text-go-blue transition-colors">
            {speaker.fullName}
          </h3>
          <p className="text-sm text-go-blue mb-3 line-clamp-2">{speaker.tagLine}</p>

          {/* Sessions */}
          {speaker.sessions.length > 0 && (
            <div className="mb-3">
              <p className="text-xs text-secondary uppercase tracking-wide mb-1">
                {speaker.sessions.length === 1 ? 'Session' : 'Sessions'}
              </p>
              <ul className="space-y-1">
                {speaker.sessions.map(session => (
                  <li
                    key={session.id}
                    className="text-sm text-secondary line-clamp-1"
                    title={session.name}
                  >
                    • {session.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Link>

        {/* Social Links */}
        {(twitterUrl || linkedInUrl || websiteUrl) && (
          <div className="flex items-center gap-3 pt-3 border-t border-primary">
            {twitterUrl && (
              <a
                href={twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-go-blue transition-colors"
                aria-label={`${speaker.fullName} on X (Twitter)`}
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
            )}
            {linkedInUrl && (
              <a
                href={linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-go-blue transition-colors"
                aria-label={`${speaker.fullName} on LinkedIn`}
              >
                <LinkedInIcon className="w-5 h-5" />
              </a>
            )}
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-go-blue transition-colors"
                aria-label={`${speaker.fullName}'s website`}
              >
                <WebsiteIcon className="w-5 h-5" />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
