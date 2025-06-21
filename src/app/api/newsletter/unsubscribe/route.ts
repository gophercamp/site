import { SUBSCRIBERS_TABLE, getSupabaseClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API handler for unsubscribing from newsletter
 */
export async function GET(request: NextRequest) {
  try {
    // Get the email and token from query parameters
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    // Redirect URL for when we're done
    const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gophercamp.cz';
    const successUrl = `${redirectUrl}?unsubscribed=true`;
    const errorUrl = `${redirectUrl}?unsubscribeError=true`;

    // Validate required parameters
    if (!email || !token) {
      console.error('Missing required parameters for unsubscribe');
      return NextResponse.redirect(errorUrl);
    }

    // Find the subscriber with matching email and token
    const { data, error } = await getSupabaseClient()
      .from(SUBSCRIBERS_TABLE)
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('unsubscribe_token', token)
      .single();

    if (error || !data) {
      console.error('Invalid unsubscribe token or email:', error);
      return NextResponse.redirect(errorUrl);
    }

    // Delete the subscriber record (unsubscribe)
    const { error: deleteError } = await getSupabaseClient()
      .from(SUBSCRIBERS_TABLE)
      .delete()
      .eq('id', data.id);

    if (deleteError) {
      console.error('Error unsubscribing:', deleteError);
      return NextResponse.redirect(errorUrl);
    }

    console.log('Successfully unsubscribed:', email);

    // Redirect to success page
    return NextResponse.redirect(successUrl);
  } catch (error) {
    console.error('Error processing unsubscribe:', error);
    const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gophercamp.cz';
    return NextResponse.redirect(`${redirectUrl}?unsubscribeError=true`);
  }
}

/**
 * API handler for unsubscribing via POST (for forms)
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { email, token, requestUnsubscribe } = body;

    // Handle manual unsubscribe request (without token)
    if (requestUnsubscribe && email && !token) {
      // Find the subscriber by email
      const { data, error } = await getSupabaseClient()
        .from(SUBSCRIBERS_TABLE)
        .select('*')
        .eq('email', email.toLowerCase())
        .single();

      if (error || !data) {
        console.error('Subscriber not found:', error);
        return NextResponse.json(
          { success: false, message: 'Email address not found in our newsletter list.' },
          { status: 404 }
        );
      }

      // Delete the subscriber record (unsubscribe)
      const { error: deleteError } = await getSupabaseClient()
        .from(SUBSCRIBERS_TABLE)
        .delete()
        .eq('id', data.id);

      if (deleteError) {
        console.error('Error unsubscribing:', deleteError);
        return NextResponse.json(
          { success: false, message: 'Error processing unsubscribe request' },
          { status: 500 }
        );
      }

      console.log('Successfully unsubscribed via form:', email);

      return NextResponse.json({
        success: true,
        message: 'You have been successfully unsubscribed from our newsletter.',
      });
    }

    // Handle token-based unsubscribe (from email links)
    if (!email || !token) {
      return NextResponse.json(
        { success: false, message: 'Email and token are required' },
        { status: 400 }
      );
    }

    // Find the subscriber with matching email and token
    const { data, error } = await getSupabaseClient()
      .from(SUBSCRIBERS_TABLE)
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('unsubscribe_token', token)
      .single();

    if (error || !data) {
      console.error('Invalid unsubscribe token or email:', error);
      return NextResponse.json(
        { success: false, message: 'Invalid unsubscribe request' },
        { status: 400 }
      );
    }

    // Delete the subscriber record (unsubscribe)
    const { error: deleteError } = await getSupabaseClient()
      .from(SUBSCRIBERS_TABLE)
      .delete()
      .eq('id', data.id);

    if (deleteError) {
      console.error('Error unsubscribing:', deleteError);
      return NextResponse.json(
        { success: false, message: 'Error processing unsubscribe request' },
        { status: 500 }
      );
    }

    console.log('Successfully unsubscribed:', email);

    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed from our newsletter.',
    });
  } catch (error) {
    console.error('Newsletter unsubscribe error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
