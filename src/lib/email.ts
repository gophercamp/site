import ConfirmationEmail from '@/emails/ConfirmationEmail';
import NewsletterEmail from '@/emails/NewsletterEmail';
import WelcomeEmail from '@/emails/WelcomeEmail';
import { render } from '@react-email/render';
import { Resend } from 'resend';

/**
 * Email configuration constants
 */
/**
 * Returns the current email configuration, reading env variables at runtime.
 */
function getEmailConfig() {
  return {
    from: process.env.EMAIL_FROM || 'newsletter@gophercamp.cz',
    replyTo: 'info@gophercamp.cz',
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://gophercamp.cz',
  };
}

/**
 * Interface for email configuration
 */
interface EmailOptions {
  to: string;
  subject: string;
  email: React.ReactElement;
}

/**
 * Interface for email confirmation results
 */
export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends an email using Resend
 *
 * @param options - Email options including recipient, subject, and content
 * @param logPrefix - Prefix for log messages
 * @returns Promise with email sending result
 */
async function sendEmail({ email, to, subject }: EmailOptions): Promise<EmailResult> {
  const config = getEmailConfig();
  try {
    // Render the React component to HTML
    const html = await render(email);
    const text = await render(email, { plainText: true });

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: config.from,
      to,
      subject,
      replyTo: config.replyTo,
      html,
      text,
    });

    if (error) {
      console.error(`Error sending email:`, error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      messageId: data?.id,
    };
  } catch (error) {
    console.error(`Failed to initialize email sender:`, error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Sends a confirmation email for newsletter subscription
 *
 * @param email - Subscriber's email address
 * @param token - Confirmation token to verify the subscription
 * @param unsubscribeToken - Token for unsubscribing from the newsletter
 * @returns Promise with email sending result
 */
export async function sendConfirmationEmail(
  email: string,
  token: string,
  unsubscribeToken: string
): Promise<EmailResult> {
  const config = getEmailConfig();
  const confirmUrl = `${config.siteUrl}/api/newsletter/confirm?email=${encodeURIComponent(email)}&token=${token}`;
  const unsubscribeUrl = `${config.siteUrl}/unsubscribe?token=${unsubscribeToken}`;

  return sendEmail({
    to: email,
    subject: 'Confirm your Gophercamp 2026 newsletter subscription',
    email: ConfirmationEmail({ confirmUrl, unsubscribeUrl }),
  });
}

/**
 * Sends a welcome email after subscription is confirmed
 *
 * @param email - Subscriber's email address
 * @param unsubscribeToken - Token for unsubscribing from the newsletter
 * @returns Promise with email sending result
 */
export async function sendWelcomeEmail(
  email: string,
  unsubscribeToken: string
): Promise<EmailResult> {
  const config = getEmailConfig();
  const unsubscribeUrl = `${config.siteUrl}/unsubscribe?token=${unsubscribeToken}`;

  return sendEmail({
    to: email,
    subject: 'Welcome to Gophercamp 2026 Newsletter!',
    email: WelcomeEmail({ unsubscribeUrl }),
  });
}

/**
 * Sends a newsletter email to a subscriber
 *
 * @param email - Subscriber's email address
 * @param subject - Newsletter subject line
 * @param content - Newsletter content (supports markdown-style paragraphs separated by \n\n)
 * @param unsubscribeToken - Token for unsubscribing from the newsletter
 * @returns Promise with email sending result
 */
export async function sendNewsletterEmail(
  email: string,
  subject: string,
  content: string,
  unsubscribeToken: string
): Promise<EmailResult> {
  const config = getEmailConfig();
  const unsubscribeUrl = `${config.siteUrl}/unsubscribe?token=${unsubscribeToken}`;

  return sendEmail({
    to: email,
    subject,
    email: NewsletterEmail({ subject, content, unsubscribeUrl }),
  });
}

/**
 * Interface for batch newsletter subscriber
 */
interface BatchSubscriber {
  email: string;
  unsubscribeToken: string;
}

/**
 * Interface for batch email sending results
 */
export interface BatchEmailResult {
  success: boolean;
  sent: number;
  failed: number;
  total: number;
  errors?: Array<{ email: string; error: string }>;
}

/**
 * Sends newsletter emails to multiple subscribers using batch API
 * Processes subscribers in batches of 100 (Resend's limit)
 *
 * @param subscribers - Array of subscribers with email and unsubscribe token
 * @param subject - Newsletter subject line
 * @param content - Newsletter content (supports markdown-style paragraphs separated by \n\n)
 * @returns Promise with batch email sending result
 */
export async function sendNewsletterBatch(
  subscribers: BatchSubscriber[],
  subject: string,
  content: string
): Promise<BatchEmailResult> {
  const config = getEmailConfig();
  const BATCH_SIZE = 20;

  let totalSent = 0;
  let totalFailed = 0;
  const errors: Array<{ email: string; error: string }> = [];

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Process subscribers in batches of 20 with 1s delay between batches
    for (let i = 0; i < subscribers.length; i += BATCH_SIZE) {
      const batch = subscribers.slice(i, i + BATCH_SIZE);

      // Add 1 second delay between batches (skip for first batch)
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      try {
        // Prepare batch emails
        const batchEmails = await Promise.all(
          batch.map(async subscriber => {
            const unsubscribeUrl = `${config.siteUrl}/unsubscribe?token=${subscriber.unsubscribeToken}`;
            const html = await render(NewsletterEmail({ subject, content, unsubscribeUrl }));
            const text = await render(NewsletterEmail({ subject, content, unsubscribeUrl }), {
              plainText: true,
            });

            return {
              from: config.from,
              to: subscriber.email,
              subject,
              replyTo: config.replyTo,
              html,
              text,
            };
          })
        );

        // Send batch
        const { data, error } = await resend.batch.send(batchEmails);

        if (error) {
          console.error(`Batch send error for batch starting at index ${i}:`, error);
          totalFailed += batch.length;
          batch.forEach(sub => {
            errors.push({ email: sub.email, error: error.message || 'Unknown batch error' });
          });
        } else if (data && Array.isArray(data)) {
          totalSent += data.length;
          console.log(`Successfully sent batch of ${data.length} emails`);
        } else {
          // If data exists but is not an array, count the batch as sent
          totalSent += batch.length;
          console.log(`Successfully sent batch of ${batch.length} emails`);
        }
      } catch (batchError) {
        console.error(`Failed to process batch starting at index ${i}:`, batchError);
        totalFailed += batch.length;
        batch.forEach(sub => {
          errors.push({
            email: sub.email,
            error: batchError instanceof Error ? batchError.message : 'Unknown error',
          });
        });
      }
    }

    return {
      success: totalSent > 0,
      sent: totalSent,
      failed: totalFailed,
      total: subscribers.length,
      errors: errors.length > 0 ? errors : undefined,
    };
  } catch (error) {
    console.error('Failed to initialize Resend for batch sending:', error);
    return {
      success: false,
      sent: 0,
      failed: subscribers.length,
      total: subscribers.length,
      errors: [
        {
          email: 'all',
          error: error instanceof Error ? error.message : 'Failed to initialize email sender',
        },
      ],
    };
  }
}
