import type { Metadata } from 'next';
import BoatOperatorsPage from '@/components/operators/BoatOperatorsPage';
import { en as copy } from '@/lib/i18n/copy/boat-operators';

const SITE_URL = 'https://foxestechnology.com';
const PAGE_PATH = '/operators/boat-operators';

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  alternates: {
    canonical: `${SITE_URL}${PAGE_PATH}`,
    languages: {
      en: `${SITE_URL}${PAGE_PATH}`,
      ar: `${SITE_URL}/ar${PAGE_PATH}`,
      'x-default': `${SITE_URL}${PAGE_PATH}`,
    },
  },
  openGraph: {
    title: copy.meta.ogTitle,
    description: copy.meta.description,
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: 'Foxes Technology',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: copy.meta.ogTitle,
    description: copy.meta.description,
    images: ['/og-image.png'],
  },
};

const whatsappNumber = process.env.NEXT_PUBLIC_FOXES_WHATSAPP ?? '+201000000000';

export default function Page() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE_URL}${PAGE_PATH}`,
        url: `${SITE_URL}${PAGE_PATH}`,
        name: copy.meta.title,
        description: copy.meta.description,
        inLanguage: 'en',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'Service',
        name: 'Foxes Technology for Boat & Charter Operators',
        provider: {
          '@type': 'Organization',
          name: 'Foxes Technology',
          url: SITE_URL,
        },
        areaServed: { '@type': 'Country', name: 'Egypt' },
        serviceType: 'Booking software for boat, charter, fishing and yacht operators',
        description: copy.meta.description,
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'Boat, charter, fishing and yacht operators',
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: copy.faq.items.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: { '@type': 'Answer', text: item.answer },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BoatOperatorsPage copy={copy} locale="en" whatsappNumber={whatsappNumber} />
    </>
  );
}
