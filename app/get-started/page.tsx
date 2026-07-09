'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Rocket, Settings, CreditCard, Zap, UserPlus, BarChart, PlayCircle, Download, Code, Calendar } from 'lucide-react';

const BRAND_COLOR_PRIMARY = "bg-red-600";
const BRAND_HOVER_PRIMARY = "hover:bg-red-700";
const BRAND_TEXT_PRIMARY = "text-red-600";

export default function GetStartedPage() {
    return (
        <main className="bg-white">
            <GetStartedHero />
            <OnboardingSteps />
            <QuickWins />
            <IntegrationOptions />
            <ChecklistSection />
            <ReadyCTA />
        </main>
    );
}

// Hero Section
function GetStartedHero() {
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
                        <Rocket className="h-4 w-4 text-red-400" />
                        <span className="text-sm font-bold text-white">Quick Start Guide</span>
                    </div>

                    <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
                        style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                        Implement Your System
                        <span className="block bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
                            In Just 3 Steps
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300 lg:text-xl"
                       style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                        Get your complete booking and POS system up and running quickly. Our team handles
                        installation, configuration, and training to get you operational fast.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <Link href="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className={`group inline-flex items-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-lg transition-all ${BRAND_HOVER_PRIMARY}`}
                            >
                                <UserPlus className="h-5 w-5" />
                                <span>Request a Demo</span>
                            </motion.button>
                        </Link>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/20"
                        >
                            <PlayCircle className="h-5 w-5" />
                            Watch Demo (2 min)
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Onboarding Steps
function OnboardingSteps() {
    const steps = [
        {
            icon: UserPlus,
            number: 1,
            title: 'Purchase & Consultation',
            description: 'Connect with our sales team to discuss your needs and purchase your software package.',
            time: '1-2 days',
            color: 'from-blue-500 to-blue-600',
            tasks: [
                'Schedule consultation call',
                'Review package options',
                'Purchase software license',
                'Receive installation package',
            ],
        },
        {
            icon: Settings,
            number: 2,
            title: 'Installation & Setup',
            description: 'Our technical team installs and configures the system for your business.',
            time: '3-5 days',
            color: 'from-purple-500 to-purple-600',
            tasks: [
                'System installation',
                'Database configuration',
                'Hardware setup (POS/Kiosk)',
                'Custom branding setup',
            ],
        },
        {
            icon: Rocket,
            number: 3,
            title: 'Training & Go Live',
            description: 'Comprehensive training for your team, then launch your operations.',
            time: '2-3 days',
            color: 'from-green-500 to-green-600',
            tasks: [
                'Staff training sessions',
                'System testing',
                'Data migration',
                'Official launch',
            ],
        },
    ];

    return (
        <section className="relative -mt-16 z-20 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">
                        Your Path to Success
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Follow these three simple steps to launch your business
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="group relative overflow-hidden rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-lg transition-all hover:border-red-300 hover:shadow-2xl lg:p-12"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-orange-50 opacity-0 transition-opacity group-hover:opacity-100"></div>

                            <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
                                <div>
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-lg`}>
                                            <step.icon className="h-10 w-10 text-white" />
                                        </div>
                                        <div>
                                            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                                                <span className="text-xs font-bold text-slate-600">Step {step.number}</span>
                                                <span className="text-xs text-slate-500">•</span>
                                                <span className="text-xs text-slate-500">{step.time}</span>
                                            </div>
                                            <h3 className="mt-2 text-2xl font-black text-slate-900 lg:text-3xl">
                                                {step.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <p className="mt-6 text-lg leading-relaxed text-slate-700">
                                        {step.description}
                                    </p>
                                    <div className="mt-6">
                                        <Link href="/contact">
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`group/btn inline-flex items-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-6 py-3 text-sm font-bold text-white shadow-md transition-all ${BRAND_HOVER_PRIMARY}`}
                                            >
                                                <span>Start Step {step.number}</span>
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {step.tasks.map((task, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: index * 0.2 + i * 0.1 }}
                                            className="flex items-center gap-3 rounded-xl bg-slate-50 p-4 transition-all group-hover:bg-white"
                                        >
                                            <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0" />
                                            <span className="text-base font-semibold text-slate-900">{task}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Quick Wins
function QuickWins() {
    const wins = [
        { icon: Zap, title: 'Fully Owned Software', description: 'Complete ownership and control of your system' },
        { icon: Calendar, title: 'Accept Bookings 24/7', description: 'Automated system works while you sleep' },
        { icon: CreditCard, title: 'Integrated Payments', description: 'POS and online payment processing' },
        { icon: BarChart, title: 'Complete Analytics', description: 'Real-time business insights and reporting' },
    ];

    return (
        <section className="bg-gradient-to-b from-white to-slate-50 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">
                        Immediate Benefits
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        See results from day one
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {wins.map((win, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group text-center"
                        >
                            <div className={`mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${BRAND_COLOR_PRIMARY} shadow-lg transition-transform group-hover:scale-110`}>
                                <win.icon className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">{win.title}</h3>
                            <p className="mt-3 text-sm leading-relaxed text-slate-600">{win.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Integration Options
function IntegrationOptions() {
    const integrations = [
        {
            title: 'On-Premise Installation',
            description: 'Full software installation on your own servers with complete data control',
            icon: Settings,
            difficulty: 'Professional',
            time: 'Handled by our team',
        },
        {
            title: 'Cloud Deployment',
            description: 'We deploy and maintain your system on secure cloud infrastructure',
            icon: Code,
            difficulty: 'Managed',
            time: 'Handled by our team',
        },
        {
            title: 'Hybrid Solution',
            description: 'Combine on-premise POS hardware with cloud-based booking system',
            icon: Download,
            difficulty: 'Custom',
            time: 'Custom setup',
        },
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
                        Choose Your Integration
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Pick the option that works best for your business
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {integrations.map((integration, index) => (
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
                                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${BRAND_COLOR_PRIMARY} shadow-lg`}>
                                    <integration.icon className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="mt-6 text-xl font-bold text-slate-900">{integration.title}</h3>
                                <p className="mt-3 text-sm text-slate-600 leading-relaxed">{integration.description}</p>
                                <div className="mt-6 flex items-center gap-4">
                                    <div className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1">
                                        <span className="text-xs font-bold text-slate-700">{integration.difficulty}</span>
                                    </div>
                                    <div className="text-xs text-slate-500">{integration.time}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Checklist Section
function ChecklistSection() {
    const checklist = [
        'Business registration documents',
        'Server requirements or hosting preferences',
        'Payment gateway merchant accounts',
        'Current booking data for migration',
        'List of hardware needs (POS terminals, kiosks, tablets)',
    ];

    return (
        <section className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">
                        What You&apos;ll Need
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Gather these items before you start for a smooth setup
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-2xl lg:p-12"
                >
                    <div className="space-y-4">
                        {checklist.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center gap-4 rounded-xl bg-slate-50 p-5 transition-all hover:bg-red-50"
                            >
                                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg ${BRAND_COLOR_PRIMARY}`}>
                                    <CheckCircle className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-base font-semibold text-slate-900">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Ready CTA
function ReadyCTA() {
    return (
        <section className="bg-white py-20 sm:py-28">
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

                    <div className="relative text-center">
                        <h2 className="text-4xl font-black text-white lg:text-5xl">
                            Ready to Own Your System?
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
                            Join 500+ tour operators who have digitized their operations with our complete
                            booking and POS software solution. Own your system, control your data.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`group inline-flex w-full items-center justify-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-lg transition-all ${BRAND_HOVER_PRIMARY} sm:w-auto`}
                                >
                                    <Rocket className="h-5 w-5" />
                                    <span>Request Demo</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </motion.button>
                            </Link>
                            <Link href="/pricing">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/20 sm:w-auto"
                                >
                                    View Pricing
                                </motion.button>
                            </Link>
                        </div>
                        <p className="mt-6 text-sm text-gray-400">
                            Complete software solution • Professional installation • Ongoing support included
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
