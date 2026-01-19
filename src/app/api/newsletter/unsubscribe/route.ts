import { SUBSCRIBERS_TABLE, getSupabaseClient } from '@/lib/supabase';
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

    // Find the subscriber with the matching unsubscribe token
    const { data: subscriber, error: fetchError } = await getSupabaseClient()
      .from(SUBSCRIBERS_TABLE)
      .select('id, email, unsubscribed')
      .eq('unsubscribe_token', token)
      .single();

    if (fetchError || !subscriber) {
      console.error('Error finding subscriber:', fetchError);
      return NextResponse.json(
        { success: false, message: 'Invalid or expired unsubscribe link' },
        { status: 404 }
      );
    }

    // Check if already unsubscribed
    if (subscriber.unsubscribed) {
      return NextResponse.json({
        success: true,
        message: 'You are already unsubscribed from our newsletter',
        alreadyUnsubscribed: true,
      });
    }

    // Update the subscriber to mark as unsubscribed
    const { error: updateError } = await getSupabaseClient()
      .from(SUBSCRIBERS_TABLE)
      .update({
        unsubscribed: true,
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('id', subscriber.id);

    if (updateError) {
      console.error('Error unsubscribing:', updateError);
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

    // Validate the email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Find the subscriber
    const { data: subscriber, error: fetchError } = await getSupabaseClient()
      .from(SUBSCRIBERS_TABLE)
      .select('id, email, unsubscribed')
      .eq('email', email.toLowerCase())
      .single();

    if (fetchError) {
      if (fetchError.code === 'PGRST116') {
        // No subscriber found - return success to avoid revealing email existence
        return NextResponse.json({
          success: true,
          message: 'If you were subscribed, you have been removed from our newsletter',
        });
      }
      console.error('Error finding subscriber:', fetchError);
      return NextResponse.json(
        { success: false, message: 'Error processing your request' },
        { status: 500 }
      );
    }

    // Check if already unsubscribed
    if (subscriber.unsubscribed) {
      return NextResponse.json({
        success: true,
        message: 'You are already unsubscribed from our newsletter',
        alreadyUnsubscribed: true,
      });
    }

    // Update the subscriber to mark as unsubscribed
    const { error: updateError } = await getSupabaseClient()
      .from(SUBSCRIBERS_TABLE)
      .update({
        unsubscribed: true,
        unsubscribed_at: new Date().toISOString(),
      })
      .eq('id', subscriber.id);

    if (updateError) {
      console.error('Error unsubscribing:', updateError);
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
