'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, Mail, Phone, Clock, HelpCircle, Search, BookOpen, Video, Users, Headphones, FileText } from 'lucide-react';
import { useState } from 'react';

const BRAND_COLOR_PRIMARY = "bg-red-600";
const BRAND_HOVER_PRIMARY = "hover:bg-red-700";
const BRAND_TEXT_PRIMARY = "text-red-600";

export default function SupportPage() {
    return (
        <main className="bg-white">
            <SupportHero />
            <ContactOptions />
            <FAQSection />
            <SupportResources />
            <StatusSection />
            <ContactFormSection />
        </main>
    );
}

// Hero Section
function SupportHero() {
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
                        <Headphones className="h-4 w-4 text-red-400" />
                        <span className="text-sm font-bold text-white">Support Center</span>
                    </div>

                    <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
                        style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                        We&apos;re Here to Help
                        <span className="block bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
                            24/7 Support
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300 lg:text-xl"
                       style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                        Get expert help from our dedicated support team. Whether you need technical assistance,
                        have questions about features, or need guidance, we&apos;re available around the clock.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className={`group inline-flex items-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-lg transition-all ${BRAND_HOVER_PRIMARY}`}
                        >
                            <MessageCircle className="h-5 w-5" />
                            <span>Start Live Chat</span>
                        </motion.button>
                        <Link href="/docs">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-md transition-all hover:border-white hover:bg-white/20"
                            >
                                Browse Documentation
                                <ArrowRight className="h-5 w-5" />
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Contact Options
function ContactOptions() {
    const options = [
        {
            icon: MessageCircle,
            title: 'Live Chat',
            description: 'Chat with our support team in real-time',
            availability: 'Available 24/7',
            color: 'from-blue-500 to-blue-600',
            action: 'Start Chat',
        },
        {
            icon: Mail,
            title: 'Email Support',
            description: 'Send us an email and get a response within 2 hours',
            availability: 'support@foxestechnology.com',
            color: 'from-green-500 to-green-600',
            action: 'Send Email',
        },
        {
            icon: Phone,
            title: 'Phone Support',
            description: 'Speak directly with a support specialist',
            availability: '+20 100 123 4567',
            color: 'from-purple-500 to-purple-600',
            action: 'Call Now',
        },
        {
            icon: Video,
            title: 'Video Call',
            description: 'Schedule a screen-sharing session with our team',
            availability: 'Book a time slot',
            color: 'from-orange-500 to-orange-600',
            action: 'Schedule Call',
        },
    ];

    return (
        <section className="relative -mt-16 z-20 pb-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center"
                >
                    <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">
                        Get in Touch
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Choose your preferred way to reach us
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {options.map((option, index) => (
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
                            <div className="relative text-center">
                                <div className={`mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${option.color} shadow-lg`}>
                                    <option.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900">{option.title}</h3>
                                <p className="mt-3 text-sm text-slate-600">{option.description}</p>
                                <p className="mt-4 text-sm font-bold text-slate-900">{option.availability}</p>
                                <button className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${BRAND_TEXT_PRIMARY} transition-all hover:gap-3`}>
                                    <span>{option.action}</span>
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// FAQ Section
function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'How do I purchase Foxes Technology software?',
            answer: 'Contact our sales team for a consultation and demo. We\'ll discuss your business needs, recommend the right package, and guide you through the purchase and implementation process.',
        },
        {
            question: 'What payment methods do you support?',
            answer: 'The software integrates with all major payment gateways including credit/debit cards, local Egyptian payment gateways, mobile wallets, and bank transfers. International payments are also supported.',
        },
        {
            question: 'What is included in the software package?',
            answer: 'Each package includes the core software, installation and configuration, staff training, ongoing technical support, and software updates. Hardware (POS terminals, kiosks) can be purchased separately.',
        },
        {
            question: 'Can the software integrate with my existing systems?',
            answer: 'Yes! We provide comprehensive APIs and can integrate with your existing website, accounting software, CRM, and other business tools. Our technical team handles all integrations.',
        },
        {
            question: 'What kind of support do you provide?',
            answer: 'We offer 24/7 support via live chat, email, and phone. All packages include technical support, with Professional and Enterprise packages receiving priority support and dedicated account managers.',
        },
        {
            question: 'How secure is my data?',
            answer: 'We use bank-level encryption (SSL/TLS), are PCI DSS compliant. You can choose on-premise installation for complete data control, or our secure cloud hosting with redundant backups.',
        },
    ];

    return (
        <section className="bg-gradient-to-b from-white to-slate-50 py-20 sm:py-28">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Quick answers to common questions
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-50"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl ${BRAND_COLOR_PRIMARY}`}>
                                        <HelpCircle className="h-5 w-5 text-white" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900">{faq.question}</h3>
                                </div>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ArrowRight className={`h-5 w-5 ${BRAND_TEXT_PRIMARY} transform rotate-90`} />
                                </motion.div>
                            </button>
                            <motion.div
                                initial={false}
                                animate={{
                                    height: openIndex === index ? 'auto' : 0,
                                    opacity: openIndex === index ? 1 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="px-6 pb-6 pl-20">
                                    <p className="text-base leading-relaxed text-slate-700">{faq.answer}</p>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Support Resources
function SupportResources() {
    const resources = [
        { icon: BookOpen, title: 'Documentation', description: 'Comprehensive guides and API references', link: '/docs' },
        { icon: Video, title: 'Video Tutorials', description: 'Step-by-step video walkthroughs', link: '#' },
        { icon: Users, title: 'Community Forum', description: 'Connect with other operators', link: '#' },
        { icon: FileText, title: 'Knowledge Base', description: 'Articles, tips, and best practices', link: '#' },
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
                        Self-Service Resources
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Find answers and learn at your own pace
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {resources.map((resource, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            <Link href={resource.link} className="group block rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-lg transition-all hover:border-red-300 hover:shadow-2xl">
                                <div className={`mx-auto mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${BRAND_COLOR_PRIMARY} shadow-lg transition-transform group-hover:scale-110`}>
                                    <resource.icon className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-center text-xl font-bold text-slate-900">{resource.title}</h3>
                                <p className="mt-3 text-center text-sm text-slate-600">{resource.description}</p>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Status Section
function StatusSection() {
    return (
        <section className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 p-12 shadow-xl ring-2 ring-green-200"
                >
                    <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
                                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-sm font-bold text-green-900">All Systems Operational</span>
                            </div>
                            <h2 className="mt-6 text-4xl font-black text-slate-900 lg:text-5xl">
                                System Status
                            </h2>
                            <p className="mt-4 text-lg leading-relaxed text-slate-700">
                                All services are running smoothly. Check our status page for real-time updates
                                on API performance, uptime, and scheduled maintenance.
                            </p>
                            <div className="mt-8 space-y-3">
                                <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
                                    <span className="font-semibold text-slate-900">API Response Time</span>
                                    <span className="text-green-600 font-bold">42ms</span>
                                </div>
                                <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">
                                    <span className="font-semibold text-slate-900">Uptime (30 days)</span>
                                    <span className="text-green-600 font-bold">99.98%</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex h-48 w-48 items-center justify-center rounded-3xl bg-green-100 shadow-2xl lg:h-64 lg:w-64">
                                <Clock className="h-32 w-32 text-green-600 lg:h-40 lg:w-40" />
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// Contact Form Section
function ContactFormSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus('success');
        setTimeout(() => {
            setStatus('idle');
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">
                        Send Us a Message
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Can&apos;t find what you&apos;re looking for? Reach out directly
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-2xl lg:p-12"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full rounded-xl border-2 border-slate-200 px-5 py-3.5 text-slate-900 transition-all focus:border-red-500 focus:outline-none"
                                    placeholder="Ahmed Hassan"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-900 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full rounded-xl border-2 border-slate-200 px-5 py-3.5 text-slate-900 transition-all focus:border-red-500 focus:outline-none"
                                    placeholder="ahmed@example.com"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-2">Subject</label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                required
                                className="w-full rounded-xl border-2 border-slate-200 px-5 py-3.5 text-slate-900 transition-all focus:border-red-500 focus:outline-none"
                                placeholder="How can we help?"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-900 mb-2">Message</label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                required
                                rows={6}
                                className="w-full rounded-xl border-2 border-slate-200 px-5 py-3.5 text-slate-900 transition-all focus:border-red-500 focus:outline-none resize-none"
                                placeholder="Tell us more about your question or issue..."
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className={`group flex w-full items-center justify-center gap-2 rounded-xl ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-lg transition-all ${BRAND_HOVER_PRIMARY} disabled:opacity-50`}
                        >
                            {status === 'loading' ? 'Sending...' : status === 'success' ? '✓ Message Sent!' : 'Send Message'}
                            {status === 'idle' && <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />}
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
