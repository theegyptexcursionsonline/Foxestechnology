'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ContactButton from './ContactButton';

interface MobileStickyCTAProps {
  primaryLabel: string;
  secondaryLabel: string;
  /** wa.me link, or null when no real WhatsApp number is configured. */
  whatsappHref: string | null;
  /** Used in place of WhatsApp when there is no number. */
  fallbackHref: string;
  fallbackLabel: string;
  formAnchor?: string;
  locale: 'en' | 'ar';
}

export default function MobileStickyCTA({
  primaryLabel,
  secondaryLabel,
  whatsappHref,
  fallbackHref,
  fallbackLabel,
  formAnchor = '#lead-form',
  locale,
}: MobileStickyCTAProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md shadow-[0_-10px_30px_-10px_rgba(0,0,0,0.15)] sm:hidden"
        >
          <div className="flex items-center gap-2">
            <a
              href={formAnchor}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-red-600 px-5 py-3 text-sm font-bold text-white shadow-md transition active:scale-95"
            >
              <span>{primaryLabel}</span>
              <ArrowRight className={`h-4 w-4 ${locale === 'ar' ? 'rotate-180' : ''}`} />
            </a>
            <ContactButton
              whatsappHref={whatsappHref}
              whatsappLabel={secondaryLabel}
              fallbackHref={fallbackHref}
              fallbackLabel={fallbackLabel}
              className="flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 shadow-sm transition active:scale-95"
              whatsappIconClassName="h-4 w-4 text-green-600"
              fallbackIconClassName="h-4 w-4 text-slate-500"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
