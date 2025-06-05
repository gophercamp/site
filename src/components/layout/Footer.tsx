"use client";

import Link from 'next/link';
import { trackSocialClick, trackContactClick } from '@/lib/analytics';
import { getFooterSocialLinks, contactInfo } from '@/lib/social';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = getFooterSocialLinks();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-go-black text-lg mb-4">Gophercamp 2026</h3>
            <p className="text-gray-600 mb-4">
              The premier Go programming language conference in the Czech Republic.
            </p>
            <p className="text-gray-600">
              April 24, 2026 • {contactInfo.location}
            </p>
          </div>
          
          <div>
            <h3 className="font-bold text-go-black text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-gray-600 hover:text-go-blue transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/code-of-conduct" className="text-gray-600 hover:text-go-blue transition-colors">
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-go-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-go-black text-lg mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a 
                    key={social.id}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`text-gray-500 transition-colors ${social.hoverColor}`}
                    aria-label={social.ariaLabel}
                    onClick={() => trackSocialClick(social.trackingId)}
                  >
                    <IconComponent size={24} />
                  </a>
                );
              })}
            </div>
            <p className="text-gray-600">
              Email: <a 
                href={`mailto:${contactInfo.email}`} 
                className="text-go-blue hover:text-go-blue-dark"
                onClick={() => trackContactClick('email')}
              >
                {contactInfo.email}
              </a>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {currentYear} Gophercamp. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
