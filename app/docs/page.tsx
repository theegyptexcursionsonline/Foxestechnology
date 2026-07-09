'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Book, Code, Layers, Terminal, Zap, FileText, PlayCircle, Download, Search, BookOpen, Shield } from 'lucide-react';

const BRAND_COLOR_PRIMARY = "bg-red-600";
const BRAND_HOVER_PRIMARY = "hover:bg-red-700";
const BRAND_TEXT_PRIMARY = "text-red-600";

export default function DocsPage() {
    return (
        <main className="bg-white">
            <DocsHero />
            <QuickStart />
            <DocCategories />
            <PopularGuides />
            <APICTA />
        </main>
    );
}

// Hero Section
function DocsHero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20 lg:pt-40 lg:pb-28">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(239 68 68) 1px, transparent 0)`,
                    backgroundSize: '48px 48px'
                }}></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-500/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/50 px-5 py-2.5 backdrop-blur-sm">
                        <BookOpen className="h-4 w-4 text-red-400" />
                        <span className="text-sm font-bold text-white">Documentation</span>
                    </div>

                    <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
                        style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                        Everything You Need
                        <span className="block bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
                            To Get Started
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300 lg:text-xl"
                       style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                        Comprehensive guides, tutorials, and API references to help you integrate
                        Foxes Technology into your tour and activity business.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className={`group inline-flex items-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-lg transition-all ${BRAND_HOVER_PRIMARY}`}
                            >
                                <span>Request Demo</span>
                                <ArrowRight className="h-5 w-5" />
                            </motion.button>
                        </Link>
                        <Link href="/get-started">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/20"
                            >
                                Implementation Guide
                                <ArrowRight className="h-5 w-5" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Quick Start Section
function QuickStart() {
    const steps = [
        { icon: Download, title: 'Purchase Software', description: 'Choose your package and complete purchase' },
        { icon: Code, title: 'Installation', description: 'Our team installs and configures your system' },
        { icon: Terminal, title: 'Training', description: 'Comprehensive training for your team' },
        { icon: Zap, title: 'Go Live', description: 'Launch your operations with full support' },
    ];

    return (
        <section className="relative -mt-16 z-20 pb-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-slate-200 lg:p-12"
                >
                    <h2 className="text-3xl font-black text-slate-900 text-center mb-12">
                        Implementation in 4 Steps
                    </h2>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="flex flex-col items-center text-center">
                                    <div className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${BRAND_COLOR_PRIMARY} shadow-lg`}>
                                        <step.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                                        {index + 1}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                                    <p className="mt-2 text-sm text-slate-600">{step.description}</p>
                                </div>
                                {index < 3 && (
                                    <div className="hidden lg:block absolute top-8 -right-4 w-8 h-0.5 bg-slate-200"></div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Documentation Categories
function DocCategories() {
    const categories = [
        {
            icon: Book,
            title: 'Getting Started',
            description: 'Setup guides, authentication, and your first integration',
            color: 'from-blue-500 to-blue-600',
            topics: ['Installation', 'Authentication', 'Quick Start', 'SDKs'],
        },
        {
            icon: Code,
            title: 'API Reference',
            description: 'Complete API documentation with code examples',
            color: 'from-purple-500 to-purple-600',
            topics: ['Bookings API', 'Payments API', 'Analytics API', 'Webhooks'],
        },
        {
            icon: Layers,
            title: 'Integrations',
            description: 'Connect with payment gateways, CRMs, and third-party tools',
            color: 'from-green-500 to-green-600',
            topics: ['Payment Gateways', 'CRM Systems', 'Email Services', 'Analytics'],
        },
        {
            icon: PlayCircle,
            title: 'Tutorials',
            description: 'Step-by-step guides for common use cases',
            color: 'from-orange-500 to-orange-600',
            topics: ['Build a Booking Widget', 'Custom Checkout', 'Mobile Integration', 'Reporting'],
        },
        {
            icon: Shield,
            title: 'Security',
            description: 'Best practices for secure implementations',
            color: 'from-red-500 to-red-600',
            topics: ['API Security', 'PCI Compliance', 'Data Protection', 'GDPR'],
        },
        {
            icon: FileText,
            title: 'Resources',
            description: 'Additional tools, libraries, and community resources',
            color: 'from-indigo-500 to-indigo-600',
            topics: ['Code Samples', 'SDKs & Libraries', 'Postman Collection', 'Community'],
        },
    ];

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
                        Explore Documentation
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Find guides and references for everything you need
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-lg transition-all hover:border-red-300 hover:shadow-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-0 transition-opacity group-hover:opacity-100"></div>
                            <div className="relative">
                                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${category.color} shadow-lg`}>
                                    <category.icon className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-slate-900">{category.title}</h3>
                                <p className="mt-3 text-sm text-slate-600">{category.description}</p>
                                <ul className="mt-4 space-y-2">
                                    {category.topics.map((topic, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                                            <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                                            {topic}
                                        </li>
                                    ))}
                                </ul>
                                <Link href="/api" className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${BRAND_TEXT_PRIMARY} transition-all hover:gap-3`}>
                                    <span>Explore</span>
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Popular Guides
function PopularGuides() {
    const guides = [
        { title: 'Authentication & API Keys', time: '5 min read', category: 'Getting Started' },
        { title: 'Creating Your First Booking', time: '10 min read', category: 'Tutorial' },
        { title: 'Webhooks & Events', time: '8 min read', category: 'API Reference' },
        { title: 'Payment Gateway Integration', time: '15 min read', category: 'Integration' },
        { title: 'Mobile SDK Setup (iOS/Android)', time: '12 min read', category: 'SDK' },
        { title: 'POS Hardware Configuration', time: '10 min read', category: 'Hardware' },
    ];

    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">
                        Popular Guides
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Most viewed documentation by developers
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {guides.map((guide, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-red-300 hover:shadow-lg"
                        >
                            <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${BRAND_COLOR_PRIMARY}`}>
                                <BookOpen className="h-6 w-6 text-white" />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-base font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                                    {guide.title}
                                </h3>
                                <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                                    <span className="font-medium">{guide.category}</span>
                                    <span>•</span>
                                    <span>{guide.time}</span>
                                </div>
                            </div>
                            <ArrowRight className="h-5 w-5 text-slate-400 transition-all group-hover:text-red-600 group-hover:translate-x-1" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// API CTA Section
function APICTA() {
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

                    {/* Decorative Blur */}
                    <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-red-500/20 blur-3xl"></div>

                    <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
                        <div>
                            <h2 className="text-4xl font-black text-white lg:text-5xl">
                                Ready to Build?
                            </h2>
                            <p className="mt-4 text-lg leading-relaxed text-gray-300">
                                Dive into our API reference or get help from our support team.
                                We&apos;re here to help you succeed.
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 sm:flex-row lg:justify-end">
                            <Link href="/api">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`group inline-flex w-full items-center justify-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-lg transition-all ${BRAND_HOVER_PRIMARY} sm:w-auto`}
                                >
                                    <Code className="h-5 w-5" />
                                    <span>API Reference</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </motion.button>
                            </Link>
                            <Link href="/support">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/20 sm:w-auto"
                                >
                                    Get Support
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
