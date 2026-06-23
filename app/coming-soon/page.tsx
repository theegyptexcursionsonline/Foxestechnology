'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ExitIntentModal from '@/components/ExitIntentModal';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const serif = { fontFamily: 'var(--font-playfair), Georgia, serif' };
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const HERO_SLIDES = ['/coming-soon/hero.png', '/coming-soon/egypt.png', '/coming-soon/uae.png', '/coming-soon/saudi.png', '/coming-soon/oman.png'];
const SLIDE_NAMES = ['The Middle East', 'Egypt', 'United Arab Emirates', 'Saudi Arabia', 'Oman'];
const ROTATING_WORDS = ['technology', 'booking', 'operations', 'intelligence'];

const PLATFORM = [
  { title: 'AI Booking Engine', body: 'Direct bookings, payments and an AI assistant on your own site.' },
  { title: 'AI Voice Agent', body: 'A 24/7 voice agent that answers, qualifies and books by phone.' },
  { title: 'AI Search', body: 'On-site search that understands intent and surfaces the right trip.' },
  { title: 'Attraction Network', body: 'Multi-tenant ticketing with an open reseller marketplace.' },
  { title: 'Support & CRM', body: 'Tickets, live chat, knowledge base and AI assist in one window.' },
  { title: 'Content Engine', body: 'SEO content at scale — keywords, drafts and multi-site publishing.' },
];

const FAQS = [
  { q: 'When does Foxes Technology launch?', a: 'We are targeting July 15, 2026 across Egypt, the GCC and the wider MENA region. Priority members get early access ahead of the public launch.' },
  { q: 'What exactly are you building?', a: 'One platform for tour & activity operators — AI booking, a voice agent, on-site AI search, an attraction & reseller network, support & CRM, and a content engine, all built for MENA.' },
  { q: 'Who is it for?', a: 'Tour operators, DMCs, attractions, airports and resellers across Egypt, the GCC and MENA who want to take direct bookings and run their whole operation in one place.' },
  { q: 'How do I get early access?', a: 'Join the priority list below. We will reach out before launch with early access and introductory pricing.' },
];

