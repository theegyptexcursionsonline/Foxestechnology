'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ArrowUpRight,
  Globe,
  Bot,
  Mic,
  Map,
  Compass,
  Smartphone,
  Layers,
  Sparkles,
  Monitor,
  Code2,
  Zap,
  Shield,
  Users,
  TrendingUp,
  Star,
  ChevronRight,
  Play,
  Eye,
  ExternalLink,
  X,
  Hotel,
  Plane,
  UserCheck,
} from 'lucide-react';

/* ─── Brand Constants ─────────────────────────────────────────────── */
const BRAND_COLOR_PRIMARY = 'bg-red-600';

/* ─── Project Data ────────────────────────────────────────────────── */
interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'platform' | 'ai' | 'mobile' | 'marketplace';
  icon: React.ElementType;
  logo?: string;
  gradient: string;
  accentClass: string;
  tech: string[];
  features: string[];
  stats: { value: string; label: string }[];
  status: 'live' | 'beta' | 'coming-soon';
  url?: string;
}

const PROJECTS: Project[] = [
  {
    id: 'foxestechnology',
    name: 'Foxes Technology AI Booking Engine',
    tagline: 'Tour Operations Platform',
    description:
      'The all-in-one platform for tour operators. Manage bookings, products, payments, CRM, team members, and analytics from a single powerful dashboard.',
    category: 'platform',
    icon: Layers,
    gradient: 'from-red-500 via-orange-500 to-amber-500',
    accentClass: 'red',
    tech: ['Next.js', 'MongoDB', 'Stripe Connect', 'Cloudinary'],
    features: ['Booking Calendar', 'Product Catalog', 'Stripe Payments', 'Team Management', 'Analytics Dashboard', 'Embeddable Widget'],
    stats: [
      { value: '500+', label: 'Operators' },
      { value: '$50M+', label: 'Processed' },
      { value: '99.9%', label: 'Uptime' },
    ],
    status: 'live',
    url: 'https://foxesapp.netlify.app',
  },
  {
    id: 'eeo',
    name: 'Egypt Excursions Online',
    tagline: 'Tour Booking Platform',
    description:
      'Full-featured tour booking platform for Egypt. Algolia-powered search, AI recommendations, Firebase auth, Stripe payments, PDF tickets with QR codes, and a complete admin dashboard.',
    category: 'marketplace',
    icon: Map,
    logo: '/eeo-logo.png',
    gradient: 'from-blue-500 via-cyan-500 to-teal-500',
    accentClass: 'blue',
    tech: ['Next.js', 'Algolia', 'Firebase', 'Stripe', 'Vercel AI SDK'],
    features: ['Algolia Search', 'AI Recommendations', 'PDF Tickets', 'Hotel Pickup Maps', 'Cart & Wishlist Sync', 'ISR Pages'],
    stats: [
      { value: '1M+', label: 'Bookings' },
      { value: '4.9★', label: 'Rating' },
      { value: '24/7', label: 'Live' },
    ],
    status: 'live',
    url: 'https://egypt-excursionsonline.com',
  },
  {
    id: 'attraction-network',
    name: 'Attraction Network',
    tagline: 'Multi-Tenant Booking Engine',
    description:
      'Multi-tenant booking engine powering multiple branded destination websites from a single codebase. Each tenant gets its own domain, branding, SEO, and content — with shared infrastructure for search, payments, and admin management.',
    category: 'marketplace',
    icon: Globe,
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    accentClass: 'purple',
    tech: ['Next.js', 'MongoDB', 'Algolia', 'next-intl', 'Stripe'],
    features: ['Multi-Tenant Architecture', 'Custom Domain per Brand', 'Tenant-Level Branding', 'i18n & RTL Support', 'Shared Admin Panel', 'Per-Tenant SEO'],
    stats: [
      { value: '12+', label: 'Branded Sites' },
      { value: 'Multi', label: 'Tenant' },
      { value: '1', label: 'Codebase' },
    ],
    status: 'live',
    url: 'https://foxes-network.netlify.app',
  },
  {
    id: 'excursions-online',
    name: 'Excursions Online',
    tagline: 'Travel Experiences Marketplace',
    description:
      'Discover, browse, and book tours, activities, and excursions worldwide. Advanced filtering, date selection, shopping cart, secure checkout, and email confirmations with QR codes.',
    category: 'marketplace',
    icon: Compass,
    logo: '/eo-logo.png',
    gradient: 'from-emerald-500 via-green-500 to-lime-500',
    accentClass: 'green',
    tech: ['Next.js', 'MongoDB', 'Tailwind', 'Cloudinary', 'Mailgun'],
    features: ['Advanced Search', 'Date Selection', 'Shopping Cart', 'QR Code Tickets', 'Admin Dashboard', 'Interactive Maps'],
    stats: [
      { value: '10K+', label: 'Tours' },
      { value: '150+', label: 'Countries' },
      { value: '0%', label: 'Commission' },
    ],
    status: 'live',
    url: 'https://excursions.online/',
  },
  {
    id: 'ai-agent',
    name: 'Foxes AI Agent',
    tagline: 'White-Label AI Concierge',
    description:
      'SaaS platform delivering white-labeled AI travel concierge for tour businesses. Embeddable widget with 4 modes, real-time streaming, knowledge base, and analytics dashboard.',
    category: 'ai',
    icon: Bot,
    gradient: 'from-orange-500 via-red-500 to-rose-500',
    accentClass: 'orange',
    tech: ['Next.js', 'Google Gemini', 'Pinecone', 'Stripe', 'SSE Streaming'],
    features: ['4 Widget Modes', 'AI Chat Streaming', 'Knowledge Base', 'Team Invitations', 'Domain Whitelisting', 'Real-Time Analytics'],
    stats: [
      { value: '4', label: 'Widget Types' },
      { value: '<1s', label: 'Response' },
      { value: '∞', label: 'Conversations' },
    ],
    status: 'live',
    url: 'https://ai-search-agent.netlify.app/',
  },
  {
    id: 'ai-voice-agent',
    name: 'Foxes Voice AI',
    tagline: 'AI-Powered Voice Agent',
    description:
      'Multi-tenant SaaS for AI voice agents. Handles inbound and outbound calls with natural conversation, Stripe subscriptions, Twilio integration, and team management.',
    category: 'ai',
    icon: Mic,
    gradient: 'from-pink-500 via-rose-500 to-red-500',
    accentClass: 'pink',
    tech: ['Next.js', 'OpenAI', 'Twilio', 'Redis', 'Stripe'],
    features: ['Voice Calls', 'Natural Conversation', 'Call Analytics', 'Subscription Billing', 'Team Management', 'Embeddable Widget'],
    stats: [
      { value: '24/7', label: 'Available' },
      { value: '10+', label: 'Languages' },
      { value: '-80%', label: 'Cost' },
    ],
    status: 'beta',
    url: 'https://foxes-ai-voice.netlify.app/',
  },
  {
    id: 'eta',
    name: 'ETA',
    tagline: 'Egypt Travel Ambassadors',
    description:
      'Platform for the Egypt Travel Ambassador program. Features role-based access, interactive maps, comprehensive testing with Playwright & Jest, and full i18n support.',
    category: 'platform',
    icon: Star,
    gradient: 'from-amber-500 via-yellow-500 to-orange-500',
    accentClass: 'amber',
    tech: ['Next.js', 'MongoDB', 'Radix UI', 'Leaflet', 'Playwright'],
    features: ['Ambassador Profiles', 'Interactive Maps', 'i18n Support', 'E2E Testing', 'Role-Based Access', 'Event Management'],
    stats: [
      { value: '200+', label: 'Ambassadors' },
      { value: '15+', label: 'Cities' },
      { value: '100%', label: 'Tested' },
    ],
    status: 'live',
    url: 'https://foxes-eta.netlify.app/',
  },
  {
    id: 'eeo-app',
    name: 'Egypt Excursions Online Mobile',
    tagline: 'Traveler Companion App',
    description:
      'React Native mobile app for travelers. Firebase authentication, Google sign-in, calendar integration, and seamless multi-platform deployment for iOS and Android.',
    category: 'mobile',
    icon: Smartphone,
    logo: '/eeo-logo.png',
    gradient: 'from-sky-500 via-blue-500 to-indigo-500',
    accentClass: 'sky',
    tech: ['React Native', 'Firebase', 'React Query', 'Zustand'],
    features: ['Firebase Auth', 'Google Sign-In', 'Calendar Sync', 'Push Notifications', 'Offline Mode', 'Cross-Platform'],
    stats: [
      { value: 'iOS', label: '& Android' },
      { value: 'Native', label: 'Performance' },
      { value: 'Offline', label: 'Ready' },
    ],
    status: 'coming-soon',
  },
  {
    id: 'foxes-operator-app',
    name: 'Foxes Operator',
    tagline: 'Operator Management App',
    description:
      'Mobile app for tour operators in the field. Manage bookings, scan tickets, capture photos with Vision Camera, and stay connected with real-time sync.',
    category: 'mobile',
    icon: Monitor,
    gradient: 'from-slate-500 via-gray-500 to-zinc-500',
    accentClass: 'slate',
    tech: ['React Native', 'React Query', 'Vision Camera', 'Async Storage'],
    features: ['Ticket Scanning', 'Photo Capture', 'Offline Support', 'Real-Time Sync', 'Navigation Stack', 'Push Alerts'],
    stats: [
      { value: 'iOS', label: '& Android' },
      { value: '100%', label: 'Offline' },
      { value: 'Fast', label: 'Sync' },
    ],
    status: 'coming-soon',
  },
  {
    id: 'eo-app',
    name: 'Excursions Online Mobile',
    tagline: 'Travel Companion App',
    description:
      'Full-featured React Native mobile app for the Excursions Online marketplace. Browse tours, book activities, manage reservations, and receive real-time notifications — all from your pocket.',
    category: 'mobile',
    icon: Compass,
    logo: '/eo-logo.png',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-500',
    accentClass: 'teal',
    tech: ['React Native', 'Jest', 'React Navigation', 'Async Storage'],
    features: ['Tour Browsing', 'In-App Booking', 'Push Notifications', 'Offline Caching', 'Search & Filters', 'Cross-Platform'],
    stats: [
      { value: 'iOS', label: '& Android' },
      { value: 'Native', label: 'Performance' },
      { value: 'Offline', label: 'Ready' },
    ],
    status: 'coming-soon',
  },
  {
    id: 'driver-app',
    name: 'Driver App',
    tagline: 'Transfer & Logistics App',
    description:
      'Dedicated mobile app for drivers and transfer operators. Accept ride assignments, navigate to pickup points, track trip status in real-time, and communicate with travelers seamlessly.',
    category: 'mobile',
    icon: Map,
    gradient: 'from-amber-500 via-orange-500 to-red-500',
    accentClass: 'orange',
    tech: ['React Native', 'TypeScript', 'React Navigation', 'Jest'],
    features: ['Trip Assignments', 'GPS Navigation', 'Status Tracking', 'In-App Messaging', 'Offline Mode', 'Push Alerts'],
    stats: [
      { value: 'iOS', label: '& Android' },
      { value: 'Live', label: 'Tracking' },
      { value: '99%', label: 'Uptime' },
    ],
    status: 'coming-soon',
  },
  {
    id: 'ai-hotel-booking',
    name: 'AI Hotel Booking',
    tagline: 'Smart Property Management',
    description:
      'AI-powered hotel and property management platform for luxury hotels. Real-time occupancy dashboards, dynamic pricing, demand forecasting, smart room assignment, and 360° guest profiles with loyalty programs.',
    category: 'ai',
    icon: Hotel,
    gradient: 'from-indigo-500 via-blue-500 to-sky-500',
    accentClass: 'indigo',
    tech: ['Next.js', 'React 19', 'MongoDB', 'GPT-4', 'Zustand'],
    features: ['Dynamic Pricing', 'Demand Forecasting', 'Smart Room Assignment', 'Guest Profiles', 'Revenue Analytics', 'Loyalty Program'],
    stats: [
      { value: 'AI', label: 'Powered' },
      { value: 'Multi', label: 'Property' },
      { value: 'Real-Time', label: 'Analytics' },
    ],
    status: 'coming-soon',
  },
  {
    id: 'airport-transfer',
    name: 'Airport Transfer Platform',
    tagline: 'Guest Transportation & Logistics',
    description:
      'End-to-end airport transfer and ground transportation platform. Manage shuttle services, track vehicles in real-time, automate dispatch, and integrate seamlessly with hotel booking systems for guest pickup coordination.',
    category: 'platform',
    icon: Plane,
    gradient: 'from-cyan-500 via-sky-500 to-blue-500',
    accentClass: 'cyan',
    tech: ['Next.js', 'MongoDB', 'Google Maps', 'Real-Time Tracking'],
    features: ['Automated Dispatch', 'Live Vehicle Tracking', 'Hotel Integration', 'Driver Assignment', 'Route Optimization', 'Guest Notifications'],
    stats: [
      { value: 'Live', label: 'Tracking' },
      { value: 'Auto', label: 'Dispatch' },
      { value: '24/7', label: 'Service' },
    ],
    status: 'coming-soon',
    url: 'https://foxes-airport.netlify.app/',
  },
  {
    id: 'foxes-crm',
    name: 'Foxes CRM',
    tagline: 'Customer Relationship Management',
    description:
      'Unified CRM platform connecting all Foxes products. Centralized customer profiles, booking history across platforms, VIP guest tracking, automated communication workflows, and deep integration with hotel, tour, and transfer systems.',
    category: 'platform',
    icon: UserCheck,
    gradient: 'from-rose-500 via-pink-500 to-fuchsia-500',
    accentClass: 'rose',
    tech: ['Next.js', 'MongoDB', 'Redis', 'Stripe', 'Mailgun'],
    features: ['Unified Profiles', 'Cross-Platform History', 'VIP Tracking', 'Auto Workflows', 'Communication Hub', 'Analytics & Reports'],
    stats: [
      { value: '360°', label: 'Guest View' },
      { value: 'Unified', label: 'Platform' },
      { value: 'Auto', label: 'Workflows' },
    ],
    status: 'coming-soon',
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All Products', count: PROJECTS.length },
  { key: 'platform', label: 'Platforms', count: PROJECTS.filter((p) => p.category === 'platform').length },
  { key: 'marketplace', label: 'Marketplaces', count: PROJECTS.filter((p) => p.category === 'marketplace').length },
  { key: 'ai', label: 'AI Products', count: PROJECTS.filter((p) => p.category === 'ai').length },
  { key: 'mobile', label: 'Mobile Apps', count: PROJECTS.filter((p) => p.category === 'mobile').length },
];

/* ─── Animated Counter ────────────────────────────────────────────── */
function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = value / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, value, duration]);

  return <span ref={ref}>{count}</span>;
}

