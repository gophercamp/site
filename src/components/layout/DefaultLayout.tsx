import React from 'react';
import Header from './Header';
import Footer from './Footer';

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
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}
