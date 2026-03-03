'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { trackSocialClick } from '@/lib/analytics';
import { getHeaderSocialLinks } from '@/lib/social';
import ThemeToggle from '@/components/ui/ThemeToggle';

const navLinks = [
  { href: '/speakers', label: 'Speakers' },
  { href: '/sessions', label: 'Sessions' },
  { href: '/location', label: 'Location' },
  { href: '/sponsors', label: 'Sponsors' },
];

export default function Header() {
  const socialLinks = getHeaderSocialLinks();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary-90 backdrop-blur-sm border-b border-primary">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono font-bold text-go-blue text-xl md:text-2xl">
            Gophercamp<span className="text-go-blue-dark">2026</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-go-blue ${
                pathname === link.href ? 'text-go-blue' : 'text-secondary'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {socialLinks.map(social => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`hidden sm:block text-secondary transition-colors p-1 ${social.hoverColor}`}
                aria-label={social.ariaLabel}
                onClick={() => trackSocialClick(social.trackingId)}
              >
                <IconComponent size={18} className="md:w-5 md:h-5" />
              </a>
            );
          })}
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            className="md:hidden p-1 text-secondary hover:text-go-blue transition-colors"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-primary bg-primary-90 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-secondary hover:text-go-blue ${
                  pathname === link.href ? 'text-go-blue bg-secondary' : 'text-secondary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
