import { sendConfirmationEmail } from '@/lib/email';
import { getSubscriber, updateSubscriber } from '@/lib/newsletter-store';
import { createExpirationDate, generateToken } from '@/lib/token';
import { validateEmail } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

/**
 * API handler for resending newsletter subscription confirmation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    const existingSubscriber = await getSubscriber(email);

    if (!existingSubscriber) {
      return NextResponse.json(
        {
          success: false,
          message: 'This email is not registered for our newsletter. Please subscribe first.',
        },
        { status: 404 }
      );
    }

    if (existingSubscriber.confirmed) {
      return NextResponse.json({
        success: true,
        message: 'Your subscription is already confirmed. No need to confirm again.',
        alreadyConfirmed: true,
      });
    }

    // Generate new confirmation token
    const confirmationToken = generateToken();
    const tokenExpiresAt = createExpirationDate(48);

    // If the subscriber has no unsubscribe token (e.g. legacy record), generate
    // and persist one now so the confirmation email has a working unsubscribe link.
    let unsubscribeToken = existingSubscriber.unsubscribe_token;
    if (!unsubscribeToken) {
      unsubscribeToken = randomBytes(32).toString('hex');
    }

    const updated = await updateSubscriber(email, {
      confirmation_token: confirmationToken,
      token_expires_at: tokenExpiresAt,
      unsubscribe_token: unsubscribeToken,
    });

    if (!updated) {
      console.error('Error updating subscriber token for:', email);
      return NextResponse.json(
        { success: false, message: 'Error updating your subscription details. Please try again.' },
        { status: 500 }
      );
    }

    const emailResult = await sendConfirmationEmail(email, confirmationToken, unsubscribeToken);

    if (!emailResult.success) {
      console.error('Failed to send confirmation email:', emailResult.error);
      return NextResponse.json(
        { success: false, message: 'Failed to send confirmation email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'A new confirmation email has been sent. Please check your inbox.',
    });
  } catch (error) {
    console.error('Newsletter resend confirmation error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
