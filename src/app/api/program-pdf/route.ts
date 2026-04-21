import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { fetchSchedule } from '@/lib/sessionize';
import ProgramPdf from '@/components/program/ProgramPdf';
import React from 'react';
import type { DocumentProps } from '@react-pdf/renderer';
import { unstable_cache } from 'next/cache';

/**
 * Renders and caches a PDF buffer for a specific set of day filters.
 * The cache is keyed on the sorted day filters so ?day=A&day=B and
 * ?day=B&day=A hit the same entry. Revalidates every 5 minutes.
 */
function buildPdf(dayFilters: string[]) {
  const sortedFilters = [...dayFilters].sort();
  const cacheKey = sortedFilters.length > 0 ? sortedFilters.join(',') : 'all';

  return unstable_cache(
    async () => {
      const allDays = await fetchSchedule();
      const days =
        sortedFilters.length > 0
          ? allDays.filter(d => sortedFilters.some(f => d.date.startsWith(f)))
          : allDays;

      if (days.length === 0) return null;

      const generatedAt = new Date().toLocaleDateString('en-GB', {
        timeZone: 'Europe/Prague',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });

      const buffer = await renderToBuffer(
        React.createElement(ProgramPdf, { days, generatedAt }) as React.ReactElement<DocumentProps>
      );

      return { bytes: Array.from(new Uint8Array(buffer)) };
    },
    // Cache key — one entry per unique day combination
    ['program-pdf', cacheKey],
    { revalidate: 300, tags: ['program-pdf', `program-pdf-${cacheKey}`] }
  )();
}

/**
 * GET /api/program-pdf
 *
 * Fetches the live Sessionize schedule and streams it back as a PDF file.
 *
 * Query parameters:
 *   ?day=YYYY-MM-DD  — include only the day whose date starts with this value.
 *                      May be repeated for multiple days, e.g. ?day=2026-04-23&day=2026-04-24
 *                      Omit to include all days.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dayFilters = searchParams.getAll('day');

  const result = await buildPdf(dayFilters);

  if (!result) {
    return new NextResponse(
      JSON.stringify({ error: 'No matching days found for the given filter(s).' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const uint8 = new Uint8Array(result.bytes);

  return new NextResponse(uint8, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="gophercamp-2026-program${dayFilters.length === 1 ? `-${dayFilters[0]}` : ''}.pdf"`,
      'Content-Length': String(uint8.byteLength),
      'Cache-Control': 'no-store',
    },
  });
}
