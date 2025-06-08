'use client';

import { AuthProvider } from '@/components/providers/AuthProvider';
import React from 'react';

interface LoginLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout component for the admin section
 */
export default function LoginLayout({ children }: LoginLayoutProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
