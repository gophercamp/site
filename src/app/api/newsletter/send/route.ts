import { sendNewsletterEmail } from '@/lib/email';
import { SUBSCRIBERS_TABLE, getSupabaseClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

/**
 * API handler for sending newsletters to subscribers
 * This endpoint sends emails to all confirmed, active subscribers
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { subject, content, testMode = false, testEmail = null } = body;

    // Validate required fields
    if (!subject || !subject.trim()) {
      return NextResponse.json({ success: false, message: 'Subject is required' }, { status: 400 });
    }

    if (!content || !content.trim()) {
      return NextResponse.json({ success: false, message: 'Content is required' }, { status: 400 });
    }

    const supabase = getSupabaseClient();

    // If test mode, send only to the specified test email
    if (testMode) {
      if (!testEmail) {
        return NextResponse.json(
          { success: false, message: 'Test email is required in test mode' },
          { status: 400 }
        );
      }

      // Fetch the test subscriber to get their unsubscribe token
      const { data: testSubscriber, error: testError } = await supabase
        .from(SUBSCRIBERS_TABLE)
        .select('unsubscribe_token')
        .eq('email', testEmail.toLowerCase())
        .single();

      if (testError || !testSubscriber) {
        return NextResponse.json(
          {
            success: false,
            message: 'Test email not found in subscribers. Please use a subscribed email address.',
          },
          { status: 404 }
        );
      }

      // Send test email
      const result = await sendNewsletterEmail(
        testEmail,
        `[TEST] ${subject}`,
        content,
        testSubscriber.unsubscribe_token || ''
      );

      if (!result.success) {
        return NextResponse.json(
          {
            success: false,
            message: `Failed to send test email: ${result.error}`,
          },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Test email sent successfully',
        sent: 1,
        testMode: true,
      });
    }

    // Production mode: Get all confirmed and non-unsubscribed subscribers
    const { data: subscribers, error: fetchError } = await supabase
      .from(SUBSCRIBERS_TABLE)
      .select('email, unsubscribe_token')
      .eq('confirmed', true)
      .neq('unsubscribed', true);

    if (fetchError) {
      console.error('Error fetching subscribers:', fetchError);
      return NextResponse.json(
        { success: false, message: 'Error fetching subscribers' },
        { status: 500 }
      );
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No active subscribers found',
        },
        { status: 404 }
      );
    }

    // Send emails to all subscribers
    const results = await Promise.allSettled(
      subscribers.map(subscriber =>
        sendNewsletterEmail(subscriber.email, subject, content, subscriber.unsubscribe_token || '')
      )
    );

    // Count successful and failed sends
    const successful = results.filter(
      result => result.status === 'fulfilled' && result.value.success
    ).length;
    const failed = results.length - successful;

    // Log failures
    if (failed > 0) {
      console.warn(`Newsletter sending completed with ${failed} failures out of ${results.length}`);
      results.forEach((result, index) => {
        if (
          result.status === 'rejected' ||
          (result.status === 'fulfilled' && !result.value.success)
        ) {
          console.error(
            `Failed to send to ${subscribers[index].email}:`,
            result.status === 'rejected' ? result.reason : result.value.error
          );
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: `Newsletter sent to ${successful} of ${results.length} subscribers`,
      sent: successful,
      failed: failed,
      total: results.length,
    });
  } catch (error) {
    console.error('Newsletter sending error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
