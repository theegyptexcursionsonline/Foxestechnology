// app/page.tsx
import { Metadata } from 'next';
import ComingSoonContent from './ComingSoonContent';

export const metadata: Metadata = {
  title: 'Coming Soon - Foxes Technology | Transform Your Tour Business',
  description: 'Foxes Technology is launching soon! The ultimate booking system, POS hardware, and AI-powered solutions built exclusively for tours & activities operators in Egypt and the GCC region. Join our waitlist today.',
  openGraph: {
    title: 'Coming Soon - Foxes Technology',
    description: 'The all-in-one platform to digitize and grow your travel business. Launching soon!',
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
    title: 'Coming Soon - Foxes Technology',
    description: 'The all-in-one platform to digitize and grow your travel business. Launching soon!',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  return <ComingSoonContent />;
}
