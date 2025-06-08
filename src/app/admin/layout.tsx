'use client';

import AdminLoadingSpinner from '@/components/admin/AdminLoadingSpinner';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { AuthProvider, useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component for the admin section
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user, signOut, isLoading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  if (isLoading) {
    return <AdminLoadingSpinner />;
  }

  const isLoggedIn = !!user;

  return (
    <AuthProvider>
      <div className="min-h-screen bg-primary">
        {/* Top navigation */}
        <AdminNavbar handleSignOutAction={handleSignOut} />

        {/* Sidebar & Main content */}
        <div className="flex flex-col md:flex-row">
          {/* Sidebar for desktop */}
          {isLoggedIn && <AdminSidebar />}

          {/* Main content */}
          <main className="flex-1 py-6 px-4 sm:px-6 md:px-8 overflow-auto">{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
}
