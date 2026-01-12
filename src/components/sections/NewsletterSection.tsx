'use client';

import Button from '@/components/ui/Button';
import { trackContactClick, trackNewsletterSignup, trackSocialClick } from '@/lib/analytics';
import { contactInfo, getSocialLink } from '@/lib/social';
import { validateEmail } from '@/lib/validation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function NewsletterSection() {
  const xLink = getSocialLink('x');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showResendOption, setShowResendOption] = useState(false);

  // Check for confirmation query parameters on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);

      if (params.get('subscriptionConfirmed') === 'true') {
        setSuccessMessage('Thank you for confirming your subscription to Gophercamp 2026 updates!');
        setIsSubmitted(true);
      } else if (params.get('subscriptionError') === 'true') {
        setError(
          'There was a problem confirming your subscription. Please try again or contact us.'
        );
      } else if (params.get('subscriptionExpired') === 'true') {
        setError(
          'Your confirmation link has expired. Please subscribe again to receive a new link.'
        );
      } else if (params.get('unsubscribed') === 'true') {
        setSuccessMessage('You have been successfully unsubscribed from our newsletter.');
        setIsSubmitted(true);
      } else if (params.get('unsubscribeError') === 'true') {
        setError(
          'There was a problem processing your unsubscribe request. Please try again or contact us.'
        );
      }

      // Clear the URL parameters without refreshing
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const subscribeToNewsletter = async (
    email: string
  ): Promise<{
    success: boolean;
    message: string;
    alreadySubscribed?: boolean;
  }> => {
    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      // Return API response data
      return {
        success: result.success,
        message: result.message,
        alreadySubscribed: result.alreadySubscribed,
      };
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      return {
        success: false,
        message: 'Failed to subscribe. Please try again later.',
      };
    }
  };

  const resendConfirmation = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setShowResendOption(false);

    try {
      const response = await fetch('/api/newsletter/resend-confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setSuccessMessage(result.message);
        setEmail('');
      } else {
        setError(result.message || 'Failed to resend confirmation. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email');
      return;
    }

    // Form validation using our utility function
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Use our subscription function
      const result = await subscribeToNewsletter(email);

      if (result.success) {
        setIsSubmitted(true);
        setSuccessMessage(result.message);

        // Track successful newsletter signup
        trackNewsletterSignup(email);

        setEmail('');

        // Reset success message after some time
        setTimeout(() => {
          setIsSubmitted(false);
          setSuccessMessage('');
        }, 5000);
      } else if (result.alreadySubscribed) {
        // If they're already subscribed but not confirmed, show resend option
        setShowResendOption(true);
        setError(`It looks like you've already subscribed but haven't confirmed your email yet.`);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="newsletter" className="py-20 bg-go-blue-darker">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-primary rounded-lg p-8 md:p-12 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Stay Informed</h2>
              <p className="text-secondary">
                Sign up for updates about Gophercamp 2026 including speaker announcements, ticket
                sales, and more.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 rounded-md border border-primary bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-go-blue focus:border-transparent"
                  disabled={isSubmitting || isSubmitted}
                />

                <div className="mt-4 md:absolute md:right-1 md:top-1 md:mt-0">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting || isSubmitted}
                    className="w-full md:w-auto"
                  >
                    {isSubmitting ? 'Submitting...' : isSubmitted ? 'Subscribed!' : 'Subscribe'}
                  </Button>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

              {showResendOption && (
                <div className="mt-3">
                  <button
                    type="button"
                    onClick={resendConfirmation}
                    className="text-go-blue hover:underline text-sm"
                    disabled={isSubmitting}
                  >
                    Click here to resend confirmation email
                  </button>
                </div>
              )}

              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-500 text-sm mt-2"
                >
                  {successMessage ||
                    "Thank you for subscribing! We'll keep you updated about the event."}
                </motion.p>
              )}

              <p className="text-secondary text-xs mt-4 text-center">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <h3 className="font-bold text-lg mb-2 text-primary">Contact Us</h3>
                <p className="text-secondary">
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-go-blue hover:text-go-blue-dark"
                    onClick={() => trackContactClick('email')}
                  >
                    {contactInfo.email}
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-primary">Follow Us</h3>
                <p className="text-secondary">
                  Stay connected on
                  <a
                    href={xLink?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-go-blue hover:text-go-blue-dark ml-1"
                    onClick={() => trackSocialClick(xLink?.trackingId || 'x')}
                  >
                    X
                  </a>
                </p>
              </div>

              <div>
                <h3 className="font-bold text-lg mb-2 text-primary">Location</h3>
                <p className="text-secondary">{contactInfo.location}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
