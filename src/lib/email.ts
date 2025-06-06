import ConfirmationEmail from '@/emails/ConfirmationEmail';
import WelcomeEmail from '@/emails/WelcomeEmail';
import { render } from '@react-email/render';
import { Resend } from 'resend';

/**
 * Email configuration constants
 */
const EMAIL_CONFIG = {
  from: process.env.EMAIL_FROM || 'newsletter@gophercamp.cz',
  replyTo: 'info@gophercamp.cz',
  confirmationSubject: 'Confirm your Gophercamp 2026 newsletter subscription',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://gophercamp.cz',
};

/**
 * Interface for email confirmation results
 */
export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Sends a confirmation email for newsletter subscription
 *
 * @param email - Subscriber's email address
 * @param token - Confirmation token to verify the subscription
 * @returns Promise with email sending result
 */
export async function sendConfirmationEmail(email: string, token: string): Promise<EmailResult> {
  try {
    const confirmUrl = `${EMAIL_CONFIG.siteUrl}/api/newsletter/confirm?email=${encodeURIComponent(email)}&token=${token}`;

    // Render the React component to HTML
    const html = await render(ConfirmationEmail({ confirmUrl }));

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: email,
      subject: EMAIL_CONFIG.confirmationSubject,
      replyTo: EMAIL_CONFIG.replyTo,
      html,
    });

    if (error) {
      console.error('Error sending confirmation email:', error);
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
    console.error('Failed to send confirmation email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Sends a welcome email after subscription is confirmed
 *
 * @param email - Subscriber's email address
 * @returns Promise with email sending result
 */
export async function sendWelcomeEmail(email: string): Promise<EmailResult> {
  try {
    // Render the React component to HTML
    const html = await render(WelcomeEmail());

    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: email,
      subject: 'Welcome to Gophercamp 2026 Newsletter!',
      replyTo: EMAIL_CONFIG.replyTo,
      html,
    });

    if (error) {
      console.error('Error sending welcome email:', error);
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
    console.error('Failed to send welcome email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}
