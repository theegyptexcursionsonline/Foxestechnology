import type { Metadata } from 'next';
import AIVoicePage from '@/components/solutions/AIVoicePage';
import RTLProvider from '@/components/operators/RTLProvider';
import { getOperatorCopy } from '@/lib/i18n/operators';

const SITE_URL = 'https://foxestechnology.com';
const PAGE_PATH = '/ar/solutions/ai-voice';
const ALT_EN_PATH = '/solutions/ai-voice';

const copy = getOperatorCopy('ai-voice', 'ar');

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
  alternates: {
    canonical: `${SITE_URL}${PAGE_PATH}`,
    languages: {
      en: `${SITE_URL}${ALT_EN_PATH}`,
      ar: `${SITE_URL}${PAGE_PATH}`,
      'x-default': `${SITE_URL}${ALT_EN_PATH}`,
    },
  },
  openGraph: {
    title: copy.meta.ogTitle,
    description: copy.meta.description,
    url: `${SITE_URL}${PAGE_PATH}`,
    siteName: 'Foxes Technology',
    locale: 'ar_EG',
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
        inLanguage: 'ar',
        isPartOf: { '@id': `${SITE_URL}/#website` },
      },
      {
        '@type': 'Service',
        name: 'وكيل الصوت الذكي من Foxes',
        provider: {
          '@type': 'Organization',
          name: 'Foxes Technology',
          url: SITE_URL,
        },
        areaServed: { '@type': 'Country', name: 'Egypt' },
        serviceType: 'وكيل صوت ذكي لمشغلي السياحة',
        description: copy.meta.description,
        audience: {
          '@type': 'BusinessAudience',
          audienceType: 'مشغلو السياحة ومراكز الغوص ورحلات العشاء والرياضات المائية',
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
    <RTLProvider>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AIVoicePage copy={copy} locale="ar" whatsappNumber={whatsappNumber} />
    </RTLProvider>
  );
}
