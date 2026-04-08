'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { GridSmartDay, GridSmartSession, SessionizeCategory } from '@/lib/sessionize';

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface Props {
  /** One entry per conference day from the Sessionize GridSmart API */
  days: GridSmartDay[];
}

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

/**
 * Formats an ISO datetime string to HH:mm in the Europe/Prague timezone (24-hour).
 */
function formatTime(isoString: string): string {
  return new Date(isoString).toLocaleTimeString('en-GB', {
    timeZone: 'Europe/Prague',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

/**
 * Returns the duration in minutes between two ISO datetime strings.
 */
function durationMinutes(startsAt: string, endsAt: string): number {
  return Math.round((new Date(endsAt).getTime() - new Date(startsAt).getTime()) / 60000);
}

/**
 * Formats a date string to a human-readable day header, e.g. "Thursday, April 23".
 */
function formatDayHeader(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    timeZone: 'Europe/Prague',
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Extracts the value of the "Level" category from a session's categories array.
 */
function getLevelCategory(categories: SessionizeCategory[]): string | undefined {
  return categories.find(c => c.name.toLowerCase() === 'level')?.categoryItems[0]?.name;
}

// ---------------------------------------------------------------------------
// Session card variants
// ---------------------------------------------------------------------------

/**
 * Service session card (Lunch, Coffee break, Registration…).
 * Spans all three room columns.
 */
function ServiceSessionCard({ session }: { session: GridSmartSession }) {
  const duration =
    session.startsAt && session.endsAt ? durationMinutes(session.startsAt, session.endsAt) : null;

  return (
    <div className="bg-secondary border border-primary rounded-md px-4 py-2 text-center">
      <p className="text-sm font-medium text-secondary">{session.title}</p>
      {duration !== null && (
        <p className="text-xs text-secondary mt-0.5 opacity-60">{duration} min</p>
      )}
    </div>
  );
}

/**
 * Plenum session card (keynote, opening/closing…).
 * Spans all three room columns with the Go-blue accent treatment.
 */
function PlenumSessionCard({ session }: { session: GridSmartSession }) {
  const duration =
    session.startsAt && session.endsAt ? durationMinutes(session.startsAt, session.endsAt) : null;

  return (
    <div className="bg-go-blue/10 border border-go-blue/30 rounded-md px-4 py-3">
      <p className="text-sm font-semibold text-primary">{session.title}</p>
      {session.speakers.length > 0 && (
        <p className="text-xs text-go-blue mt-1">{session.speakers.map(s => s.name).join(', ')}</p>
      )}
      {duration !== null && (
        <p className="text-xs text-secondary mt-1 opacity-60">{duration} min</p>
      )}
    </div>
  );
}

/**
 * Regular session card placed in its specific room column.
 * Links to the session detail page.
 */
function RegularSessionCard({ session }: { session: GridSmartSession }) {
  const duration =
    session.startsAt && session.endsAt ? durationMinutes(session.startsAt, session.endsAt) : null;
  const level = getLevelCategory(session.categories);

  return (
    <Link
      href={`/sessions/${session.id}`}
      className="bg-secondary border border-primary hover:border-go-blue/50 rounded-md px-3 py-3 transition-colors block"
    >
      <p className="text-sm font-semibold text-primary line-clamp-2">{session.title}</p>
      {session.speakers.length > 0 && (
        <p className="text-xs text-go-blue mt-1">{session.speakers.map(s => s.name).join(', ')}</p>
      )}
      {duration !== null && (
        <p className="text-xs text-secondary mt-1 opacity-60">{duration} min</p>
      )}
      {level && (
        <span className="inline-block text-xs px-2 py-0.5 rounded-full bg-go-blue/10 text-go-blue/80 mt-2">
          {level}
        </span>
      )}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * ProgramGrid renders a column-based schedule grid for one or more conference days.
 *
 * For each day it shows:
 * - A sticky room-header row (Yellow Stage / Green Stage / Merino)
 * - One row per time slot, adapting the layout based on session type:
 *   - Service sessions and plenum sessions span all three room columns
 *   - Regular sessions occupy their assigned room column (via `index`)
 *
 * @param days - Array of GridSmartDay objects from the Sessionize GridSmart API
 */
export default function ProgramGrid({ days }: Props) {
  const defaultIndex = Math.max(0, days.length - 1);
  const [activeDay, setActiveDay] = useState(defaultIndex);

  const currentDay = days[activeDay] ?? days[0];

  // Per-row entrance variant — `custom` receives the slot index for a stagger
  const rowVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: { duration: 0.3, delay: Math.min(i * 0.03, 0.45) },
    }),
  };

  // Empty state
  if (!currentDay) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-16"
      >
        <p className="text-secondary">No program available yet. Check back soon!</p>
      </motion.div>
    );
  }

  // The grid always has exactly 3 room columns; pad the header if needed
  const rooms = currentDay.rooms.slice(0, 3);
  const roomPadCount = Math.max(0, 3 - rooms.length);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* ------------------------------------------------------------------ */}
      {/* Day tabs (multi-day) or single-day heading                          */}
      {/* ------------------------------------------------------------------ */}
      {days.length > 1 ? (
        <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Conference days">
          {days.map((day, i) => (
            <button
              key={day.date}
              role="tab"
              aria-selected={activeDay === i}
              onClick={() => setActiveDay(i)}
              className={[
                'px-4 py-2 rounded-md font-medium text-sm transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-go-blue focus:ring-offset-2',
                activeDay === i
                  ? 'bg-go-blue text-white'
                  : 'bg-secondary text-secondary border border-primary hover:border-go-blue/50',
              ].join(' ')}
            >
              {formatDayHeader(day.date)}
            </button>
          ))}
        </div>
      ) : (
        <h2 className="text-xl font-bold text-primary mb-4">{formatDayHeader(currentDay.date)}</h2>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Schedule grid                                                        */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="rounded-lg border border-primary"
        role={days.length > 1 ? 'tabpanel' : undefined}
        aria-label={`Schedule for ${formatDayHeader(currentDay.date)}`}
      >
        {/* Sticky room header row */}
        <div className="sticky top-16 z-10 bg-primary border-b border-primary rounded-t-lg grid grid-cols-[5rem_1fr_1fr_1fr] gap-2 px-4 py-3">
          {/* Blank cell above the time column */}
          <div aria-hidden="true" />
          {rooms.map(room => (
            <div key={room.id} className="font-bold text-primary text-sm truncate">
              {room.name}
            </div>
          ))}
          {/* Pad with empty header cells when there are fewer than 3 rooms */}
          {Array.from({ length: roomPadCount }).map((_, i) => (
            <div key={`pad-header-${i}`} aria-hidden="true" />
          ))}
        </div>

        {/* Time slot rows — re-animate when the active day changes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay.date}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {currentDay.timeSlots.map((slot, slotIndex) => {
              // Build a full UTC ISO string from the day date + slot start time
              const slotTimeISO = currentDay.date.slice(0, 10) + 'T' + slot.slotStart + 'Z';
              const timeLabel = formatTime(slotTimeISO);

              const firstRoom = slot.rooms[0];
              const isService = firstRoom?.session?.isServiceSession === true;
              const isPlenum = !isService && firstRoom?.session?.isPlenumSession === true;
              const isSpanning = isService || isPlenum;

              // ---- Spanning row (service or plenum) -----------------------
              if (isSpanning) {
                return (
                  <motion.div
                    key={`${slot.slotStart}-${slotIndex}`}
                    custom={slotIndex}
                    variants={rowVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-20px' }}
                    className="grid grid-cols-[5rem_1fr] gap-2 px-4 py-2 border-b border-primary"
                  >
                    <div className="text-xs text-secondary font-mono self-center">{timeLabel}</div>
                    {isService ? (
                      <ServiceSessionCard session={firstRoom.session} />
                    ) : (
                      <PlenumSessionCard session={firstRoom.session} />
                    )}
                  </motion.div>
                );
              }

              // ---- Regular row (one card per room column) -----------------
              return (
                <motion.div
                  key={`${slot.slotStart}-${slotIndex}`}
                  custom={slotIndex}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-20px' }}
                  className="grid grid-cols-[5rem_1fr_1fr_1fr] gap-2 px-4 py-2 border-b border-primary"
                >
                  <div className="text-xs text-secondary font-mono self-center">{timeLabel}</div>
                  {([0, 1, 2] as const).map(colIndex => {
                    const roomSlot = slot.rooms.find(r => r.index === colIndex);
                    if (!roomSlot) {
                      // Empty placeholder — keeps grid columns aligned
                      return <div key={colIndex} className="min-h-8" aria-hidden="true" />;
                    }
                    return <RegularSessionCard key={colIndex} session={roomSlot.session} />;
                  })}
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
