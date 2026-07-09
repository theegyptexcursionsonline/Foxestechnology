// components/Hero.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence, useInView, useSpring, useTransform, type Variants } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, BarChart2, DollarSign } from 'lucide-react';

// --- Configuration (Aligned with Foxes Technology Brand Brief) ---
const BACKGROUND_IMAGES = [
  { src: '/images/hero/egypt-temple-tourists.jpg', alt: 'Tourists exploring ancient Egyptian temples with a digital guide' },
  { src: '/images/hero/pos-terminal-sale.jpg', alt: 'Tour operator making a sale in-person using a Foxes Handheld POS' },
  { src: '/images/hero/travel-kiosk-user.jpg', alt: 'Traveler using a self-service Kiosk to book an attraction' },
];

// --- Animated Counter Component ---
function Counter({ value, className }: { value: number, className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const spring = useSpring(isInView ? value : 0, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });

  const display = useTransform(spring, (current) => {
    if (value >= 1000000) {
      return `${(current / 1000000).toFixed(1)}M+`;
    }
    if (value >= 1000) {
      return `${Math.round(current / 1000)}k+`;
    }
    return Math.round(current).toLocaleString() + '+';
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    }
  }, [isInView, value, spring]);

  return <motion.span ref={ref} className={className}>{display}</motion.span>;
}

// --- Main Hero Component ---
export default function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="relative min-h-screen w-full overflow-hidden bg-white text-dark-grey">
      <BackgroundSlider />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-screen grid-cols-1 items-center gap-16 py-24 lg:grid-cols-2 lg:gap-8">
          <HeroContent isInView={isInView} />
          <DeviceMockup isInView={isInView} />
        </div>
      </div>
    </section>
  );
}

// --- Sub-component: Background Image Slider ---
const BackgroundSlider = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="absolute inset-0 z-0">
        <AnimatePresence>
          <motion.div
            key={currentImage}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, transition: { duration: 1.5, ease: 'easeOut' } }}
            exit={{ scale: 1.05, opacity: 0, transition: { duration: 1.2, ease: 'easeIn' } }}
            className="absolute inset-0"
          >
            <Image
              src={BACKGROUND_IMAGES[currentImage].src}
              alt={BACKGROUND_IMAGES[currentImage].alt}
              fill
              className="object-cover"
              priority={currentImage === 0}
              quality={90}
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* Dark overlay for contrast and premium feel */}
      <div className="absolute inset-0 z-1 bg-gradient-to-r from-white via-white/90 to-white/10" />
      <div className="absolute inset-0 z-1 bg-gradient-to-t from-white via-white/20 to-transparent" />
    </>
  );
};

