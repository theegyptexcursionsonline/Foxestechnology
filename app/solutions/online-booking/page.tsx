'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowRight,
    CheckCircle,
    BarChart3,
    Calendar,
    Users,
    Globe,
    CreditCard,
    Cpu,
    Clock,
    Smartphone,
    Shield,
    Zap,
    TrendingUp,
    Star,
    Play
} from 'lucide-react';
import { useState } from 'react';

const BRAND_COLOR_PRIMARY = "bg-red-600";
const BRAND_HOVER_PRIMARY = "hover:bg-red-700";
const BRAND_TEXT_PRIMARY = "text-red-600";

// Main Page Component
export default function OnlineBookingPage() {
    return (
        <main className="bg-white">
            <SolutionHero />
            <SocialProof />
            <FeatureShowcase />
            <HowItWorks />
            <BenefitsSection />
            <Integrations />
            <Testimonials />
            <FinalCTA />
        </main>
    );
}

// 1. Enhanced Hero Section
function SolutionHero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20 lg:pt-40 lg:pb-28">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(239 68 68) 1px, transparent 0)`,
                    backgroundSize: '48px 48px'
                }}></div>
            </div>
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-500/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/50 px-5 py-2.5 backdrop-blur-sm">
                            <Calendar className="h-4 w-4 text-red-400" />
                            <span className="text-sm font-bold text-white">Online Booking Engine</span>
                        </div>

                        <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
                            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                            Sell Tours
                            <span className="block bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
                                24/7 On Autopilot
                            </span>
                        </h1>

                        <p className="mt-6 text-lg leading-relaxed text-gray-300 lg:text-xl"
                           style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                            Transform your website into a powerful booking machine. Accept reservations, 
                            manage inventory, and process payments automatically—while you sleep.
                        </p>

                        {/* Key Benefits Pills */}
                        <div className="mt-8 flex flex-wrap gap-3">
                            {[
                                { icon: CheckCircle, text: 'No Commission' },
                                { icon: Clock, text: '24/7 Availability' },
                                { icon: Zap, text: 'Instant Bookings' },
                            ].map((benefit, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md ring-1 ring-white/20"
                                >
                                    <benefit.icon className="h-4 w-4 text-green-400" />
                                    <span className="text-sm font-semibold text-white">{benefit.text}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                            <Link href="/get-started">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`group inline-flex w-full items-center justify-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-lg transition-all ${BRAND_HOVER_PRIMARY} sm:w-auto`}
                                >
                                    <span>Start Free Trial</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </motion.button>
                            </Link>
                            <Link href="/demo">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/20 sm:w-auto"
                                >
                                    <Play className="h-5 w-5" />
                                    <span>Watch Demo</span>
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Right - Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, x: 30, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative">
                            <div className="overflow-hidden rounded-2xl border-2 border-white/10 shadow-2xl">
                                <Image
                                    src="/foxeshero.png"
                                    alt="Foxes Technology Booking Dashboard"
                                    width={1200}
                                    height={800}
                                    className="w-full"
                                    priority
                                />
                            </div>
                            {/* Floating Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="absolute -bottom-6 -left-6 rounded-2xl border-2 border-green-500/50 bg-white p-4 shadow-xl"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                        <TrendingUp className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-slate-900">+150%</p>
                                        <p className="text-xs font-semibold text-slate-600">Direct Bookings</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// 2. Social Proof Section
function SocialProof() {
    return (
        <section className="relative -mt-16 z-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-slate-200 lg:p-12"
                >
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                        {[
                            { value: '500+', label: 'Active Operators' },
                            { value: '1M+', label: 'Bookings Processed' },
                            { value: '$50M+', label: 'Revenue Generated' },
                            { value: '99.9%', label: 'Uptime SLA' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-4xl font-black text-slate-900">{stat.value}</div>
                                <div className="mt-2 text-sm font-semibold text-slate-600">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// 3. Enhanced Feature Showcase
const features = [
    {
        name: 'Live Inventory Management',
        description: 'Real-time availability tracking for guides, vehicles, and equipment. Never overbook again with our smart calendar system.',
        icon: Calendar,
        color: 'from-blue-500 to-blue-600',
        benefits: ['Auto-sync availability', 'Resource allocation', 'Capacity management']
    },
    {
        name: 'Multi-Channel Distribution',
        description: 'Sync your tours across Viator, GetYourGuide, and more. One update, everywhere instantly.',
        icon: Globe,
        color: 'from-green-500 to-green-600',
        benefits: ['OTA integration', 'Auto inventory sync', 'Unified dashboard']
    },
    {
        name: 'Secure Payment Processing',
        description: 'Accept payments globally with Stripe, PayPal, and local gateways. PCI-compliant and secure.',
        icon: CreditCard,
        color: 'from-purple-500 to-purple-600',
        benefits: ['Multiple currencies', 'Instant payouts', 'Fraud protection']
    },
    {
        name: 'Smart Guest Management',
        description: 'Automated manifests, digital waivers, and customer communication. Everything organized.',
        icon: Users,
        color: 'from-orange-500 to-orange-600',
        benefits: ['Auto check-in', 'Digital waivers', 'Guest profiles']
    },
    {
        name: 'Advanced Analytics',
        description: 'Track revenue, booking trends, and customer behavior. Make data-driven decisions.',
        icon: BarChart3,
        color: 'from-red-500 to-red-600',
        benefits: ['Revenue reports', 'Trend analysis', 'Custom dashboards']
    },
    {
        name: 'Developer-Friendly API',
        description: 'Build custom integrations and workflows with our comprehensive REST API.',
        icon: Cpu,
        color: 'from-cyan-500 to-cyan-600',
        benefits: ['Full API access', 'Webhooks', 'Documentation']
    },
];

function FeatureShowcase() {
    return (
        <section className="bg-gradient-to-b from-white to-slate-50 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">
                        Everything You Need to Sell Online
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Powerful features designed to automate your workflow and boost direct bookings
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                            className="group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-lg transition-all hover:border-red-300 hover:shadow-2xl"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-opacity group-hover:opacity-5`}></div>
                            
                            <div className="relative">
                                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} shadow-lg`}>
                                    <feature.icon className="h-7 w-7 text-white" />
                                </div>
                                
                                <h3 className="mt-6 text-xl font-bold text-slate-900">{feature.name}</h3>
                                <p className="mt-3 text-base leading-relaxed text-slate-600">{feature.description}</p>
                                
                                <ul className="mt-4 space-y-2">
                                    {feature.benefits.map((benefit, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                                            <CheckCircle className="h-4 w-4 flex-shrink-0 text-green-500" />
                                            <span>{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 4. Enhanced How It Works
function HowItWorks() {
    const steps = [
        { 
            number: 1,
            title: "Create Your Products", 
            description: "Build your tours in minutes with our intuitive dashboard. Set prices, schedules, and availability.",
            icon: Calendar
        },
        { 
            number: 2,
            title: "Embed on Your Website", 
            description: "Add our booking widget to your site with a simple code snippet. No technical skills required.",
            icon: Globe
        },
        { 
            number: 3,
            title: "Start Accepting Bookings", 
            description: "Watch bookings roll in 24/7. Manage everything from one central dashboard.",
            icon: Zap
        },
    ];

    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">
                        Get Started in 3 Simple Steps
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        From setup to your first booking in under 30 minutes
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute left-1/2 top-20 hidden h-[calc(100%-8rem)] w-1 -translate-x-1/2 bg-gradient-to-b from-red-500 to-orange-500 lg:block"></div>

                    <div className="space-y-16">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className={`relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center ${
                                    index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                                }`}
                            >
                                {/* Number Badge */}
                                <div className="absolute left-1/2 top-8 z-10 hidden h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full bg-red-600 ring-8 ring-white shadow-lg lg:flex">
                                    <span className="text-2xl font-black text-white">{step.number}</span>
                                </div>

                                {/* Content */}
                                <div className={`${index % 2 === 0 ? 'lg:text-right' : 'lg:col-start-2'}`}>
                                    <div className={`inline-block rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-xl ${
                                        index % 2 === 0 ? 'lg:ml-auto' : 'lg:mr-auto'
                                    }`}>
                                        <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${BRAND_COLOR_PRIMARY}`}>
                                            <step.icon className="h-7 w-7 text-white" />
                                        </div>
                                        <h3 className="mt-4 text-2xl font-bold text-slate-900">{step.title}</h3>
                                        <p className="mt-3 text-base leading-relaxed text-slate-600">{step.description}</p>
                                    </div>
                                </div>

                                {/* Image Placeholder */}
                                <div className={`${index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'}`}>
                                    <div className="aspect-video overflow-hidden rounded-2xl border-2 border-slate-200 bg-slate-100 shadow-lg">
                                        <div className="flex h-full items-center justify-center text-slate-400">
                                            <step.icon className="h-24 w-24" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// 5. Benefits Section
function BenefitsSection() {
    const benefits = [
        { icon: TrendingUp, title: 'Increase Revenue', value: '150%', description: 'Average increase in direct bookings' },
        { icon: Clock, title: 'Save Time', value: '20hrs', description: 'Per week on manual tasks' },
        { icon: Shield, title: 'Reduce No-Shows', value: '80%', description: 'With automated reminders' },
        { icon: Smartphone, title: 'Mobile Optimized', value: '100%', description: 'Responsive on all devices' },
    ];

    return (
        <section className="bg-gradient-to-br from-slate-900 to-slate-950 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black text-white lg:text-5xl">
                        Real Results from Real Operators
                    </h2>
                    <p className="mt-4 text-lg text-gray-300">
                        See what our platform can do for your business
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-sm"
                        >
                            <div className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${BRAND_COLOR_PRIMARY}`}>
                                <benefit.icon className="h-7 w-7 text-white" />
                            </div>
                            <div className="text-4xl font-black text-white">{benefit.value}</div>
                            <h3 className="mt-2 text-lg font-bold text-white">{benefit.title}</h3>
                            <p className="mt-2 text-sm text-gray-400">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 6. Enhanced Integrations
function Integrations() {
    const integrations = [
        { name: 'Viator', logo: '/images/logos/viator.svg' },
        { name: 'GetYourGuide', logo: '/images/logos/getyourguide.svg' },
        { name: 'Klook', logo: '/images/logos/klook.svg' },
        { name: 'Stripe', logo: '/images/logos/stripe.svg' },
        { name: 'PayPal', logo: '/images/logos/paypal.svg' },
        { name: 'Google Analytics', logo: '/images/logos/google-analytics.svg' },
    ];

    return (
        <section className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">
                        Integrates with Your Favorite Tools
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Connect seamlessly with leading platforms to expand your reach
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-6">
                    {integrations.map((integration, index) => (
                        <motion.div
                            key={integration.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="flex items-center justify-center rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-red-300 hover:shadow-md"
                        >
                            <div className="h-12 w-full">
                                <div className="flex h-full items-center justify-center text-slate-400">
                                    {integration.name}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 7. Testimonials Section
function Testimonials() {
    const testimonials = [
        {
            quote: "Foxes transformed our business. We've seen a 200% increase in direct bookings since switching.",
            author: "Ahmed Hassan",
            role: "Owner, Cairo Desert Tours",
            rating: 5
        },
        {
            quote: "The platform is intuitive and powerful. Our team was up and running in less than an hour.",
            author: "Sarah Ali",
            role: "Manager, Nile Cruise Co.",
            rating: 5
        },
    ];

    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">
                        Loved by Tour Operators
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Don&apos;t just take our word for it
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-8 shadow-lg"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-lg leading-relaxed text-slate-700">&quot;{testimonial.quote}&quot;</p>
                            <div className="mt-6 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-slate-200"></div>
                                <div>
                                    <p className="font-bold text-slate-900">{testimonial.author}</p>
                                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 8. Enhanced Final CTA
function FinalCTA() {
    return (
        <section className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 p-12 shadow-2xl lg:p-16"
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(239 68 68) 1px, transparent 0)`,
                            backgroundSize: '32px 32px'
                        }}></div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-red-500/20 blur-3xl"></div>

                    <div className="relative text-center">
                        <h2 className="text-4xl font-black text-white lg:text-5xl">
                            Ready to Transform Your Bookings?
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
                            Join hundreds of operators who have automated their bookings and increased revenue with our platform.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Link href="/get-started">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`group inline-flex w-full items-center justify-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-lg transition-all ${BRAND_HOVER_PRIMARY} sm:w-auto`}
                                >
                                    <span>Start Free Trial</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </motion.button>
                            </Link>
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/20 sm:w-auto"
                                >
                                    Talk to Sales
                                </motion.button>
                            </Link>
                        </div>

                        <p className="mt-8 text-sm text-gray-400">
                            No credit card required • 14-day free trial • Cancel anytime
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}