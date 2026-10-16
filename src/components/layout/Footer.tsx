'use client';

import Link from 'next/link';
import { trackSocialClick, trackContactClick } from '@/lib/analytics';
import { getFooterSocialLinks, contactInfo } from '@/lib/social';
import { siteConfig } from '@/lib/config';

export default function Footer() {
  const socialLinks = getFooterSocialLinks();

  return (
    <footer className="bg-secondary border-t border-primary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* About Column */}
          <div className="sm:col-span-2">
            <h3 className="font-bold text-primary text-lg mb-4">Gophercamp 2027</h3>
            <p className="text-secondary mb-2">
              The Go programming language conference in the Czech Republic.
            </p>
            <p className="text-secondary mb-2">April 22 - 23, 2027 • {contactInfo.location}</p>
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
                <Link href="/about" className="text-secondary hover:text-go-blue transition-colors">
                  About
                </Link>
              </li>
              {siteConfig.programReady && (
                <>
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
                      href="/program"
                      className="text-secondary hover:text-go-blue transition-colors"
                    >
                      Program
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  href="/partnership"
                  className="text-secondary hover:text-go-blue transition-colors"
                >
                  Partnership
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

        <div className="border-t border-primary mt-8 pt-8 grid grid-cols-[auto_1fr] items-center gap-4 text-secondary text-sm">
          <nav aria-label="Previous editions" className="flex items-center gap-3">
            <a
              href="https://2026.gophercamp.cz"
              aria-label="Gophercamp 2026"
              className="hover:text-go-blue transition-colors"
            >
              2026
            </a>
            <a
              href="https://2025.gophercamp.cz"
              aria-label="Gophercamp 2025"
              className="hover:text-go-blue transition-colors"
            >
              2025
            </a>
          </nav>
          <p className="text-right">© 2027 Gophercamp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
