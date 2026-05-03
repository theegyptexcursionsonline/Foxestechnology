import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MessageCircle, Mail } from 'lucide-react';
import type { OperatorCategory, Locale } from '@/lib/i18n/operators';

interface Props {
  category: OperatorCategory;
  locale: Locale;
  whatsappHref: string;
}

const COPY = {
  tagline: {
    en: 'Built for the people building Egyptian tourism.',
    ar: 'مصمم للأشخاص الذين يبنون السياحة المصرية.',
  },
  exploreOperators: { en: 'For operators', ar: 'للمشغلين' },
  company: { en: 'Foxes', ar: 'Foxes' },
  legal: { en: 'Legal', ar: 'قانوني' },
  contact: { en: 'Contact', ar: 'تواصل' },
  privacy: { en: 'Privacy policy', ar: 'سياسة الخصوصية' },
  terms: { en: 'Terms of service', ar: 'شروط الخدمة' },
  cookies: { en: 'Cookies', ar: 'الكوكيز' },
  refund: { en: 'Refund policy', ar: 'سياسة الاسترداد' },
  about: { en: 'About', ar: 'حول' },
  careers: { en: 'Careers', ar: 'وظائف' },
  features: { en: 'Features', ar: 'المزايا' },
  pricing: { en: 'Pricing', ar: 'الأسعار' },
  copyright: {
    en: '© 2026 Foxes Technology. All rights reserved.',
    ar: '© 2026 Foxes Technology. جميع الحقوق محفوظة.',
  },
  madeIn: { en: 'Made in Egypt', ar: 'صُنع في مصر' },
  chatLabel: { en: 'WhatsApp', ar: 'واتساب' },
};

const VERTICALS: { slug: OperatorCategory; en: string; ar: string }[] = [
  { slug: 'diving-centres', en: 'Diving centres', ar: 'مراكز الغوص' },
  { slug: 'dinner-cruises', en: 'Dinner cruises', ar: 'رحلات العشاء' },
  { slug: 'tour-agencies', en: 'Tour agencies', ar: 'وكالات السياحة' },
  { slug: 'water-sports', en: 'Water sports', ar: 'الرياضات المائية' },
  { slug: 'boat-operators', en: 'Boat operators', ar: 'مشغّلو القوارب' },
];

export default function OperatorFooter({ category, locale, whatsappHref }: Props) {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,_rgba(244,63,94,0.08),_transparent_70%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-10 lg:px-8 lg:pt-24 lg:pb-12">
        {/* Top: brand + CTA */}
        <div className="grid gap-12 border-b border-white/10 pb-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="Foxes Technology"
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <div className="flex flex-col leading-none">
                <span className="text-[18px] font-bold tracking-[-0.01em]">
                  Foxes <span className="font-medium text-white/70">Technology</span>
                </span>
                <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  {COPY.madeIn[locale]}
                </span>
              </div>
            </Link>
            <p className="mt-7 max-w-md text-[15px] leading-[1.65] text-white/70">
              {COPY.tagline[locale]}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-md transition hover:border-emerald-300/40 hover:bg-emerald-400/10"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                <span>{COPY.chatLabel[locale]}</span>
              </a>
              <a
                href="mailto:hello@foxestechnology.com"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-md transition hover:border-white/30 hover:bg-white/10"
              >
                <Mail className="h-4 w-4" />
                <span>hello@foxestechnology.com</span>
              </a>
            </div>
          </div>

          <FooterColumn title={COPY.exploreOperators[locale]}>
            {VERTICALS.map((v) => {
              const href =
                locale === 'ar' ? `/ar/operators/${v.slug}` : `/operators/${v.slug}`;
              const isCurrent = v.slug === category;
              return (
                <FooterLink key={v.slug} href={href} active={isCurrent}>
                  {v[locale]}
                </FooterLink>
              );
            })}
          </FooterColumn>

          <FooterColumn title={COPY.company[locale]}>
            <FooterLink href="/about">{COPY.about[locale]}</FooterLink>
            <FooterLink href="/features">{COPY.features[locale]}</FooterLink>
            <FooterLink href="/pricing">{COPY.pricing[locale]}</FooterLink>
            <FooterLink href="/careers">{COPY.careers[locale]}</FooterLink>
            <FooterLink href="/contact">{COPY.contact[locale]}</FooterLink>
          </FooterColumn>

          <FooterColumn title={COPY.legal[locale]}>
            <FooterLink href="/privacy-policy">{COPY.privacy[locale]}</FooterLink>
            <FooterLink href="/terms-of-service">{COPY.terms[locale]}</FooterLink>
            <FooterLink href="/cookie-policy">{COPY.cookies[locale]}</FooterLink>
            <FooterLink href="/refund-policy">{COPY.refund[locale]}</FooterLink>
          </FooterColumn>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 pt-8 sm:flex-row sm:items-center">
          <p className="text-[12px] text-white/50">{COPY.copyright[locale]}</p>
          <div className="flex items-center gap-5 text-[12px] text-white/50">
            <a
              href="https://foxestechnology.com"
              className="inline-flex items-center gap-1 transition hover:text-white"
            >
              foxestechnology.com
              <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-white/40">
        {title}
      </p>
      <ul className="mt-5 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  active = false,
}: {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`inline-flex items-center gap-1 text-[13.5px] transition ${
          active ? 'font-semibold text-white' : 'text-white/65 hover:text-white'
        }`}
      >
        {children}
        {active && <span className="ms-1 inline-block h-1 w-1 rounded-full bg-rose-400" />}
      </Link>
    </li>
  );
}
