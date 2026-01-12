import { createClient } from '@supabase/supabase-js';

export function getSupabaseClient() {
  // Ensure these environment variables are set in your environment
  // You can add them to .env.local for local development
  // and configure them in your deployment platform for production
  const supabaseUrl = process.env.SUPABASE_DATABASE_URL || '';
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase URL or key is missing. Functionality may be limited.');
  }

  // Create and return the Supabase client
  return createClient(supabaseUrl, supabaseKey);
}

/**
 * Table name for storing newsletter subscribers
 */
export const SUBSCRIBERS_TABLE = 'newsletter_subscribers';

/**
 * Interface representing a newsletter subscriber in the database
 */
export interface NewsletterSubscriber {
  id: number;
  email: string;
  subscribed_at: string;
  confirmed: boolean;
  confirmation_token?: string;
  token_expires_at?: string;
  confirmed_at?: string;
  unsubscribe_token?: string;
  ip_address?: string;
  user_agent?: string;
}
