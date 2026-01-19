'use client';

import Button from '@/components/ui/Button';
import { useState } from 'react';
import { FaPaperPlane, FaEnvelope, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

interface SendResult {
  success: boolean;
  message: string;
  sent?: number;
  failed?: number;
  total?: number;
  testMode?: boolean;
}

export default function NewsletterPage() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [result, setResult] = useState<SendResult | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const validateForm = (): string | null => {
    if (!subject.trim()) {
      return 'Please enter a subject line';
    }
    if (subject.length < 5) {
      return 'Subject line must be at least 5 characters';
    }
    if (subject.length > 255) {
      return 'Subject line must be at most 255 characters';
    }
    if (!content.trim()) {
      return 'Please enter newsletter content';
    }
    if (content.length < 20) {
      return 'Content must be at least 20 characters';
    }
    return null;
  };

  const handleSendTest = async () => {
    const error = validateForm();
    if (error) {
      setResult({ success: false, message: error });
      return;
    }

    if (!testEmail.trim()) {
      setResult({ success: false, message: 'Please enter a test email address' });
      return;
    }

    setIsSending(true);
    setResult(null);

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          content,
          testMode: true,
          testEmail,
        }),
      });

      const data = await response.json();
      setResult(data);
    } catch {
      setResult({
        success: false,
        message: 'Failed to send test email. Please try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSendNewsletter = async () => {
    const error = validateForm();
    if (error) {
      setResult({ success: false, message: error });
      return;
    }

    setIsSending(true);
    setResult(null);
    setShowConfirmation(false);

    try {
      const response = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject,
          content,
          testMode: false,
        }),
      });

      const data = await response.json();
      setResult(data);

      // Clear form on success
      if (data.success) {
        setSubject('');
        setContent('');
      }
    } catch {
      setResult({
        success: false,
        message: 'Failed to send newsletter. Please try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleSendClick = () => {
    const error = validateForm();
    if (error) {
      setResult({ success: false, message: error });
      return;
    }
    setShowConfirmation(true);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Send Newsletter</h1>
        <p className="text-secondary">
          Send updates and announcements to all confirmed newsletter subscribers.
        </p>
      </div>

      {/* Result Messages */}
      {result && (
        <div
          className={`mb-6 p-4 rounded-lg border ${
            result.success
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-start">
            {result.success ? (
              <FaCheckCircle className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
            ) : (
              <FaExclamationCircle className="h-5 w-5 mt-0.5 mr-3 flex-shrink-0" />
            )}
            <div>
              <p className="font-medium">{result.message}</p>
              {result.success && result.sent !== undefined && (
                <p className="text-sm mt-1">
                  {result.testMode ? (
                    'Test email sent successfully'
                  ) : (
                    <>
                      Successfully sent: {result.sent}
                      {result.failed !== undefined && result.failed > 0 && (
                        <> • Failed: {result.failed}</>
                      )}
                    </>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-primary rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-primary mb-4">Confirm Newsletter Send</h3>
            <p className="text-secondary mb-6">
              Are you sure you want to send this newsletter to all active subscribers? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <Button
                onClick={handleSendNewsletter}
                disabled={isSending}
                className="flex-1"
                variant="primary"
              >
                {isSending ? 'Sending...' : 'Yes, Send Newsletter'}
              </Button>
              <Button
                onClick={() => setShowConfirmation(false)}
                disabled={isSending}
                className="flex-1"
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Newsletter Form */}
      <div className="bg-primary rounded-lg shadow-sm border border-primary p-6">
        <div className="space-y-6">
          {/* Subject Line */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
              Subject Line <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Enter newsletter subject..."
              className="w-full px-4 py-2 border border-primary bg-primary text-primary rounded-lg focus:ring-2 focus:ring-go-blue focus:border-transparent"
              disabled={isSending}
            />
            <p className="text-xs text-secondary mt-1">
              This will be the email subject line subscribers see
            </p>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-primary mb-2">
              Newsletter Content <span className="text-red-500">*</span>
            </label>
            <textarea
              id="content"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Enter your newsletter content here...&#10;&#10;Use double line breaks to separate paragraphs."
              rows={12}
              className="w-full px-4 py-2 border border-primary bg-primary text-primary rounded-lg focus:ring-2 focus:ring-go-blue focus:border-transparent resize-vertical"
              disabled={isSending}
            />
            <p className="text-xs text-secondary mt-1">
              Use double line breaks (press Enter twice) to create new paragraphs
            </p>
          </div>

          {/* Preview Section */}
          {(subject || content) && (
            <div className="border-t border-primary pt-6">
              <h3 className="text-sm font-medium text-primary mb-3">Preview</h3>
              <div className="bg-secondary rounded-lg p-4 border border-primary">
                {subject && <h4 className="text-lg font-semibold text-primary mb-3">{subject}</h4>}
                {content && (
                  <div className="space-y-3">
                    {content
                      .split('\n\n')
                      .filter(p => p.trim())
                      .map((paragraph, index) => (
                        <p key={index} className="text-secondary text-sm leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Test Email Section */}
          <div className="border-t border-primary pt-6">
            <h3 className="text-sm font-medium text-primary mb-3">Test Email</h3>
            <p className="text-xs text-secondary mb-3">
              Send a test email to verify formatting before sending to all subscribers
            </p>
            <div className="flex gap-3">
              <input
                type="email"
                value={testEmail}
                onChange={e => setTestEmail(e.target.value)}
                placeholder="test@example.com"
                className="flex-1 px-4 py-2 border border-primary bg-primary text-primary rounded-lg focus:ring-2 focus:ring-go-blue focus:border-transparent"
                disabled={isSending}
              />
              <Button
                onClick={handleSendTest}
                disabled={isSending || !testEmail.trim()}
                variant="outline"
                className="flex items-center gap-2"
              >
                <FaEnvelope className="h-4 w-4" />
                Send Test
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-primary pt-6 flex gap-3">
            <Button
              onClick={handleSendClick}
              disabled={isSending}
              variant="primary"
              className="flex-1 flex items-center justify-center gap-2"
            >
              <FaPaperPlane className="h-4 w-4" />
              {isSending ? 'Sending Newsletter...' : 'Send Newsletter to All Subscribers'}
            </Button>
          </div>

          {/* Warning Message */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start">
              <FaExclamationCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">Important Notes:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Newsletters will only be sent to confirmed and active subscribers</li>
                  <li>Unsubscribed users will not receive the newsletter</li>
                  <li>Always send a test email first to verify formatting</li>
                  <li>This action cannot be undone once sent</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
