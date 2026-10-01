'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowRight,
    Globe,
    Smartphone,
    Server,
    Bot,
    BarChart3,
    CheckCircle,
    Zap,
    Users,
    TrendingUp,
    Shield,
    Award
} from 'lucide-react';
import ComingSoonModal from '@/components/ComingSoonModal';

const BRAND_COLOR_PRIMARY = "bg-red-600";

const solutions = [
    {
        title: "Online Booking Engine",
        icon: Globe,
        tagline: "Sell 24/7 on autopilot",
        description: "Transform your website into a powerful booking machine. Accept reservations, manage inventory, and process payments automatically.",
        image: "/foxes1.png",
        color: "from-blue-500 to-blue-600",
        link: "/solutions/online-booking",
        stats: [
            { value: "150%", label: "More bookings" },
            { value: "24/7", label: "Availability" },
            { value: "0%", label: "Commission" }
        ],
        features: [
            "Real-time inventory sync",
            "Embedded booking widget",
            "Multi-currency payments",
            "Automated confirmations"
        ]
    },
    {
        title: "POS Hardware",
        icon: Smartphone,
        tagline: "Sell anywhere, anytime",
        description: "Empower your team with PAX A920 Pro handheld terminals. Secure payments, live inventory sync, and all-day battery life.",
        image: "/images/1.png",
        color: "from-green-500 to-green-600",
        link: "/solutions/pos-hardware",
        stats: [
            { value: "100%", label: "Mobile" },
            { value: "8hrs", label: "Battery" },
            { value: "Secure", label: "Payments" }
        ],
        features: [
            "Portable POS terminals",
            "Accept payments on-the-go",
            "Real-time inventory updates",
            "Perfect for field teams"
        ]
    },
    {
        title: "Self-Service Kiosks",
        icon: Server,
        tagline: "24/7 automated sales",
        description: "Deploy PAX SK700 self-service kiosks. Reduce queues, lower costs, and serve customers around the clock.",
        image: "/images/2.png",
        color: "from-purple-500 to-purple-600",
        link: "/solutions/kiosk",
        stats: [
            { value: "24/7", label: "Sales" },
            { value: "-60%", label: "Labor cost" },
            { value: "+40%", label: "Throughput" }
        ],
        features: [
            "Fully automated selling",
            "Indoor & outdoor placement",
            "Integrated payment system",
            "Reduce staff workload"
        ]
    },
    {
        title: "AI Assistant",
        icon: Bot,
        tagline: "Automate customer service",
        description: "FoxesBOT provides instant answers, personalized recommendations, and 24/7 support powered by advanced AI.",
        image: "/images/3.png",
        color: "from-orange-500 to-red-600",
        link: "/solutions/ai",
        stats: [
            { value: "24/7", label: "Support" },
            { value: "-80%", label: "Response time" },
            { value: "10+", label: "Languages" }
        ],
        features: [
            "Automated customer support",
            "Smart recommendations",
            "Multi-language support",
            "Predictive analytics"
        ]
    },
    {
        title: "Analytics Dashboard",
        icon: BarChart3,
        tagline: "Data-driven decisions",
        description: "Track performance, understand customers, and optimize revenue with powerful real-time analytics.",
        image: "/images/4.png",
        color: "from-cyan-500 to-blue-600",
        link: "/solutions/analytics",
        stats: [
            { value: "Real-time", label: "Data" },
            { value: "50+", label: "Metrics" },
            { value: "Custom", label: "Reports" }
        ],
        features: [
            "Real-time insights",
            "Custom dashboards",
            "Behavior tracking",
            "Revenue optimization"
        ]
    }
];

const platformBenefits = [
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Built for performance with 99.9% uptime SLA"
    },
    {
        icon: Shield,
        title: "Bank-Level Security",
        description: "PCI-DSS compliant with end-to-end encryption"
    },
    {
        icon: Users,
        title: "Expert Support",
        description: "24/7 dedicated support team ready to help"
    },
    {
        icon: Globe,
        title: "Global Ready",
        description: "Multi-currency, multi-language support"
    }
];

