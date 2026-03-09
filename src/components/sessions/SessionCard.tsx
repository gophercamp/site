'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  SessionizeSessionDetail,
  SessionizeSpeaker,
  requiresSeparateTicket,
} from '@/lib/sessionize';

interface SessionCardProps {
  session: SessionizeSessionDetail;
  speakers: SessionizeSpeaker[];
  index: number;
}

/**
 * Helper function to get category value by category name
 */
function getCategoryValue(
  session: SessionizeSessionDetail,
  categoryName: string
): string | undefined {
  const category = session.categories.find(
    cat => cat.name.toLowerCase() === categoryName.toLowerCase()
  );
  return category?.categoryItems[0]?.name;
}

/**
 * SessionCard component displays a session's information in a card format
 */
export default function SessionCard({ session, speakers, index }: SessionCardProps) {
  const sessionFormat = getCategoryValue(session, 'Session format');
  const level = getCategoryValue(session, 'Level');
  const hasSeparateTicket = requiresSeparateTicket(session);

  // Get full speaker details for this session
  const sessionSpeakers = speakers.filter(speaker =>
    session.speakers.some(s => s.id === speaker.id)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      viewport={{ once: true, margin: '-50px' }}
      className="bg-secondary rounded-lg border border-primary overflow-hidden hover:border-go-blue/50 transition-colors group flex flex-col h-full"
    >
      <Link href={`/sessions/${session.id}`} className="p-5 flex flex-col flex-grow">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {sessionFormat && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-go-blue/10 text-go-blue border border-go-blue/20">
              {sessionFormat}
            </span>
          )}
          {level && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-secondary border border-primary">
              {level}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-go-blue transition-colors line-clamp-2">
          {session.title}
        </h3>

        {/* Description */}
        {session.description && (
          <p className="text-sm text-secondary mb-4 line-clamp-3 flex-grow">
            {session.description}
          </p>
        )}

        {/* Separate Ticket Badge */}
        {hasSeparateTicket && (
          <div className="mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-800 border border-amber-300 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-600 w-fit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
            Separate Ticket Required
          </div>
        )}
      </Link>

      {/* Speakers */}
      {sessionSpeakers.length > 0 && (
        <div className="px-5 pb-5 pt-0 mt-auto border-t border-primary">
          <p className="text-xs text-secondary uppercase tracking-wide mb-3 pt-4">
            {sessionSpeakers.length === 1 ? 'Speaker' : 'Speakers'}
          </p>
          <ul className="space-y-3">
            {sessionSpeakers.map(speaker => (
              <li key={speaker.id}>
                <Link
                  href={`/speakers/${speaker.id}`}
                  className="flex items-start gap-3 group/speaker"
                >
                  {/* Avatar */}
                  <div className="relative w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gradient-to-br from-go-blue/20 to-go-blue/10 ring-2 ring-transparent group-hover/speaker:ring-go-blue/30 transition-all">
                    {speaker.profilePicture ? (
                      <Image
                        src={speaker.profilePicture}
                        alt={`${speaker.fullName} profile picture`}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-sm font-medium text-go-blue/50">
                          {speaker.firstName.charAt(0)}
                          {speaker.lastName.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Speaker Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-go-blue group-hover/speaker:text-go-blue-dark transition-colors">
                      {speaker.fullName}
                    </p>
                    {speaker.tagLine && (
                      <p className="text-xs text-secondary line-clamp-2 mt-0.5">
                        {speaker.tagLine}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
