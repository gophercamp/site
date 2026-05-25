import {
  getSubscriber,
  getSubscriberByUnsubscribeToken,
  updateSubscriber,
} from '@/lib/newsletter-store';
import { validateEmail } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API handler for unsubscribing from the newsletter
 * Supports both GET (with token) and POST (with email) methods
 */

/**
 * GET handler - Unsubscribe using token from email link
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Unsubscribe token is required' },
        { status: 400 }
      );
    }

    const subscriber = await getSubscriberByUnsubscribeToken(token);

    if (!subscriber) {
      return NextResponse.json(
        { success: false, message: 'Invalid or expired unsubscribe link' },
        { status: 404 }
      );
    }

    if (subscriber.unsubscribed) {
      return NextResponse.json({
        success: true,
        message: 'You are already unsubscribed from our newsletter',
        alreadyUnsubscribed: true,
      });
    }

    const updated = await updateSubscriber(subscriber.email, {
      unsubscribed: true,
      unsubscribed_at: new Date().toISOString(),
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Error processing your unsubscribe request' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter',
    });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

/**
 * POST handler - Unsubscribe using email address
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

    const subscriber = await getSubscriber(email);

    if (!subscriber) {
      // Return success to avoid revealing email existence
      return NextResponse.json({
        success: true,
        message: 'If you were subscribed, you have been removed from our newsletter',
      });
    }

    if (subscriber.unsubscribed) {
      return NextResponse.json({
        success: true,
        message: 'You are already unsubscribed from our newsletter',
        alreadyUnsubscribed: true,
      });
    }

    const updated = await updateSubscriber(email, {
      unsubscribed: true,
      unsubscribed_at: new Date().toISOString(),
    });

    if (!updated) {
      return NextResponse.json(
        { success: false, message: 'Error processing your unsubscribe request' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter',
    });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
