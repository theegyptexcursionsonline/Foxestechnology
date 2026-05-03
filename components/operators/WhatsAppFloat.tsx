'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppFloatProps {
  number: string;
  prefilledMessage: string;
  label: string;
  locale: 'en' | 'ar';
}

export default function WhatsAppFloat({ number, prefilledMessage, label, locale }: WhatsAppFloatProps) {
  const [visible, setVisible] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const positionClass = locale === 'ar' ? 'left-4 sm:left-6' : 'right-4 sm:right-6';

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 240);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => setTooltipOpen(true), 1200);
    const t2 = setTimeout(() => setTooltipOpen(false), 6000);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, [visible]);

  const href = `https://wa.me/${number.replace(/[^\d]/g, '')}?text=${encodeURIComponent(prefilledMessage)}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          className={`fixed bottom-20 z-40 sm:bottom-6 ${positionClass}`}
        >
          <AnimatePresence>
            {tooltipOpen && (
              <motion.button
                initial={{ opacity: 0, x: locale === 'ar' ? -16 : 16, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: locale === 'ar' ? -16 : 16, scale: 0.9 }}
                onClick={() => setTooltipOpen(false)}
                className={`absolute bottom-1/2 ${locale === 'ar' ? 'left-full ml-3' : 'right-full mr-3'} flex translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-xl`}
              >
                <span>{label}</span>
                <X className="h-3.5 w-3.5 opacity-60" />
              </motion.button>
            )}
          </AnimatePresence>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-2xl shadow-green-500/40 transition hover:scale-110 hover:bg-green-600"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-30" />
            <MessageCircle className="relative h-7 w-7 text-white" strokeWidth={2.4} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
