import { sendConfirmationEmail } from '@/lib/email';
import { SUBSCRIBERS_TABLE, getSupabaseClient } from '@/lib/supabase';
import { createExpirationDate, generateToken } from '@/lib/token';
import { validateEmail } from '@/lib/validation';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
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

    // Check if the email already exists in the database
    const { data: existingUser, error: checkError } = await getSupabaseClient()
      .from(SUBSCRIBERS_TABLE)
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing user:', checkError);
      return NextResponse.json(
        { success: false, message: 'Error checking subscription status' },
        { status: 500 }
      );
    }

    if (existingUser) {
      // Return success even if already subscribed to avoid revealing email existence
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

    // Insert the new subscriber
    const { error: insertError } = await getSupabaseClient().from(SUBSCRIBERS_TABLE).insert({
      email: email.toLowerCase(),
      subscribed_at: new Date().toISOString(),
      confirmed: false,
      confirmation_token: confirmationToken,
      token_expires_at: tokenExpiresAt,
      ip_address: ip,
      user_agent: userAgent,
    });

    if (insertError) {
      console.error('Error saving subscriber:', insertError);
      return NextResponse.json(
        { success: false, message: 'Error saving your subscription. Please try again.' },
        { status: 500 }
      );
    }

    // Send confirmation email
    const emailResult = await sendConfirmationEmail(email, confirmationToken);

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
