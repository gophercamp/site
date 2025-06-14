'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import Button from '@/components/ui/Button';
import ThemeToggle from '@/components/ui/ThemeToggle';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FiLogOut } from 'react-icons/fi';

/**
 * Admin section navigation bar
 */
export default function AdminNavbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  const isLoggedIn = !!user;

  return (
    <nav className="bg-primary shadow-sm border-b border-primary w-full fixed top-0 z-10">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/admin" className="flex items-center gap-2">
                <span className="font-mono font-bold text-go-blue text-xl md:text-2xl">
                  Gophercamp<span className="text-go-blue-dark">Admin</span>
                </span>
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            {isLoggedIn && (
              <div className="ml-4 flex items-center md:ml-6">
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 hover:bg-secondary"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </Button>
              </div>
            )}
            {isLoggedIn && (
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-secondary hover:text-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-inset focus:ring-go-blue transition-colors"
                >
                  <span className="sr-only">Open main menu</span>
                  {isMenuOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
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
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu, toggle classes based on menu state */}
      {isLoggedIn && (
        <div
          className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden absolute w-full bg-primary shadow-md z-20`}
        >
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/admin"
              className="block px-3 py-2 text-base font-medium text-secondary hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/speakers"
              className="block px-3 py-2 text-base font-medium text-secondary hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Speakers
            </Link>
            <Link
              href="/admin/sessions"
              className="block px-3 py-2 text-base font-medium text-secondary hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sessions
            </Link>
            <Link
              href="/admin/subscribers"
              className="block px-3 py-2 text-base font-medium text-secondary hover:bg-secondary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Subscribers
            </Link>
            <div className="pt-4 pb-3 border-t border-primary">
              <div className="px-3">
                <p className="text-sm font-medium text-secondary">{user.email}</p>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 w-full justify-start hover:bg-secondary"
                >
                  <FiLogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
