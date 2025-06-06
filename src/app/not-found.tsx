'use client';

import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="py-20 min-h-[calc(100vh-80px)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto px-4 text-center"
      >
        <h1 className="text-6xl md:text-8xl font-bold text-go-blue mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Page Not Found</h2>

        <div className="my-8 text-lg text-gray-600 dark:text-gray-300">
          <p className="mb-6">
            Oops! Looks like this gopher got lost. The page you&apos;re looking for doesn&apos;t
            exist or has been moved.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <Button href="/" variant="primary" size="lg">
              Back to Home
            </Button>
            <Button href="/#newsletter" variant="outline" size="lg">
              Subscribe to Updates
            </Button>
          </div>
        </div>

        <div className="mt-12 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Looking for something specific? Visit our{' '}
            <Link href="/" className="text-go-blue hover:underline">
              homepage
            </Link>{' '}
            to find what you need.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
