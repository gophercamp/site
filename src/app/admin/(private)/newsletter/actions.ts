'use server';

import { sendNewsletterBatch, sendNewsletterEmail } from '@/lib/email';
import { getActiveSubscribers, getSubscriber } from '@/lib/newsletter-store';
import { getSessionUser } from '@/lib/session';

export interface SendNewsletterResult {
  success: boolean;
  message: string;
  sent?: number;
  failed?: number;
  total?: number;
  testMode?: boolean;
}

/**
 * Sends a test newsletter email to a single address.
 */
export async function sendTestNewsletter(
  subject: string,
  content: string,
  testEmail: string
): Promise<SendNewsletterResult> {
  if (!(await getSessionUser())) {
    return { success: false, message: 'Unauthorized' };
  }

  const subscriber = await getSubscriber(testEmail);
  if (!subscriber) {
    return {
      success: false,
      message: 'Test email not found in subscribers. Please use a subscribed email address.',
    };
  }

  const result = await sendNewsletterEmail(
    testEmail,
    `[TEST] ${subject}`,
    content,
    subscriber.unsubscribe_token || ''
  );

  if (!result.success) {
    return { success: false, message: `Failed to send test email: ${result.error}` };
  }

  return { success: true, message: 'Test email sent successfully', sent: 1, testMode: true };
}

/**
 * Sends a newsletter to all confirmed, active subscribers.
 */
export async function sendNewsletter(
  subject: string,
  content: string
): Promise<SendNewsletterResult> {
  if (!(await getSessionUser())) {
    return { success: false, message: 'Unauthorized' };
  }

  const subscribers = await getActiveSubscribers();
  if (!subscribers || subscribers.length === 0) {
    return { success: false, message: 'No active subscribers found' };
  }

  const batch = subscribers.map(s => ({
    email: s.email,
    unsubscribeToken: s.unsubscribe_token || '',
  }));

  const result = await sendNewsletterBatch(batch, subject, content);

  if (result.failed > 0) {
    console.warn(
      `Newsletter sending completed with ${result.failed} failures out of ${result.total}`
    );
    result.errors?.forEach(e => console.error(`Failed to send to ${e.email}:`, e.error));
  }

  return {
    success: result.success,
    message: `Newsletter sent to ${result.sent} of ${result.total} subscribers`,
    sent: result.sent,
    failed: result.failed,
    total: result.total,
  };
}
