'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ExitIntentModal from '@/components/ExitIntentModal';
import { Playfair_Display, Inter, Space_Grotesk } from 'next/font/google';
import { ArrowRight, Check, Sparkles, CalendarCheck, Phone, Search, Network, LifeBuoy } from 'lucide-react';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const grotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-grotesk' });

const serif = { fontFamily: 'var(--font-playfair), Georgia, serif' };
const mono = { fontFamily: 'var(--font-grotesk), ui-monospace, monospace' };
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const HERO_SLIDES = ['/coming-soon/hero.png', '/coming-soon/egypt.png', '/coming-soon/uae.png', '/coming-soon/saudi.png', '/coming-soon/oman.png'];
const SLIDE_NAMES = ['The Middle East', 'Egypt', 'United Arab Emirates', 'Saudi Arabia', 'Oman'];
const ROTATING_WORDS = ['technology', 'booking', 'operations', 'intelligence'];

const PLATFORM = [
  { icon: CalendarCheck, title: 'AI Booking Engine', body: 'Direct bookings, payments and an AI assistant on your own site.' },
  { icon: Phone, title: 'AI Voice Agent', body: 'A 24/7 voice agent that answers, qualifies and books by phone.' },
  { icon: Search, title: 'AI Search', body: 'On-site search that understands intent and surfaces the right trip.' },
  { icon: Network, title: 'Attraction Network', body: 'Multi-tenant ticketing with an open reseller marketplace.' },
  { icon: LifeBuoy, title: 'Support & CRM', body: 'Tickets, live chat, knowledge base and AI assist in one window.' },
];

const STATS = [
  { n: '5', l: 'AI products' },
  { n: '4', l: 'countries' },
  { n: '1', l: 'platform' },
  { n: '∞', l: 'ways to grow' },
];

const FAQS = [
  { q: 'When does Foxes Technology launch?', a: 'We are targeting July 15, 2026 across Egypt, the GCC and the wider MENA region. Priority members get early access ahead of the public launch.' },
  { q: 'What exactly are you building?', a: 'One platform for tour & activity operators — AI booking, a voice agent, on-site AI search, an attraction & reseller network, and support & CRM, all built for MENA.' },
  { q: 'Who is it for?', a: 'Tour operators, DMCs, attractions, airports and resellers across Egypt, the GCC and MENA who want to take direct bookings and run their whole operation in one place.' },
  { q: 'How do I get early access?', a: 'Join the priority list below. We will reach out before launch with early access and introductory pricing.' },
];

const CSS = `
@keyframes fxShimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
@keyframes fxGrain { 0%,100% { transform: translate(0,0); } 10% { transform: translate(-4%,-4%); } 30% { transform: translate(3%,-2%); } 50% { transform: translate(-2%,4%); } 70% { transform: translate(4%,2%); } 90% { transform: translate(-3%,3%); } }
@keyframes fxAurora { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(6%,-5%) scale(1.18); } }
@keyframes fxAurora2 { 0%,100% { transform: translate(0,0) scale(1.1); } 50% { transform: translate(-7%,6%) scale(1); } }
@keyframes fxPulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: .45; transform: scale(.7); } }
@keyframes fxMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
@keyframes fxBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(7px); } }
.fx-gold { background: linear-gradient(96deg,#f8e6b0,#eaba63 38%,#c9863a 66%,#f4d79a); -webkit-background-clip: text; background-clip: text; color: transparent; }
.fx-gold-shimmer { background: linear-gradient(100deg,#b98a48 0%,#f7e6b4 18%,#eaba63 38%,#cd933f 60%,#f3d695 82%); background-size: 220% auto; -webkit-background-clip: text; background-clip: text; color: transparent; animation: fxShimmer 5.5s linear infinite; }
.fx-grain { position: fixed; inset: -50%; width: 200%; height: 200%; pointer-events: none; opacity: .05; mix-blend-mode: overlay; z-index: 70; background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>"); animation: fxGrain 7s steps(8) infinite; }
.fx-hairline { background-image: linear-gradient(180deg,rgba(255,255,255,.22),rgba(255,255,255,.04) 28%,rgba(255,255,255,.02)); }
.fx-marquee-track { display: inline-flex; white-space: nowrap; animation: fxMarquee 32s linear infinite; }
`;

function GoldDot() {
  return <span className="mx-2.5 inline-block size-1 rounded-full bg-amber-300/70 align-middle" />;
}

