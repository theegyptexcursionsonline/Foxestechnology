'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, Landmark, UserCheck, Hotel, Bus, Briefcase, ArrowRight, CheckCircle } from 'lucide-react';

const BRAND_COLOR_PRIMARY = "bg-red-600";
const BRAND_TEXT_PRIMARY = "text-red-600";

const audiences = [
    {
        icon: Briefcase,
        title: "Tours & Activities Operators",
        description: "Managing bookings and experiences for travelers",
        stat: "300+",
        statLabel: "Active partners",
        color: "from-blue-500 to-blue-600"
    },
    {
        icon: Landmark,
        title: "Attractions & Museums",
        description: "Parks and museums managing visitor experiences",
        stat: "150+",
        statLabel: "Venues digitized",
        color: "from-purple-500 to-purple-600"
    },
    {
        icon: UserCheck,
        title: "Tour Guides",
        description: "Independent guides offering personalized tours",
        stat: "500+",
        statLabel: "Active guides",
        color: "from-orange-500 to-red-600"
    },
];

export default function WhoWeServe() {
    return (
        <section className="relative overflow-hidden bg-white py-20 sm:py-28">
            {/* Background Image with Light Overlay */}
            <div className="absolute inset-0">
                <Image
                    src="/image.png"
                    alt="Tourism professionals and operators"
                    fill
                    className="object-cover"
                    quality={100}
                    priority
                />
                {/* Light overlay gradients for readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/70"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/50 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-transparent to-white/90"></div>
            </div>

            {/* Decorative Line */}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="absolute left-0 top-20 h-1 w-32 origin-left lg:left-20"
                style={{
                    background: 'linear-gradient(to right, rgb(20 184 166), rgb(249 115 22))'
                }}
            />

            {/* Subtle Pattern Overlay */}
            <div className="absolute inset-0 opacity-[0.02]">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(249 115 22) 1px, transparent 0)`,
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
                        {/* Heading */}
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-5xl font-black text-orange-500 sm:text-6xl lg:text-7xl"
                        >
                            Who we serve?
                        </motion.h2>

                        {/* Description */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="mt-6 text-xl leading-relaxed text-slate-800 sm:text-2xl"
                        >
                            We serve the Tours and Activities operators, Attractions, museums, Tour Guides, 
                            Transportation companies, Hotels.
                        </motion.p>

                        {/* Key Points */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="mt-8 space-y-4"
                        >
                            {[
                                "From individual guides to large attractions",
                                "Hotels and transportation providers",
                                "Complete destination management solutions"
                            ].map((point, index) => (
                                <div key={index} className="flex items-start gap-3">
                                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-600" />
                                    <span className="text-lg font-semibold text-slate-700">{point}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* Stats Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 overflow-hidden rounded-2xl border-2 border-slate-200 bg-white/90 p-6 shadow-xl backdrop-blur-sm"
                        >
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-3xl font-black text-orange-600">500+</div>
                                    <div className="mt-1 text-xs font-semibold text-slate-600">Operators</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-orange-600">6</div>
                                    <div className="mt-1 text-xs font-semibold text-slate-600">Industries</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-orange-600">100%</div>
                                    <div className="mt-1 text-xs font-semibold text-slate-600">Dedicated</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Additional Services Pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="mt-6 flex flex-wrap gap-3"
                        >
                            {[
                                { icon: Bus, label: "Transportation" },
                                { icon: Hotel, label: "Hotels" },
                                { icon: Building2, label: "DMCs" },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-2 rounded-full border-2 border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm"
                                >
                                    <item.icon className="h-4 w-4 text-orange-600" />
                                    <span className="text-sm font-bold text-slate-700">{item.label}</span>
                                </div>
                            ))}
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            className="mt-8"
                        >
                            <Link href="/contact">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`group inline-flex items-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-red-700 hover:shadow-xl`}
                                >
                                    <span>Get Started Today</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Floating Audience Cards */}
                    <div className="relative flex flex-col justify-center space-y-6">
                        {audiences.map((audience, index) => (
                            <motion.div
                                key={audience.title}
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
                                className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white/95 p-6 shadow-xl backdrop-blur-sm transition-all hover:border-orange-300 hover:shadow-2xl"
                            >
                                {/* Gradient overlay on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-red-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                
                                <div className="relative">
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-1 items-start gap-4">
                                            <div className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${audience.color} shadow-lg transition-transform group-hover:scale-110`}>
                                                <audience.icon className="h-7 w-7 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-black text-slate-900">
                                                    {audience.title}
                                                </h3>
                                                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                                                    {audience.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
                                        <div>
                                            <div className="text-2xl font-black text-orange-600">
                                                {audience.stat}
                                            </div>
                                            <div className="text-xs font-semibold text-slate-500">
                                                {audience.statLabel}
                                            </div>
                                        </div>
                                        <CheckCircle className="h-6 w-6 text-green-600 opacity-0 transition-opacity group-hover:opacity-100" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Bottom Info Box */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="mt-16 overflow-hidden rounded-3xl border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50 p-8 shadow-xl lg:p-12"
                >
                    <div className="text-center">
                        <h3 className="text-2xl font-black text-slate-900">
                            Don&apos;t see your business type?
                        </h3>
                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-700">
                            We work with all types of travel and tourism businesses. 
                            {' '}
                            <a 
                                href="/contact" 
                                className={`${BRAND_TEXT_PRIMARY} font-bold underline decoration-2 underline-offset-4 transition-all hover:text-red-700`}
                            >
                                Contact us
                            </a>
                            {' '}
                            to discuss your custom solution.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}