import ConfirmationEmail from '@/emails/ConfirmationEmail';
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
  unsubscribeUrl?: string;
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
async function sendEmail({
  email,
  to,
  subject,
  unsubscribeUrl,
}: EmailOptions): Promise<EmailResult> {
  const config = getEmailConfig();
  try {
    // Render the React component to HTML
    const html = await render(email);
    const text = await render(email, { plainText: true });

    // Prepare email headers
    const headers: Record<string, string> = {};

    // Add List-Unsubscribe headers for better email client support and compliance
    // RFC 8058: https://tools.ietf.org/html/rfc8058
    if (unsubscribeUrl) {
      // List-Unsubscribe header with URL
      headers['List-Unsubscribe'] = `<${unsubscribeUrl}>`;
      // List-Unsubscribe-Post enables one-click unsubscribe in email clients
      headers['List-Unsubscribe-Post'] = 'List-Unsubscribe=One-Click';
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: config.from,
      to,
      subject,
      replyTo: config.replyTo,
      html,
      text,
      headers,
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
  unsubscribeToken?: string
): Promise<EmailResult> {
  const config = getEmailConfig();
  const confirmUrl = `${config.siteUrl}/api/newsletter/confirm?email=${encodeURIComponent(email)}&token=${token}`;
  const unsubscribeUrl = unsubscribeToken
    ? `${config.siteUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&token=${unsubscribeToken}`
    : undefined;

  return sendEmail({
    to: email,
    subject: 'Confirm your Gophercamp 2026 newsletter subscription',
    email: ConfirmationEmail({ confirmUrl, unsubscribeUrl }),
    unsubscribeUrl,
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
  unsubscribeToken?: string
): Promise<EmailResult> {
  const config = getEmailConfig();
  const unsubscribeUrl = unsubscribeToken
    ? `${config.siteUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}&token=${unsubscribeToken}`
    : undefined;

  return sendEmail({
    to: email,
    subject: 'Welcome to Gophercamp 2026 Newsletter!',
    email: WelcomeEmail({ unsubscribeUrl }),
    unsubscribeUrl,
  });
}
