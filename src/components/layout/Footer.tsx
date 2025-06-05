"use client";

import Link from 'next/link';
import { FaTwitter, FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
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
              April 24, 2026 • Prague, Czech Republic
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
                <Link href="#" className="text-gray-600 hover:text-go-blue transition-colors">
                  Code of Conduct
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-go-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-go-black text-lg mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a 
                href="https://twitter.com/gophercamp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-go-blue transition-colors"
                aria-label="Follow us on Twitter"
              >
                <FaTwitter size={24} />
              </a>
              <a 
                href="https://github.com/gophercamp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-go-blue transition-colors"
                aria-label="Follow us on GitHub"
              >
                <FaGithub size={24} />
              </a>
              <a 
                href="https://linkedin.com/company/gophercamp" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-go-blue transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="https://facebook.com/GolangBrno" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-go-blue transition-colors"
                aria-label="Follow us on Facebook"
              >
                <FaFacebook size={24} />
              </a>
            </div>
            <p className="text-gray-600">
              Email: <a href="mailto:info@gophercamp.cz" className="text-go-blue hover:text-go-blue-dark">info@gophercamp.cz</a>
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