/* ─── Status Badge ────────────────────────────────────────────────── */
function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; dot: string; text: string; label: string }> = {
    live: { bg: 'bg-emerald-950/60 border-emerald-500/30', dot: 'bg-emerald-400', text: 'text-emerald-300', label: 'Live' },
    beta: { bg: 'bg-amber-950/60 border-amber-500/30', dot: 'bg-amber-400', text: 'text-amber-300', label: 'Beta' },
    'coming-soon': { bg: 'bg-blue-950/60 border-blue-500/30', dot: 'bg-blue-400', text: 'text-blue-300', label: 'Soon' },
  };
  const c = config[status] || config.live;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${c.bg} ${c.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot} animate-pulse`} />
      {c.label}
    </span>
  );
}

/* ─── Project Card ────────────────────────────────────────────────── */
function ProjectCard({ project, index, onPreview }: { project: Project; index: number; onPreview: (p: Project) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      {/* Glow effect on hover */}
      <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 blur-xl transition-all duration-500 group-hover:opacity-20`} />

      <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] backdrop-blur-xl transition-all duration-500 group-hover:border-white/[0.15] group-hover:from-white/[0.1] group-hover:to-white/[0.04]">
        {/* Top gradient bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

        <div className="p-6 sm:p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div className="flex items-center gap-3.5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${project.logo ? 'bg-white' : `bg-gradient-to-br ${project.gradient}`} shadow-lg overflow-hidden`}>
                <Image src={project.logo || '/logo.png'} alt={project.name} width={32} height={32} className="object-contain" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">{project.name}</h3>
                <p className="text-xs font-semibold text-gray-400 mt-0.5">{project.tagline}</p>
              </div>
            </div>
            <StatusBadge status={project.status} />
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-gray-400 mb-5 line-clamp-3">{project.description}</p>

          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <span key={t} className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold text-gray-400 transition-colors group-hover:border-white/[0.12] group-hover:text-gray-300">
                {t}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {project.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-center">
                <div className="text-base font-black text-white">{stat.value}</div>
                <div className="text-[10px] font-semibold text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onPreview(project)}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.1] bg-white/[0.05] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/[0.1] hover:border-white/[0.2]"
            >
              <Eye className="h-3.5 w-3.5" />
              Details
            </button>
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl ${BRAND_COLOR_PRIMARY} px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-700 hover:shadow-red-500/30`}
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Visit Live
              </a>
            ) : (
              <button
                onClick={() => onPreview(project)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl ${BRAND_COLOR_PRIMARY} px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-700 hover:shadow-red-500/30`}
              >
                <ArrowRight className="h-3.5 w-3.5" />
                Explore
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Project Detail Modal ────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onEsc);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onEsc);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/[0.1] bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl"
      >
        {/* Header gradient bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

        {/* Close button */}
        <button onClick={onClose} className="absolute right-4 top-5 z-10 rounded-xl bg-white/10 p-2 text-gray-400 transition-all hover:bg-white/20 hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 sm:p-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${project.logo ? 'bg-white' : `bg-gradient-to-br ${project.gradient}`} shadow-xl overflow-hidden`}>
              <Image src={project.logo || '/logo.png'} alt={project.name} width={42} height={42} className="object-contain" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl font-black text-white sm:text-3xl">{project.name}</h2>
                <StatusBadge status={project.status} />
              </div>
              <p className="text-base font-semibold text-gray-400">{project.tagline}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-base leading-relaxed text-gray-300 mb-8">{project.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {project.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 text-center">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs font-semibold text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features Grid */}
          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Key Features</h4>
            <div className="grid grid-cols-2 gap-3">
              {project.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                  <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${project.gradient} flex-shrink-0`} />
                  <span className="text-sm font-medium text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="mb-8">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="rounded-xl border border-white/[0.1] bg-white/[0.06] px-4 py-2 text-sm font-semibold text-gray-300">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-2xl ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-700 hover:shadow-red-500/30`}
            >
              <ExternalLink className="h-5 w-5" />
              Visit Live Product
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Main Page ───────────────────────────────────────────────────── */
export default function ShowcasePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const filteredProjects = activeCategory === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-slate-950">
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative overflow-hidden bg-slate-950 pt-32 pb-20 sm:pt-40 sm:pb-28">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-red-500/[0.07] blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, -25, 0], y: [0, 30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-blue-500/[0.05] blur-[120px]"
          />
          <motion.div
            animate={{ x: [0, 15, 0], y: [0, -15, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-500/[0.04] blur-[100px]"
          />
        </div>

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(239 68 68) 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        {/* Grid lines decoration */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white to-transparent" />
        </div>

        <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-red-400" />
              <span className="text-sm font-bold text-red-300">Product Showcase</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 text-5xl font-black leading-[1.1] text-white sm:text-6xl lg:text-8xl"
              style={{ textShadow: '0 4px 40px rgba(0, 0, 0, 0.5)' }}
            >
              Built to{' '}
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 bg-clip-text text-transparent">
                Transform
              </span>
              <br />
              Travel Tech
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400 lg:text-xl"
            >
              <AnimatedCounter value={14} /> production products powering the future of travel.
              From AI concierges to global booking platforms — explore what we&apos;ve built.
            </motion.p>

            {/* Floating shapes */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex justify-center gap-4"
            >
              {[
                { gradient: 'from-red-500 to-orange-500', icon: Layers },
                { gradient: 'from-blue-500 to-cyan-500', icon: Globe },
                { gradient: 'from-purple-500 to-pink-500', icon: Bot },
                { gradient: 'from-green-500 to-emerald-500', icon: Smartphone },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-2xl sm:h-16 sm:w-16`}
                >
                  <item.icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── Stats Bar ─────────────────────────────────────────────── */}
      <section className="relative border-y border-white/[0.06] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-0 sm:grid-cols-4">
            {[
              { value: 14, suffix: '', label: 'Products', icon: Layers },
              { value: 4, suffix: '', label: 'Marketplaces', icon: Globe },
              { value: 3, suffix: '', label: 'AI Products', icon: Bot },
              { value: 4, suffix: '', label: 'Mobile Apps', icon: Smartphone },
            ].map((stat, i) => (
              <div key={stat.label} className={`flex items-center gap-4 py-6 px-6 ${i > 0 ? 'border-l border-white/[0.06]' : ''}`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                  <stat.icon className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white">
                    <AnimatedCounter value={stat.value} />
                    {stat.suffix}
                  </div>
                  <div className="text-xs font-semibold text-gray-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Filter ───────────────────────────────────────── */}
      <section className="sticky top-16 z-30 border-b border-white/[0.06] bg-slate-950/80 backdrop-blur-2xl lg:top-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-all ${
                  activeCategory === cat.key
                    ? 'bg-red-600 text-white shadow-lg shadow-red-500/20'
                    : 'border border-white/[0.08] bg-white/[0.04] text-gray-400 hover:bg-white/[0.08] hover:text-white'
                }`}
              >
                {cat.label}
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${activeCategory === cat.key ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-gray-500'}`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Projects Grid ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onPreview={setSelectedProject} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Tech Stack Overview ───────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-20 sm:py-28">
        {/* Decorative orb */}
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/[0.03] blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              Our Technology DNA
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
              Every product built with best-in-class tools for performance, scale, and reliability
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
            {[
              { icon: Code2, label: 'Next.js & React', desc: 'Server-first framework', gradient: 'from-slate-500 to-zinc-600' },
              { icon: Shield, label: 'MongoDB & Redis', desc: 'Scalable data layer', gradient: 'from-green-500 to-emerald-600' },
              { icon: Zap, label: 'AI & ML', desc: 'Gemini, OpenAI, Pinecone', gradient: 'from-orange-500 to-red-600' },
              { icon: TrendingUp, label: 'Stripe & Payments', desc: 'Global commerce ready', gradient: 'from-purple-500 to-indigo-600' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center transition-all hover:border-white/[0.12] hover:bg-white/[0.06]"
              >
                <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}>
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-base font-bold text-white">{item.label}</h3>
                <p className="mt-1.5 text-xs font-medium text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/[0.1] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-10 shadow-2xl sm:p-16"
          >
            {/* Decorative elements */}
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-red-500/10 blur-[100px]" />
            <div className="absolute left-0 bottom-0 h-64 w-64 rounded-full bg-blue-500/10 blur-[80px]" />

            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(239 68 68) 1px, transparent 0)',
                  backgroundSize: '32px 32px',
                }}
              />
            </div>

            <div className="relative text-center">
              <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                Ready to Build the Future?
              </h2>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
                Whether you need a booking platform, AI assistant, or custom solution — let&apos;s talk about how Foxes Technology can power your business.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/get-started">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group inline-flex w-full items-center justify-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:bg-red-700 hover:shadow-red-500/30 sm:w-auto`}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10 sm:w-auto"
                  >
                    Contact Sales
                  </motion.button>
                </Link>
              </div>

              <p className="mt-8 text-sm text-gray-500">
                No credit card required • Custom demos available • 24/7 support
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Detail Modal ──────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </main>
  );
}
