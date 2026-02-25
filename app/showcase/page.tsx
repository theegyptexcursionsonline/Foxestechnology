'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
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
  TrendingUp,
  Star,
  Eye,
  ExternalLink,
  X,
  Hotel,
  Plane,
  UserCheck,
  ChevronDown,
  ArrowUpRight,
} from 'lucide-react';

/* ─── Brand Constants ─────────────────────────────────────────────── */
const BRAND = {
  primary: 'bg-red-600',
  primaryHover: 'hover:bg-red-700',
  shadow: 'shadow-red-500/25',
};

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
  accentColor: string;
  tech: string[];
  features: string[];
  stats: { value: string; label: string }[];
  status: 'live' | 'beta' | 'coming-soon';
  url?: string;
  featured?: boolean;
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
    accentColor: 'red',
    tech: ['Next.js', 'MongoDB', 'Stripe Connect', 'Cloudinary'],
    features: ['Booking Calendar', 'Product Catalog', 'Stripe Payments', 'Team Management', 'Analytics Dashboard', 'Embeddable Widget'],
    stats: [
      { value: '500+', label: 'Operators' },
      { value: '$50M+', label: 'Processed' },
      { value: '99.9%', label: 'Uptime' },
    ],
    status: 'live',
    url: 'https://foxesapp.netlify.app',
    featured: true,
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
    accentColor: 'blue',
    tech: ['Next.js', 'Algolia', 'Firebase', 'Stripe', 'Netlify'],
    features: ['Algolia Search', 'AI Recommendations', 'PDF Tickets', 'Hotel Pickup Maps', 'Cart & Wishlist Sync', 'ISR Pages'],
    stats: [
      { value: '1M+', label: 'Bookings' },
      { value: '4.9★', label: 'Rating' },
      { value: '24/7', label: 'Live' },
    ],
    status: 'live',
    url: 'https://egypt-excursionsonline.com',
    featured: true,
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
    accentColor: 'purple',
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
    accentColor: 'green',
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
    accentColor: 'orange',
    tech: ['Next.js', 'Google Gemini', 'Pinecone', 'Stripe', 'SSE Streaming'],
    features: ['4 Widget Modes', 'AI Chat Streaming', 'Knowledge Base', 'Team Invitations', 'Domain Whitelisting', 'Real-Time Analytics'],
    stats: [
      { value: '4', label: 'Widget Types' },
      { value: '<1s', label: 'Response' },
      { value: '∞', label: 'Conversations' },
    ],
    status: 'live',
    url: 'https://ai-search-agent.netlify.app/',
    featured: true,
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
    accentColor: 'pink',
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
    accentColor: 'amber',
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
    accentColor: 'sky',
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
    accentColor: 'slate',
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
    accentColor: 'teal',
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
    accentColor: 'orange',
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
      'AI-powered hotel and property management platform for luxury hotels. Real-time occupancy dashboards, dynamic pricing, demand forecasting, smart room assignment, and 360\u00b0 guest profiles with loyalty programs.',
    category: 'ai',
    icon: Hotel,
    gradient: 'from-indigo-500 via-blue-500 to-sky-500',
    accentColor: 'indigo',
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
    accentColor: 'cyan',
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
    accentColor: 'rose',
    tech: ['Next.js', 'MongoDB', 'Redis', 'Stripe', 'Mailgun'],
    features: ['Unified Profiles', 'Cross-Platform History', 'VIP Tracking', 'Auto Workflows', 'Communication Hub', 'Analytics & Reports'],
    stats: [
      { value: '360\u00b0', label: 'Guest View' },
      { value: 'Unified', label: 'Platform' },
      { value: 'Auto', label: 'Workflows' },
    ],
    status: 'coming-soon',
  },
];

const CATEGORIES = [
  { key: 'all', label: 'All Products', icon: Layers },
  { key: 'platform', label: 'Platforms', icon: Monitor },
  { key: 'marketplace', label: 'Marketplaces', icon: Globe },
  { key: 'ai', label: 'AI Products', icon: Bot },
  { key: 'mobile', label: 'Mobile Apps', icon: Smartphone },
];

