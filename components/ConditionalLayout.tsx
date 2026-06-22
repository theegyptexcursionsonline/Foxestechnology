'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ComingSoonContent from '@/app/ComingSoonContent';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Check if coming soon mode is enabled
  const showComingSoon = process.env.NEXT_PUBLIC_SHOW_COMING_SOON === 'true';

  // Pages that bypass coming soon mode (exact match).
  // /request-access is the CRM-front gateway: it must stay reachable while the
  // rest of the site is in coming-soon mode, so invited/approved prospects can
  // request access to the Foxes solutions.
  const comingSoonExcluded: string[] = ['/request-access'];

  // Path prefixes that bypass coming soon mode (operator + solution landing pages are public)
  const comingSoonExcludedPrefixes: string[] = [
    '/operators/',
    '/ar/operators/',
    '/solutions/',
    '/ar/solutions/',
  ];

  const isExcluded =
    comingSoonExcluded.includes(pathname) ||
    comingSoonExcludedPrefixes.some((prefix) => pathname.startsWith(prefix));

  // If coming soon mode is enabled, show coming soon page for all routes except excluded ones
  if (showComingSoon && !isExcluded) {
    return <ComingSoonContent />;
  }

  // Pages that should NOT have header and footer (exact match)
  const noLayoutPages = ['/', '/coming-soon', '/api', '/showcase', '/request-access'];

  // Path prefixes that bring their own header/footer (operator + solution landing pages)
  const noLayoutPrefixes = [
    '/operators/',
    '/ar/operators/',
    '/solutions/ai-voice',
    '/solutions/ai-search',
    '/ar/solutions/ai-voice',
    '/ar/solutions/ai-search',
  ];

  const shouldShowLayout =
    !noLayoutPages.includes(pathname) &&
    !noLayoutPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (!shouldShowLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
