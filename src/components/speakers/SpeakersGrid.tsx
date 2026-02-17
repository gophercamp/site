'use client';

import { motion } from 'framer-motion';
import { SessionizeSpeaker } from '@/lib/sessionize';
import SpeakerCard from './SpeakerCard';

interface SpeakersGridProps {
  speakers: SessionizeSpeaker[];
}

/**
 * SpeakersGrid component displays a responsive grid of speaker cards
 */
export default function SpeakersGrid({ speakers }: SpeakersGridProps) {
  if (speakers.length === 0) {
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
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-primary mb-2">Speakers Coming Soon</h3>
        <p className="text-secondary">We&apos;re finalizing our amazing lineup. Check back soon!</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {speakers.map((speaker, index) => (
        <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
      ))}
    </div>
  );
}