// --- Sub-component: Left-side Hero Content ---
const HeroContent = ({ isInView }: { isInView: boolean }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="z-20 space-y-8 text-center lg:text-left"
    >
      <motion.div variants={itemVariants}>
        <div className="inline-flex items-center gap-3 rounded-full border border-orange-200 bg-orange-50/80 px-4 py-2 shadow-sm backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-foxes-orange opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-foxes-orange"></span>
          </span>
          <span className="text-sm font-semibold text-dark-grey">
            Digital Transformation for Tourism
          </span>
        </div>
      </motion.div>
      <motion.h1 variants={itemVariants} className="font-goldplay text-5xl font-bold leading-tight tracking-tight text-black sm:text-6xl lg:text-7xl">
        Transform Your Travel Business.
      </motion.h1>
      <motion.p variants={itemVariants} className="max-w-xl text-lg leading-relaxed text-dark-grey lg:text-xl">
        Digitize your tours with our cutting-edge booking system, AI chatbots, and seamless payment solutions. Built for operators in Egypt and the GCC.
      </motion.p>
      <motion.div variants={itemVariants} className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
        <Link href="/get-started">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px -5px rgba(231, 119, 36, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-full bg-foxes-orange px-8 py-4 text-lg font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-orange-600 sm:w-auto"
          >
            Get Started
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </motion.button>
        </Link>
        <Link href="/demo">
          <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-slate-300 bg-white/70 px-8 py-4 text-lg font-semibold text-dark-grey backdrop-blur-sm transition-all duration-300 hover:border-dark-grey sm:w-auto"
          >
            Watch Demo
          </motion.button>
        </Link>
      </motion.div>
      <motion.div variants={itemVariants} className="pt-6">
        <p className="mb-4 text-sm font-semibold text-smoke-grey text-center lg:text-left">
          TRUSTED BY 500+ TOUR & ACTIVITY OPERATORS
        </p>
        <div className="flex items-center justify-center gap-6 lg:justify-start">
          {['Viator', 'GetYourGuide', 'Klook'].map((name) => (
             <div key={name} className="text-xl font-bold text-slate-400 grayscale filter transition hover:grayscale-0">{name}</div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- Sub-component: Right-side Device Mockup (REALISTIC MACBOOK AIR) ---
const DeviceMockup = ({ isInView }: { isInView: boolean }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 100 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15, delay: 0.4 } },
  };
  const floatingCardVariants = (delay: number): Variants => ({
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 80, delay: 1 + delay } }
  });

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="relative hidden h-full w-full items-center justify-center lg:flex"
    >
      {/* Realistic MacBook Air Mockup */}
      <div className="relative w-full max-w-3xl perspective-1000">
        {/* MacBook Screen */}
        <div className="relative">
          {/* Screen Bezel */}
          <div className="relative rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 p-3 shadow-2xl">
            {/* Inner Screen Border */}
            <div className="relative overflow-hidden rounded-lg bg-black ring-1 ring-slate-700">
              {/* Screen Content */}
              <div className="relative aspect-[16/10] w-full">
                <video
                  src="/dashboard-loop.mp4"
                  className="h-full w-full object-cover object-top"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                {/* Screen Reflection Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>
            
            {/* Notch (MacBook Air M2 style) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-slate-900 rounded-b-2xl flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            </div>
          </div>

          {/* Bottom Screen Shadow */}
          <div className="absolute -bottom-1 left-0 right-0 h-2 bg-gradient-to-b from-slate-800/50 to-transparent blur-sm"></div>
        </div>

        {/* MacBook Base/Keyboard */}
        <div className="relative -mt-1 mx-auto w-[95%]">
          {/* Keyboard Area */}
          <div className="relative rounded-b-2xl bg-gradient-to-b from-slate-300 via-slate-200 to-slate-300 px-6 py-4 shadow-xl">
            {/* Keyboard Pattern */}
            <div className="grid grid-cols-12 gap-1 mb-2">
              {Array.from({ length: 60 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3 rounded-sm bg-slate-400/30"
                  style={{ 
                    gridColumn: i === 54 ? 'span 6' : 'span 1',
                  }}
                ></div>
              ))}
            </div>
            
            {/* Trackpad */}
            <div className="mx-auto mt-3 h-16 w-48 rounded-xl bg-slate-400/20 shadow-inner"></div>

            {/* Logo Position */}
            <div className="absolute top-2 right-6 text-slate-500 text-xs font-bold opacity-30">
              
            </div>
          </div>

          {/* Base Shadow */}
          <div className="absolute -bottom-2 left-0 right-0 h-4 bg-gradient-to-b from-slate-300/80 to-transparent blur-md"></div>
        </div>

        {/* MacBook Stand/Elevation Shadow */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 h-3 w-3/4 bg-slate-900/20 blur-2xl rounded-full"></div>
      </div>

      {/* Floating UI Cards with Animated Stats */}
      <motion.div 
        variants={floatingCardVariants(0)}
        className="absolute -right-10 top-10 w-64 transform-gpu rounded-2xl border border-slate-200/50 bg-white/90 p-5 shadow-2xl backdrop-blur-lg"
      >
        <div className="mb-3 flex items-center justify-between">
          <Counter value={50000000} className="font-goldplay text-4xl font-bold text-foxes-orange" />
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-orange-400 to-foxes-orange text-white shadow-lg">
            <DollarSign className="h-7 w-7" />
          </div>
        </div>
        <div className="text-sm font-semibold text-dark-grey">Revenue Processed</div>
        <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
          <span className="font-bold">↑ 247%</span>
          <span className="text-slate-500">Last Quarter</span>
        </div>
      </motion.div>

      <motion.div 
        variants={floatingCardVariants(0.2)}
        className="absolute -left-16 bottom-20 w-64 transform-gpu rounded-2xl border border-slate-200/50 bg-white/90 p-5 shadow-2xl backdrop-blur-lg"
      >
        <div className="mb-3 flex items-center justify-between">
          <Counter value={1000000} className="font-goldplay text-4xl font-bold text-slate-900" />
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg">
            <BarChart2 className="h-7 w-7" />
          </div>
        </div>
        <div className="text-sm font-semibold text-dark-grey">Bookings Processed</div>
        <div className="mt-2 text-xs text-slate-500">Since Launch</div>
      </motion.div>

      <motion.div 
        variants={floatingCardVariants(0.4)}
        className="absolute right-4 bottom-32 w-56 transform-gpu rounded-2xl border border-slate-200/50 bg-white/90 p-4 shadow-2xl backdrop-blur-lg"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-foxes-orange text-white shadow-md">
            <CheckCircle className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">New Booking</div>
            <div className="text-xs text-slate-600">Pyramids Tour - 4 guests</div>
          </div>
        </div>
        <div className="text-xs font-semibold text-foxes-orange">Just now</div>
      </motion.div>

      {/* Background Glow Effect */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-foxes-orange/10 via-transparent to-teal-500/10 blur-3xl"></div>
    </motion.div>
  );
};