const TECH_MARQUEE = [
  'Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'MongoDB', 'Redis', 'PostgreSQL',
  'Stripe', 'OpenAI', 'Anthropic', 'Google Gemini', 'LangChain', 'LlamaIndex',
  'Pinecone', 'Netlify', 'Hugging Face', 'TensorFlow', 'Python',
  'React Native', 'Firebase', 'AWS', 'Docker', 'GraphQL', 'Twilio',
  'Algolia', 'Cloudinary', 'Tailwind CSS', 'Framer Motion',
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
function StatusBadge({ status, size = 'sm' }: { status: string; size?: 'sm' | 'md' }) {
  const config: Record<string, { bg: string; dot: string; text: string; label: string }> = {
    live: { bg: 'bg-emerald-950/80 border-emerald-500/30', dot: 'bg-emerald-400', text: 'text-emerald-300', label: 'Live' },
    beta: { bg: 'bg-amber-950/80 border-amber-500/30', dot: 'bg-amber-400', text: 'text-amber-300', label: 'Beta' },
    'coming-soon': { bg: 'bg-blue-950/80 border-blue-500/30', dot: 'bg-blue-400', text: 'text-blue-300', label: 'Soon' },
  };
  const c = config[status] || config.live;
  const sizeClass = size === 'md' ? 'px-3 py-1.5 text-xs' : 'px-2.5 py-1 text-[10px]';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-bold uppercase tracking-wider ${sizeClass} ${c.bg} ${c.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot} animate-pulse`} />
      {c.label}
    </span>
  );
}

/* ─── Marquee Strip ───────────────────────────────────────────────── */
function TechMarquee() {
  const doubled = [...TECH_MARQUEE, ...TECH_MARQUEE];
  return (
    <div className="relative overflow-hidden border-y border-white/[0.06] bg-slate-950/50 py-4">
      <div className="absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-slate-950 to-transparent" />
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((tech, i) => (
          <span key={i} className="flex items-center gap-2 text-sm font-medium text-gray-500">
            <span className="h-1 w-1 rounded-full bg-red-500/60" />
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Featured Project Card (Large) ──────────────────────────────── */
function FeaturedCard({ project, onPreview }: { project: Project; onPreview: (p: Project) => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative"
    >
      <div className={`absolute -inset-1 rounded-[2rem] bg-gradient-to-r ${project.gradient} opacity-0 blur-2xl transition-all duration-700 group-hover:opacity-25`} />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl transition-all duration-500 group-hover:border-white/[0.15]">
        <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

        <div className="grid gap-8 p-8 sm:p-10 md:grid-cols-2">
          {/* Left: Info */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${project.logo ? 'bg-white p-2' : `bg-gradient-to-br ${project.gradient}`} shadow-xl overflow-hidden`}>
                  {project.logo ? (
                    <Image src={project.logo} alt={project.name} width={36} height={36} className="object-contain" />
                  ) : (
                    <project.icon className="h-7 w-7 text-white" />
                  )}
                </div>
                <StatusBadge status={project.status} size="md" />
              </div>

              <h3 className="text-2xl font-black text-white leading-tight sm:text-3xl mb-2">
                {project.name}
              </h3>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">{project.tagline}</p>
              <p className="text-base leading-relaxed text-gray-400 mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span key={t} className="rounded-lg border border-white/[0.1] bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-gray-300">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-xl ${BRAND.primary} px-6 py-3 text-sm font-bold text-white shadow-lg ${BRAND.shadow} transition-all ${BRAND.primaryHover} hover:shadow-red-500/40`}
                >
                  <ExternalLink className="h-4 w-4" />
                  Visit Live
                </a>
              )}
              <button
                onClick={() => onPreview(project)}
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/[0.12] hover:border-white/[0.2]"
              >
                <Eye className="h-4 w-4" />
                Details
              </button>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="flex flex-col justify-center gap-4">
            {project.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center transition-all hover:border-white/[0.12] hover:bg-white/[0.06]"
              >
                <div className="text-3xl font-black text-white sm:text-4xl">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-gray-500 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
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
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex"
    >
      {/* Glow */}
      <div className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-r ${project.gradient} opacity-0 blur-xl transition-all duration-500 group-hover:opacity-20`} />

      <div className="relative flex flex-col overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-xl transition-all duration-500 group-hover:border-white/[0.15] group-hover:from-white/[0.1] group-hover:to-white/[0.04] w-full">
        {/* Gradient bar */}
        <div className={`h-1 w-full bg-gradient-to-r ${project.gradient}`} />

        <div className="flex flex-col flex-1 p-6 sm:p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3.5">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${project.logo ? 'bg-white p-1.5' : `bg-gradient-to-br ${project.gradient}`} shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-110`}>
                {project.logo ? (
                  <Image src={project.logo} alt={project.name} width={32} height={32} className="object-contain" />
                ) : (
                  <project.icon className="h-6 w-6 text-white" />
                )}
              </div>
              <div>
                <h3 className="text-base font-bold text-white leading-tight">{project.name}</h3>
                <p className="text-[11px] font-semibold text-gray-500 mt-0.5 uppercase tracking-wider">{project.tagline}</p>
              </div>
            </div>
            <StatusBadge status={project.status} />
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-gray-400 mb-5 line-clamp-2 flex-grow">{project.description}</p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold text-gray-400 transition-colors group-hover:border-white/[0.12] group-hover:text-gray-300">
                {t}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="rounded-md border border-white/[0.08] bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold text-gray-500">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mb-5">
            {project.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-2.5 py-2 text-center transition-colors group-hover:border-white/[0.1]">
                <div className="text-sm font-black text-white">{stat.value}</div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-gray-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mt-auto">
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
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl ${BRAND.primary} px-4 py-2.5 text-xs font-bold text-white shadow-lg ${BRAND.shadow} transition-all ${BRAND.primaryHover}`}
              >
                <ArrowUpRight className="h-3.5 w-3.5" />
                Visit Live
              </a>
            ) : (
              <button
                onClick={() => onPreview(project)}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl ${BRAND.primary} px-4 py-2.5 text-xs font-bold text-white shadow-lg ${BRAND.shadow} transition-all ${BRAND.primaryHover}`}
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.95 }}
        transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/[0.1] bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl scrollbar-hide"
      >
        {/* Gradient bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />

        {/* Decorative orb */}
        <div className={`absolute -top-20 -right-20 h-40 w-40 rounded-full bg-gradient-to-br ${project.gradient} opacity-10 blur-[80px]`} />

        {/* Close */}
        <button onClick={onClose} className="absolute right-4 top-5 z-10 rounded-xl bg-white/10 p-2 text-gray-400 transition-all hover:bg-white/20 hover:text-white">
          <X className="h-5 w-5" />
        </button>

        <div className="p-6 sm:p-10">
          {/* Header */}
          <div className="flex items-start gap-4 mb-8">
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl ${project.logo ? 'bg-white p-2' : `bg-gradient-to-br ${project.gradient}`} shadow-xl overflow-hidden`}>
              {project.logo ? (
                <Image src={project.logo} alt={project.name} width={42} height={42} className="object-contain" />
              ) : (
                <project.icon className="h-8 w-8 text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 flex-wrap">
                <h2 className="text-2xl font-black text-white sm:text-3xl">{project.name}</h2>
                <StatusBadge status={project.status} size="md" />
              </div>
              <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">{project.tagline}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-base leading-relaxed text-gray-300 mb-8">{project.description}</p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {project.stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 text-center">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Key Features</h4>
            <div className="grid grid-cols-2 gap-2.5">
              {project.features.map((feature) => (
                <div key={feature} className="flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3 transition-colors hover:border-white/[0.1]">
                  <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${project.gradient} flex-shrink-0`} />
                  <span className="text-sm font-medium text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Tech Stack</h4>
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
              className={`flex items-center justify-center gap-2 rounded-2xl ${BRAND.primary} px-8 py-4 text-base font-bold text-white shadow-lg ${BRAND.shadow} transition-all ${BRAND.primaryHover} hover:shadow-red-500/40`}
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

