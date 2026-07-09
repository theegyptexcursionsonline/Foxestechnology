'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Globe, Ticket, TrendingUp, Award, Shield, CheckCircle } from 'lucide-react';

const BRAND_COLOR_PRIMARY = "bg-red-600";
const BRAND_TEXT_PRIMARY = "text-red-600";

const destinationGoals = [
    {
        icon: Globe,
        title: "Attract Global Travelers",
        description: "Transforming Egypt's tourism sector to compete globally—from the Pyramids to the Red Sea, making every experience instantly bookable worldwide",
        stat: "150%",
        statLabel: "Growth potential"
    },
    {
        icon: Ticket,
        title: "Digitize the Industry",
        description: "As the digital transformer, we're bringing Egyptian tour operators, attractions, and guides into the modern booking ecosystem",
        stat: "80%",
        statLabel: "Still offline"
    },
    {
        icon: TrendingUp,
        title: "Empower Local Operators",
        description: "Equipping Egyptian tourism businesses with world-class technology to showcase the nation's rich heritage and culture",
        stat: "500+",
        statLabel: "Active partners"
    },
];

export default function ForDestinations() {
    return (
        <section className="relative overflow-hidden py-20 sm:py-28">
            {/* Background Image with Enhanced Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/image4.png"
                    alt="Beautiful Egyptian destination - Nile river at sunset"
                    fill
                    className="object-cover"
                    quality={100}
                    priority
                />
                {/* Enhanced gradient overlays for glassmorphism */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/98 via-slate-900/95 to-slate-950/98"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95"></div>
                <div className="absolute inset-0 backdrop-blur-[2px]"></div>
            </div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 z-0 opacity-[0.05]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(239 68 68) 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }}></div>
            </div>

            {/* Decorative Gradient Orbs */}
            <div className="absolute top-0 right-0 h-[32rem] w-[32rem] rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/10 blur-3xl z-0"></div>
            <div className="absolute bottom-0 left-0 h-[32rem] w-[32rem] rounded-full bg-gradient-to-tr from-orange-500/10 to-red-500/20 blur-3xl z-0"></div>

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
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="inline-flex w-fit items-center gap-2 rounded-full border border-red-500/50 bg-red-950/60 px-5 py-2.5 backdrop-blur-xl shadow-lg"
                        >
                            <Award className="h-5 w-5 text-red-400" />
                            <span className="text-sm font-bold text-white">Destination-Level Transformation</span>
                        </motion.div>

                        {/* Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl"
                            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)' }}
                        >
                            Digitally Transforming{' '}
                            <span className="block mt-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                                Egypt&apos;s Tourism Ecosystem
                            </span>
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="mt-6 text-lg leading-relaxed text-gray-200 lg:text-xl"
                            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}
                        >
                            We partner with the Egyptian Ministry of Tourism and destination authorities to digitize entire tourism ecosystems—from Luxor&apos;s ancient wonders to Sharm El Sheikh&apos;s coastal resorts—empowering operators nationwide with world-class technology and driving sustainable economic growth.
                        </motion.p>

                        {/* Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="relative mt-8 overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl"
                        >
                            {/* Glass effect layers */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent opacity-60"></div>
                            <div className="absolute inset-0 bg-gradient-to-tl from-red-500/10 via-transparent to-orange-500/5"></div>

                            <div className="relative">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg">
                                        <TrendingUp className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-3xl font-black text-white drop-shadow-lg">
                                            80% offline opportunity
                                        </p>
                                        <p className="mt-2 text-sm leading-relaxed text-gray-200">
                                            As digital transformers, we&apos;re unlocking massive growth potential by bringing Egyptian operators into the global marketplace with modern booking technology.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-white/20 pt-6">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 ring-1 ring-green-400/30">
                                            <Shield className="h-5 w-5 text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wider text-green-400">
                                                Official Partnership
                                            </p>
                                            <p className="mt-1 text-base font-semibold text-white">
                                                Ministry of Tourism & Antiquities, Egypt
                                            </p>
                                        </div>
                                    </div>
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
                            <Link href="/destinations">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-red-500/30 transition-all hover:shadow-red-500/50"
                                >
                                    <span className="relative z-10">Explore Destination Projects</span>
                                    <ArrowRight className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Floating Goal Cards */}
                    <div className="relative flex flex-col justify-center space-y-6">
                        {destinationGoals.map((goal, index) => (
                            <motion.div
                                key={goal.title}
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
                                className="group relative overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-8 shadow-2xl backdrop-blur-2xl transition-all hover:border-red-400/60 hover:bg-white/15"
                            >
                                {/* Glass effect layers */}
                                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent opacity-50"></div>
                                <div className="absolute inset-0 bg-gradient-to-tl from-red-500/0 to-orange-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>

                                <div className="relative">
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-1 items-start gap-4">
                                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-red-500/50">
                                                <goal.icon className="h-8 w-8 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-black text-white drop-shadow-lg">
                                                    {goal.title}
                                                </h3>
                                                <p className="mt-2 text-sm leading-relaxed text-gray-200">
                                                    {goal.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4">
                                        <div>
                                            <div className="text-3xl font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                                                {goal.stat}
                                            </div>
                                            <div className="text-xs font-semibold text-gray-300">
                                                {goal.statLabel}
                                            </div>
                                        </div>
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500/20 ring-1 ring-green-400/30 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                                            <CheckCircle className="h-6 w-6 text-green-400" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom Stats Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="relative mt-20 overflow-hidden rounded-3xl border border-white/30 bg-white/10 p-10 shadow-2xl backdrop-blur-2xl lg:p-12"
                >
                    {/* Glass effect layers */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent opacity-60"></div>
                    <div className="absolute inset-0 bg-gradient-to-tl from-red-500/10 via-transparent to-orange-500/5"></div>

                    <div className="relative grid grid-cols-1 gap-10 sm:grid-cols-3">
                        {[
                            { value: "20+", label: "Destination Projects", subtext: "Across Egypt", icon: Globe },
                            { value: "500+", label: "Operators Digitized", subtext: "And growing", icon: Ticket },
                            { value: "$50M+", label: "Economic Impact", subtext: "Revenue enabled", icon: TrendingUp },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.9 + index * 0.1 }}
                                className="group text-center"
                            >
                                <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-red-500/50">
                                    <stat.icon className="h-8 w-8 text-white" />
                                </div>
                                <div className="text-5xl font-black bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">
                                    {stat.value}
                                </div>
                                <div className="mt-3 text-base font-bold text-white">
                                    {stat.label}
                                </div>
                                <div className="mt-1 text-sm text-gray-300">
                                    {stat.subtext}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}