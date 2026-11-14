'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { joinNewsletter, PRIORITY_LIST_MESSAGES } from '@/lib/priority-list';
import { useAdoptTypedValues, useScriptReady } from '@/lib/use-script-ready';

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

// --- Newsletter with Gradient Background ---
const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const scriptReady = useScriptReady();
  // An address typed before the script ran (slow connection) becomes the form's own.
  const inputRef = useRef<HTMLInputElement>(null);
  useAdoptTypedValues(inputRef, (input) => {
    if (input.value) setEmail(input.value);
  });

  // Confirm only once the lead endpoint has recorded the address.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    const result = await joinNewsletter(email.trim(), typeof window !== 'undefined' ? window.location.pathname : undefined);
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
            <h3 className="text-xl font-black text-white">Hear from us</h3>
            <p className="text-sm font-medium text-white/80">Product news by email</p>
          </div>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-white/90">
          Leave your email and we will write to you when there is news about Foxes products.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              ref={inputRef}
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
            disabled={!scriptReady || status === 'loading'}
            className={`group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-red-600 shadow-lg transition-all hover:bg-white hover:shadow-xl ${status === 'loading' ? 'opacity-50' : ''}`}
          >
            {status === 'loading' ? 'Sending...' : status === 'success' ? '✓ You’re on the list' : 'Keep me posted'}
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

export default function Footer() {
  const solutionsLinks = [
    { name: 'All Solutions', href: '/solutions' },
    { name: 'Online Booking', href: '/solutions/online-booking' },
    { name: 'AI Voice', href: '/solutions/ai-voice' },
    { name: 'AI Search', href: '/solutions/ai-search' },
    { name: 'Booking Assistant', href: '/solutions/ai' },
    { name: 'Reports', href: '/solutions/analytics' },
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
              Booking, voice and search tools for tour and activity operators.
            </p>
          </div>

          <div>
            <NewsletterSignup />
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent lg:my-16"></div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:gap-12">
          <FooterLinkColumn title="Solutions" links={solutionsLinks} />
          <FooterLinkColumn title="Company" links={companyLinks} />
          <FooterLinkColumn title="Resources" links={resourcesLinks} />
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

        {/* Bottom Section: Copyright + Legal + Social */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-start">
            <p className="text-center text-sm text-slate-500 md:text-left">
              © {new Date().getFullYear()} <span className="font-bold text-slate-700">Foxes Technology</span>. All rights reserved.
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

        </div>
      </div>
    </footer>
  );
}