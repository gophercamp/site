'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { GridSmartDay, GridSmartSession, SessionizeCategory } from '@/lib/sessionize';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Pixels rendered per minute of conference time. */
const PX_PER_MIN = 4;

/** Minimum visible card height in pixels — prevents unreadable slivers. */
const MIN_CARD_HEIGHT_PX = 28;

/** Pixels subtracted from every card's computed height to create a visual gap. */
const CARD_BOTTOM_GAP_PX = 2;

/** Horizontal padding (px) on each side inside a room column. */
const ROOM_COL_PADDING_PX = 4;

/** Interval between time-label ticks, in minutes. */
const TIME_LABEL_INTERVAL_MIN = 30;

/**
 * Vertical padding (px) added to the top and bottom of the timeline body.
 * Gives the first and last time labels (which are centred on the boundary
 * guide lines via translateY(-50%)) enough room to render without being
 * clipped by the container edge.
 */
const TIMELINE_V_PAD_PX = 12;

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface Props {
  /** One entry per conference day from the Sessionize GridSmart API. */
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
  return Math.round((new Date(endsAt).getTime() - new Date(startsAt).getTime()) / 60_000);
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
// Timeline types and helpers
// ---------------------------------------------------------------------------

interface DayBounds {
  /** Timeline start (ms since epoch), rounded down to the label interval. */
  startMs: number;
  /** Timeline end (ms since epoch), rounded up to the label interval. */
  endMs: number;
  totalMinutes: number;
  /** Total pixel height of the sessions container. */
  totalHeight: number;
}

/**
 * Computes the timeline bounds for a day from all of its sessions,
 * rounded to the nearest TIME_LABEL_INTERVAL_MIN boundary.
 */
function computeDayBounds(day: GridSmartDay): DayBounds {
  let minMs = Infinity;
  let maxMs = -Infinity;

  for (const slot of day.timeSlots) {
    for (const room of slot.rooms) {
      if (room.session?.startsAt)
        minMs = Math.min(minMs, new Date(room.session.startsAt).getTime());
      if (room.session?.endsAt) maxMs = Math.max(maxMs, new Date(room.session.endsAt).getTime());
    }
  }

  if (!isFinite(minMs) || !isFinite(maxMs)) {
    return { startMs: 0, endMs: 0, totalMinutes: 0, totalHeight: 0 };
  }

  const intervalMs = TIME_LABEL_INTERVAL_MIN * 60_000;
  const startMs = Math.floor(minMs / intervalMs) * intervalMs;
  const endMs = Math.ceil(maxMs / intervalMs) * intervalMs;
  const totalMinutes = (endMs - startMs) / 60_000;

  return { startMs, endMs, totalMinutes, totalHeight: totalMinutes * PX_PER_MIN };
}

interface TimeLabel {
  ms: number;
  isoString: string;
  topPx: number;
}

/**
 * Generates one TimeLabel per TIME_LABEL_INTERVAL_MIN across the day bounds.
 */
function generateTimeLabels(bounds: DayBounds): TimeLabel[] {
  const labels: TimeLabel[] = [];
  const intervalMs = TIME_LABEL_INTERVAL_MIN * 60_000;

  for (let ms = bounds.startMs; ms <= bounds.endMs; ms += intervalMs) {
    const topPx = ((ms - bounds.startMs) / 60_000) * PX_PER_MIN;
    labels.push({ ms, isoString: new Date(ms).toISOString(), topPx });
  }

  return labels;
}

interface CardLayout {
  topPx: number;
  heightPx: number;
}

/**
 * Computes the absolute top offset and height for a session card on the timeline.
 * Returns null when the session lacks timing data.
 */
function getCardLayout(session: GridSmartSession, startMs: number): CardLayout | null {
  if (!session.startsAt || !session.endsAt) return null;

  const sStart = new Date(session.startsAt).getTime();
  const sEnd = new Date(session.endsAt).getTime();
  const topPx = ((sStart - startMs) / 60_000) * PX_PER_MIN;
  const rawH = ((sEnd - sStart) / 60_000) * PX_PER_MIN - CARD_BOTTOM_GAP_PX;
  const heightPx = Math.max(MIN_CARD_HEIGHT_PX, rawH);

  return { topPx, heightPx };
}

// ---------------------------------------------------------------------------
// Data processing
// ---------------------------------------------------------------------------

interface ProcessedSessions {
  /** Deduped service / plenum sessions — rendered full-width. */
  spanningList: GridSmartSession[];
  /** colIndex → deduped regular sessions for that room column. */
  roomMap: Map<number, GridSmartSession[]>;
}

/**
 * Iterates over all time-slot / room combinations and splits sessions into
 * full-width spanning sessions and per-column regular sessions,
 * deduplicating any session that appears across multiple room slots.
 */
function processDaySessions(day: GridSmartDay): ProcessedSessions {
  const spanningById = new Map<string, GridSmartSession>();
  const roomById = new Map<number, Map<string, GridSmartSession>>();

  for (const slot of day.timeSlots) {
    for (const roomSlot of slot.rooms) {
      const session = roomSlot.session;
      if (!session) continue;

      if (session.isServiceSession || session.isPlenumSession) {
        if (!spanningById.has(session.id)) spanningById.set(session.id, session);
      } else {
        if (!roomById.has(roomSlot.index)) roomById.set(roomSlot.index, new Map());
        const inner = roomById.get(roomSlot.index)!;
        if (!inner.has(session.id)) inner.set(session.id, session);
      }
    }
  }

  const roomMap = new Map<number, GridSmartSession[]>();
  for (const [idx, m] of roomById) roomMap.set(idx, [...m.values()]);

  return {
    spanningList: [...spanningById.values()],
    roomMap,
  };
}

// ---------------------------------------------------------------------------
// Session card components
// ---------------------------------------------------------------------------

/**
 * Service session card (Lunch, Coffee break, Registration…).
 * Rendered full-width; h-full fills its absolutely-positioned wrapper.
 */
function ServiceSessionCard({ session }: { session: GridSmartSession }) {
  const dur =
    session.startsAt && session.endsAt ? durationMinutes(session.startsAt, session.endsAt) : null;

  return (
    <div className="h-full bg-secondary border border-primary rounded-md px-4 py-1.5 flex flex-col justify-center overflow-hidden">
      <p className="text-sm font-medium text-secondary truncate">{session.title}</p>
      {dur !== null && <p className="text-xs text-secondary opacity-60">{dur} min</p>}
    </div>
  );
}

/**
 * Plenum session card (keynote, opening / closing…).
 * Rendered full-width with the Go-blue accent treatment.
 */
function PlenumSessionCard({ session }: { session: GridSmartSession }) {
  const dur =
    session.startsAt && session.endsAt ? durationMinutes(session.startsAt, session.endsAt) : null;

  return (
    <div className="h-full bg-go-blue/10 border border-go-blue/30 rounded-md px-4 py-2 flex flex-col justify-center overflow-hidden">
      <p className="text-sm font-semibold text-primary truncate">{session.title}</p>
      {session.speakers.length > 0 && (
        <p className="text-xs text-go-blue truncate">
          {session.speakers.map(s => s.name).join(', ')}
        </p>
      )}
      {dur !== null && <p className="text-xs text-secondary opacity-60">{dur} min</p>}
    </div>
  );
}

/**
 * Regular session card placed in its specific room column.
 * Links to the session detail page.
 */
function RegularSessionCard({ session }: { session: GridSmartSession }) {
  const dur =
    session.startsAt && session.endsAt ? durationMinutes(session.startsAt, session.endsAt) : null;
  const level = getLevelCategory(session.categories);

  return (
    <Link
      href={`/sessions/${session.id}`}
      className="h-full bg-secondary border border-primary hover:border-go-blue/50 rounded-md px-3 py-2 transition-colors flex flex-col overflow-hidden"
    >
      <p className="text-sm font-semibold text-primary line-clamp-2">{session.title}</p>
      {session.speakers.length > 0 && (
        <p className="text-xs text-go-blue mt-1 line-clamp-1">
          {session.speakers.map(s => s.name).join(', ')}
        </p>
      )}
      <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1 pt-1">
        {dur !== null && <span className="text-xs text-secondary opacity-60">{dur} min</span>}
        {level && (
          <span className="text-xs px-2 py-0.5 rounded-full bg-go-blue/10 text-go-blue/80">
            {level}
          </span>
        )}
      </div>
    </Link>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

/**
 * ProgramGrid renders a continuous, time-proportional schedule for one or more
 * conference days.
 *
 * Layout:
 *   - A sticky header row shows the room names, aligned to the sessions columns.
 *   - Below it, a flex row places a fixed-width time-label column on the left
 *     and a single relative-positioned sessions area on the right.
 *   - Every session card is absolutely positioned: `top` is derived from its
 *     start time offset; `height` is derived from its duration.
 *   - Spanning sessions (service / plenum) fill the full sessions-area width.
 *   - Regular sessions are clipped to their room sub-column via percentage math.
 *
 * @param days - Array of GridSmartDay objects from the Sessionize GridSmart API.
 */
export default function ProgramGrid({ days }: Props) {
  const defaultIndex = Math.max(0, days.length - 1);
  const [activeDay, setActiveDay] = useState(defaultIndex);

  const currentDay = days[activeDay] ?? days[0];

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

  const rooms = currentDay.rooms.slice(0, 3);
  const numRooms = Math.max(rooms.length, 1);

  const bounds = computeDayBounds(currentDay);
  const timeLabels = generateTimeLabels(bounds);

  const { spanningList, roomMap } = processDaySessions(currentDay);

  /** Percentage width of one room column within the sessions area. */
  const colWidthPct = 100 / numRooms;

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
      {/* Schedule container                                                   */}
      {/* ------------------------------------------------------------------ */}
      <div
        className="rounded-lg border border-primary"
        role={days.length > 1 ? 'tabpanel' : undefined}
        aria-label={`Schedule for ${formatDayHeader(currentDay.date)}`}
      >
        {/* ── Sticky room-header row ──────────────────────────────────────── */}
        {/*
          Uses the same flex structure as the timeline body so each room-name
          cell sits directly above its column in the sessions area.
        */}
        <div className="sticky top-16 z-20 bg-primary border-b border-primary flex">
          {/* Blank spacer above the time-label column */}
          <div className="w-20 shrink-0" aria-hidden="true" />

          {/* Room name cells */}
          {rooms.map((room, i) => (
            <div
              key={room.id}
              className={[
                'flex-1 px-3 py-3 font-bold text-primary text-sm truncate',
                i > 0 ? 'border-l border-primary' : '',
              ].join(' ')}
            >
              {room.name}
            </div>
          ))}
        </div>

        {/* ── Timeline body ───────────────────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentDay.date}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className=""
          >
            {/* Single wrapper that owns the explicit height and clips overflow.
                Vertical padding gives boundary time-labels room to breathe so
                they are not clipped against the container edge. */}
            <div
              className="flex overflow-hidden"
              style={{
                height: bounds.totalHeight + 2 * TIMELINE_V_PAD_PX,
                paddingTop: TIMELINE_V_PAD_PX,
                paddingBottom: TIMELINE_V_PAD_PX,
              }}
            >
              {/* ── Time-label column ──────────────────────────────────────── */}
              {/*
              Each label is centred vertically on its corresponding guide line
              via transform: translateY(-50%).  overflow-hidden clips the first
              and last labels if they extend outside the container bounds.
            */}
              <div className="relative w-20 shrink-0 border-r border-primary" aria-hidden="true">
                {timeLabels.map(label => (
                  <div
                    key={label.ms}
                    className="absolute inset-x-0 pr-2 text-right text-xs text-secondary font-mono leading-none select-none"
                    style={{
                      top: label.topPx,
                      transform: 'translateY(-50%)',
                    }}
                  >
                    {formatTime(label.isoString)}
                  </div>
                ))}
              </div>

              {/* ── Sessions area ──────────────────────────────────────────── */}
              <div className="relative flex-1">
                {/* Horizontal guide lines at every time-label tick */}
                {timeLabels.map(label => (
                  <div
                    key={`guide-${label.ms}`}
                    className="absolute left-0 right-0 border-t border-primary pointer-events-none"
                    style={{ top: label.topPx }}
                    aria-hidden="true"
                  />
                ))}

                {/* Vertical room-column dividers */}
                {Array.from({ length: numRooms - 1 }, (_, i) => (
                  <div
                    key={`vdiv-${i}`}
                    className="absolute top-0 bottom-0 border-l border-primary pointer-events-none"
                    style={{ left: `${(i + 1) * colWidthPct}%` }}
                    aria-hidden="true"
                  />
                ))}

                {/* Full-width spanning sessions (service / plenum) */}
                {spanningList.map(session => {
                  const layout = getCardLayout(session, bounds.startMs);
                  if (!layout) return null;

                  return (
                    <div
                      key={session.id}
                      className="absolute z-10"
                      style={{
                        top: layout.topPx,
                        height: layout.heightPx,
                        left: ROOM_COL_PADDING_PX,
                        right: ROOM_COL_PADDING_PX,
                      }}
                    >
                      {session.isServiceSession ? (
                        <ServiceSessionCard session={session} />
                      ) : (
                        <PlenumSessionCard session={session} />
                      )}
                    </div>
                  );
                })}

                {/* Per-room regular sessions */}
                {[...roomMap.entries()].map(([colIdx, sessions]) =>
                  sessions.map(session => {
                    const layout = getCardLayout(session, bounds.startMs);
                    if (!layout) return null;

                    return (
                      <div
                        key={session.id}
                        className="absolute"
                        style={{
                          top: layout.topPx,
                          height: layout.heightPx,
                          left: `calc(${colIdx * colWidthPct}% + ${ROOM_COL_PADDING_PX}px)`,
                          width: `calc(${colWidthPct}% - ${ROOM_COL_PADDING_PX * 2}px)`,
                        }}
                      >
                        <RegularSessionCard session={session} />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
            {/* end height wrapper */}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
