'use client';

import { motion } from 'framer-motion';
import { SessionizeSessionDetail } from '@/lib/sessionize';
import SessionCard from './SessionCard';

interface SessionsGridProps {
  sessions: SessionizeSessionDetail[];
}

/**
 * SessionsGrid component displays a responsive grid of session cards
 */
export default function SessionsGrid({ sessions }: SessionsGridProps) {
  if (sessions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-12"
      >
        <div className="w-16 h-16 mx-auto mb-4 bg-go-blue/10 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-go-blue"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">Sessions Coming Soon</h3>
        <p className="text-secondary">We&apos;re finalizing our amazing lineup. Check back soon!</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sessions.map((session, index) => (
        <SessionCard key={session.id} session={session} index={index} />
      ))}
    </div>
  );
}
