'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowRight,
    CheckCircle,
    Calendar,
    CreditCard,
    Globe,
    Smartphone,
    BarChart3,
    Users,
    MessageSquare,
    Shield,
    Zap,
    Clock,
    Mail,
    Bell,
    QrCode,
    Star,
    TrendingUp,
    Sparkles,
    Layers,
    Infinity,
    Rocket,
    Target,
    HeartHandshake
} from 'lucide-react';

export default function FeaturesClient() {
    return (
        <main className="bg-white">
            <HeroSection />
            <TrustedBySection />
            <InteractiveFeaturesShowcase />
            <PremiumFeatureCategories />
            <VisualComparisonSection />
            <IntegrationsGallery />
            <TestimonialsSection />
            <CTASection />
        </main>
    );
}

// Hero Section
function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 backdrop-blur-xl mb-8"
                >
                    <Sparkles className="h-5 w-5 text-yellow-400" />
                    <span className="text-sm font-bold text-white">100+ Premium Features</span>
                    <div className="h-1 w-1 rounded-full bg-green-400 animate-pulse" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight mb-6"
                >
                    <span className="block text-white">Built for</span>
                    <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                        Excellence
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
                >
                    Experience the most powerful booking platform designed for modern tour operators
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap gap-6 justify-center"
                >
                    <Link
                        href="/get-started"
                        className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-600 to-orange-600 px-10 py-4 text-lg font-bold text-white shadow-2xl hover:shadow-red-500/50 transition-all hover:scale-105"
                    >
                        Start Free Trial
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link
                        href="#features"
                        className="inline-flex items-center gap-3 rounded-full border-2 border-white/20 bg-white/5 px-10 py-4 text-lg font-bold text-white backdrop-blur-xl hover:border-white/40 hover:bg-white/10 transition-all"
                    >
                        Explore Features
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

