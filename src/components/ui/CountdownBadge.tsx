'use client';

import { useEffect, useState } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Props {
  /** ISO date-time string for the conference start (e.g. "2026-04-23T09:00:00+02:00"). */
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getTimeLeft(target: string): TimeLeft | null {
  const delta = new Date(target).getTime() - Date.now();
  if (delta <= 0) return null;
  return {
    days: Math.floor(delta / 86_400_000),
    hours: Math.floor((delta / 3_600_000) % 24),
    minutes: Math.floor((delta / 60_000) % 60),
    seconds: Math.floor((delta / 1_000) % 60),
  };
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Circular hero badge that counts down to the conference start date.
 * Designed to sit inside a `relative w-full max-w-xs aspect-square` wrapper.
 *
 * On the server (SSR) the badge renders empty to avoid hydration mismatches.
 * After hydration it ticks every second in the browser.
 *
 * When the target date is in the past it switches to a "It's happening!" state.
 */
export default function CountdownBadge({ targetDate }: Props) {
  // `undefined` = not yet hydrated; `null` = conference started; TimeLeft = counting down
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(targetDate));
    tick();
    const id = setInterval(tick, 1_000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <div className="absolute inset-0 rounded-full bg-white-20 backdrop-blur-sm border border-white-30 flex items-center justify-center shadow-xl">
      <div className="text-center w-full px-10">
        {/* ── SSR placeholder — avoids hydration mismatch ─────────────── */}
        {timeLeft === undefined && null}

        {/* ── Conference has started ───────────────────────────────────── */}
        {timeLeft === null && (
          <>
            <p className="text-4xl mb-2" role="img" aria-label="Party">
              🎉
            </p>
            <p className="text-white font-bold text-xl drop-shadow-md">It&apos;s happening!</p>
            <p className="text-white/80 text-sm mt-1 drop-shadow-sm">Gophercamp 2026</p>
          </>
        )}

        {/* ── Live countdown ───────────────────────────────────────────── */}
        {timeLeft && (
          <>
            <p className="text-white/80 text-xs font-medium uppercase tracking-widest drop-shadow-sm mb-3">
              Conference starts in
            </p>

            {/* Days — the dominant number */}
            <div className="mb-3">
              <span className="text-go-blue text-6xl font-bold tabular-nums leading-none drop-shadow-md">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <p className="text-white/70 text-xs uppercase tracking-widest mt-1">Days</p>
            </div>

            {/* HH:MM:SS on a single line */}
            <div className="flex items-baseline justify-center gap-0.5">
              <span className="text-white text-2xl font-bold tabular-nums leading-none drop-shadow-md">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-go-blue/70 text-xl font-bold mx-0.5">:</span>
              <span className="text-white text-2xl font-bold tabular-nums leading-none drop-shadow-md">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-go-blue/70 text-xl font-bold mx-0.5">:</span>
              <span className="text-white text-2xl font-bold tabular-nums leading-none drop-shadow-md">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
            <p className="text-white/50 text-xs mt-1 tracking-widest">
              h &nbsp;&nbsp; m &nbsp;&nbsp; s
            </p>

            <p className="text-white/50 text-xs mt-4 drop-shadow-sm">
              Gophercamp 2026 &middot; Brno
            </p>
          </>
        )}
      </div>
    </div>
  );
}
