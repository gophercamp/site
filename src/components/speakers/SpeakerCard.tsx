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
import { TwitterIcon, LinkedInIcon, WebsiteIcon } from '@/components/ui/icons';

interface SpeakerCardProps {
  speaker: SessionizeSpeaker;
  index: number;
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
