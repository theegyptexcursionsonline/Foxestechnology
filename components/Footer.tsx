'use client';

import Link from 'next/link';
import { Award, Mail, ArrowRight, Facebook, Twitter, Instagram, Linkedin, Youtube, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { joinNewsletter, PRIORITY_LIST_MESSAGES } from '@/lib/priority-list';

// --- Enhanced Logo Component ---
const FoxesLogo = () => (
  <Link href="/" className="group inline-block">
    <Image
      src="/logo3.png"
      alt="Foxes Technology"
      width={200}
      height={60}
      className="h-12 w-auto transition-all duration-300 group-hover:scale-105"
      priority
    />
  </Link>
);

// --- Link Column with Hover Animation ---
const FooterLinkColumn = ({ title, links }: { title: string, links: { name: string, href: string }[] }) => (
  <div>
    <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-slate-900">{title}</h3>
    <ul role="list" className="space-y-3">
      {links.map((item, index) => (
        <motion.li
          key={item.name}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          viewport={{ once: true }}
        >
          <Link
            href={item.href}
            className="group inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-all hover:text-red-600 hover:translate-x-1"
          >
            <span className="h-px w-0 bg-red-500 transition-all duration-300 group-hover:w-3"></span>
            {item.name}
          </Link>
        </motion.li>
      ))}
    </ul>
  </div>
);

// --- Social Links with Gradient Hover ---
const SocialLinks = () => {
  const socials = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <div className="flex items-center gap-3">
      {socials.map((social) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-slate-600 transition-all hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-500/30"
        >
          <social.icon className="relative z-10 h-5 w-5" />
          <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-orange-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </motion.a>
      ))}
    </div>
  );
};

// --- Newsletter with Gradient Background ---
const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Confirm only once the lead endpoint has recorded the address.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    const result = await joinNewsletter(email, typeof window !== 'undefined' ? window.location.pathname : undefined);
    if (result !== 'ok') {
      setStatus('error');
      setMessage(PRIORITY_LIST_MESSAGES[result]);
      return;
    }
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-red-600 via-red-500 to-orange-500 p-8 shadow-2xl shadow-red-500/20"
    >
      {/* Decorative Elements */}
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-orange-400/20 blur-2xl"></div>

      <div className="relative">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white">Stay Ahead</h3>
            <p className="text-sm font-medium text-white/80">Get exclusive insights</p>
          </div>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-white/90">
          Get occasional tips, industry news and product updates from our team.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full rounded-xl border-2 border-white/30 bg-white/10 px-5 py-3.5 text-white placeholder-white/60 backdrop-blur-md transition-all focus:border-white focus:bg-white/20 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-red-600 shadow-lg transition-all hover:bg-white hover:shadow-xl disabled:opacity-50"
          >
            {status === 'loading' ? 'Subscribing...' : status === 'success' ? '✓ Subscribed!' : 'Subscribe Now'}
            {status === 'idle' && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
          </button>
        </form>
        {status === 'error' && (
          <p role="alert" className="mt-3 text-sm font-medium text-white">
            {message}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// --- App Download Buttons ---
const AppButtons = () => (
  <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
    <motion.a
      href="#"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group flex flex-1 items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
    >
      <svg className="h-9 w-9 text-slate-900 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
      <div className="text-left">
        <p className="text-xs font-semibold text-slate-500">Download on the</p>
        <p className="text-base font-bold text-slate-900">App Store</p>
      </div>
    </motion.a>

    <motion.a
      href="#"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className="group flex flex-1 items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 shadow-sm transition-all hover:border-slate-300 hover:shadow-md"
    >
      <svg className="h-9 w-9 text-slate-900 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
      </svg>
      <div className="text-left">
        <p className="text-xs font-semibold text-slate-500">Get it on</p>
        <p className="text-base font-bold text-slate-900">Google Play</p>
      </div>
    </motion.a>
  </div>
);

// --- Partner Badge ---
const PartnerBadge = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="group relative overflow-hidden rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm transition-all hover:shadow-md"
  >
    <div className="relative flex items-start gap-4">
      <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-amber-100">
        <Award className="h-8 w-8 text-amber-600" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Official Partner</p>
        <p className="mt-1 text-base font-bold text-slate-900">Ministry of Tourism</p>
        <p className="text-sm font-medium text-slate-600">& Antiquities, Egypt</p>
      </div>
    </div>
  </motion.div>
);

export default function Footer() {
  const solutionsLinks = [
    { name: 'All Solutions', href: '/solutions' },
    { name: 'Online Booking', href: '/solutions/online-booking' },
    { name: 'POS Hardware', href: '/solutions/pos-hardware' },
    { name: 'Self-Service Kiosk', href: '/solutions/kiosk' },
    { name: 'AI Assistant', href: '/solutions/ai' },
    { name: 'Analytics Dashboard', href: '/solutions/analytics' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Contact', href: '/contact' },
  ];

  const resourcesLinks = [
    { name: 'Documentation', href: '/docs' },
    { name: 'API Reference', href: '/api' },
    { name: 'Support Center', href: '/support' },
    { name: 'Get Started', href: '/get-started' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms of Service', href: '/terms-of-service' },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#F7F7F7]">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(15 23 42) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }}></div>

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">

        {/* Top Section: Logo + Description + Newsletter */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <FoxesLogo />
            <p className="max-w-md text-base leading-relaxed text-slate-600">
              The all-in-one operating system for modern tours, activities, and attractions.
            </p>
          </div>

          <div>
            <NewsletterSignup />
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent lg:my-16"></div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-12">
          <FooterLinkColumn title="Solutions" links={solutionsLinks} />
          <FooterLinkColumn title="Company" links={companyLinks} />
          <FooterLinkColumn title="Resources" links={resourcesLinks} />

          {/* App Downloads + Partner Badge */}
          <div className="col-span-2 space-y-6">
            <div>
              <h3 className="mb-5 text-sm font-bold uppercase tracking-widest text-slate-900">Get The App</h3>
              <AppButtons />
            </div>
            <PartnerBadge />
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

        {/* Bottom Section: Copyright + Legal + Social */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
            <p className="text-center text-sm text-slate-500 md:text-left">
              © {new Date().getFullYear()} <span className="font-bold text-slate-700">Foxes Technology LLC</span>. All rights reserved.
            </p>
            <div className="hidden h-5 w-px bg-slate-300 md:block"></div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm md:justify-start">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-medium text-slate-500 transition-colors hover:text-red-600"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <SocialLinks />
        </div>

        {/* Optional: Made with Love */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="text-xs font-medium text-slate-400">
            Made with <span className="text-red-500">❤</span> in Egypt & UAE
          </p>
        </motion.div>
      </div>
    </footer>
  );
}