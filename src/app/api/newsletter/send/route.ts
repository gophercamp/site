import { sendNewsletterEmail, sendNewsletterBatch } from '@/lib/email';
import { getActiveSubscribers, getSubscriber } from '@/lib/newsletter-store';
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

    // If test mode, send only to the specified test email
    if (testMode) {
      if (!testEmail) {
        return NextResponse.json(
          { success: false, message: 'Test email is required in test mode' },
          { status: 400 }
        );
      }

      // Fetch the test subscriber to get their unsubscribe token
      const testSubscriber = await getSubscriber(testEmail);

      if (!testSubscriber) {
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
    const subscribers = await getActiveSubscribers();

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No active subscribers found',
        },
        { status: 404 }
      );
    }

    // Send emails to all subscribers using batch API
    const batchSubscribers = subscribers.map(subscriber => ({
      email: subscriber.email,
      unsubscribeToken: subscriber.unsubscribe_token || '',
    }));

    const result = await sendNewsletterBatch(batchSubscribers, subject, content);

    // Log failures
    if (result.failed > 0) {
      console.warn(
        `Newsletter sending completed with ${result.failed} failures out of ${result.total}`
      );
      if (result.errors && result.errors.length > 0) {
        result.errors.forEach(error => {
          console.error(`Failed to send to ${error.email}:`, error.error);
        });
      }
    }

    return NextResponse.json({
      success: result.success,
      message: `Newsletter sent to ${result.sent} of ${result.total} subscribers`,
      sent: result.sent,
      failed: result.failed,
      total: result.total,
    });
  } catch (error) {
    console.error('Newsletter sending error:', error);
    return NextResponse.json(
      { success: false, message: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
