// app/page.tsx
import { Metadata } from 'next';
import ComingSoonContent from './ComingSoonContent';

export const metadata: Metadata = {
  title: { absolute: 'Foxes Technology | Booking tools for tour and activity operators' },
  description: 'Foxes Technology builds booking, voice and search tools for tour and activity operators in Egypt, the GCC and MENA. Access is opening in stages: join the priority list or request access.',
  openGraph: {
    title: 'Foxes Technology | Booking tools for tour and activity operators',
    description: 'Booking, voice and search tools for tour and activity operators in Egypt, the GCC and MENA. Access is opening in stages.',
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
    title: 'Foxes Technology | Booking tools for tour and activity operators',
    description: 'Booking, voice and search tools for tour and activity operators in Egypt, the GCC and MENA. Access is opening in stages.',
    images: ['/og-image.png'],
  },
};

export default function Home() {
  return <ComingSoonContent />;
}
