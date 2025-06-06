'use client';

import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Page error:', error);
  }, [error]);

  return (
    <section className="py-20 min-h-[calc(100vh-80px)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-4 text-center"
      >
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-8 h-8 text-red-600 dark:text-red-400"
          >
            <path
              fillRule="evenodd"
              d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
          Something Went Wrong
        </h1>
        <div className="my-6 text-lg text-gray-600 dark:text-gray-300">
          <p className="mb-6">
            We&apos;re sorry, but we encountered an unexpected error while loading this page.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <Button onClick={() => reset()} variant="primary" size="lg" type="button">
              Try Again
            </Button>
            <Button href="/" variant="outline" size="lg">
              Back to Home
            </Button>
          </div>
        </div>

        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Need assistance? Visit{' '}
            <Link href="/#newsletter" className="text-go-blue hover:underline">
              our contact page
            </Link>{' '}
            or go back to the{' '}
            <Link href="/" className="text-go-blue hover:underline">
              homepage
            </Link>
            .
          </p>
        </div>
      </motion.div>
    </section>
  );
}
