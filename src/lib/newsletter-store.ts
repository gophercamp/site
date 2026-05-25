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
 * Returns the blob key used to map an unsubscribe token → email (O(1) lookup).
 * These keys are prefixed with '_' so they are excluded from subscriber listings.
 */
function tokenKey(token: string): string {
  return `_token:${token}`;
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
 * Retrieves a subscriber by their unsubscribe token in O(1).
 * A dedicated `_token:{token}` blob maps the token to the subscriber's email,
 * avoiding a full index scan.
 */
export async function getSubscriberByUnsubscribeToken(
  token: string
): Promise<NewsletterSubscriber | null> {
  const store = getSubscribersStore();
  const email = await store.get(tokenKey(token), { type: 'text' });
  if (!email) return null;
  return getSubscriber(email as string);
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
 * Saves (creates or updates) a subscriber.
 * Also persists a `_token:{token}` → email blob for O(1) unsubscribe-token lookup.
 */
export async function saveSubscriber(subscriber: NewsletterSubscriber): Promise<void> {
  const store = getSubscribersStore();
  const key = emailToKey(subscriber.email);
  await store.setJSON(key, subscriber);
  if (subscriber.unsubscribe_token) {
    await store.set(tokenKey(subscriber.unsubscribe_token), subscriber.email);
  }
}

/**
 * Updates fields on an existing subscriber.
 * The `email` field is intentionally excluded from `updates` — changing a
 * subscriber's email would orphan the old blob and index entry. Use a
 * dedicated migration flow if email changes are ever needed.
 */
export async function updateSubscriber(
  email: string,
  updates: Partial<Omit<NewsletterSubscriber, 'email'>>
): Promise<NewsletterSubscriber | null> {
  const existing = await getSubscriber(email);
  if (!existing) return null;

  const updated: NewsletterSubscriber = { ...existing, ...updates };
  await saveSubscriber(updated);
  return updated;
}

/**
 * Returns the list of all subscriber email keys.
 * Uses `store.list()` instead of a shared mutable `_index` blob, which avoids
 * lost-update race conditions under concurrent subscriptions.
 * Internal metadata keys (prefixed with `_`) are filtered out.
 */
export async function getSubscriberIndex(): Promise<string[]> {
  const store = getSubscribersStore();
  const { blobs } = await store.list();
  return blobs.map(b => b.key).filter(k => !k.startsWith('_'));
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
