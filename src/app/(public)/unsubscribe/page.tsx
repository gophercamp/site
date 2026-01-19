'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Auto-unsubscribe if token is present
  useEffect(() => {
    if (!token) return;

    const handleTokenUnsubscribe = async () => {
      setStatus('loading');
      try {
        const response = await fetch(`/api/newsletter/unsubscribe?token=${token}`);
        const data = await response.json();

        if (data.success) {
          setStatus('success');
          setMessage(data.message);
        } else {
          setStatus('error');
          setMessage(data.message || 'Failed to unsubscribe. Please try again.');
        }
      } catch {
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again later.');
      }
    };

    handleTokenUnsubscribe();
  }, [token]);

  const handleEmailUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/unsubscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage(data.message);
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.message || 'Failed to unsubscribe. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-go-blue-darker py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-primary rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-go-blue mb-6">
            Unsubscribe from Newsletter
          </h1>

          {status === 'loading' && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-go-blue"></div>
              <p className="mt-4 text-secondary">Processing your request...</p>
            </div>
          )}

          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 text-green-600 mt-0.5 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h2 className="text-lg font-semibold text-green-900 mb-2">Success!</h2>
                  <p className="text-green-800">{message}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-green-200">
                <p className="text-sm text-green-800 mb-4">
                  We&apos;re sorry to see you go! If you change your mind, you can always subscribe
                  again on our homepage.
                </p>
                <Link
                  href="/"
                  className="inline-block px-6 py-2 bg-go-blue text-white font-medium rounded-lg hover:bg-go-blue-dark transition-colors"
                >
                  Return to Homepage
                </Link>
              </div>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-start">
                <svg
                  className="h-6 w-6 text-red-600 mt-0.5 mr-3 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <h2 className="text-lg font-semibold text-red-900 mb-2">Error</h2>
                  <p className="text-red-800">{message}</p>
                </div>
              </div>
            </div>
          )}

          {!token && status !== 'success' && (
            <>
              <p className="text-secondary mb-6">
                We&apos;re sorry to see you go! Enter your email address below to unsubscribe from
                the Gophercamp 2026 newsletter.
              </p>

              <form onSubmit={handleEmailUnsubscribe} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-primary bg-primary text-primary rounded-lg focus:ring-2 focus:ring-go-blue focus:border-transparent"
                    placeholder="your.email@example.com"
                    disabled={status === 'loading'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full px-6 py-3 bg-go-blue text-white font-medium rounded-lg hover:bg-go-blue-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? 'Processing...' : 'Unsubscribe'}
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-primary">
                <h3 className="text-lg font-semibold text-primary mb-3">Changed your mind?</h3>
                <p className="text-secondary mb-4">
                  If you still want to receive updates about Gophercamp 2026, you can close this
                  page without submitting the form.
                </p>
                <Link
                  href="/"
                  className="inline-block text-go-blue hover:text-go-blue-dark font-medium"
                >
                  ← Back to Homepage
                </Link>
              </div>
            </>
          )}

          {token && status === 'idle' && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-go-blue"></div>
              <p className="mt-4 text-secondary">Unsubscribing you from our newsletter...</p>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-secondary">
          <p>
            Need help?{' '}
            <a href="mailto:info@gophercamp.cz" className="text-go-blue hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
