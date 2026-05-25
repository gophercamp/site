'use server';

import { getSubscriber, getSubscriberIndex, NewsletterSubscriber } from '@/lib/newsletter-store';
import { getStore } from '@netlify/blobs';
import { revalidatePath } from 'next/cache';

/**
 * Get all newsletter subscribers ordered by subscribed_at descending.
 */
export async function getSubscribers(): Promise<{
  subscribers: NewsletterSubscriber[] | null;
  error: string | null;
}> {
  try {
    const index = await getSubscriberIndex();
    const subscribers: NewsletterSubscriber[] = [];

    for (const email of index) {
      const sub = await getSubscriber(email);
      if (sub) subscribers.push(sub);
    }

    subscribers.sort(
      (a, b) => new Date(b.subscribed_at).getTime() - new Date(a.subscribed_at).getTime()
    );

    return { subscribers, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { subscribers: null, error: errorMessage };
  }
}

/**
 * Delete a newsletter subscriber by email address.
 * Also removes the associated unsubscribe-token lookup blob.
 */
export async function deleteSubscriber(
  email: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const store = getStore('newsletter-subscribers');
    const key = email.toLowerCase().trim();

    const subscriber = await getSubscriber(email);
    if (subscriber?.unsubscribe_token) {
      await store.delete(`_token:${subscriber.unsubscribe_token}`);
    }

    await store.delete(key);
    revalidatePath('/admin/subscribers');

    return { success: true, error: null };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}

/**
 * Get subscriber statistics derived from the full subscriber list.
 */
export async function getSubscriberStats(): Promise<{
  stats: {
    total: number;
    confirmed: number;
    unconfirmed: number;
    unsubscribed: number;
    active: number;
  };
  error: string | null;
}> {
  try {
    const index = await getSubscriberIndex();
    let confirmed = 0;
    let unsubscribed = 0;

    for (const email of index) {
      const sub = await getSubscriber(email);
      if (!sub) continue;
      if (sub.unsubscribed) unsubscribed++;
      else if (sub.confirmed) confirmed++;
    }

    const total = index.length;
    const unconfirmed = total - confirmed - unsubscribed;
    const active = confirmed;

    return {
      stats: { total, confirmed, unconfirmed, unsubscribed, active },
      error: null,
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return {
      stats: { total: 0, confirmed: 0, unconfirmed: 0, unsubscribed: 0, active: 0 },
      error: errorMessage,
    };
  }
}
