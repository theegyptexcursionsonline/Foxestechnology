'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Play,
  Star,
  CheckCircle,
  TrendingUp,
  Users,
  Globe2,
  Zap,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

/**
 * Polished Hero component with smooth cross-fade (no white flash),
 * device mockup on the right, preloaded next image, improved controls,
 * accessibility, pause-on-hover, and reduced layout shift.
 *
 * Replace URLs in `slides` and `mockup` with your real assets.
 */

const FoxestechnologyHero = () => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const slides = [
    {
      image:
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop',
      title: 'Mountain Adventures',
      location: 'Swiss Alps'
    },
    {
      image:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
      title: 'Beach Destinations',
      location: 'Maldives'
    },
    {
      image:
        'https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070&auto=format&fit=crop',
      title: 'City Experiences',
      location: 'Dubai'
    },
    {
      image:
        'https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=2070&auto=format&fit=crop',
      title: 'Cultural Tours',
      location: 'Morocco'
    },
    {
      image:
        'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop',
      title: 'Island Getaways',
      location: 'Santorini'
    }
  ];

  // Placeholder mockup - replace with a real screenshot of your product
  const mockup = {
    image: 'https://via.placeholder.com/1200x800.png?text=Your+App+Mockup',
    alt: 'Software mockup'
  };

  // Auto-play interval (ms)
  const INTERVAL = 5000;

  // Preload next image to avoid white flash or flicker
  useEffect(() => {
    const next = (current + 1) % slides.length;
    const img = new window.Image();
    img.src = slides[next].image;
    // small cleanup
    return () => {
      // nothing required — browser handles cached images
    };
  }, [current, slides]);

  // Autoplay with pause on hover/focus
  useEffect(() => {
    if (paused) return;
    timeoutRef.current = window.setTimeout(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, INTERVAL);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [current, paused, slides.length]);

  const next = () => setCurrent((c) => (c + 1) % slides.length);
  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const goTo = (i: number) => setCurrent(i);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // small swipe handler for touch devices
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let startX = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const endX = (e.changedTouches && e.changedTouches[0].clientX) || 0;
      const dx = endX - startX;
      if (dx > 50) prev();
      if (dx < -50) next();
    };

    el.addEventListener('touchstart', onTouchStart);
    el.addEventListener('touchend', onTouchEnd);

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      aria-label="Hero"
      className="relative h-screen min-h-[680px] overflow-hidden bg-slate-900" // dark background prevents white flash
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Layers: keep them absolutely stacked and cross-fade using AnimatePresence */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          {slides.map((s, idx) => (
            idx === current && (
              <motion.div
                key={s.image}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1280px) 1200px, 100vw"
                  priority={idx < 2} // prioritize first two
                />

                {/* gradient overlay to keep contrast stable and avoid flash between slides */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* Left content column */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 flex items-center gap-8">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-3 bg-white/6 backdrop-blur rounded-full px-5 py-2 mb-6 border border-white/10"
            >
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-white/90 font-medium">World&apos;s Leading Travel Tech Platform</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5"
            >
              Transform Your
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-300 bg-clip-text text-transparent">Travel Business</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-lg md:text-xl text-white/80 mb-8"
            >
              Complete tour & operations software to streamline operations, boost bookings and deliver exceptional experiences.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/get-started"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-2xl"
                aria-label="Get started free"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/6 backdrop-blur border border-white/10 text-white font-semibold"
                aria-label="Watch demo"
              >
                <Play className="w-4 h-4" /> Watch Demo
              </button>
            </motion.div>

            {/* Feature chips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md"
            >
              <div className="flex items-start gap-3 text-white/90">
                <div className="w-10 h-10 rounded-lg bg-white/6 flex items-center justify-center border border-white/6">
                  <CheckCircle className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <div className="font-medium text-white">No Credit Card</div>
                  <div className="text-sm text-white/70">Free 14-day trial</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-white/90">
                <div className="w-10 h-10 rounded-lg bg-white/6 flex items-center justify-center border border-white/6">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-white">10,000+ Users</div>
                  <div className="text-sm text-white/70">Trusted worldwide</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-white/90">
                <div className="w-10 h-10 rounded-lg bg-white/6 flex items-center justify-center border border-white/6">
                  <TrendingUp className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-medium text-white">40% Growth</div>
                  <div className="text-sm text-white/70">Average increase</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-white/90">
                <div className="w-10 h-10 rounded-lg bg-white/6 flex items-center justify-center border border-white/6">
                  <Zap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="font-medium text-white">99.9% Uptime</div>
                  <div className="text-sm text-white/70">Enterprise-grade reliability</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Device mockup */}
          <div className="hidden lg:block lg:flex-1 relative"> 
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="relative rounded-3xl shadow-2xl overflow-hidden"
              aria-hidden="true"
            >
              <div className="relative w-[520px] h-[360px] rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-6">
                {/* device frame */}
                <div className="absolute inset-4 rounded-2xl border border-white/6 shadow-inner bg-black/30" />

                {/* Mockup screenshot */}
                <motion.div
                  layout
                  className="relative w-full h-full rounded-xl overflow-hidden"
                >
                  <Image
                    src={mockup.image}
                    alt={mockup.alt}
                    fill
                    className="object-cover"
                    sizes="520px"
                    priority
                  />
                </motion.div>

                {/* subtle floating controls */}
                <div className="absolute -bottom-8 left-6">
                  <div className="bg-gradient-to-r from-cyan-500/80 to-blue-500/80 px-4 py-2 rounded-full text-xs font-medium text-white shadow-lg">Live demo · No credit card</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide controls & indicators (centered, accessible) */}
      <div className="absolute inset-x-0 bottom-8 z-20 flex items-center justify-center gap-6">
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="w-11 h-11 rounded-full bg-white/8 backdrop-blur border border-white/10 flex items-center justify-center hover:scale-105 transition-transform"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>

        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 ${
                current === i ? 'w-10 h-1.5 rounded-full bg-white' : 'w-2 h-2 rounded-full bg-white/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next slide"
          className="w-11 h-11 rounded-full bg-white/8 backdrop-blur border border-white/10 flex items-center justify-center hover:scale-105 transition-transform"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Floating stats for large screens */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="hidden xl:block absolute bottom-24 right-12 z-20"
      >
        <div className="bg-white rounded-2xl p-4 shadow-2xl w-56">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">99.9%</div>
              <div className="text-sm text-slate-600">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default FoxestechnologyHero;