function Countdown({ time }: { time: { days: number; hours: number; minutes: number; seconds: number } }) {
  const items = [
    { v: time.days, l: 'Days' },
    { v: time.hours, l: 'Hours' },
    { v: time.minutes, l: 'Minutes' },
    { v: time.seconds, l: 'Seconds' },
  ];
  return (
    <div className="flex items-stretch justify-center gap-2 sm:gap-3">
      {items.map((it) => (
        <div key={it.l} className="group relative rounded-2xl fx-hairline p-px shadow-[0_18px_40px_-22px_rgba(0,0,0,0.8)]">
          <div className="flex min-w-[62px] flex-col items-center rounded-[15px] bg-[#15100b]/80 px-2.5 py-3 backdrop-blur-xl sm:min-w-[82px] sm:px-4 sm:py-3.5">
            <span style={serif} className="relative flex h-[1.05em] w-full items-center justify-center overflow-hidden text-[1.75rem] font-medium leading-none tabular-nums sm:text-[2.5rem]">
              <AnimatePresence initial={false} mode="popLayout">
                <motion.span key={it.v} initial={{ y: '110%', opacity: 0 }} animate={{ y: '0%', opacity: 1 }} exit={{ y: '-110%', opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="fx-gold block">
                  {it.v.toString().padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </span>
            <span style={mono} className="mt-2 text-[8px] uppercase tracking-[0.22em] text-amber-100/45 sm:text-[9px]">{it.l}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function Avatars() {
  const tones = ['from-amber-200 to-amber-400', 'from-orange-200 to-amber-500', 'from-yellow-100 to-amber-300', 'from-amber-300 to-orange-400'];
  return (
    <div className="flex -space-x-2.5">
      {tones.map((t, i) => (
        <span key={i} className={`size-7 rounded-full bg-gradient-to-br ${t} ring-2 ring-[#0a0806]`} />
      ))}
    </div>
  );
}

function Waitlist({ email, setEmail, onSubmit, isSubmitted, proof = true }: { email: string; setEmail: (v: string) => void; onSubmit: (e: React.FormEvent) => void; isSubmitted: boolean; proof?: boolean }) {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      <form onSubmit={onSubmit} className="w-full">
        <div className="group relative rounded-[1.4rem] fx-hairline p-px transition focus-within:shadow-[0_0_0_3px_rgba(234,186,99,0.18)] sm:rounded-full">
          <div className="flex flex-col gap-2 rounded-[1.35rem] bg-[#120d09]/75 p-2 backdrop-blur-xl sm:flex-row sm:items-center sm:rounded-full sm:p-1.5">
            <input type="email" required placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitted} className="flex-1 rounded-xl bg-transparent px-4 py-3 text-[15px] text-white placeholder-amber-100/35 outline-none sm:rounded-full sm:px-5 sm:py-2.5" />
            <button type="submit" disabled={isSubmitted} className="group/btn relative inline-flex w-full shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-amber-200 via-amber-300 to-amber-400 px-6 py-3 text-sm font-semibold tracking-wide text-[#1a1206] transition hover:brightness-105 active:scale-[0.98] disabled:opacity-90 sm:w-auto sm:rounded-full sm:py-2.5" style={mono}>
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/55 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full" />
              {isSubmitted ? (<><Check className="size-4" /> You&apos;re in</>) : (<>Notify me <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-0.5" /></>)}
            </button>
          </div>
        </div>
      </form>
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.p key="ok" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[13px] tracking-wide text-amber-200/85" style={mono}>
            ✓ You&apos;re on the priority list — we&apos;ll email you before launch.
          </motion.p>
        ) : proof ? (
          <motion.div key="proof" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
            <Avatars />
            <span className="text-[13px] text-amber-50/55">Join <span className="font-semibold text-amber-100/90">1,200+ operators</span> getting early access</span>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.7, ease: EASE },
};
const heroWrap = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
const heroItem = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } } };

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [slide, setSlide] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);
  const spotRef = useRef<HTMLDivElement>(null);

  const onHeroMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = spotRef.current;
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.background = `radial-gradient(680px circle at ${x}% ${y}%, rgba(234,186,99,0.12), transparent 60%)`;
  };

  useEffect(() => {
    const target = new Date('2026-07-15T23:59:59');
    const tick = () => {
      const d = target.getTime() - Date.now();
      setTimeLeft({
        days: Math.max(0, Math.floor(d / 86400000)),
        hours: Math.max(0, Math.floor((d % 86400000) / 3600000)),
        minutes: Math.max(0, Math.floor((d % 3600000) / 60000)),
        seconds: Math.max(0, Math.floor((d % 60000) / 1000)),
      });
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => { const t = setInterval(() => setSlide((s) => (s + 1) % HERO_SLIDES.length), 5500); return () => clearInterval(t); }, []);
  useEffect(() => { const t = setInterval(() => setWordIdx((w) => (w + 1) % ROTATING_WORDS.length), 2600); return () => clearInterval(t); }, []);

  useEffect(() => {
    const onLeave = (e: MouseEvent) => { if (e.clientY <= 0 && !hasShownExitIntent && !isSubmitted) { setShowExitIntent(true); setHasShownExitIntent(true); } };
    const timer = setTimeout(() => document.addEventListener('mouseleave', onLeave), 6000);
    return () => { clearTimeout(timer); document.removeEventListener('mouseleave', onLeave); };
  }, [hasShownExitIntent, isSubmitted]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => { setEmail(''); setIsSubmitted(false); }, 5000);
  };

  return (
    <div className={`${playfair.variable} ${inter.variable} ${grotesk.variable} relative min-h-screen overflow-x-hidden bg-[#0a0806] text-white antialiased selection:bg-amber-200/30`} style={{ fontFamily: 'var(--font-inter), system-ui, sans-serif' }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="fx-grain" aria-hidden />
      <ExitIntentModal isOpen={showExitIntent} onClose={() => setShowExitIntent(false)} onEmailSubmit={() => {}} />

      {/* ===== HERO ===== */}
      <section onMouseMove={onHeroMove} className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 py-20 sm:px-6 sm:py-24">
        {/* Ken-Burns slides */}
        <div className="absolute inset-0">
          {HERO_SLIDES.map((src, i) => (
            <motion.div key={src} className="absolute inset-0" initial={false} animate={{ opacity: slide === i ? 1 : 0, scale: slide === i ? 1.16 : 1.04 }} transition={{ opacity: { duration: 1.6, ease: 'easeInOut' }, scale: { duration: 7.5, ease: 'easeOut' } }}>
              <Image src={src} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
            </motion.div>
          ))}
        </div>
        {/* cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0806]/88 via-[#0a0806]/55 to-[#0a0806]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_42%,rgba(10,8,6,0.45),rgba(10,8,6,0.86)_78%)]" />
        {/* gold aurora */}
        <div className="pointer-events-none absolute -top-[18%] left-1/2 size-[60vw] max-w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(234,170,80,0.22),transparent_62%)] blur-3xl" style={{ animation: 'fxAurora 14s ease-in-out infinite' }} />
        <div className="pointer-events-none absolute bottom-[2%] right-[6%] size-[42vw] max-w-[560px] rounded-full bg-[radial-gradient(circle,rgba(201,134,58,0.18),transparent_64%)] blur-3xl" style={{ animation: 'fxAurora2 17s ease-in-out infinite' }} />
        <div ref={spotRef} className="pointer-events-none absolute inset-0 z-[5] hidden sm:block" aria-hidden />

        <motion.div variants={heroWrap} initial="hidden" animate="show" className="relative z-10 mx-auto w-full max-w-2xl">
          <div className="relative rounded-[1.9rem] fx-hairline p-px shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:rounded-[2.4rem]">
            <div className="relative overflow-hidden rounded-[1.85rem] bg-[#0d0a07]/70 px-6 py-9 backdrop-blur-2xl sm:rounded-[2.35rem] sm:px-12 sm:py-12">
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-gradient-to-b from-white/[0.06] via-transparent to-transparent" />

              <div className="relative flex flex-col items-center text-center">
                {/* launch pill */}
                <motion.div variants={heroItem} className="mb-7 inline-flex items-center gap-2 rounded-full border border-amber-200/25 bg-amber-200/[0.07] px-3.5 py-1.5">
                  <span className="relative flex size-1.5"><span className="absolute inline-flex size-full rounded-full bg-amber-300" style={{ animation: 'fxPulse 2s ease-in-out infinite' }} /><span className="relative inline-flex size-1.5 rounded-full bg-amber-300" /></span>
                  <span style={mono} className="text-[10px] uppercase tracking-[0.24em] text-amber-100/85 sm:text-[11px]">Launching July 2026</span>
                </motion.div>

                {/* lockup */}
                <motion.div variants={heroItem} className="mb-6 flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center overflow-hidden rounded-2xl fx-hairline p-px">
                    <span className="flex size-full items-center justify-center rounded-[14px] bg-[#15100b]">
                      <Image src="/foxes1.png" alt="Foxes Technology" width={40} height={40} className="size-7 object-contain" priority />
                    </span>
                  </span>
                  <span style={serif} className="text-xl font-medium tracking-tight text-white sm:text-2xl">Foxes Technology</span>
                </motion.div>

                {/* eyebrow */}
                <motion.p variants={heroItem} style={mono} className="mb-5 flex items-center text-[10px] uppercase tracking-[0.22em] text-amber-200/75 sm:mb-6 sm:text-[11px]">
                  Egypt<GoldDot />GCC<GoldDot />MENA
                </motion.p>

                {/* headline */}
                <motion.h1 variants={heroItem} style={serif} className="text-[2.05rem] font-medium leading-[1.06] tracking-[-0.02em] text-white drop-shadow-[0_8px_34px_rgba(0,0,0,0.6)] sm:text-[3.4rem] sm:leading-[1.02] lg:text-[4.5rem]">
                  <span className="block">The future of travel</span>
                  <span className="relative block">
                    <span className="invisible" aria-hidden>intelligence</span>
                    <span className="absolute inset-0 flex items-center justify-center">
                      <AnimatePresence initial={false} mode="popLayout">
                        <motion.span key={wordIdx} initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }} transition={{ duration: 0.55, ease: EASE }} className="fx-gold-shimmer inline-block pb-[0.08em]">
                          {ROTATING_WORDS[wordIdx]}
                        </motion.span>
                      </AnimatePresence>
                    </span>
                  </span>
                  <span className="block">is almost here.</span>
                </motion.h1>

                <motion.p variants={heroItem} className="mx-auto mt-6 max-w-md text-[14.5px] font-light leading-relaxed text-amber-50/70 sm:text-[15.5px]">
                  We&apos;re building the next generation of travel technology for Egypt, the GCC &amp; MENA — AI booking,
                  voice, search, an attraction network and support, in one beautifully simple platform.
                </motion.p>

                <motion.div variants={heroItem} className="mt-8 sm:mt-9"><Countdown time={timeLeft} /></motion.div>
                <motion.div variants={heroItem} className="mt-8 flex w-full flex-col items-center sm:mt-9">
                  <Waitlist email={email} setEmail={setEmail} onSubmit={handleSubmit} isSubmitted={isSubmitted} />
                </motion.div>
              </div>
            </div>
          </div>

          {/* slide label + dots */}
          <motion.div variants={heroItem} className="mt-7 flex flex-col items-center gap-3">
            <div className="flex h-4 items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span key={slide} style={mono} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease: EASE }} className="text-[10px] uppercase tracking-[0.3em] text-amber-100/70">
                  {SLIDE_NAMES[slide]}
                </motion.span>
              </AnimatePresence>
            </div>
            <div className="flex items-center justify-center gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button key={i} type="button" onClick={() => setSlide(i)} aria-label={`View ${SLIDE_NAMES[i]}`} className={`h-1.5 rounded-full transition-all duration-500 ${slide === i ? 'w-7 bg-gradient-to-r from-amber-200 to-amber-400' : 'w-1.5 bg-white/25 hover:bg-white/45'}`} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* scroll cue */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex" style={{ animation: 'fxBob 2.4s ease-in-out infinite' }}>
          <span style={mono} className="text-[9px] uppercase tracking-[0.3em] text-amber-100/40">Scroll</span>
          <span className="h-8 w-px bg-gradient-to-b from-amber-200/50 to-transparent" />
        </div>
      </section>

      {/* ===== ECOSYSTEM MARQUEE ===== */}
      <div className="relative overflow-hidden border-y border-white/[0.06] bg-[#0c0a07] py-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0c0a07] to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0c0a07] to-transparent sm:w-40" />
        <div className="fx-marquee-track" style={mono}>
          {[0, 1].map((dup) => (
            <div key={dup} className="flex items-center" aria-hidden={dup === 1}>
              {PLATFORM.concat(PLATFORM.slice(0, 0)).map((p, i) => (
                <span key={`${dup}-${i}`} className="flex items-center text-[12px] uppercase tracking-[0.18em] text-amber-50/45">
                  <span className="px-6">{p.title}</span>
                  <span className="size-1 rounded-full bg-amber-300/50" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ===== PLATFORM ===== */}
      <section className="relative mx-auto max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:py-32">
        <motion.div {...fadeUp} className="mb-12 text-center sm:mb-14">
          <p style={mono} className="mb-4 text-[10px] uppercase tracking-[0.32em] text-amber-200/65 sm:text-[11px]">What we&apos;re building</p>
          <h2 style={serif} className="text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-[3.25rem]">Six products. <span className="fx-gold">One platform.</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {PLATFORM.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div key={p.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }} className="group relative rounded-[1.4rem] fx-hairline p-px transition-transform duration-500 hover:-translate-y-1.5">
                <div className="relative h-full overflow-hidden rounded-[1.35rem] bg-[#100c08]/80 p-7 backdrop-blur-xl sm:p-8">
                  <div className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-[radial-gradient(circle,rgba(234,186,99,0.16),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative mb-6 flex size-12 items-center justify-center rounded-xl fx-hairline p-px">
                    <span className="flex size-full items-center justify-center rounded-[11px] bg-[#1a130c] text-amber-300"><Icon className="size-5" strokeWidth={1.6} /></span>
                  </div>
                  <div className="relative flex items-baseline justify-between gap-3">
                    <h3 style={serif} className="text-xl font-medium text-white sm:text-[1.4rem]">{p.title}</h3>
                    <span style={mono} className="text-[11px] tabular-nums text-amber-200/35">0{i + 1}</span>
                  </div>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-amber-50/60">{p.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative overflow-hidden border-y border-white/[0.06] bg-[#0c0a07]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_120%_at_50%_0%,rgba(234,170,80,0.08),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-16 sm:py-20 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div key={s.l} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.08 }} className="flex flex-col items-center text-center">
              <span style={serif} className="fx-gold text-5xl font-medium leading-none sm:text-6xl">{s.n}</span>
              <span style={mono} className="mt-3 text-[10px] uppercase tracking-[0.24em] text-amber-50/45 sm:text-[11px]">{s.l}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="relative overflow-hidden">
        <Image src="/coming-soon/egypt.png" alt="" fill sizes="100vw" className="object-cover opacity-[0.08]" />
        <div className="absolute inset-0 bg-[#0a0806]/90" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 sm:py-28">
          <motion.div {...fadeUp} className="mb-12 text-center">
            <p style={mono} className="mb-4 text-[10px] uppercase tracking-[0.32em] text-amber-200/65 sm:text-[11px]">Good to know</p>
            <h2 style={serif} className="text-3xl font-medium text-white sm:text-4xl lg:text-[3.25rem]">Questions, <span className="fx-gold">answered.</span></h2>
          </motion.div>
          <motion.div {...fadeUp} className="rounded-[1.6rem] fx-hairline p-px">
            <div className="overflow-hidden rounded-[1.55rem] bg-[#100c08]/80 px-5 backdrop-blur-xl sm:px-7">
              <div className="divide-y divide-white/[0.07]">
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative overflow-hidden">
        <Image src="/coming-soon/saudi.png" alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0806] via-[#0a0806]/85 to-[#0a0806]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 size-[70vw] max-w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(234,170,80,0.16),transparent_64%)] blur-3xl" />
        <motion.div {...fadeUp} className="relative z-10 mx-auto w-full max-w-xl px-5 py-20 sm:py-28">
          <div className="relative rounded-[2.1rem] fx-hairline p-px shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
            <div className="relative overflow-hidden rounded-[2.05rem] bg-[#0d0a07]/75 px-7 py-12 text-center backdrop-blur-2xl sm:px-12 sm:py-14">
              <Sparkles className="mx-auto mb-5 size-6 text-amber-300" strokeWidth={1.5} />
              <h2 style={serif} className="text-3xl font-medium leading-tight text-white sm:text-4xl lg:text-[2.9rem]">Be the first <span className="fx-gold">through the door.</span></h2>
              <p className="mx-auto mt-4 max-w-md text-[15px] text-amber-50/65">Join the priority list and be first in when we go live on July 15th, 2026.</p>
              <div className="mt-9 flex w-full flex-col items-center">
                <Waitlist email={email} setEmail={setEmail} onSubmit={handleSubmit} isSubmitted={isSubmitted} proof={false} />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/[0.06] bg-[#0c0a07] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
          <div className="flex items-center gap-2.5">
            <Image src="/foxes1.png" alt="" width={26} height={26} className="size-6 object-contain" />
            <span style={serif} className="text-sm tracking-wide text-amber-50/70">Foxes Technology</span>
          </div>
          <div style={mono} className="flex gap-7 text-[11px] uppercase tracking-[0.22em] text-amber-50/40">
            <a href="/contact" className="transition-colors hover:text-amber-100">Contact</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-amber-100">Instagram</a>
            <a href="/privacy-policy" className="transition-colors hover:text-amber-100">Privacy</a>
          </div>
          <span className="text-[11px] text-amber-50/30">© 2026 Foxes Technology · Egypt · GCC · MENA</span>
        </div>
      </footer>
    </div>
  );
}
