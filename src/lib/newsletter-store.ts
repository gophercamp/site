import { getStore } from '@netlify/blobs';

/**
 * Interface representing a newsletter subscriber
 */
export interface NewsletterSubscriber {
  email: string;
  subscribed_at: string;
  confirmed: boolean;
  confirmation_token?: string | null;
  token_expires_at?: string | null;
  confirmed_at?: string | null;
  ip_address?: string;
  user_agent?: string;
  unsubscribed?: boolean;
  unsubscribed_at?: string | null;
  unsubscribe_token?: string;
}

/**
 * Returns the Netlify Blob Store for newsletter subscribers
 */
function getSubscribersStore() {
  return getStore('newsletter-subscribers');
}

/**
 * Normalizes an email to use as a blob key
 */
function emailToKey(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Retrieves a subscriber by email
 */
export async function getSubscriber(email: string): Promise<NewsletterSubscriber | null> {
  const store = getSubscribersStore();
  const data = await store.get(emailToKey(email), { type: 'json' });
  return (data as NewsletterSubscriber | null) ?? null;
}

/**
 * Retrieves a subscriber by their unsubscribe token
 */
export async function getSubscriberByUnsubscribeToken(
  token: string
): Promise<NewsletterSubscriber | null> {
  const store = getSubscribersStore();
  const index = await getSubscriberIndex();

  for (const email of index) {
    const subscriber = (await store.get(emailToKey(email), {
      type: 'json',
    })) as NewsletterSubscriber | null;
    if (subscriber && subscriber.unsubscribe_token === token) {
      return subscriber;
    }
  }

  return null;
}

/**
 * Retrieves a subscriber by their confirmation token
 */
export async function getSubscriberByConfirmationToken(
  email: string,
  token: string
): Promise<NewsletterSubscriber | null> {
  const subscriber = await getSubscriber(email);
  if (subscriber && subscriber.confirmation_token === token) {
    return subscriber;
  }
  return null;
}

/**
 * Saves (creates or updates) a subscriber
 */
export async function saveSubscriber(subscriber: NewsletterSubscriber): Promise<void> {
  const store = getSubscribersStore();
  const key = emailToKey(subscriber.email);
  await store.setJSON(key, subscriber);
  await addToIndex(subscriber.email);
}

/**
 * Updates fields on an existing subscriber
 */
export async function updateSubscriber(
  email: string,
  updates: Partial<NewsletterSubscriber>
): Promise<NewsletterSubscriber | null> {
  const existing = await getSubscriber(email);
  if (!existing) return null;

  const updated: NewsletterSubscriber = { ...existing, ...updates };
  await saveSubscriber(updated);
  return updated;
}

/**
 * Returns the index of all subscriber emails
 */
export async function getSubscriberIndex(): Promise<string[]> {
  const store = getSubscribersStore();
  const data = await store.get('_index', { type: 'json' });
  return (data as string[] | null) ?? [];
}

/**
 * Adds an email to the subscriber index (if not already present)
 */
async function addToIndex(email: string): Promise<void> {
  const store = getSubscribersStore();
  const normalized = emailToKey(email);
  const index = await getSubscriberIndex();

  if (!index.includes(normalized)) {
    await store.setJSON('_index', [...index, normalized]);
  }
}

/**
 * Returns all confirmed, active (non-unsubscribed) subscribers
 */
export async function getActiveSubscribers(): Promise<NewsletterSubscriber[]> {
  const store = getSubscribersStore();
  const index = await getSubscriberIndex();
  const active: NewsletterSubscriber[] = [];

  for (const email of index) {
    const subscriber = (await store.get(emailToKey(email), {
      type: 'json',
    })) as NewsletterSubscriber | null;
    if (subscriber && subscriber.confirmed && !subscriber.unsubscribed) {
      active.push(subscriber);
    }
  }

  return active;
}
