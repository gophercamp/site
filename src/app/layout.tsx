import ThemeProvider from '@/components/providers/ThemeProvider';
import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'latin-ext'],
});

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin', 'latin-ext'],
});

export const metadata: Metadata = {
  title: 'Gophercamp 2027 | The Go Conference in Czech Republic',
  metadataBase: new URL('https://gophercamp.cz'),
  description:
    'Join us for Gophercamp 2027, the Go programming language conference in Brno, Czech Republic on April 22–23, 2027.',
  keywords: ['Go', 'Golang', 'Conference', 'Gophercamp', 'Czech Republic', 'Brno', 'Programming'],
  openGraph: {
    title: 'Gophercamp 2027 | The Go Conference in Czech Republic',
    description:
      'Join us for Gophercamp 2027, the Go programming language conference in Brno, Czech Republic on April 22–23, 2027.',
    url: 'https://gophercamp.cz',
    siteName: 'Gophercamp 2027',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1920,
        height: 710,
        alt: 'Gophercamp 2027',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gophercamp 2027 | The Go Conference in Czech Republic',
    description:
      'Join us for Gophercamp 2027, the Go programming language conference in Brno, Czech Republic on April 22–23, 2027.',
    images: ['/images/og-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${robotoMono.variable} font-sans antialiased bg-primary text-primary`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
