import type { Metadata } from 'next';

const isComingSoon = process.env.NEXT_PUBLIC_SHOW_COMING_SOON === 'true';

export const metadata: Metadata = isComingSoon
  ? {
      title: 'Coming Soon | Foxes Technology',
      description:
        'Foxes Technology is launching soon. Get our all-in-one booking system, POS hardware, and AI solutions, built for operators in Egypt & the GCC.',
      openGraph: {
        title: 'Coming Soon | Foxes Technology',
        description:
          'Foxes Technology is launching soon. Get our all-in-one booking system, POS hardware, and AI solutions, built for operators in Egypt & the GCC.',
        url: 'https://foxestechnology.com',
        siteName: 'Foxes Technology',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Coming Soon | Foxes Technology',
        description:
          'Foxes Technology is launching soon. Get our all-in-one booking system, POS hardware, and AI solutions, built for operators in Egypt & the GCC.',
        images: ['/og-image.png'],
      },
    }
  : {
      title: 'Product Showcase | Foxes Technology',
      description:
        'Explore 11+ production products built by Foxes Technology — from AI booking engines and voice agents to multi-tenant marketplaces and mobile apps for the travel industry.',
      openGraph: {
        title: 'Product Showcase | Foxes Technology',
        description:
          'Explore 11+ production products built by Foxes Technology — from AI booking engines and voice agents to multi-tenant marketplaces and mobile apps for the travel industry.',
        url: 'https://foxestechnology.com/showcase',
        siteName: 'Foxes Technology',
        images: [{ url: '/og-image.png', width: 1200, height: 630 }],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Product Showcase | Foxes Technology',
        description:
          'Explore 11+ production products built by Foxes Technology — AI booking engines, voice agents, marketplaces & mobile apps.',
        images: ['/og-image.png'],
      },
    };

export default function ShowcaseLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
