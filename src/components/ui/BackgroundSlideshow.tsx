"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BackgroundSlideshowProps {
  images: string[];
  interval?: number;
  className?: string;
  currentIndex?: number;
  isPaused?: boolean;
  onIndexChange?: (index: number) => void;
}

/**
 * Background slideshow component that cycles through images with smooth transitions
 * @param images - Array of image paths to cycle through
 * @param interval - Time between slides in milliseconds (default: 5000)
 * @param className - Additional CSS classes
 * @param currentIndex - External control of current slide index
 * @param isPaused - External control of pause state
 * @param onIndexChange - Callback when slide index changes
 */
export default function BackgroundSlideshow({ 
  images, 
  interval = 5000, 
  className = "",
  currentIndex: externalCurrentIndex,
  isPaused: externalIsPaused,
  onIndexChange
}: BackgroundSlideshowProps) {
  const [internalCurrentIndex, setInternalCurrentIndex] = useState(0);
  const [internalIsPaused] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const currentIndex = externalCurrentIndex !== undefined ? externalCurrentIndex : internalCurrentIndex;
  const isPaused = externalIsPaused !== undefined ? externalIsPaused : internalIsPaused;

  useEffect(() => {
    if (images.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      const newIndex = (currentIndex + 1) % images.length;
      if (externalCurrentIndex === undefined) {
        setInternalCurrentIndex(newIndex);
      }
      onIndexChange?.(newIndex);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, isPaused, currentIndex, externalCurrentIndex, onIndexChange]);

  if (images.length === 0) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${images[currentIndex]})`,
            }}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}