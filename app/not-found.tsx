'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Home, Search, Map, AlertCircle } from 'lucide-react';

const BRAND_COLOR_PRIMARY = "bg-red-600";

export default function NotFound() {
    return (
        <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
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

            <div className="relative flex min-h-screen items-center justify-center px-6 py-20">
                <div className="w-full max-w-4xl text-center">
                    {/* Logo */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="mb-8"
                    >
                        <Image
                            src="/foxes1.png"
                            alt="Foxes Technology"
                            width={150}
                            height={150}
                            className="mx-auto opacity-80"
                        />
                    </motion.div>
                    {/* Animated 404 */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                        className="relative mb-8"
                    >
                        <div className="relative inline-block">
                            {/* Glowing background effect */}
                            <div className="absolute inset-0 animate-pulse rounded-3xl bg-gradient-to-r from-red-500 to-orange-500 opacity-20 blur-3xl"></div>

                            <h1 className="relative text-[120px] font-black leading-none tracking-tight text-white sm:text-[180px] lg:text-[240px]"
                                style={{
                                    textShadow: '0 0 60px rgba(239, 68, 68, 0.5), 0 0 30px rgba(251, 146, 60, 0.3), 0 10px 40px rgba(0, 0, 0, 0.8)'
                                }}>
                                <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                                    404
                                </span>
                            </h1>
                        </div>
                    </motion.div>

                    {/* Error Icon */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mb-8 flex justify-center"
                    >
                        <div className="inline-flex items-center gap-3 rounded-full border border-red-500/30 bg-red-950/50 px-6 py-3 backdrop-blur-md">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                            <span className="text-sm font-bold text-white">Page Not Found</span>
                        </div>
                    </motion.div>

                    {/* Main Message */}
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="mb-6 text-3xl font-black text-white sm:text-4xl lg:text-5xl"
                        style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.8)' }}
                    >
                        Oops! Looks Like You&apos;re Lost
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-gray-300"
                        style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.8)' }}
                    >
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        Don&apos;t worry, let&apos;s get you back on track.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="flex flex-col gap-4 sm:flex-row sm:justify-center"
                    >
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className={`group inline-flex w-full items-center justify-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-2xl shadow-red-500/30 transition-all hover:bg-red-700 hover:shadow-red-500/50 sm:w-auto`}
                            >
                                <Home className="h-5 w-5" />
                                <span>Go to Homepage</span>
                            </motion.button>
                        </Link>

                        <Link href="/solutions">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/20 sm:w-auto"
                            >
                                <span>Explore Solutions</span>
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </motion.button>
                        </Link>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="mt-16"
                    >
                        <p className="mb-6 text-sm font-semibold uppercase tracking-wider text-gray-400">
                            Popular Pages
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { name: 'About Us', href: '/about', icon: Map },
                                { name: 'Pricing', href: '/pricing', icon: Search },
                                { name: 'Contact', href: '/contact', icon: AlertCircle },
                            ].map((link, index) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
                                >
                                    <Link href={link.href}>
                                        <motion.div
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="group flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 backdrop-blur-sm transition-all hover:border-red-500/50 hover:bg-white/10"
                                        >
                                            <link.icon className="h-4 w-4 text-gray-400 transition-colors group-hover:text-red-400" />
                                            <span className="text-sm font-semibold text-white">{link.name}</span>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Support Text */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        className="mt-12 text-sm text-gray-500"
                    >
                        Need help? Contact us at{' '}
                        <a
                            href="mailto:support@foxestechnology.com"
                            className="font-semibold text-red-400 transition-colors hover:text-red-300"
                        >
                            support@foxestechnology.com
                        </a>
                    </motion.p>
                </div>
            </div>

            {/* Floating Animation Elements */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute left-[10%] top-[20%] hidden opacity-20 lg:block"
            >
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-red-500 to-orange-500 blur-2xl"></div>
            </motion.div>

            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-[20%] right-[15%] hidden opacity-20 lg:block"
            >
                <div className="h-40 w-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 blur-2xl"></div>
            </motion.div>
        </main>
    );
}
