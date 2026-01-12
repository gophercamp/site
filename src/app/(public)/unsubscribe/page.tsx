'use client';

import Button from '@/components/ui/Button';
import { validateEmail } from '@/lib/validation';
import Link from 'next/link';
import { useState } from 'react';

export default function UnsubscribePage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, requestUnsubscribe: true }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        setEmail('');
      } else {
        setError(result.message || 'Failed to process your request. Please try again.');
      }
    } catch {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-primary rounded-lg p-8 shadow-lg text-center">
          <div className="mb-6">
            <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary mb-4">Unsubscribe Successful</h1>
          <p className="text-secondary mb-6">
            You have been successfully unsubscribed from the Gophercamp 2026 newsletter.
          </p>
          <p className="text-secondary text-sm">
            We&apos;re sorry to see you go! If you change your mind, you can always subscribe again
            on our website.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-primary rounded-lg p-8 shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-primary mb-4">Unsubscribe from Newsletter</h1>
          <p className="text-secondary">
            Enter your email address to unsubscribe from the Gophercamp 2026 newsletter.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-3 py-2 border border-primary rounded-md bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-go-blue focus:border-transparent"
              disabled={isSubmitting}
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-md text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Processing...' : 'Unsubscribe'}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-secondary text-sm">
            Changed your mind?{' '}
            <Link href="/" className="text-go-blue hover:underline">
              Return to homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
