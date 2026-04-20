import { NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { fetchSchedule } from '@/lib/sessionize';
import ProgramPdf from '@/components/program/ProgramPdf';
import React from 'react';
import type { DocumentProps } from '@react-pdf/renderer';

export const dynamic = 'force-dynamic';

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

  const allDays = await fetchSchedule();
  const days =
    dayFilters.length > 0
      ? allDays.filter(d => dayFilters.some(f => d.date.startsWith(f)))
      : allDays;

  if (days.length === 0) {
    return new NextResponse(
      JSON.stringify({ error: 'No matching days found for the given filter(s).' }),
      { status: 404, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const generatedAt = new Date().toLocaleDateString('en-GB', {
    timeZone: 'Europe/Prague',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const buffer = await renderToBuffer(
    React.createElement(ProgramPdf, { days, generatedAt }) as React.ReactElement<DocumentProps>
  );

  const uint8 = new Uint8Array(buffer);

  return new NextResponse(uint8, {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `inline; filename="gophercamp-2026-program${dayFilters.length === 1 ? `-${dayFilters[0]}` : ''}.pdf"`,
      'Content-Length': String(uint8.byteLength),
      // Allow caching for 5 minutes — schedule doesn't change by the second
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
    },
  });
}
