'use client';

import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <section className="py-20 min-h-[calc(100vh-80px)] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl mx-auto px-4 text-center"
      >
        <div className="flex flex-col items-center justify-center">
          {/* Loading spinner with Go branding color */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="w-16 h-16 border-4 border-go-blue/30 border-t-go-blue rounded-full mb-8"
          />

          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Loading</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Getting things ready for you...
          </p>
        </div>
      </motion.div>
    </section>
  );
}
