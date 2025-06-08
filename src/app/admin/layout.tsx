import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component for the admin section
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  return <main>{children}</main>;
}
