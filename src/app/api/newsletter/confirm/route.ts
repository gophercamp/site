import { sendWelcomeEmail } from '@/lib/email';
import { getSubscriberByConfirmationToken, updateSubscriber } from '@/lib/newsletter-store';
import { isTokenExpired } from '@/lib/token';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API handler for confirming newsletter subscriptions
 */
export async function GET(request: NextRequest) {
  const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gophercamp.cz';
  const successUrl = `${redirectUrl}?subscriptionConfirmed=true`;
  const errorUrl = `${redirectUrl}?subscriptionError=true`;
  const expiredUrl = `${redirectUrl}?subscriptionExpired=true`;

  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (!email || !token) {
      console.error('Missing required parameters for subscription confirmation');
      return NextResponse.redirect(errorUrl);
    }

    const subscriber = await getSubscriberByConfirmationToken(email, token);

    if (!subscriber) {
      console.error('Invalid confirmation token or email:', email);
      return NextResponse.redirect(errorUrl);
    }

    // Check if token is expired
    if (subscriber.token_expires_at && isTokenExpired(subscriber.token_expires_at)) {
      console.error('Confirmation token expired for:', email);
      return NextResponse.redirect(expiredUrl);
    }

    // Check if already confirmed
    if (subscriber.confirmed) {
      console.log('Subscription already confirmed for:', email);
      return NextResponse.redirect(successUrl);
    }

    // Update subscription to confirmed status
    const updated = await updateSubscriber(email, {
      confirmed: true,
      confirmed_at: new Date().toISOString(),
      confirmation_token: null,
      token_expires_at: null,
    });

    if (!updated) {
      console.error('Error confirming subscription for:', email);
      return NextResponse.redirect(errorUrl);
    }

    // Send welcome email with unsubscribe token
    if (subscriber.unsubscribe_token) {
      sendWelcomeEmail(email, subscriber.unsubscribe_token).catch(err => {
        console.error('Failed to send welcome email:', err);
      });
    }

    return NextResponse.redirect(successUrl);
  } catch (error) {
    console.error('Error confirming subscription:', error);
    return NextResponse.redirect(errorUrl);
  }
}
