import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { AuthProvider } from '@/components/providers/AuthProvider';
import { getSessionUser } from '@/lib/session';
import React from 'react';

interface PrivateLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component for the admin section.
 * Reads the session server-side and passes the user email into the AuthProvider.
 */
export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const userEmail = await getSessionUser();

  return (
    <AuthProvider userEmail={userEmail}>
      {/* Top navigation */}
      <AdminNavbar />

      {/* Sidebar & Main content */}
      <div className="flex flex-col md:flex-row pt-16">
        {/* Sidebar for desktop */}
        <AdminSidebar />

        {/* Main content */}
        <main className="flex-1 py-6 px-4 sm:px-6 md:px-8 overflow-auto">{children}</main>
      </div>
    </AuthProvider>
  );
}
