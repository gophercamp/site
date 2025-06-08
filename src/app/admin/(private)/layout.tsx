'use client';

import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { AuthProvider } from '@/components/providers/AuthProvider';
import React from 'react';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component for the admin section
 */
export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <AuthProvider>
      {/* Top navigation */}
      <AdminNavbar />

      {/* Sidebar & Main content */}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar for desktop */}
        <AdminSidebar />

        {/* Main content */}
        <main className="flex-1 py-6 px-4 sm:px-6 md:px-8 overflow-auto">{children}</main>
      </div>
    </AuthProvider>
  );
}
