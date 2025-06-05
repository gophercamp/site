"use client";

import Link from 'next/link';
import { trackSocialClick } from '@/lib/analytics';
import { getHeaderSocialLinks } from '@/lib/social';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Header() {
  const socialLinks = getHeaderSocialLinks();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-90 backdrop-blur-sm border-b border-primary">
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
                className={`text-secondary transition-colors p-1 ${social.hoverColor}`}
                aria-label={social.ariaLabel}
                onClick={() => trackSocialClick(social.trackingId)}
              >
                <IconComponent size={18} className="md:w-5 md:h-5" />
              </a>
            );
          })}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
