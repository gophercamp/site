"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';
import Button from '@/components/ui/Button';
import BackgroundSlideshow from '@/components/ui/BackgroundSlideshow';
import { trackSocialClick } from '@/lib/analytics';
import { getPrimarySocialLink } from '@/lib/social';

export default function HeroSection() {
  const primarySocial = getPrimarySocialLink();
  
  // Gophercamp 2025 photos for background slideshow
  const backgroundImages = [
    '/images/gallery/gophercamp-2025-1.jpeg',
    '/images/gallery/gophercamp-2025-2.jpeg',
    '/images/gallery/gophercamp-2025-3.jpeg',
    '/images/gallery/gophercamp-2025-4.jpeg',
    '/images/gallery/gophercamp-2025-5.jpeg',
  ];

  // Slideshow state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? backgroundImages.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    setIsPaused(true); // Pause when manually navigating
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % backgroundImages.length;
    setCurrentIndex(newIndex);
    setIsPaused(true); // Pause when manually navigating
  };

  const handleIndexChange = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background slideshow with Gophercamp 2025 photos */}
      <BackgroundSlideshow 
        images={backgroundImages}
        interval={10000}
        className="z-0"
        currentIndex={currentIndex}
        isPaused={isPaused}
        onIndexChange={handleIndexChange}
      />
      
      {/* Slideshow controls */}
      {backgroundImages.length > 1 && (
        <div className="absolute inset-0 z-[50] pointer-events-none">
          {/* Previous/Next arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer pointer-events-auto"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer pointer-events-auto"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {backgroundImages.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  setIsPaused(true);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer pointer-events-auto ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Grid pattern overlay for brand consistency */}
      <div className="absolute inset-0 z-[5] opacity-10">
        <svg 
          className="w-full h-full" 
          width="100%" 
          height="100%" 
          viewBox="0 0 100 100" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#00ADD8" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-20 z-[10] relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Gophercamp <span className="text-go-blue">2026</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-white/90 mb-8 drop-shadow-md">
              The Go Conference in Czech Republic
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-10">
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-go-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-go-black">April 24, 2026</span>
              </div>
              
              <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg border border-white/20 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-go-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-medium text-go-black">Brno, Czech Republic</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                href="#newsletter"
                variant="primary"
                size="lg"
              >
                Stay Informed
              </Button>
              
              <Button 
                href="#about"
                variant="secondary"
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative w-full max-w-xs aspect-square">
              {/* Showcase badge for past event */}
              <a 
                href={primarySocial.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center shadow-xl hover:bg-white/25 transition-all duration-300 hover:scale-105 group"
                onClick={() => trackSocialClick(primarySocial.trackingId)}
              >
                <div className="text-center px-4">
                  <div className="text-white text-base font-bold mb-2 drop-shadow-md">Memories from</div>
                  <div className="text-go-blue text-xl font-bold drop-shadow-md mb-2">Gophercamp 2025</div>
                  <div className="text-white/80 text-xs mt-1 drop-shadow-sm">Building the future together</div>
                  
                  {/* YouTube icon indicator */}
                  <div className="mt-3 flex items-center justify-center">
                    <svg 
                      className="w-6 h-6 text-red-500 drop-shadow-md group-hover:scale-110 transition-transform duration-300" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span className="ml-2 text-white/90 text-xs font-medium drop-shadow-sm">Watch videos</span>
                  </div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
