// app/layout.tsx
import { Inter, Poppins, Tajawal, Manrope, IBM_Plex_Sans_Arabic } from 'next/font/google';
import ConditionalLayout from '@/components/ConditionalLayout';
import './globals.css';
import type { Metadata } from 'next';

// Meta Title, Description, and Social Sharing tags added
export const metadata: Metadata = {
  title: {
    default: 'Foxes Technology | Booking Systems & POS for Tours & Activities',
    template: '%s | Foxes Technology',
  },
  description: 'Transform your tour & activity business with Foxes Technology. Get our all-in-one booking system, POS hardware, and AI solutions, built for operators in Egypt & the GCC.',
  openGraph: {
    title: 'Foxes Technology | Booking Systems & POS for Tours & Activities',
    description: 'The all-in-one platform to digitize and grow your travel business in Egypt and the GCC.',
    url: 'https://foxestechnology.com',
    siteName: 'Foxes Technology',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Foxes Technology | Booking Systems & POS for Tours & Activities',
    description: 'The all-in-one platform to digitize and grow your travel business in Egypt and the GCC.',
    images: ['/og-image.png'],
  },
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  display: 'swap',
  weight: ['300', '400', '500', '700', '800', '900'],
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  variable: '--font-plex-arabic',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${tajawal.variable} ${manrope.variable} ${plexArabic.variable} font-inter bg-white text-slate-800 antialiased`}>
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