export default function SolutionsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-white">
            <ComingSoonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-28">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <Image
                        src="/image4.png"
                        alt="Foxes Technology Solutions"
                        fill
                        className="object-cover"
                        quality={100}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-transparent to-slate-950/80"></div>
                </div>

                {/* Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, rgb(239 68 68) 1px, transparent 0)`,
                        backgroundSize: '32px 32px'
                    }}></div>
                </div>

                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="text-center">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/50 px-5 py-2.5 backdrop-blur-md"
                        >
                            <Award className="h-4 w-4 text-red-400" />
                            <span className="text-sm font-bold text-white">Complete Platform</span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-7xl"
                            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)' }}
                        >
                            One Platform,{' '}
                            <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                                Infinite Possibilities
                            </span>
                        </motion.h1>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300 lg:text-xl"
                            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}
                        >
                            From online bookings to AI-powered automation, discover how Foxes Technology
                            empowers tour operators to sell more, work less, and grow faster.
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-8 sm:grid-cols-4"
                        >
                            {[
                                { value: '500+', label: 'Operators' },
                                { value: '1M+', label: 'Bookings' },
                                { value: '99.9%', label: 'Uptime' },
                            ].map((stat, index) => (
                                <div
                                    key={index}
                                    className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md"
                                >
                                    <div className="text-3xl font-black text-white">{stat.value}</div>
                                    <div className="mt-2 text-sm text-gray-300">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Solutions Grid */}
            <section className="bg-gradient-to-b from-white to-slate-50 py-20 sm:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
                            Choose Your Solution
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                            Mix and match solutions to build the perfect system for your business
                        </p>
                    </motion.div>

                    <div className="space-y-20">
                        {solutions.map((solution, index) => (
                            <motion.div
                                key={solution.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="relative"
                            >
                                <div className={`grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center ${
                                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                                }`}>
                                    {/* Content */}
                                    <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                        <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${solution.color} shadow-lg`}>
                                            <solution.icon className="h-8 w-8 text-white" />
                                        </div>

                                        <h3 className="mt-6 text-3xl font-black text-slate-900 lg:text-4xl">
                                            {solution.title}
                                        </h3>
                                        <p className="mt-2 text-lg font-semibold text-red-600">
                                            {solution.tagline}
                                        </p>
                                        <p className="mt-4 text-lg leading-relaxed text-slate-600">
                                            {solution.description}
                                        </p>

                                        {/* Features */}
                                        <ul className="mt-8 space-y-3">
                                            {solution.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500" />
                                                    <span className="text-base font-medium text-slate-700">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Stats */}
                                        <div className="mt-8 grid grid-cols-3 gap-4">
                                            {solution.stats.map((stat, i) => (
                                                <div key={i} className="rounded-xl border-2 border-slate-200 bg-white p-4 text-center">
                                                    <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                                                    <div className="mt-1 text-xs font-semibold text-slate-600">{stat.label}</div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* CTA */}
                                        <div className="mt-8">
                                            <Link href={solution.link}>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`group inline-flex items-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-red-700`}
                                                >
                                                    <span>Learn More</span>
                                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                                </motion.button>
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            transition={{ duration: 0.3 }}
                                            className="relative overflow-hidden rounded-2xl border-2 border-slate-200 shadow-2xl"
                                        >
                                            <Image
                                                src={solution.image}
                                                alt={solution.title}
                                                width={1200}
                                                height={800}
                                                className="w-full"
                                            />
                                            <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-10`}></div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Platform Benefits */}
            <section className="bg-slate-50 py-20 sm:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
                            Why Foxes Technology?
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                            Built specifically for tour operators in Egypt and the GCC
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {platformBenefits.map((benefit, index) => (
                            <motion.div
                                key={benefit.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="rounded-2xl border-2 border-slate-200 bg-white p-8 text-center shadow-lg transition-all hover:border-red-500 hover:shadow-xl"
                            >
                                <div className={`mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${BRAND_COLOR_PRIMARY}`}>
                                    <benefit.icon className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">
                                    {benefit.title}
                                </h3>
                                <p className="mt-3 text-sm text-slate-600">
                                    {benefit.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
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

                        {/* Decorative Elements */}
                        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-red-500/20 blur-3xl"></div>

                        <div className="relative text-center">
                            <h2 className="text-4xl font-black text-white lg:text-5xl">
                                Ready to Get Started?
                            </h2>
                            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
                                See how Foxes Technology can power your business.
                            </p>

                            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <motion.button
                                    onClick={() => setIsModalOpen(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`group inline-flex w-full items-center justify-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-red-700 sm:w-auto`}
                                >
                                    <span>Start Free Trial</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </motion.button>
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
        </main>
    );
}
