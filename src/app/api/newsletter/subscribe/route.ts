import { sendConfirmationEmail } from '@/lib/email';
import { getSubscriber, saveSubscriber } from '@/lib/newsletter-store';
import { createExpirationDate, generateToken } from '@/lib/token';
import { validateEmail } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';
import { randomBytes } from 'crypto';

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

    // Check if the email already exists
    const existingSubscriber = await getSubscriber(email);

    if (existingSubscriber) {
      return NextResponse.json({
        success: false,
        message: 'You are already subscribed to our newsletter!',
        alreadySubscribed: true,
      });
    }

    // Capture some additional metadata
    const userAgent = request.headers.get('user-agent') || undefined;
    const ip =
      request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined;

    // Generate confirmation token
    const confirmationToken = generateToken();
    const tokenExpiresAt = createExpirationDate(48); // Token expires in 48 hours

    // Generate unsubscribe token (permanent, doesn't expire)
    const unsubscribeToken = randomBytes(32).toString('hex');

    // Save the new subscriber
    await saveSubscriber({
      email: email.toLowerCase(),
      subscribed_at: new Date().toISOString(),
      confirmed: false,
      confirmation_token: confirmationToken,
      token_expires_at: tokenExpiresAt,
      unsubscribe_token: unsubscribeToken,
      ip_address: ip,
      user_agent: userAgent,
    });

    // Send confirmation email
    const emailResult = await sendConfirmationEmail(email, confirmationToken, unsubscribeToken);

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          alreadySubscribed: true,
          message:
            emailResult.error || 'Failed to send confirmation email. Please try again later.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing! Please check your email to confirm your subscription.',
    });
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
