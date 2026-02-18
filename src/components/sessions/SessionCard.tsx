'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SessionizeSessionDetail } from '@/lib/sessionize';

interface SessionCardProps {
  session: SessionizeSessionDetail;
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
export default function SessionCard({ session, index }: SessionCardProps) {
  const sessionFormat = getCategoryValue(session, 'Session format');
  const level = getCategoryValue(session, 'Level');

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
      </Link>

      {/* Speakers */}
      {session.speakers.length > 0 && (
        <div className="px-5 pb-5 pt-0 mt-auto border-t border-primary">
          <p className="text-xs text-secondary uppercase tracking-wide mb-2 pt-4">
            {session.speakers.length === 1 ? 'Speaker' : 'Speakers'}
          </p>
          <ul className="space-y-1.5">
            {session.speakers.map(speaker => (
              <li key={speaker.id}>
                <Link
                  href={`/speakers/${speaker.id}`}
                  className="text-sm text-go-blue hover:text-go-blue-dark transition-colors flex items-center gap-1 group/speaker"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3.5 w-3.5 flex-shrink-0 group-hover/speaker:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>{speaker.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
