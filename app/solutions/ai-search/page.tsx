import type { Metadata } from 'next';
import AISearchPage from '@/components/solutions/AISearchPage';
import { getOperatorCopy } from '@/lib/i18n/operators';

const SITE_URL = 'https://foxestechnology.com';
const PAGE_PATH = '/solutions/ai-search';

const copy = getOperatorCopy('ai-search', 'en');

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
        name: 'Foxes AI Search Widget',
        provider: {
          '@type': 'Organization',
          name: 'Foxes Technology',
          url: SITE_URL,
        },
        areaServed: { '@type': 'Country', name: 'Egypt' },
        serviceType: 'AI search widget for tour and travel websites',
        description: copy.meta.description,
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'Tour operators, attractions, hotels, dinner cruise operators',
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
      <AISearchPage copy={copy} locale="en" whatsappNumber={whatsappNumber} />
    </>
  );
}