// Trusted By Section
function TrustedBySection() {
    const stats = [
        { icon: Users, number: '500+', label: 'Tour Operators', color: 'from-blue-500 to-cyan-500' },
        { icon: Globe, number: '50+', label: 'Countries', color: 'from-green-500 to-emerald-500' },
        { icon: TrendingUp, number: '$50M+', label: 'Revenue Processed', color: 'from-purple-500 to-pink-500' },
        { icon: Star, number: '4.9/5', label: 'Customer Rating', color: 'from-yellow-500 to-orange-500' },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Trusted by Industry Leaders</h2>
                    <p className="text-xl text-gray-600">Join hundreds of tour operators growing with Foxes Technology</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100"
                        >
                            <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-4`}>
                                <stat.icon className="w-8 h-8 text-white" />
                            </div>
                            <div className="text-4xl font-black text-gray-900 mb-2">{stat.number}</div>
                            <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Interactive Features Showcase
function InteractiveFeaturesShowcase() {
    const categories = [
        {
            id: 'booking',
            title: 'Smart Booking',
            icon: Calendar,
            gradient: 'from-blue-500 to-cyan-500',
            features: [
                'Real-Time Availability',
                '24/7 Online Booking',
                'Multi-Language Support',
                'Digital QR Tickets'
            ]
        },
        {
            id: 'payments',
            title: 'Secure Payments',
            icon: CreditCard,
            gradient: 'from-green-500 to-emerald-500',
            features: [
                'Global Payment Methods',
                'Instant Refunds',
                'Dynamic Pricing',
                'PCI Compliant'
            ]
        },
        {
            id: 'analytics',
            title: 'Smart Analytics',
            icon: BarChart3,
            gradient: 'from-purple-500 to-pink-500',
            features: [
                'Real-Time Dashboards',
                'Predictive AI',
                'Custom Reports',
                'Revenue Insights'
            ]
        },
        {
            id: 'automation',
            title: 'AI Automation',
            icon: Zap,
            gradient: 'from-yellow-500 to-orange-500',
            features: [
                '24/7 AI Assistant',
                'Smart Notifications',
                'Auto-Reminders',
                'Workflow Automation'
            ]
        }
    ];

    return (
        <section id="features" className="py-32 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-black text-gray-900 mb-6">
                        Features That
                        <span className="block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                            Scale With You
                        </span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Everything you need to run, grow, and dominate your market
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: index * 0.1 }}
                            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all border border-gray-100"
                        >
                            <div className={`inline-flex items-center gap-3 rounded-full bg-gradient-to-r ${category.gradient} p-1 pr-6 mb-6`}>
                                <div className="bg-white rounded-full p-2">
                                    <category.icon className="w-6 h-6" />
                                </div>
                                <span className="text-sm font-bold text-white">{category.title}</span>
                            </div>

                            <h3 className="text-3xl font-black text-gray-900 mb-6">{category.title}</h3>

                            <div className="space-y-4">
                                {category.features.map((feature, fIndex) => (
                                    <div key={fIndex} className="flex items-center gap-3">
                                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center flex-shrink-0`}>
                                            <CheckCircle className="w-5 h-5 text-white" />
                                        </div>
                                        <span className="text-lg font-semibold text-gray-700">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Premium Feature Categories
function PremiumFeatureCategories() {
    const allFeatures = [
        { icon: Globe, title: 'Multi-Currency', category: 'Global', color: 'from-blue-500 to-cyan-500' },
        { icon: Shield, title: 'Bank-Level Security', category: 'Security', color: 'from-green-500 to-emerald-500' },
        { icon: Smartphone, title: 'Mobile Apps', category: 'Technology', color: 'from-purple-500 to-pink-500' },
        { icon: Users, title: 'Team Management', category: 'Operations', color: 'from-pink-500 to-rose-500' },
        { icon: MessageSquare, title: 'Live Chat', category: 'Support', color: 'from-cyan-500 to-blue-500' },
        { icon: Star, title: 'Reviews & Ratings', category: 'Marketing', color: 'from-yellow-500 to-orange-500' },
        { icon: Mail, title: 'Email Campaigns', category: 'Marketing', color: 'from-orange-500 to-red-500' },
        { icon: QrCode, title: 'QR Tickets', category: 'Technology', color: 'from-indigo-500 to-purple-500' },
        { icon: Clock, title: 'Real-Time Sync', category: 'Operations', color: 'from-red-500 to-orange-500' },
        { icon: Bell, title: 'Smart Alerts', category: 'Automation', color: 'from-violet-500 to-purple-500' },
        { icon: Target, title: 'Dynamic Pricing', category: 'Revenue', color: 'from-emerald-500 to-teal-500' },
        { icon: Infinity, title: 'Unlimited Bookings', category: 'Scale', color: 'from-teal-500 to-cyan-500' },
    ];

    return (
        <section className="py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-black text-white mb-6">40+ Premium Features</h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Every feature you need, beautifully designed and incredibly powerful
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {allFeatures.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all"
                        >
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                                <feature.icon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                            <span className="text-xs font-semibold text-gray-400 uppercase">{feature.category}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <Link
                        href="/pricing"
                        className="inline-flex items-center gap-2 text-white hover:text-red-400 font-bold text-lg transition-colors"
                    >
                        View All Features & Pricing
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}

// Visual Comparison Section
function VisualComparisonSection() {
    const comparison = {
        before: ['Manual bookings', 'Phone calls only', 'Paper records', 'No analytics', 'Limited reach'],
        after: ['Automated 24/7', 'Omnichannel sales', 'Cloud-based', 'Real-time insights', 'Global reach']
    };

    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-black text-gray-900 mb-6">Transform Your Business</h2>
                    <p className="text-xl text-gray-600">See the difference Foxes Technology makes</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Before */}
                    <div className="bg-gray-50 rounded-3xl p-8 border-2 border-gray-200">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 font-bold text-sm mb-4">
                                ❌ Before
                            </div>
                            <h3 className="text-2xl font-black text-gray-900">Traditional Way</h3>
                        </div>
                        <ul className="space-y-4">
                            {comparison.before.map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xs">✗</span>
                                    </div>
                                    <span className="text-gray-600 font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* After */}
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border-2 border-red-200">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-sm mb-4">
                                ✓ After
                            </div>
                            <h3 className="text-2xl font-black bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                                Foxes Technology
                            </h3>
                        </div>
                        <ul className="space-y-4">
                            {comparison.after.map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                                        <CheckCircle className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="text-gray-900 font-semibold">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Integrations Gallery
function IntegrationsGallery() {
    const integrations = [
        { name: 'Stripe', logo: '💳', category: 'Payments' },
        { name: 'QuickBooks', logo: '📊', category: 'Accounting' },
        { name: 'Mailchimp', logo: '📧', category: 'Marketing' },
        { name: 'WhatsApp', logo: '💬', category: 'Communication' },
        { name: 'Google Analytics', logo: '📈', category: 'Analytics' },
        { name: 'Zapier', logo: '⚡', category: 'Automation' },
        { name: 'Viator', logo: '🎫', category: 'OTA' },
        { name: 'Xero', logo: '💼', category: 'Accounting' },
    ];

    return (
        <section className="py-32 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <Layers className="w-16 h-16 mx-auto mb-6 text-red-600" />
                    <h2 className="text-5xl font-black text-gray-900 mb-6">Connects With Everything</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Seamlessly integrate with 50+ tools you already love
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {integrations.map((integration, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-100 text-center"
                        >
                            <div className="text-5xl mb-4">{integration.logo}</div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{integration.name}</h3>
                            <span className="text-sm text-gray-500">{integration.category}</span>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-gray-600 font-semibold">+ 40 more integrations available</p>
                </div>
            </div>
        </section>
    );
}

// Testimonials Section
function TestimonialsSection() {
    const testimonials = [
        {
            quote: "Foxes Technology transformed our business overnight. Our bookings increased by 200% in the first month.",
            author: "Sarah Johnson",
            role: "CEO, Desert Safari Tours",
            rating: 5
        },
        {
            quote: "The AI assistant handles 80% of our customer inquiries. It's like having a 24/7 support team.",
            author: "Mohamed Ahmed",
            role: "Operations Manager, Nile Cruises",
            rating: 5
        },
        {
            quote: "Best investment we've made. The analytics alone saved us thousands in optimizing our pricing.",
            author: "Lisa Chen",
            role: "Founder, Red Sea Adventures",
            rating: 5
        }
    ];

    return (
        <section className="py-32 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <HeartHandshake className="w-16 h-16 mx-auto mb-6 text-red-400" />
                    <h2 className="text-5xl font-black text-white mb-6">Loved by Operators</h2>
                    <p className="text-xl text-gray-400">See what our customers say</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
                        >
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <p className="text-white text-lg mb-6">&quot;{testimonial.quote}&quot;</p>
                            <div>
                                <div className="font-bold text-white">{testimonial.author}</div>
                                <div className="text-sm text-gray-400">{testimonial.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// CTA Section
function CTASection() {
    return (
        <section className="py-32 bg-gradient-to-br from-red-600 via-orange-600 to-yellow-600">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                <Rocket className="w-20 h-20 mx-auto mb-8 text-white" />

                <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                    Ready to Transform Your Business?
                </h2>
                <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
                    Join 500+ tour operators who have scaled their business with Foxes Technology.
                    Start your free trial today - no credit card required.
                </p>

                <div className="flex flex-wrap gap-6 justify-center mb-12">
                    <Link
                        href="/get-started"
                        className="inline-flex items-center gap-3 rounded-full bg-white px-12 py-6 text-lg font-bold text-red-600 shadow-2xl hover:shadow-white/50 hover:scale-105 transition-all"
                    >
                        Start Free Trial
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-3 rounded-full border-2 border-white bg-white/10 px-12 py-6 text-lg font-bold text-white backdrop-blur-xl hover:bg-white/20 transition-all"
                    >
                        Talk to Sales
                    </Link>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 text-white/90">
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Free 30-day trial</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>No credit card required</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Cancel anytime</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
