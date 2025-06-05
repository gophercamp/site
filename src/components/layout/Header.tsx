"use client";

import Link from 'next/link';
import { trackSocialClick } from '@/lib/analytics';
import { getHeaderSocialLinks } from '@/lib/social';

export default function Header() {
  const socialLinks = getHeaderSocialLinks();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono font-bold text-go-blue text-xl md:text-2xl">
            Gophercamp<span className="text-go-blue-dark">2026</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <a 
                key={social.id}
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-gray-500 transition-colors p-1 ${social.hoverColor}`}
                aria-label={social.ariaLabel}
                onClick={() => trackSocialClick(social.trackingId)}
              >
                <IconComponent size={18} className="md:w-5 md:h-5" />
              </a>
            );
          })}
          <a 
            href="#newsletter" 
            className="inline-flex items-center px-3 py-1.5 md:px-4 md:py-2 bg-go-blue hover:bg-go-blue-dark text-white rounded-md transition-all duration-200 text-xs md:text-sm font-medium shadow-md hover:shadow-lg"
          >
            <span className="hidden sm:inline">Stay Informed</span>
            <span className="sm:hidden">News</span>
          </a>
        </div>
      </div>
    </header>
  );
}
