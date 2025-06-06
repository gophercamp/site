import { NextRequest, NextResponse } from 'next/server';
import { supabase, SUBSCRIBERS_TABLE } from '@/lib/supabase';
import { validateEmail } from '@/lib/validation';
import { sendConfirmationEmail } from '@/lib/email';
import { generateToken, createExpirationDate } from '@/lib/token';

/**
 * API handler for resending newsletter subscription confirmation
 */
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

    // Check if the email exists in the database
    const { data: existingUser, error: checkError } = await supabase
      .from(SUBSCRIBERS_TABLE)
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (checkError) {
      if (checkError.code === 'PGRST116') {
        // not found
        return NextResponse.json(
          {
            success: false,
            message: 'This email is not registered for our newsletter. Please subscribe first.',
          },
          { status: 404 }
        );
      }

      console.error('Error checking subscriber:', checkError);
      return NextResponse.json(
        { success: false, message: 'Error checking subscription status' },
        { status: 500 }
      );
    }

    // If already confirmed, no need to resend
    if (existingUser.confirmed) {
      return NextResponse.json({
        success: true,
        message: 'Your subscription is already confirmed. No need to confirm again.',
        alreadyConfirmed: true,
      });
    }

    // Generate new confirmation token
    const confirmationToken = generateToken();
    const tokenExpiresAt = createExpirationDate(48); // Token expires in 48 hours

    // Update with new confirmation token
    const { error: updateError } = await supabase
      .from(SUBSCRIBERS_TABLE)
      .update({
        confirmation_token: confirmationToken,
        token_expires_at: tokenExpiresAt,
      })
      .eq('id', existingUser.id);

    if (updateError) {
      console.error('Error updating subscriber token:', updateError);
      return NextResponse.json(
        { success: false, message: 'Error updating your subscription details. Please try again.' },
        { status: 500 }
      );
    }

    // Send confirmation email
    const emailResult = await sendConfirmationEmail(email, confirmationToken);

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
