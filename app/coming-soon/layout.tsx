import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Opening soon',
  description: 'Foxes Technology builds booking, voice and search tools for tour and activity operators in Egypt, the GCC and MENA. Access is opening in stages: join the priority list or request access.',
  openGraph: {
    title: 'Foxes Technology | Booking tools for tour and activity operators',
    description: 'Booking, voice and search tools for tour and activity operators in Egypt, the GCC and MENA. Access is opening in stages.',
    url: 'https://foxestechnology.com/coming-soon',
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

export default function ComingSoonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
