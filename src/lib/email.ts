import { Resend } from 'resend';

// Initialize the Resend client with API key
const resend = new Resend(process.env.RESEND_API_KEY);

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

    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: email,
      subject: EMAIL_CONFIG.confirmationSubject,
      replyTo: EMAIL_CONFIG.replyTo,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #00ADD8;">Gophercamp 2026</h1>
          <p>Hello,</p>
          <p>Thank you for subscribing to the Gophercamp 2026 newsletter. Please confirm your subscription by clicking the button below:</p>
          <a href="${confirmUrl}" style="display: inline-block; background-color: #00ADD8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0;">
            Confirm Subscription
          </a>
          <p>If you didn't sign up for this newsletter, you can safely ignore this email.</p>
          <p>The Gophercamp team</p>
          <p style="font-size: 12px; color: #666; margin-top: 30px;">
            If the button doesn't work, copy and paste this URL into your browser: <br>
            <a href="${confirmUrl}" style="color: #00ADD8;">${confirmUrl}</a>
          </p>
        </div>
      `,
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
    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: email,
      subject: 'Welcome to Gophercamp 2026 Newsletter!',
      replyTo: EMAIL_CONFIG.replyTo,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #00ADD8;">Welcome to Gophercamp 2026!</h1>
          <p>Hello,</p>
          <p>Thank you for confirming your subscription to the Gophercamp 2026 newsletter!</p>
          <p>We'll keep you updated with the latest information about:</p>
          <ul>
            <li>Conference agenda and speaker announcements</li>
            <li>Workshop schedules</li>
            <li>Special events and networking opportunities</li>
            <li>Important dates and deadlines</li>
          </ul>
          <p>Mark your calendar: <strong>April 24, 2026 • Brno, Czech Republic</strong></p>
          <p>We're looking forward to seeing you at Gophercamp 2026!</p>
          <p>The Gophercamp Team</p>
        </div>
      `,
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
