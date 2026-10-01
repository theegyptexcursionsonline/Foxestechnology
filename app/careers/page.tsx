'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Briefcase, Users, Rocket, Heart, Globe, Code, Zap, Target, CheckCircle, MapPin, Clock } from 'lucide-react';

const BRAND_COLOR_PRIMARY = "bg-red-600";

const openPositions = [
    {
        title: "Senior Full-Stack Engineer",
        department: "Engineering",
        location: "Cairo, Egypt",
        type: "Full-time",
        icon: Code,
        description: "Build scalable booking systems that power thousands of tour operators across Egypt and the GCC.",
        skills: ["React", "Node.js", "TypeScript", "AWS"]
    },
    {
        title: "Product Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        icon: Zap,
        description: "Craft beautiful, intuitive experiences for tour operators and travelers worldwide.",
        skills: ["Figma", "UI/UX", "Design Systems", "Prototyping"]
    },
    {
        title: "Sales Manager - Tourism",
        department: "Sales",
        location: "Dubai, UAE",
        type: "Full-time",
        icon: Target,
        description: "Help tour operators across the GCC transform their businesses with our technology.",
        skills: ["B2B Sales", "Tourism Industry", "Arabic", "English"]
    },
];

const benefits = [
    {
        icon: Rocket,
        title: "Fast-Growing Startup",
        description: "Join a rocket ship and shape the future of travel technology in MENA"
    },
    {
        icon: Users,
        title: "Amazing Team",
        description: "Work with talented people who are passionate about what they do"
    },
    {
        icon: Heart,
        title: "Health & Wellness",
        description: "Comprehensive health insurance and wellness programs for you and your family"
    },
    {
        icon: Globe,
        title: "Remote-First",
        description: "Work from anywhere with flexible hours that fit your lifestyle"
    },
];

const companyValues = [
    {
        title: "Innovation First",
        description: "We constantly push boundaries and embrace new technologies to solve real problems."
    },
    {
        title: "Customer Obsessed",
        description: "Every decision we make is driven by our mission to help tour operators succeed."
    },
    {
        title: "Move Fast",
        description: "We ship quickly, learn from feedback, and iterate to perfection."
    },
    {
        title: "Own It",
        description: "We give you autonomy and trust you to deliver exceptional results."
    },
];

export default function CareersPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-slate-950 py-20 sm:py-28">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <Image
                        src="/image4.png"
                        alt="Join our team at Foxes Technology"
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
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">

                        {/* Left Column: Content */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col justify-center"
                        >
                            {/* Badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex w-fit items-center gap-2 rounded-full border border-red-500/30 bg-red-950/50 px-5 py-2.5 backdrop-blur-md"
                            >
                                <Briefcase className="h-4 w-4 text-red-400" />
                                <span className="text-sm font-bold text-white">We&apos;re Hiring</span>
                            </motion.div>

                            {/* Heading */}
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                                className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
                                style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)' }}
                            >
                                Build the Future of{' '}
                                <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                                    Travel Technology
                                </span>
                            </motion.h1>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="mt-6 text-lg leading-relaxed text-gray-300"
                                style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}
                            >
                                Join our mission to digitize the travel industry across Egypt and the GCC.
                                We&apos;re looking for talented individuals who want to make a real impact.
                            </motion.p>

                            {/* Stats Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="mt-8 overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-950/90 p-6 shadow-2xl backdrop-blur-xl"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg">
                                        <Rocket className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-3xl font-black text-white">
                                            Fast-growing startup
                                        </p>
                                        <p className="mt-2 text-sm leading-relaxed text-gray-400">
                                            We&apos;ve grown 300% in the past year and we&apos;re just getting started.
                                            Join us on this exciting journey.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                                    <div>
                                        <p className="text-2xl font-black text-white">500+</p>
                                        <p className="mt-1 text-xs text-gray-400">Operators</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-white">20+</p>
                                        <p className="mt-1 text-xs text-gray-400">Team Size</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* CTA Button */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                                className="mt-8"
                            >
                                <motion.a
                                    href="#open-positions"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`group inline-flex items-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-2xl shadow-red-500/30 transition-all hover:bg-red-700 hover:shadow-red-500/50`}
                                >
                                    <span>View Open Positions</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </motion.a>
                            </motion.div>
                        </motion.div>

                        {/* Right Column: Benefits Cards */}
                        <div className="relative flex flex-col justify-center space-y-6">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, x: 50, y: 20 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.3 + index * 0.15,
                                        type: "spring",
                                        stiffness: 100
                                    }}
                                    whileHover={{ scale: 1.03, x: -10 }}
                                    className="group relative overflow-hidden rounded-2xl border-2 border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-6 shadow-2xl backdrop-blur-xl transition-all hover:border-red-500/50"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 to-orange-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>

                                    <div className="relative flex items-start gap-4">
                                        <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg transition-transform group-hover:scale-110">
                                            <benefit.icon className="h-7 w-7 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-black text-white">
                                                {benefit.title}
                                            </h3>
                                            <p className="mt-2 text-sm leading-relaxed text-gray-300">
                                                {benefit.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Company Values */}
            <section className="bg-white py-20 sm:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
                            Our Values
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                            These principles guide everything we do and every decision we make.
                        </p>
                    </motion.div>

                    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {companyValues.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg transition-all hover:border-red-500 hover:shadow-xl"
                            >
                                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600">
                                    <CheckCircle className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">
                                    {value.title}
                                </h3>
                                <p className="mt-3 text-sm text-slate-600">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Open Positions */}
            <section id="open-positions" className="bg-slate-50 py-20 sm:py-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center"
                    >
                        <h2 className="text-3xl font-black text-slate-900 sm:text-4xl lg:text-5xl">
                            Open Positions
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                            Join our growing team and help shape the future of travel technology.
                        </p>
                    </motion.div>

                    <div className="mt-16 space-y-6">
                        {openPositions.map((position, index) => (
                            <motion.div
                                key={position.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="group overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg transition-all hover:border-red-500 hover:shadow-2xl"
                            >
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4">
                                            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg">
                                                <position.icon className="h-7 w-7 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-black text-slate-900">
                                                    {position.title}
                                                </h3>
                                                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-600">
                                                    <span className="flex items-center gap-1">
                                                        <Briefcase className="h-4 w-4" />
                                                        {position.department}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="h-4 w-4" />
                                                        {position.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="h-4 w-4" />
                                                        {position.type}
                                                    </span>
                                                </div>
                                                <p className="mt-4 text-slate-600">
                                                    {position.description}
                                                </p>
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {position.skills.map((skill) => (
                                                        <span
                                                            key={skill}
                                                            className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-shrink-0">
                                        <Link href={`/careers/apply?position=${encodeURIComponent(position.title)}`}>
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.98 }}
                                                className={`group inline-flex items-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-red-700`}
                                            >
                                                <span>Apply Now</span>
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </motion.button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* No Position Match */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mt-12 rounded-2xl border-2 border-slate-200 bg-white p-8 text-center shadow-lg"
                    >
                        <h3 className="text-xl font-bold text-slate-900">
                            Don&apos;t see a position that fits?
                        </h3>
                        <p className="mt-2 text-slate-600">
                            We&apos;re always looking for talented people. Send us your resume at{' '}
                            <a href="mailto:careers@foxestechnology.com" className="font-semibold text-red-600 hover:text-red-700">
                                careers@foxestechnology.com
                            </a>
                        </p>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
