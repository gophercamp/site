import React from 'react';
import Header from './Header';
import Footer from './Footer';
import AlertBanner from './AlertBanner';

/**
 * DefaultLayout component for consistent page layout with header and footer
 * @param children - page content
 */
export interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <AlertBanner />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
