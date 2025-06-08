'use client';

import { createBrowserClient } from '@supabase/ssr';

/**
 * Create a Supabase client for use in client components
 * This uses the recommended approach from Supabase docs for Next.js 14+
 */
export function createBrowserSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
