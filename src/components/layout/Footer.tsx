'use client';

import Link from 'next/link';
import { trackSocialClick, trackContactClick } from '@/lib/analytics';
import { getFooterSocialLinks, contactInfo } from '@/lib/social';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = getFooterSocialLinks();

  return (
    <footer className="bg-secondary border-t border-primary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Column */}
          <div className="sm:col-span-2">
            <h3 className="font-bold text-primary text-lg mb-4">Gophercamp 2026</h3>
            <p className="text-secondary mb-2">
              The Go programming language conference in the Czech Republic.
            </p>
            <p className="text-secondary mb-2">April 23 - 24, 2026 • {contactInfo.location}</p>
            <Link
              href="/location"
              className="text-secondary hover:text-go-blue transition-colors text-sm"
            >
              Clubco Brno, Vlněna 5, 602 00 Brno-střed, Czech Republic
            </Link>
          </div>

          {/* Conference Links Column */}
          <div>
            <h3 className="font-bold text-primary text-lg mb-4">Conference</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-secondary hover:text-go-blue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/speakers"
                  className="text-secondary hover:text-go-blue transition-colors"
                >
                  Speakers
                </Link>
              </li>
              <li>
                <Link
                  href="/sessions"
                  className="text-secondary hover:text-go-blue transition-colors"
                >
                  Sessions
                </Link>
              </li>
              <li>
                <Link
                  href="/location"
                  className="text-secondary hover:text-go-blue transition-colors"
                >
                  Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links Column */}
          <div>
            <h3 className="font-bold text-primary text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/code-of-conduct"
                  className="text-secondary hover:text-go-blue transition-colors"
                >
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-secondary hover:text-go-blue transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="font-bold text-primary text-lg mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map(social => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-secondary transition-colors ${social.hoverColor}`}
                    aria-label={social.ariaLabel}
                    onClick={() => trackSocialClick(social.trackingId)}
                  >
                    <IconComponent size={24} />
                  </a>
                );
              })}
            </div>
            <p className="text-secondary">
              Email:{' '}
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-go-blue hover:text-go-blue-dark"
                onClick={() => trackContactClick('email')}
              >
                {contactInfo.email}
              </a>
            </p>
          </div>
        </div>

        <div className="border-t border-primary mt-8 pt-8 text-center text-secondary text-sm">
          <p>© {currentYear} Gophercamp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
