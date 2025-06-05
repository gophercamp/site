"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaTwitter } from 'react-icons/fa';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono font-bold text-go-blue text-xl md:text-2xl">
            Gophercamp<span className="text-go-blue-dark">2026</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <a 
            href="https://twitter.com/gophercamp" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-go-blue transition-colors"
            aria-label="Follow us on Twitter"
          >
            <FaTwitter size={20} />
          </a>
          <a 
            href="https://github.com/gophercamp" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-go-blue transition-colors"
            aria-label="Follow us on GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a 
            href="#newsletter" 
            className="hidden md:inline-flex items-center px-4 py-2 bg-go-blue hover:bg-go-blue-dark text-white rounded-md transition-colors text-sm font-medium"
          >
            Stay Informed
          </a>
        </div>
      </div>
    </header>
  );
}