function Countdown({ time }: { time: { days: number; hours: number; minutes: number; seconds: number } }) {
  const items = [
    { v: time.days, l: 'Days' },
    { v: time.hours, l: 'Hours' },
    { v: time.minutes, l: 'Minutes' },
    { v: time.seconds, l: 'Seconds' },
  ];
  return (
    <div className="flex items-stretch justify-center gap-2 sm:gap-2.5">
      {items.map((it) => (
        <div key={it.l} className="flex min-w-[56px] flex-col items-center rounded-2xl border border-white/[0.12] bg-white/[0.05] px-2 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:min-w-[74px] sm:px-3 sm:py-3">
          <span style={serif} className="relative flex h-[1.1em] w-full items-center justify-center overflow-hidden text-2xl font-medium leading-none tabular-nums text-white sm:text-[2.25rem]">
            <AnimatePresence initial={false} mode="popLayout">
              <motion.span key={it.v} initial={{ y: '100%' }} animate={{ y: '0%' }} exit={{ y: '-100%' }} transition={{ duration: 0.45, ease: EASE }} className="block">
                {it.v.toString().padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </span>
          <span className="mt-1.5 text-[8px] uppercase tracking-[0.12em] text-amber-100/55 sm:mt-2 sm:text-[9px] sm:tracking-[0.2em]">{it.l}</span>
        </div>
      ))}
    </div>
  );
}

function Waitlist({ email, setEmail, onSubmit, isSubmitted }: { email: string; setEmail: (v: string) => void; onSubmit: (e: React.FormEvent) => void; isSubmitted: boolean }) {
  return (
    <form onSubmit={onSubmit} className="relative w-full max-w-md">
      <div className="flex flex-col gap-2 rounded-[1.4rem] border border-white/20 bg-black/20 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-xl sm:flex-row sm:items-center sm:rounded-full sm:p-1.5">
        <input type="email" required placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitted} className="flex-1 rounded-xl bg-transparent px-4 py-3 text-[15px] text-white placeholder-amber-100/40 outline-none sm:rounded-full sm:px-5 sm:py-2.5" />
        <button type="submit" disabled={isSubmitted} className="w-full shrink-0 rounded-xl bg-gradient-to-r from-amber-200 to-amber-400 px-5 py-3 text-sm font-semibold tracking-wide text-stone-900 transition hover:brightness-105 active:scale-95 disabled:opacity-70 sm:w-auto sm:rounded-full sm:py-2.5">
          {isSubmitted ? 'You’re in ✓' : 'Notify me'}
        </button>
      </div>
      {isSubmitted && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-7 left-0 w-full text-center text-xs tracking-wide text-amber-200/80">
          You&apos;re on the list — we&apos;ll be in touch before launch.
        </motion.p>
      )}
    </form>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: EASE },
};
const heroContainer = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.12 } } };
const heroItem = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } } };

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [slide, setSlide] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const onHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = spotlightRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.background = `radial-gradient(640px circle at ${x}% ${y}%, rgba(244,199,127,0.1), transparent 60%)`;
  };

  useEffect(() => {
    const targetDate = new Date('2026-07-15T23:59:59');
    const tick = () => {
      const distance = targetDate.getTime() - Date.now();
      setTimeLeft({
        days: Math.max(0, Math.floor(distance / 86400000)),
        hours: Math.max(0, Math.floor((distance % 86400000) / 3600000)),
        minutes: Math.max(0, Math.floor((distance % 3600000) / 60000)),
        seconds: Math.max(0, Math.floor((distance % 60000) / 1000)),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    const t = setInterval(() => setWordIdx((w) => (w + 1) % ROTATING_WORDS.length), 2600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntent && !isSubmitted) {
        setShowExitIntent(true);
        setHasShownExitIntent(true);
      }
    };
    const timer = setTimeout(() => document.addEventListener('mouseleave', handleMouseLeave), 6000);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasShownExitIntent, isSubmitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 4500);
  };

  return (
    <div className={`${playfair.variable} ${inter.variable} min-h-screen overflow-x-hidden bg-[#0b0907] text-white selection:bg-amber-200/30`} style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
      <ExitIntentModal isOpen={showExitIntent} onClose={() => setShowExitIntent(false)} onEmailSubmit={() => {}} />

      {/* ===== HERO ===== */}
      <section onMouseMove={onHeroMouseMove} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0">
          {HERO_SLIDES.map((src, i) => (
            <motion.div key={src} className="absolute inset-0" initial={false} animate={{ opacity: slide === i ? 1 : 0, scale: slide === i ? 1.16 : 1.05 }} transition={{ opacity: { duration: 1.5, ease: 'easeInOut' }, scale: { duration: 7, ease: 'easeOut' } }}>
              <Image src={src} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0907]/85 via-[#0b0907]/55 to-[#0b0907]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_78%_56%_at_50%_46%,rgba(11,9,7,0.58),transparent_72%)]" />
        <div ref={spotlightRef} className="pointer-events-none absolute inset-0 z-[5] hidden sm:block" aria-hidden />

        <motion.div variants={heroContainer} initial="hidden" animate="show" className="relative z-10 mx-auto w-full max-w-2xl px-4 sm:px-6">
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.14] bg-white/[0.06] px-6 py-9 shadow-[0_30px_90px_-25px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:rounded-[2.25rem] sm:px-12 sm:py-12">
            <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent" />
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/[0.07] via-transparent to-transparent" />

            <div className="relative flex flex-col items-center text-center">
              <motion.div variants={heroItem} className="mb-6 flex items-center gap-3 sm:mb-8">
                <span className="flex size-11 items-center justify-center overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/20">
                  <Image src="/foxes1.png" alt="Foxes Technology" width={40} height={40} className="size-8 object-contain" priority />
                </span>
                <span style={serif} className="text-xl font-medium tracking-tight text-white sm:text-2xl">Foxes Technology</span>
              </motion.div>

              <motion.p variants={heroItem} className="mb-4 text-[10px] uppercase tracking-[0.18em] text-amber-200/85 sm:mb-6 sm:text-xs sm:tracking-[0.42em]">
                Egypt · GCC · MENA
              </motion.p>

              <motion.h1 variants={heroItem} style={serif} className="text-[2.5rem] font-medium leading-[1.04] tracking-[-0.015em] text-white drop-shadow-[0_6px_30px_rgba(0,0,0,0.55)] sm:text-[3.4rem] sm:leading-[1.03] lg:text-[4.4rem]">
                <span className="block">The future of travel</span>
                <span className="relative block">
                  <span className="invisible" aria-hidden>technology</span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <AnimatePresence initial={false}>
                      <motion.span key={wordIdx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.5, ease: EASE }} style={{ willChange: 'transform, opacity' }} className="absolute inset-0 flex items-center justify-center text-amber-300 drop-shadow-[0_2px_26px_rgba(244,199,127,0.45)]">
                        {ROTATING_WORDS[wordIdx]}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                </span>
                <span className="block">is almost here</span>
              </motion.h1>

              <motion.p variants={heroItem} className="mx-auto mt-5 max-w-md text-[14px] font-light leading-relaxed text-amber-50/75 sm:mt-6 sm:text-[15px]">
                We&apos;re building the next generation of travel technology for Egypt, the GCC &amp; MENA — AI booking,
                voice, search, an attraction network and support, in one platform.
              </motion.p>

              <motion.div variants={heroItem} className="mt-7 sm:mt-9">
                <Countdown time={timeLeft} />
              </motion.div>

              <motion.div variants={heroItem} className="mt-7 flex w-full flex-col items-center sm:mt-9">
                <Waitlist email={email} setEmail={setEmail} onSubmit={handleSubmit} isSubmitted={isSubmitted} />
              </motion.div>
            </div>
          </div>

          <motion.div variants={heroItem} className="mt-7 flex flex-col items-center gap-3">
            <div className="flex h-4 items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span key={slide} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }} className="text-[11px] uppercase tracking-[0.32em] text-amber-100/80">
                  {SLIDE_NAMES[slide]}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-center gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button key={i} type="button" onClick={() => setSlide(i)} aria-label={`View ${SLIDE_NAMES[i]}`} className={`h-1.5 rounded-full transition-all duration-500 ${slide === i ? 'w-7 bg-amber-300' : 'w-1.5 bg-white/30 hover:bg-white/50'}`} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== THE PLATFORM ===== */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-10 sm:py-24 lg:py-32">
        <motion.div {...fadeUp} className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-amber-200/70 sm:text-[11px] sm:tracking-[0.4em]">What we&apos;re building</p>
          <h2 style={serif} className="text-3xl font-medium text-white sm:text-4xl lg:text-5xl">Six products. One platform.</h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {PLATFORM.map((p, i) => (
            <motion.div key={p.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.07 }} className="relative overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.05] p-7 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.7)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-amber-200/30 sm:p-8">
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <div className="mb-5 flex size-11 items-center justify-center rounded-full border border-amber-200/30 bg-amber-200/10 text-amber-200">
                <span style={serif} className="text-lg">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 style={serif} className="text-xl font-medium text-white sm:text-2xl">{p.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-amber-50/65">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="relative overflow-hidden border-y border-white/[0.06]">
        <Image src="/coming-soon/egypt.png" alt="" fill sizes="100vw" className="object-cover opacity-[0.1]" />
        <div className="absolute inset-0 bg-[#0b0907]/88" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 sm:py-24 lg:py-28">
          <motion.div {...fadeUp} className="mb-10 text-center sm:mb-12">
            <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-amber-200/70 sm:text-[11px] sm:tracking-[0.4em]">Good to know</p>
            <h2 style={serif} className="text-3xl font-medium text-white sm:text-4xl lg:text-5xl">Questions, answered.</h2>
          </motion.div>
          <motion.div {...fadeUp} className="overflow-hidden rounded-3xl border border-white/[0.1] bg-white/[0.05] px-5 shadow-[0_25px_60px_-30px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:px-7">
            <div className="divide-y divide-white/[0.08]">
              {FAQS.map((f, i) => (
                <div key={i}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between gap-4 py-5 text-left">
                    <span className="text-[15px] font-medium text-amber-50/90">{f.q}</span>
                    <motion.span animate={{ rotate: openFaq === i ? 45 : 0 }} className="shrink-0 text-xl font-light text-amber-200/70">+</motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <p className="pb-6 text-sm leading-relaxed text-amber-50/60">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative overflow-hidden">
        <Image src="/coming-soon/saudi.png" alt="" fill sizes="100vw" className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0907] via-[#0b0907]/85 to-[#0b0907]" />
        <motion.div {...fadeUp} className="relative z-10 mx-auto w-full max-w-xl px-5 py-16 sm:py-24">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.14] bg-white/[0.06] px-7 py-12 text-center shadow-[0_30px_90px_-25px_rgba(0,0,0,0.85)] backdrop-blur-2xl sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            <h2 style={serif} className="text-3xl font-medium text-white sm:text-4xl lg:text-[2.75rem]">Be the first through the door.</h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] text-amber-50/70">Join the priority list and be the first in when we go live on July 15th, 2026.</p>
            <div className="mt-8 flex w-full flex-col items-center">
              <Waitlist email={email} setEmail={setEmail} onSubmit={handleSubmit} isSubmitted={isSubmitted} />
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/[0.06] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-sm tracking-wide text-amber-50/50">Foxes Technology</span>
          <div className="flex gap-7 text-xs uppercase tracking-[0.25em] text-amber-50/40">
            <a href="/contact" className="transition-colors hover:text-amber-100">Contact</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-amber-100">Instagram</a>
            <a href="/privacy" className="transition-colors hover:text-amber-100">Privacy</a>
          </div>
          <span className="text-xs text-amber-50/30">© 2026 Foxes Technology · Egypt · GCC · MENA</span>
        </div>
      </footer>
    </div>
  );
}
