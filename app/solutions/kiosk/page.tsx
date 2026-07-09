'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowRight,
    CheckCircle,
    Monitor,
    CreditCard,
    QrCode,
    Languages,
    Clock,
    ShieldCheck,
    Zap,
    Users,
    Printer,
    Camera,
    Accessibility,
    TrendingDown
} from 'lucide-react';

const BRAND_COLOR_PRIMARY = "bg-red-600";
const BRAND_HOVER_PRIMARY = "hover:bg-red-700";

export default function KioskPage() {
    return (
        <main className="bg-white">
            <HeroSection />
            <BenefitsSection />
            <FeaturesGrid />
            <HowItWorks />
            <Customization />
            <ROISection />
            <CTASection />
        </main>
    );
}

function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20 lg:pt-40 lg:pb-28">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(239 68 68) 1px, transparent 0)`,
                    backgroundSize: '48px 48px'
                }}></div>
            </div>
            <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/50 px-5 py-2.5 backdrop-blur-sm">
                            <Monitor className="h-4 w-4 text-blue-400" />
                            <span className="text-sm font-bold text-white">Self-Service Kiosks</span>
                        </div>

                        <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
                            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                            Contactless
                            <span className="block bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
                                Self-Service Kiosks
                            </span>
                        </h1>

                        <p className="mt-6 text-lg leading-relaxed text-gray-300 lg:text-xl"
                           style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                            Empower customers to book, pay, and check-in independently. Reduce queues, cut costs,
                            and provide 24/7 service with our intelligent kiosk systems.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {[
                                { icon: Clock, text: '24/7 Service' },
                                { icon: TrendingDown, text: 'Reduce Wait Times' },
                                { icon: Users, text: 'No Staff Needed' },
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

                        <div className="mt-10 flex flex-wrap gap-4">
                            <Link
                                href="/get-started"
                                className={`group inline-flex items-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-lg font-bold text-white shadow-xl shadow-red-500/30 transition-all ${BRAND_HOVER_PRIMARY} hover:shadow-red-500/50`}
                            >
                                Get Started Free
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                            >
                                See Demo
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-8 backdrop-blur-sm ring-1 ring-white/10">
                            <img
                                src="/kiosk3.png"
                                alt="Self-Service Kiosk"
                                className="rounded-xl shadow-2xl"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&auto=format&fit=crop';
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function BenefitsSection() {
    const benefits = [
        {
            icon: TrendingDown,
            title: 'Reduce Wait Times by 70%',
            description: 'Customers check-in and book instantly, eliminating long queues'
        },
        {
            icon: Users,
            title: 'Lower Staff Costs',
            description: 'Reduce front desk staff by automating bookings and check-ins'
        },
        {
            icon: Clock,
            title: '24/7 Availability',
            description: 'Serve customers even when your office is closed'
        },
        {
            icon: Zap,
            title: 'Instant Processing',
            description: 'Complete transactions in under 60 seconds'
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Why Tour Operators Love Kiosks</h2>
                    <p className="text-xl text-gray-600">Proven results from hundreds of installations</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg text-center"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <benefit.icon className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                            <p className="text-gray-600">{benefit.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeaturesGrid() {
    const features = [
        { icon: Languages, title: 'Multi-Language', description: 'Support Arabic, English, French, German, Chinese, and more' },
        { icon: CreditCard, title: 'All Payment Methods', description: 'Cards, mobile wallets, contactless, and QR payments' },
        { icon: QrCode, title: 'QR Code Tickets', description: 'Instant ticket generation with QR codes' },
        { icon: Printer, title: 'Receipt Printing', description: 'Thermal printers for tickets and receipts' },
        { icon: Camera, title: 'Photo Capture', description: 'Take customer photos for tickets and IDs' },
        { icon: ShieldCheck, title: 'Secure & Compliant', description: 'PCI-DSS certified with data encryption' },
        { icon: Accessibility, title: 'ADA Compliant', description: 'Accessible design for all customers' },
        { icon: Zap, title: 'Fast Performance', description: 'Lightning-fast touchscreen response' },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Packed with Features</h2>
                    <p className="text-xl text-gray-600">Everything you need for self-service excellence</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="text-center"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <feature.icon className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function HowItWorks() {
    const steps = [
        { number: 1, title: 'Customer Arrives', description: 'Customer approaches kiosk and selects language' },
        { number: 2, title: 'Browse & Select', description: 'Browse available tours, activities, and time slots' },
        { number: 3, title: 'Complete Booking', description: 'Enter details and make secure payment' },
        { number: 4, title: 'Get Ticket', description: 'Receive printed ticket with QR code instantly' },
    ];

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black text-gray-900 mb-4">How It Works</h2>
                    <p className="text-xl text-gray-600">Simple 4-step process for customers</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative"
                        >
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-300 to-transparent -translate-x-4" />
                            )}
                            <div className="bg-white rounded-2xl p-6 shadow-lg relative z-10">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-black">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">{step.title}</h3>
                                <p className="text-gray-600 text-center">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Customization() {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-600 to-cyan-600">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-black text-white mb-6">Fully Branded for Your Business</h2>
                        <p className="text-xl text-blue-100 mb-6">
                            Make the kiosk truly yours. Customize every aspect to match your brand and workflow.
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Custom branded interface with your logo and colors',
                                'Personalized welcome messages and instructions',
                                'Tailored booking flow for your specific tours',
                                'Custom receipt templates with marketing messages',
                                'Promotional videos and slideshow when idle',
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-white">
                                    <CheckCircle className="w-6 h-6 text-cyan-300 flex-shrink-0 mt-0.5" />
                                    <span className="text-lg">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 ring-1 ring-white/20"
                    >
                        <h3 className="text-2xl font-bold text-white mb-6">Hardware Options</h3>
                        <div className="space-y-4">
                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="text-white font-bold mb-2">Standard Kiosk</h4>
                                <p className="text-blue-100 text-sm mb-2">22&quot; touchscreen, card reader, printer</p>
                                <p className="text-white text-xl font-black">From $2,999</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="text-white font-bold mb-2">Premium Kiosk</h4>
                                <p className="text-blue-100 text-sm mb-2">32&quot; touchscreen, dual screens, camera</p>
                                <p className="text-white text-xl font-black">From $4,999</p>
                            </div>
                            <div className="bg-white/10 rounded-lg p-4">
                                <h4 className="text-white font-bold mb-2">Outdoor Kiosk</h4>
                                <p className="text-blue-100 text-sm mb-2">Weather-proof, anti-glare, vandal-resistant</p>
                                <p className="text-white text-xl font-black">From $7,999</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function ROISection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-black text-gray-900 mb-6">Pay for Itself in 6 Months</h2>
                    <p className="text-xl text-gray-600 mb-12">Average ROI from real customers</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        <div className="bg-blue-50 rounded-2xl p-8">
                            <div className="text-5xl font-black text-blue-600 mb-2">70%</div>
                            <div className="text-gray-600">Reduction in wait times</div>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-8">
                            <div className="text-5xl font-black text-blue-600 mb-2">40%</div>
                            <div className="text-gray-600">Lower staffing costs</div>
                        </div>
                        <div className="bg-blue-50 rounded-2xl p-8">
                            <div className="text-5xl font-black text-blue-600 mb-2">25%</div>
                            <div className="text-gray-600">Increase in sales</div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Example: Medium Tour Operator</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Monthly Savings</div>
                                <div className="text-2xl font-black text-gray-900 mb-3">$3,500</div>
                                <ul className="text-gray-600 text-sm space-y-1">
                                    <li>• 2 fewer front desk staff</li>
                                    <li>• Extended service hours</li>
                                    <li>• Reduced payment processing fees</li>
                                </ul>
                            </div>
                            <div>
                                <div className="text-sm text-gray-600 mb-1">Investment</div>
                                <div className="text-2xl font-black text-gray-900 mb-3">$4,999</div>
                                <ul className="text-gray-600 text-sm space-y-1">
                                    <li>• One-time hardware cost</li>
                                    <li>• Free installation & setup</li>
                                    <li>• Lifetime software updates</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-6 pt-6 border-t border-blue-200">
                            <div className="text-lg font-bold text-gray-900">Payback Period: <span className="text-blue-600">1.4 months</span></div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

function CTASection() {
    return (
        <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-950">
            <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl font-black text-white mb-6">
                        Ready to Automate Your Check-ins?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join hundreds of tour operators using our self-service kiosks.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/contact"
                            className={`inline-flex items-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-lg font-bold text-white shadow-xl shadow-red-500/30 transition-all ${BRAND_HOVER_PRIMARY}`}
                        >
                            Request Quote
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link
                            href="/get-started"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-white/40"
                        >
                            See Live Demo
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
