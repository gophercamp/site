import Link from 'next/link';
import Image from 'next/image';
import { fetchSpeakersWithAcceptedSessions, SessionizeSpeaker } from '@/lib/sessionize';
import { SectionProps, getSectionBackgroundClass } from './types';

/**
 * Speaker card component for the homepage section
 */
function SpeakerCard({ speaker }: { speaker: SessionizeSpeaker }) {
  return (
    <Link
      href={`/speakers/${speaker.id}`}
      className="bg-secondary rounded-lg border border-primary overflow-hidden hover:border-go-blue/50 transition-colors group block"
    >
      {/* Profile Picture */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-go-blue/20 to-go-blue/10">
        {speaker.profilePicture ? (
          <Image
            src={speaker.profilePicture}
            alt={`${speaker.fullName} profile picture`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
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

      {/* Speaker Info */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-primary mb-1 line-clamp-1 group-hover:text-go-blue transition-colors">
          {speaker.fullName}
        </h3>
        <p className="text-sm text-go-blue mb-2 line-clamp-2">{speaker.tagLine}</p>
        {speaker.sessions.length > 0 && (
          <p className="text-sm text-secondary line-clamp-1" title={speaker.sessions[0].name}>
            {speaker.sessions[0].name}
          </p>
        )}
      </div>
    </Link>
  );
}

/**
 * Shuffles an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Speakers section component for the homepage
 * Displays 3 random speakers with accepted sessions
 */
export default async function SpeakersSection({ background }: SectionProps) {
  const speakers = await fetchSpeakersWithAcceptedSessions();

  // Get 3 random speakers
  const randomSpeakers = shuffleArray(speakers).slice(0, 3);

  if (speakers.length === 0) {
    return null;
  }

  const bgClass = getSectionBackgroundClass(background, 'primary');

  return (
    <section id="speakers" className={`py-20 ${bgClass}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Meet Our Speakers</h2>
            <p className="text-lg text-secondary">
              Learn from industry experts and passionate Go developers
            </p>
          </div>

          {/* Featured Speakers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {randomSpeakers.map(speaker => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>

          {/* View All Link */}
          <div className="text-center">
            <Link
              href="/speakers"
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-go-blue focus:ring-offset-2 bg-go-blue hover:bg-go-blue-dark text-white border border-transparent px-6 py-3 text-lg"
            >
              View All {speakers.length} Speakers
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
