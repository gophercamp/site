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
 * @returns Promise with email sending result
 */
export async function sendConfirmationEmail(email: string, token: string): Promise<EmailResult> {
  const config = getEmailConfig();
  const confirmUrl = `${config.siteUrl}/api/newsletter/confirm?email=${encodeURIComponent(email)}&token=${token}`;

  return sendEmail({
    to: email,
    subject: 'Confirm your Gophercamp 2026 newsletter subscription',
    email: ConfirmationEmail({ confirmUrl }),
  });
}

/**
 * Sends a welcome email after subscription is confirmed
 *
 * @param email - Subscriber's email address
 * @returns Promise with email sending result
 */
export async function sendWelcomeEmail(email: string): Promise<EmailResult> {
  return sendEmail({
    to: email,
    subject: 'Welcome to Gophercamp 2026 Newsletter!',
    email: WelcomeEmail(),
  });
}