/* ─── Scroll-to-Projects Button ───────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-600">Scroll</span>
        <ChevronDown className="h-4 w-4 text-gray-600" />
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
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  const featuredProjects = PROJECTS.filter((p) => p.featured);
  const filteredProjects = activeCategory === 'all' ? PROJECTS : PROJECTS.filter((p) => p.category === activeCategory);
  const nonFeaturedFiltered = activeCategory === 'all'
    ? PROJECTS.filter((p) => !p.featured)
    : PROJECTS.filter((p) => p.category === activeCategory && !p.featured);

  return (
    <main className="min-h-screen bg-slate-950 selection:bg-red-500/30">
      {/* ── Noise Texture Overlay ──────────────────────────────────── */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
        {/* Animated bg orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-red-600/[0.08] blur-[150px]"
          />
          <motion.div
            animate={{ x: [0, -30, 0], y: [0, 40, 0], scale: [1.1, 1, 1.1] }}
            transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-40 -right-40 h-[700px] w-[700px] rounded-full bg-blue-600/[0.06] blur-[150px]"
          />
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-purple-600/[0.04] blur-[120px]"
          />
        </div>

        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, rgb(255 255 255) 1px, transparent 0)',
          backgroundSize: '48px 48px',
        }} />

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        </div>

        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }} className="relative mx-auto max-w-7xl px-6 lg:px-8 py-32">
          <div className="text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 flex justify-center"
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-600/30 blur-3xl"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <Image
                  src="/foxes1.png"
                  alt="Foxes Technology"
                  width={120}
                  height={120}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 object-contain drop-shadow-2xl"
                  priority
                />
              </div>
            </motion.div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-red-500/20 bg-red-500/10 px-5 py-2.5 backdrop-blur-md mb-8"
            >
              <Sparkles className="h-4 w-4 text-red-400" />
              <span className="text-sm font-bold text-red-300">Product Showcase</span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-5xl font-black leading-[1.05] text-white sm:text-7xl lg:text-[5.5rem]"
            >
              Built to{' '}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-red-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Transform
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r from-red-500 to-amber-400"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0.8, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
              <br />
              Travel Tech
            </motion.h1>

            {/* Sub */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-gray-400 lg:text-xl"
            >
              <span className="font-bold text-white"><AnimatedCounter value={PROJECTS.length} /></span> production-grade products powering the future of travel.
              <br className="hidden sm:block" />
              From AI concierges to global booking platforms.
            </motion.p>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="mt-10 flex flex-wrap justify-center gap-8 sm:gap-12"
            >
              {[
                { value: PROJECTS.filter(p => p.status === 'live').length, label: 'Live Products' },
                { value: PROJECTS.filter(p => p.category === 'ai').length, label: 'AI Products' },
                { value: PROJECTS.filter(p => p.category === 'mobile').length, label: 'Mobile Apps' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-black text-white sm:text-4xl"><AnimatedCounter value={stat.value} /></div>
                  <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Floating icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-14 flex justify-center gap-4 sm:gap-5"
            >
              {[
                { gradient: 'from-red-500 to-orange-500', icon: Layers },
                { gradient: 'from-blue-500 to-cyan-500', icon: Globe },
                { gradient: 'from-purple-500 to-pink-500', icon: Bot },
                { gradient: 'from-green-500 to-emerald-500', icon: Smartphone },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.3, ease: 'easeInOut' }}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-2xl sm:h-16 sm:w-16 border border-white/10`}
                >
                  <item.icon className="h-6 w-6 text-white sm:h-7 sm:w-7" />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <ScrollIndicator />
      </section>

      {/* ── Tech Marquee ──────────────────────────────────────────── */}
      <TechMarquee />

      {/* ── Featured Projects ─────────────────────────────────────── */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
              <span className="text-xs font-bold uppercase tracking-widest text-red-400">Featured</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
            </div>
            <h2 className="text-center text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              Flagship Products
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-center text-base text-gray-400 lg:text-lg">
              Our most impactful platforms powering real businesses at scale
            </p>
          </motion.div>

          <div className="space-y-8">
            {featuredProjects.map((project) => (
              <FeaturedCard key={project.id} project={project} onPreview={setSelectedProject} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Filter + All Projects ────────────────────────── */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-center text-3xl font-black text-white sm:text-4xl lg:text-5xl mb-4">
              All Products
            </h2>
            <p className="mx-auto max-w-2xl text-center text-base text-gray-400 lg:text-lg mb-10">
              The complete ecosystem of platforms, marketplaces, AI tools, and mobile apps
            </p>

            {/* Category pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => {
                const count = cat.key === 'all' ? PROJECTS.length : PROJECTS.filter((p) => p.category === cat.key).length;
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`flex items-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-300 ${
                      isActive
                        ? `${BRAND.primary} text-white shadow-lg ${BRAND.shadow}`
                        : 'border border-white/[0.08] bg-white/[0.04] text-gray-400 hover:bg-white/[0.08] hover:text-white hover:border-white/[0.12]'
                    }`}
                  >
                    <cat.icon className="h-4 w-4" />
                    {cat.label}
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${isActive ? 'bg-white/20 text-white' : 'bg-white/[0.06] text-gray-500'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {(activeCategory === 'all' ? nonFeaturedFiltered : filteredProjects).map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} onPreview={setSelectedProject} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Technology DNA ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-white/[0.06] py-20 sm:py-28">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/[0.03] blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
              Our Technology DNA
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-gray-400 lg:text-lg">
              Every product built with best-in-class tools for performance, scale, and reliability
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Code2, label: 'Next.js & React', desc: 'Server-first framework', gradient: 'from-slate-400 to-zinc-500' },
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
                className="group rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 sm:p-8 text-center transition-all duration-300 hover:border-white/[0.12] hover:bg-white/[0.06]"
              >
                <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
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
            className="relative overflow-hidden rounded-[2rem] border border-white/[0.1] bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 p-10 shadow-2xl sm:p-16"
          >
            {/* Decorative */}
            <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-red-600/10 blur-[120px]" />
            <div className="absolute left-0 bottom-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />

            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-[0.03]" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, rgb(239 68 68) 1px, transparent 0)',
              backgroundSize: '32px 32px',
            }} />

            <div className="relative text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">
                  Ready to Build the Future?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
                  Whether you need a booking platform, AI assistant, or custom solution — let&apos;s talk about how Foxes Technology can power your business.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link href="/contact">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`group inline-flex w-full items-center justify-center gap-2 rounded-full ${BRAND.primary} px-8 py-4 text-base font-bold text-white shadow-lg ${BRAND.shadow} transition-all ${BRAND.primaryHover} hover:shadow-red-500/40 sm:w-auto cursor-pointer`}
                    >
                      <span>Get Started</span>
                      <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </motion.span>
                  </Link>
                  <Link href="/contact">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10 sm:w-auto cursor-pointer"
                    >
                      Contact Sales
                    </motion.span>
                  </Link>
                </div>

                <p className="mt-8 text-sm text-gray-500">
                  No credit card required &bull; Custom demos available &bull; 24/7 support
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <div className="border-t border-white/[0.06] py-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <Image src="/foxes1.png" alt="Foxes Technology" width={28} height={28} className="object-contain" />
              <span className="text-sm font-bold text-gray-400">Foxes Technology</span>
            </div>
            <p className="text-xs text-gray-600">
              &copy; {new Date().getFullYear()} Foxes Technology. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* ── Detail Modal ──────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
      </AnimatePresence>
    </main>
  );
}
