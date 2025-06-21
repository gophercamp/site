'use server';

import { NewsletterSubscriber, SUBSCRIBERS_TABLE, getSupabaseClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

/**
 * Get all newsletter subscribers
 */
export async function getSubscribers(): Promise<{
  subscribers: NewsletterSubscriber[] | null;
  error: string | null;
}> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from(SUBSCRIBERS_TABLE)
      .select('*')
      .order('subscribed_at', { ascending: false });

    if (error) {
      return { subscribers: null, error: error.message };
    }

    return { subscribers: data, error: null };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { subscribers: null, error: errorMessage };
  }
}

/**
 * Delete a newsletter subscriber
 */
export async function deleteSubscriber(
  id: number
): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = getSupabaseClient();

    const { error } = await supabase.from(SUBSCRIBERS_TABLE).delete().eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    // Revalidate the subscribers list page
    revalidatePath('/admin/subscribers');

    return { success: true, error: null };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}

/**
 * Get subscriber statistics
 */
export async function getSubscriberStats(): Promise<{
  stats: {
    total: number;
    confirmed: number;
    unconfirmed: number;
  };
  error: string | null;
}> {
  try {
    const supabase = getSupabaseClient();

    // Get all subscribers count
    const { count: totalCount, error: totalError } = await supabase
      .from(SUBSCRIBERS_TABLE)
      .select('*', { count: 'exact', head: true });

    if (totalError) {
      return {
        stats: { total: 0, confirmed: 0, unconfirmed: 0 },
        error: totalError.message,
      };
    }

    // Get confirmed subscribers count
    const { count: confirmedCount, error: confirmedError } = await supabase
      .from(SUBSCRIBERS_TABLE)
      .select('*', { count: 'exact', head: true })
      .eq('confirmed', true);

    if (confirmedError) {
      return {
        stats: { total: totalCount || 0, confirmed: 0, unconfirmed: 0 },
        error: confirmedError.message,
      };
    }

    // Calculate unconfirmed count
    const unconfirmedCount = (totalCount || 0) - (confirmedCount || 0);

    return {
      stats: {
        total: totalCount || 0,
        confirmed: confirmedCount || 0,
        unconfirmed: unconfirmedCount,
      },
      error: null,
    };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      stats: { total: 0, confirmed: 0, unconfirmed: 0 },
      error: errorMessage,
    };
  }
}

/**
 * Get unsubscribe URL for a subscriber
 */
export async function getUnsubscribeUrl(email: string): Promise<{
  url: string | null;
  error: string | null;
}> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from(SUBSCRIBERS_TABLE)
      .select('unsubscribe_token')
      .eq('email', email.toLowerCase())
      .single();

    if (error) {
      return { url: null, error: error.message };
    }

    if (!data.unsubscribe_token) {
      return { url: null, error: 'No unsubscribe token found for this subscriber' };
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gophercamp.cz';
    const url = `${siteUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&token=${data.unsubscribe_token}`;

    return { url, error: null };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { url: null, error: errorMessage };
  }
}
