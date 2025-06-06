import { NextRequest, NextResponse } from 'next/server';
import { supabase, SUBSCRIBERS_TABLE } from '@/lib/supabase';
import { isTokenExpired } from '@/lib/token';
import { sendWelcomeEmail } from '@/lib/email';

/**
 * API handler for confirming newsletter subscriptions
 */
export async function GET(request: NextRequest) {
  try {
    // Get the email and token from query parameters
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    // Redirect URL for when we're done
    const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gophercamp.cz';
    const successUrl = `${redirectUrl}?subscriptionConfirmed=true`;
    const errorUrl = `${redirectUrl}?subscriptionError=true`;
    const expiredUrl = `${redirectUrl}?subscriptionExpired=true`;

    // Validate required parameters
    if (!email || !token) {
      console.error('Missing required parameters for subscription confirmation');
      return NextResponse.redirect(errorUrl);
    }

    // Find the subscriber with matching email and token
    const { data, error } = await supabase
      .from(SUBSCRIBERS_TABLE)
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('confirmation_token', token)
      .single();

    if (error || !data) {
      console.error('Invalid confirmation token or email:', error);
      return NextResponse.redirect(errorUrl);
    }

    // Check if token is expired
    if (data.token_expires_at && isTokenExpired(data.token_expires_at)) {
      console.error('Confirmation token expired for:', email);
      return NextResponse.redirect(expiredUrl);
    }

    // Check if already confirmed
    if (data.confirmed) {
      console.log('Subscription already confirmed for:', email);
      return NextResponse.redirect(successUrl);
    }

    // Update subscription to confirmed status
    const { error: updateError } = await supabase
      .from(SUBSCRIBERS_TABLE)
      .update({
        confirmed: true,
        confirmed_at: new Date().toISOString(),
        // Clear the token since it's been used
        confirmation_token: null,
        token_expires_at: null,
      })
      .eq('id', data.id);

    if (updateError) {
      console.error('Error confirming subscription:', updateError);
      return NextResponse.redirect(errorUrl);
    }

    // Send welcome email
    sendWelcomeEmail(email).catch(error => {
      // Log but don't block on welcome email errors
      console.error('Failed to send welcome email:', error);
    });

    // Redirect to success page
    return NextResponse.redirect(successUrl);
  } catch (error) {
    console.error('Error confirming subscription:', error);
    const redirectUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gophercamp.cz';
    return NextResponse.redirect(`${redirectUrl}?subscriptionError=true`);
  }
}
