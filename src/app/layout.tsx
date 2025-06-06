import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import Analytics from '@/components/Analytics';
import PageTracker from '@/components/PageTracker';
import './globals.css';
import DefaultLayout from '@/components/layout/DefaultLayout';
import ThemeProvider from '@/components/providers/ThemeProvider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: 'Gophercamp 2026 | The Go Conference in Czech Republic',
  metadataBase: new URL('https://gophercamp.cz'),
  description:
    'Join us for Gophercamp 2026, the Go programming language conference in Czech Republic on April 24, 2026.',
  keywords: ['Go', 'Golang', 'Conference', 'Gophercamp', 'Czech Republic', 'Prague', 'Programming'],
  openGraph: {
    title: 'Gophercamp 2026 | The Go Conference in Czech Republic',
    description:
      'Join us for Gophercamp 2026, the Go programming language conference in Czech Republic on April 24, 2026.',
    url: 'https://gophercamp.cz',
    siteName: 'Gophercamp 2026',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Gophercamp 2026',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gophercamp 2026 | The Go Conference in Czech Republic',
    description:
      'Join us for Gophercamp 2026, the Go programming language conference in Czech Republic on April 24, 2026.',
    images: ['/images/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${robotoMono.variable} font-sans antialiased bg-primary text-primary`}
      >
        <ThemeProvider>
          <Analytics />
          <PageTracker />
          <DefaultLayout>{children}</DefaultLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
