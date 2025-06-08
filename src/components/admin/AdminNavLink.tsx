'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface AdminNavLinkProps {
  href: string;
  label: string;
  // We'll pass the rendered icon as a child instead
  children: React.ReactNode;
}

/**
 * Navigation link for the admin sidebar with active state highlighting
 */
export default function AdminNavLink({ href, children, label }: AdminNavLinkProps) {
  const pathname = usePathname();

  const isActive = () => {
    // Exact match for dashboard, prefix match for other sections
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const active = isActive();
  const linkClasses = `group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
    active
      ? 'bg-secondary text-primary font-semibold'
      : 'text-secondary hover:bg-secondary hover:text-primary'
  }`;

  return (
    <Link href={href} className={linkClasses}>
      {/* Children should be the icon with proper styling */}
      {children}
      {label}
    </Link>
  );
}
