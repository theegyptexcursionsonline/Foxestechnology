'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowRight,
    CheckCircle,
    Bot,
    MessageSquare,
    Globe,
    Clock,
    Sparkles,
    Brain,
    Languages,
    Zap,
    Users,
    TrendingUp,
    Heart,
    ChevronRight
} from 'lucide-react';

const BRAND_COLOR_PRIMARY = "bg-red-600";
const BRAND_HOVER_PRIMARY = "hover:bg-red-700";

export default function AIPage() {
    return (
        <main className="bg-white">
            <HeroSection />
            <CapabilitiesSection />
            <FeaturesGrid />
            <IntegrationChannels />
            <UseCases />
            <ROIMetrics />
            <CTASection />
        </main>
    );
}

function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-slate-950 pt-32 pb-20 lg:pt-40 lg:pb-28">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(168 85 247) 1px, transparent 0)`,
                    backgroundSize: '48px 48px'
                }}></div>
            </div>
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl"></div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-950/50 px-5 py-2.5 backdrop-blur-sm">
                            <Sparkles className="h-4 w-4 text-purple-400" />
                            <span className="text-sm font-bold text-white">AI Assistant</span>
                        </div>

                        <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
                            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                            AI That Sells
                            <span className="block bg-gradient-to-r from-purple-500 via-fuchsia-400 to-pink-500 bg-clip-text text-transparent">
                                While You Sleep
                            </span>
                        </h1>

                        <p className="mt-6 text-lg leading-relaxed text-gray-300 lg:text-xl"
                           style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                            Your 24/7 AI-powered booking assistant. Handle customer inquiries, provide recommendations,
                            process bookings, and deliver exceptional service—automatically.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {[
                                { icon: Clock, text: '24/7 Availability' },
                                { icon: Languages, text: '50+ Languages' },
                                { icon: Zap, text: 'Instant Responses' },
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
                                Activate AI Assistant
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                            >
                                Try Demo
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-8 backdrop-blur-sm ring-1 ring-white/10">
                            {/* Chat UI Preview */}
                            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                                <div className="bg-gradient-to-r from-purple-600 to-fuchsia-600 px-4 py-3 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <Bot className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-white font-bold">AI Assistant</div>
                                        <div className="text-purple-100 text-xs">Always online</div>
                                    </div>
                                    <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
                                </div>
                                <div className="p-4 space-y-3 h-80 bg-gray-50">
                                    <div className="flex gap-2">
                                        <div className="bg-purple-600 text-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                                            Hello! I&apos;m your AI assistant. How can I help you today?
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-end">
                                        <div className="bg-white text-gray-900 rounded-2xl rounded-tr-sm px-4 py-2 max-w-[80%] shadow">
                                            I want to book a desert safari
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="bg-purple-600 text-white rounded-2xl rounded-tl-sm px-4 py-2 max-w-[80%]">
                                            Great choice! We have desert safaris available for tomorrow. Would you prefer morning or evening?
                                        </div>
                                    </div>
                                    <div className="flex gap-2 flex-wrap">
                                        <button className="bg-white px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-gray-50">
                                            Morning Safari
                                        </button>
                                        <button className="bg-white px-4 py-2 rounded-full text-sm font-semibold shadow hover:bg-gray-50">
                                            Evening Safari
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function CapabilitiesSection() {
    const capabilities = [
        {
            icon: MessageSquare,
            title: 'Natural Conversations',
            description: 'Understands context, remembers preferences, and chats like a human'
        },
        {
            icon: Brain,
            title: 'Smart Recommendations',
            description: 'Suggests perfect tours based on customer interests and history'
        },
        {
            icon: CheckCircle,
            title: 'Complete Bookings',
            description: 'Handles entire booking process from inquiry to payment'
        },
        {
            icon: Heart,
            title: 'Sentiment Analysis',
            description: 'Detects customer emotions and escalates when needed'
        },
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-purple-50 to-fuchsia-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black text-gray-900 mb-4">AI Capabilities</h2>
                    <p className="text-xl text-gray-600">Powered by advanced machine learning</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {capabilities.map((capability, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
                        >
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <capability.icon className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{capability.title}</h3>
                            <p className="text-gray-600">{capability.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeaturesGrid() {
    const features = [
        { icon: Languages, title: 'Multi-Language', description: '50+ languages with auto-detection' },
        { icon: Globe, title: 'Omnichannel', description: 'Website, WhatsApp, Facebook, SMS' },
        { icon: Clock, title: '24/7 Availability', description: 'Never miss a booking opportunity' },
        { icon: Zap, title: 'Instant Replies', description: 'Responds in under 1 second' },
        { icon: Brain, title: 'Self-Learning', description: 'Improves with every conversation' },
        { icon: Users, title: 'Lead Qualification', description: 'Identifies and prioritizes hot leads' },
        { icon: TrendingUp, title: 'Upselling', description: 'Suggests add-ons and upgrades' },
        { icon: Heart, title: 'Human Handoff', description: 'Transfers to staff when needed' },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <feature.icon className="w-8 h-8 text-purple-600" />
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

function IntegrationChannels() {
    const channels = [
        { name: 'Website Chat', icon: MessageSquare, description: 'Embedded chat widget' },
        { name: 'WhatsApp', icon: MessageSquare, description: 'WhatsApp Business API' },
        { name: 'Facebook', icon: MessageSquare, description: 'Messenger integration' },
        { name: 'Instagram', icon: MessageSquare, description: 'DM automation' },
        { name: 'SMS', icon: MessageSquare, description: 'Text message support' },
        { name: 'Email', icon: MessageSquare, description: 'Auto-respond to emails' },
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
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Available Everywhere</h2>
                    <p className="text-xl text-gray-600">Meet customers on their favorite platforms</p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {channels.map((channel, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <channel.icon className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                            <h3 className="font-bold text-gray-900 mb-1">{channel.name}</h3>
                            <p className="text-xs text-gray-600">{channel.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function UseCases() {
    const cases = [
        {
            title: 'Instant Booking Support',
            description: 'Customer asks about availability → AI checks calendar → Shows options → Completes booking → Sends confirmation',
            metric: '95% automated'
        },
        {
            title: 'FAQs & Information',
            description: 'Answers common questions about tours, pricing, policies, and logistics without human intervention',
            metric: '10,000+ Q&A'
        },
        {
            title: 'Lead Nurturing',
            description: 'Follows up with interested customers, sends reminders, and converts browsers into buyers',
            metric: '3x conversion'
        },
        {
            title: 'Customer Support',
            description: 'Handles cancellations, changes, refunds, and special requests 24/7 in any language',
            metric: '80% resolution'
        },
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
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Real-World Use Cases</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cases.map((useCase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gradient-to-br from-purple-50 to-fuchsia-50 rounded-xl p-8 border-2 border-purple-200"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-2xl font-bold text-gray-900">{useCase.title}</h3>
                                <span className="bg-purple-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                                    {useCase.metric}
                                </span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{useCase.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ROIMetrics() {
    return (
        <section className="py-20 bg-gradient-to-br from-purple-600 to-fuchsia-600">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-black text-white mb-6">The Numbers Don&apos;t Lie</h2>
                    <p className="text-xl text-purple-100">Average results from 500+ tour operators</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[
                        { number: '40%', label: 'More Bookings', sublabel: 'Never miss after-hours sales' },
                        { number: '60%', label: 'Cost Savings', sublabel: 'Reduce support staff' },
                        { number: '95%', label: 'Customer Satisfaction', sublabel: 'Instant, accurate answers' },
                        { number: '<1s', label: 'Response Time', sublabel: 'Lightning-fast replies' },
                    ].map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center ring-1 ring-white/20"
                        >
                            <div className="text-5xl font-black text-white mb-2">{metric.number}</div>
                            <div className="text-xl font-bold text-purple-100 mb-1">{metric.label}</div>
                            <div className="text-purple-200 text-sm">{metric.sublabel}</div>
                        </motion.div>
                    ))}
                </div>
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
                    <Bot className="w-20 h-20 text-purple-400 mx-auto mb-6" />
                    <h2 className="text-4xl font-black text-white mb-6">
                        Your AI Assistant is Ready
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Start handling customer inquiries 24/7 in 50+ languages today.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/get-started"
                            className={`inline-flex items-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-lg font-bold text-white shadow-xl shadow-red-500/30 transition-all ${BRAND_HOVER_PRIMARY}`}
                        >
                            Activate AI Free
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-white/40"
                        >
                            See Demo
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
