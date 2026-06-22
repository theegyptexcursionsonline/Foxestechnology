'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ExitIntentModal from '@/components/ExitIntentModal';

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showExitIntent, setShowExitIntent] = useState(false);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Countdown timer (until July 15, 2026)
  useEffect(() => {
    setMounted(true);
    const targetDate = new Date('2026-07-15T00:00:00').getTime();

    const calculateTime = () => {
      const now = Date.now();
      const distance = targetDate - now;

      if (distance <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTime());
    const interval = setInterval(() => setTimeLeft(calculateTime()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Exit intent detection
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntent && !isSubmitted) {
        setShowExitIntent(true);
        setHasShownExitIntent(true);
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

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
    }, 5000);
  };

  const handleExitIntentEmailSubmit = (exitEmail: string) => {
    console.log('Exit intent email submitted:', exitEmail);
  };

  return (
    <>
      <ExitIntentModal
        isOpen={showExitIntent}
        onClose={() => setShowExitIntent(false)}
        onEmailSubmit={handleExitIntentEmailSubmit}
      />

      <div className="min-h-screen bg-[#0A0A0F] text-white overflow-x-hidden relative">
        {/* Background Video */}
        <div className="fixed inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/videos/travel-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-[#0A0A0F]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F]/40 via-transparent to-[#0A0A0F]/70" />
        </div>

        {/* Ambient Background */}
        <div className="fixed inset-0 pointer-events-none z-[1]">
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/[0.15] rounded-full blur-[150px] animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/[0.12] rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-to-br from-indigo-900/10 via-transparent to-transparent rounded-full blur-[200px]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-pink-600/[0.06] rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '2s' }} />

          {/* Dot grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dp" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.8" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dp)" />
          </svg>

          {/* Radial spotlight */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px]"
            style={{ background: 'radial-gradient(ellipse at center top, rgba(59,130,246,0.08) 0%, rgba(99,102,241,0.04) 40%, transparent 70%)' }}
          />
        </div>

        {/* Floating geometric decorations */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full border border-blue-500/[0.08]"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -top-10 -right-10 w-[340px] h-[340px] rounded-full border border-purple-500/[0.06]"
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full border border-indigo-500/[0.06]"
            animate={{ rotate: -360 }}
            transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          />

          {/* Floating diamonds */}
          <motion.div
            className="absolute top-[20%] left-[8%] w-3 h-3 rotate-45 border border-blue-400/20"
            animate={{ y: [-10, 10], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute top-[70%] right-[10%] w-2.5 h-2.5 rotate-45 border border-purple-400/20"
            animate={{ y: [8, -8], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          {/* Floating dots */}
          <motion.div
            className="absolute top-[30%] right-[12%] w-2 h-2 rounded-full bg-purple-400/25"
            animate={{ y: [0, -15, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-[40%] left-[5%] w-1.5 h-1.5 rounded-full bg-blue-400/30"
            animate={{ y: [0, 12, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.div
            className="absolute top-[15%] left-[18%] w-1 h-1 rounded-full bg-pink-400/30"
            animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          />
          <motion.div
            className="absolute top-[50%] right-[6%] w-1.5 h-1.5 rounded-full bg-emerald-400/20"
            animate={{ y: [0, -10, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          {/* Plus shapes */}
          <motion.svg
            className="absolute top-[22%] right-[7%] w-6 h-6 text-blue-400/[0.12]"
            animate={{ rotate: [0, 90], opacity: [0.12, 0.25, 0.12] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
          >
            <path d="M12 5v14M5 12h14" />
          </motion.svg>
          <motion.svg
            className="absolute bottom-[30%] left-[10%] w-5 h-5 text-purple-400/[0.12]"
            animate={{ rotate: [0, -90], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
          >
            <path d="M12 5v14M5 12h14" />
          </motion.svg>

          {/* Hexagon */}
          <motion.svg
            className="absolute top-[28%] left-[3%] w-16 h-16 text-indigo-400/[0.06]"
            animate={{ rotate: [0, 60], y: [-5, 5, -5] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1"
          >
            <polygon points="50,3 95,25 95,75 50,97 5,75 5,25" />
          </motion.svg>

          {/* Triangle */}
          <motion.svg
            className="absolute bottom-[25%] right-[4%] w-12 h-12 text-pink-400/[0.06]"
            animate={{ rotate: [0, -120], y: [3, -3, 3] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5"
          >
            <polygon points="50,10 90,85 10,85" />
          </motion.svg>

          {/* Gradient lines */}
          <div className="absolute top-[45%] left-0 w-40 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
          <div className="absolute top-[55%] right-0 w-48 h-px bg-gradient-to-l from-transparent via-purple-500/15 to-transparent" />
          <div className="absolute top-[35%] right-0 w-24 h-px bg-gradient-to-l from-transparent via-pink-500/10 to-transparent" />
        </div>

        {/* ==================== MAIN CONTENT ==================== */}
        <div className="relative z-10">

          {/* HERO SECTION */}
          <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20">
            <div className="max-w-5xl mx-auto text-center w-full">

              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-8 flex justify-center"
              >
                <motion.div
                  className="relative"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="absolute inset-0 blur-3xl bg-blue-500/20 rounded-full scale-150" />
                  <Image
                    src="/foxes1.png"
                    alt="Foxes Technology"
                    width={160}
                    height={160}
                    className="relative w-24 h-24 md:w-36 md:h-36 object-contain drop-shadow-2xl"
                    priority
                  />
                </motion.div>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="flex justify-center mb-10"
              >
                <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/[0.08] via-purple-500/[0.08] to-pink-500/[0.08] border border-blue-500/20 backdrop-blur-sm shadow-lg shadow-blue-500/[0.05]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-sm text-slate-300 font-medium">Launching July 15th, 2026</span>
                  <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="mb-8 relative"
              >
                {/* Glow behind headline */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-blue-500/[0.08] rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[150px] bg-purple-500/[0.06] rounded-full blur-[80px] pointer-events-none" />

                <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tight leading-[0.95] relative" style={{ perspective: '800px' }}>
                  {/* Deep shadow layers for 3D extrusion effect */}
                  {[6, 5, 4, 3, 2, 1].map((i) => (
                    <span
                      key={i}
                      aria-hidden="true"
                      className="absolute inset-0 text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tight leading-[0.95] pointer-events-none select-none"
                      style={{
                        transform: `translate(${i * 1.2}px, ${i * 1.8}px)`,
                        color: `rgba(15, 15, 30, ${0.6 - i * 0.05})`,
                        WebkitTextStroke: i === 6 ? '1px rgba(59,130,246,0.08)' : 'none',
                      }}
                    >
                      <span className="block">Something Big</span>
                      <span className="block mt-2">is Coming</span>
                    </span>
                  ))}

                  {/* Bright edge / highlight layer */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 text-5xl md:text-7xl lg:text-[6.5rem] font-black tracking-tight leading-[0.95] pointer-events-none select-none"
                    style={{
                      transform: 'translate(-0.5px, -0.5px)',
                      WebkitTextStroke: '1px rgba(255,255,255,0.1)',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    <span className="block">Something Big</span>
                    <span className="block mt-2">is Coming</span>
                  </span>

                  {/* Main text - "Something Big" */}
                  <span
                    className="block relative text-white"
                    style={{
                      textShadow: '0 1px 0 rgba(255,255,255,0.15), 0 -1px 2px rgba(0,0,0,0.5), 0 4px 15px rgba(0,0,0,0.4), 0 0 60px rgba(59,130,246,0.2), 0 0 120px rgba(99,102,241,0.1)',
                    }}
                  >
                    Something Big
                  </span>

                  {/* Main text - "is Coming" with animated gradient */}
                  <motion.span
                    className="block mt-2 relative"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                    style={{
                      background: 'linear-gradient(270deg, #60a5fa, #a78bfa, #f472b6, #fb923c, #60a5fa)',
                      backgroundSize: '200% 200%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      filter: 'drop-shadow(0 2px 0 rgba(0,0,0,0.4)) drop-shadow(0 4px 8px rgba(0,0,0,0.3)) drop-shadow(0 8px 40px rgba(99,102,241,0.4))',
                    }}
                  >
                    is Coming
                  </motion.span>
                </h1>
              </motion.div>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-14 leading-relaxed"
              >
                We&apos;re building the next generation of travel technology
                for <span className="text-blue-400 font-semibold">Egypt</span> and the <span className="text-purple-400 font-semibold">GCC region</span>.
                Something you&apos;ve never seen before. Launching{' '}
                <span className="text-white font-semibold">July 15th, 2026</span>.
              </motion.p>

              {/* Countdown Timer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.6 }}
                className="grid grid-cols-4 gap-3 md:gap-5 max-w-2xl mx-auto mb-14"
              >
                {[
                  { value: timeLeft.days, label: 'Days', dotColor: 'bg-blue-400', glowColor: 'shadow-blue-500/20' },
                  { value: timeLeft.hours, label: 'Hours', dotColor: 'bg-purple-400', glowColor: 'shadow-purple-500/20' },
                  { value: timeLeft.minutes, label: 'Minutes', dotColor: 'bg-pink-400', glowColor: 'shadow-pink-500/20' },
                  { value: timeLeft.seconds, label: 'Seconds', dotColor: 'bg-emerald-400', glowColor: 'shadow-emerald-500/20' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.55 + index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative group"
                  >
                    <div className={`relative p-4 md:p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 shadow-lg ${item.glowColor} group-hover:bg-white/[0.05]`}>
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                      <div className="relative">
                        <div className={`w-1.5 h-1.5 rounded-full ${item.dotColor} mb-3 mx-auto shadow-sm`} style={{ boxShadow: `0 0 8px currentColor` }} />
                        <div className="text-3xl md:text-5xl font-bold text-white mb-1.5 tabular-nums font-mono">
                          {mounted ? item.value.toString().padStart(2, '0') : '--'}
                        </div>
                        <div className="text-[10px] md:text-xs text-slate-500 uppercase tracking-[0.2em] font-medium">
                          {item.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Email Signup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="max-w-lg mx-auto mb-8"
              >
                <p className="text-sm text-slate-500 mb-5">
                  Be the first to know. Get exclusive early access and launch-day perks.
                </p>

                <form onSubmit={handleSubmit}>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        disabled={isSubmitted}
                        className="w-full px-5 py-4 rounded-full bg-white/[0.05] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm text-sm"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      disabled={isSubmitted}
                      whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(59, 130, 246, 0.35)' }}
                      whileTap={{ scale: 0.98 }}
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full font-semibold shadow-2xl shadow-blue-500/25 overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative flex items-center gap-2">
                        {isSubmitted ? (
                          <>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Subscribed!
                          </>
                        ) : (
                          <>
                            Notify Me
                            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </>
                        )}
                      </span>
                    </motion.button>
                  </div>
                </form>

                <AnimatePresence>
                  {isSubmitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                    >
                      <p className="text-emerald-400 text-sm font-medium flex items-center justify-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        You&apos;re all set! We&apos;ll notify you before launch.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Social proof */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="flex flex-col items-center gap-4 mb-4"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2.5">
                    {['from-blue-400 to-blue-600', 'from-purple-400 to-purple-600', 'from-pink-400 to-pink-600', 'from-emerald-400 to-emerald-600', 'from-orange-400 to-orange-600'].map((gradient, i) => (
                      <div key={i} className={`w-8 h-8 rounded-full bg-gradient-to-br ${gradient} border-2 border-[#0A0A0F] flex items-center justify-center text-[10px] font-bold text-white`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="h-6 w-px bg-white/10" />
                  <p className="text-xs text-slate-500">
                    <span className="text-slate-300 font-semibold">1,200+</span> already on the waitlist
                  </p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* TECH STACK MARQUEE SECTION */}
          <section className="py-8 border-t border-white/[0.04]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6 px-6"
            >
              <p className="text-xs text-violet-400 uppercase tracking-[0.2em] font-semibold mb-3">Our Tech Stack</p>
              <h2 className="text-2xl md:text-4xl font-bold text-white">
                Powered by{' '}
                <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">modern technology</span>
              </h2>
            </motion.div>

            <div className="relative overflow-hidden border-y border-white/[0.06] bg-slate-950/50 py-4">
              <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-[#0A0A0F] to-transparent" />
              <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-[#0A0A0F] to-transparent" />
              <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={{ x: ['0%', '-50%'] }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              >
                {[
                  'Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'PostgreSQL',
                  'Stripe', 'OpenAI', 'Anthropic', 'Google Gemini', 'LangChain', 'LlamaIndex',
                  'Pinecone', 'Netlify', 'Hugging Face', 'TensorFlow', 'Python',
                  'React Native', 'Firebase', 'AWS', 'Docker', 'GraphQL', 'Twilio',
                  'Algolia', 'Cloudinary', 'Tailwind CSS', 'Framer Motion',
                  'Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'PostgreSQL',
                  'Stripe', 'OpenAI', 'Anthropic', 'Google Gemini', 'LangChain', 'LlamaIndex',
                  'Pinecone', 'Netlify', 'Hugging Face', 'TensorFlow', 'Python',
                  'React Native', 'Firebase', 'AWS', 'Docker', 'GraphQL', 'Twilio',
                  'Algolia', 'Cloudinary', 'Tailwind CSS', 'Framer Motion',
                ].map((tech, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm font-medium text-gray-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500/60" />
                    {tech}
                  </span>
                ))}
              </motion.div>
            </div>
          </section>

          {/* VISION & MISSION SECTION */}
          <section className="px-6 py-24 border-t border-white/[0.04]">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <p className="text-xs text-cyan-400 uppercase tracking-[0.2em] font-semibold mb-4">Who We Are</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Our{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Vision &amp; Mission</span>
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden group hover:border-blue-500/20 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/[0.05] rounded-full blur-[80px] group-hover:bg-blue-500/[0.1] transition-all duration-500" />
                  <div className="relative">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 blur-lg opacity-40" />
                      <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                    <p className="text-slate-400 leading-relaxed">
                      To be the #1 travel technology partner in MENA — measured by the revenue we help operators generate, the time we save them daily, and the growth we deliver quarter over quarter.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden group hover:border-purple-500/20 transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/[0.05] rounded-full blur-[80px] group-hover:bg-purple-500/[0.1] transition-all duration-500" />
                  <div className="relative">
                    <div className="relative mb-6">
                      <div className="absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 blur-lg opacity-40" />
                      <div className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        </svg>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                    <p className="text-slate-400 leading-relaxed">
                      To deliver measurable results — more bookings, higher revenue, and lower operational costs — through AI-powered technology built specifically for tour operators in Egypt and the GCC.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* CORE VALUES SECTION */}
          <section className="px-6 py-24 border-t border-white/[0.04]">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <p className="text-xs text-emerald-400 uppercase tracking-[0.2em] font-semibold mb-4">What Drives Us</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Our core{' '}
                  <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">values</span>
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
                  These principles guide every decision we make and every line of code we write.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                      </svg>
                    ),
                    title: 'Innovation First',
                    description: 'We push boundaries with AI and cutting-edge technology to solve real problems.',
                    gradient: 'from-blue-500 to-blue-600',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    ),
                    title: 'Customer Obsessed',
                    description: 'Every feature starts with a real need from real operators in the field.',
                    gradient: 'from-pink-500 to-pink-600',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                    ),
                    title: 'Locally Rooted',
                    description: 'Deep understanding of MENA culture, language, and business practices.',
                    gradient: 'from-emerald-500 to-emerald-600',
                  },
                  {
                    icon: (
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                    ),
                    title: 'Built to Scale',
                    description: 'Enterprise-grade architecture that grows seamlessly with your business.',
                    gradient: 'from-orange-500 to-orange-600',
                  },
                ].map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 group text-center overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/[0.02] to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${value.gradient} mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <div className="text-white">{value.icon}</div>
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2">{value.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* STATS SECTION */}
          <section className="px-6 py-20 border-t border-white/[0.04]">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {[
                  { value: '10+', label: 'Countries Supported', dotColor: 'bg-blue-400' },
                  { value: '50+', label: 'Early Partners', dotColor: 'bg-purple-400' },
                  { value: '3+', label: 'Years in Development', dotColor: 'bg-pink-400' },
                  { value: '24/7', label: 'Support Ready', dotColor: 'bg-emerald-400' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="text-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.04] transition-all duration-500 group"
                  >
                    <div className={`w-2 h-2 rounded-full ${stat.dotColor} mx-auto mb-4 group-hover:scale-125 transition-transform duration-300`} style={{ boxShadow: '0 0 10px currentColor' }} />
                    <p className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-105 transition-transform duration-300">{stat.value}</p>
                    <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* WHAT TO EXPECT SECTION */}
          <section className="px-6 py-24 border-t border-white/[0.04]">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <p className="text-xs text-blue-400 uppercase tracking-[0.2em] font-semibold mb-4">What to Expect</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Built to{' '}
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">transform</span>
                  {' '}how you operate
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
                  We&apos;re crafting something special for tour &amp; activity operators. Here&apos;s a taste of what&apos;s ahead.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                      </svg>
                    ),
                    title: 'Lightning Fast',
                    description: 'Speed and performance at the core. Every interaction is designed to be instant and seamless.',
                    color: 'text-blue-400',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                      </svg>
                    ),
                    title: 'AI-Powered',
                    description: 'Intelligent automation that works around the clock so you can focus on what matters most.',
                    color: 'text-purple-400',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                      </svg>
                    ),
                    title: 'Built for MENA',
                    description: 'Designed from the ground up for the unique needs of the Middle East and North Africa region.',
                    color: 'text-pink-400',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                      </svg>
                    ),
                    title: 'Multi-Language',
                    description: 'Full Arabic and English support with more languages on the way. Reach every customer.',
                    color: 'text-emerald-400',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    ),
                    title: 'Enterprise Grade',
                    description: 'Bank-level security, 99.9% uptime guarantee, and built to scale with your business.',
                    color: 'text-yellow-400',
                  },
                  {
                    icon: (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>
                    ),
                    title: 'Mobile Ready',
                    description: 'Manage everything on the go. Native mobile experiences for you and your team.',
                    color: 'text-orange-400',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, duration: 0.5 }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.1] transition-all duration-500 group overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/[0.02] to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className={`${item.color} mb-4 w-10 h-10 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] group-hover:bg-white/[0.08] group-hover:scale-110 transition-all duration-300`}>
                      {item.icon}
                    </div>
                    <h3 className="text-base font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-400 transition-colors">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS SECTION */}
          <section className="px-6 py-24 border-t border-white/[0.04]">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <p className="text-xs text-purple-400 uppercase tracking-[0.2em] font-semibold mb-4">How It Works</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Get started in{' '}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">3 simple steps</span>
                </h2>
                <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
                  From signup to your first day — no technical skills required.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Connecting line (desktop only) */}
                <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />

                {[
                  {
                    step: '01',
                    title: 'Sign Up',
                    description: 'Create your account in seconds and tell us about your business. Our guided setup makes it effortless.',
                    color: 'from-blue-500 to-blue-600',
                    borderColor: 'hover:border-blue-500/20',
                  },
                  {
                    step: '02',
                    title: 'Customize',
                    description: 'Configure everything to match your brand and workflows. Import your existing data seamlessly.',
                    color: 'from-purple-500 to-purple-600',
                    borderColor: 'hover:border-purple-500/20',
                  },
                  {
                    step: '03',
                    title: 'Go Live',
                    description: 'Launch and start seeing results immediately. Our team is there every step of the way.',
                    color: 'from-pink-500 to-pink-600',
                    borderColor: 'hover:border-pink-500/20',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15, duration: 0.5 }}
                    className={`relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] ${item.borderColor} transition-all duration-300`}
                  >
                    <div className="relative mb-6">
                      <div className={`absolute inset-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} blur-lg opacity-40`} />
                      <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-lg font-bold shadow-lg`}>
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ROADMAP SECTION */}
          <section className="px-6 py-24 border-t border-white/[0.04]">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <p className="text-xs text-orange-400 uppercase tracking-[0.2em] font-semibold mb-4">Roadmap</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Our journey to{' '}
                  <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">launch</span>
                </h2>
              </motion.div>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-pink-500/30" />

                <div className="space-y-8">
                  {[
                    {
                      date: 'Q3 2025',
                      title: 'Foundation Complete',
                      description: 'Core platform architecture built, tested, and ready for prime time.',
                      status: 'done',
                      color: 'bg-emerald-500',
                    },
                    {
                      date: 'Q4 2025',
                      title: 'AI Integration',
                      description: 'Intelligent features powered by the latest AI, designed for the travel industry.',
                      status: 'done',
                      color: 'bg-emerald-500',
                    },
                    {
                      date: 'Q1 2026',
                      title: 'Private Beta',
                      description: 'Testing with select partners across Egypt to refine and perfect the experience.',
                      status: 'current',
                      color: 'bg-blue-500',
                    },
                    {
                      date: 'Q2 2026',
                      title: 'Public Launch',
                      description: 'Doors open on July 15th. Full platform available to everyone.',
                      status: 'upcoming',
                      color: 'bg-slate-600',
                    },
                    {
                      date: 'H2 2026',
                      title: 'Scale & Expand',
                      description: 'Regional expansion across the GCC with new features and partnerships.',
                      status: 'upcoming',
                      color: 'bg-slate-600',
                    },
                  ].map((milestone, index) => (
                    <motion.div
                      key={milestone.date}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="relative pl-16 md:pl-20"
                    >
                      {/* Timeline dot */}
                      <div className={`absolute left-4 md:left-6 top-1 w-4 h-4 rounded-full ${milestone.color} border-4 border-[#0A0A0F]`}>
                        {milestone.status === 'current' && (
                          <span className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-50" />
                        )}
                      </div>

                      <div className="pb-2">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{milestone.date}</span>
                          {milestone.status === 'done' && (
                            <span className="text-[9px] font-semibold text-emerald-400 uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Complete</span>
                          )}
                          {milestone.status === 'current' && (
                            <span className="text-[9px] font-semibold text-blue-400 uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20">In Progress</span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-1">{milestone.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{milestone.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* FAQ SECTION */}
          <section className="px-6 py-24 border-t border-white/[0.04]">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <p className="text-xs text-slate-400 uppercase tracking-[0.2em] font-semibold mb-4">FAQ</p>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                  Frequently asked{' '}
                  <span className="bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent">questions</span>
                </h2>
              </motion.div>

              <div className="space-y-3">
                {[
                  {
                    question: 'When is the official launch date?',
                    answer: 'We are launching on July 15th, 2026. Join our waitlist to be the first to know and get exclusive early access.',
                  },
                  {
                    question: 'Who is this platform built for?',
                    answer: 'Tour operators, activity providers, and travel businesses primarily in Egypt and the GCC region, though our platform works globally.',
                  },
                  {
                    question: 'Will there be a free trial?',
                    answer: 'Yes! All plans will include a free trial with full access to explore the platform. Waitlist members get extended trial periods.',
                  },
                  {
                    question: 'Can I migrate from my current system?',
                    answer: 'Absolutely. We provide free migration assistance to make the transition smooth and hassle-free.',
                  },
                  {
                    question: 'Is Arabic language supported?',
                    answer: 'Yes, full Arabic and English support is built in from day one, with more languages coming soon.',
                  },
                  {
                    question: 'How can I stay updated?',
                    answer: 'Join the waitlist above to receive updates directly in your inbox. You can also follow us on social media for the latest news.',
                  },
                ].map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-white/[0.08] transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <div className="flex items-center gap-4 pr-4">
                        <span className="text-xs font-bold text-slate-600 tabular-nums">{(index + 1).toString().padStart(2, '0')}</span>
                        <span className="text-sm md:text-base font-medium text-white">{faq.question}</span>
                      </div>
                      <motion.svg
                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-5 h-5 text-slate-500 flex-shrink-0"
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </motion.svg>
                    </button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-slate-500 leading-relaxed">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* PARTNERS / TRUST SECTION */}
          <section className="px-6 py-16 border-t border-white/[0.04]">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-xs text-slate-600 uppercase tracking-[0.2em] mb-6">Trusted by operators across the region</p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  {['Egypt', 'Saudi Arabia', 'UAE', 'Jordan', 'Oman', 'Qatar', 'Bahrain', 'Kuwait'].map((name) => (
                    <span key={name} className="text-[11px] font-semibold tracking-wide text-slate-500/60 uppercase px-4 py-2 rounded-full border border-white/[0.04] bg-white/[0.02] hover:border-white/[0.08] hover:text-slate-400 transition-all duration-300">
                      {name}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* BOTTOM CTA SECTION */}
          <section className="px-6 py-24 border-t border-white/[0.04]">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="p-10 md:p-14 rounded-3xl bg-gradient-to-br from-blue-600/[0.08] via-purple-600/[0.05] to-pink-600/[0.08] border border-blue-500/10 relative overflow-hidden">
                  {/* Background glow */}
                  <div className="absolute top-0 right-0 w-60 h-60 bg-blue-500/10 rounded-full blur-[100px]" />
                  <div className="absolute bottom-0 left-0 w-60 h-60 bg-purple-500/10 rounded-full blur-[100px]" />

                  <div className="relative">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                      Don&apos;t miss the{' '}
                      <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">launch</span>
                    </h2>
                    <p className="text-slate-400 mb-10 text-sm md:text-base max-w-xl mx-auto">
                      Join 1,200+ operators already on the waitlist. Be the first to experience what we&apos;ve been building.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <motion.button
                        whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(59, 130, 246, 0.35)' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full font-semibold shadow-2xl shadow-blue-500/25 overflow-hidden text-sm"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                        <span className="relative flex items-center gap-2">
                          Join the Waitlist
                          <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </motion.button>
                      <a href="mailto:info@foxestechnology.com">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-8 py-4 rounded-full text-sm font-semibold border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
                        >
                          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Contact Us
                        </motion.button>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="px-6 py-12 border-t border-white/[0.04]">
            <div className="max-w-5xl mx-auto flex flex-col items-center gap-6">
              <div className="flex justify-center gap-4">
                {[
                  { name: 'LinkedIn', icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z' },
                  { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                  { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.12] hover:bg-white/[0.06] transition-all duration-300 flex items-center justify-center group"
                    aria-label={social.name}
                  >
                    <svg className="w-4 h-4 text-slate-600 group-hover:text-slate-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
              <p className="text-xs text-slate-600">
                &copy; 2026 Foxes Technology. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}