'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Building, ArrowRight, Send, CheckCircle, Clock, Users, MessageSquare } from 'lucide-react';

const BRAND_COLOR_PRIMARY = "bg-red-600";
const BRAND_HOVER_PRIMARY = "hover:bg-red-700";
const BRAND_TEXT_PRIMARY = "text-red-600";

// Main Page Component
export default function ContactPage() {
    return (
        <main className="bg-white">
            <ContactHero />
            <ContactMethods />
            <ContactFormAndInfo />
            <FAQSection />
        </main>
    );
}

// 1. Enhanced Hero Section
function ContactHero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20 lg:pt-40 lg:pb-28">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/hero2.png"
                    alt="Modern office background"
                    fill
                    className="object-cover opacity-10"
                    priority
                />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-500/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(239 68 68) 1px, transparent 0)`,
                    backgroundSize: '48px 48px'
                }}></div>
            </div>

            <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/50 px-5 py-2.5 backdrop-blur-sm">
                        <MessageSquare className="h-4 w-4 text-red-400" />
                        <span className="text-sm font-bold text-white">Get in Touch</span>
                    </div>

                    <h1 className="text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
                        style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                        Let&apos;s Build Something
                        <span className="block bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
                            Amazing Together
                        </span>
                    </h1>

                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-300 lg:text-xl"
                       style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                        Ready to digitize your Egyptian tour business? Need a demo? Want to discuss how we can help?
                        Our team of tourism technology specialists is here to transform your operations from Cairo to the Red Sea.
                    </p>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap items-center justify-center gap-8 pt-6">
                        {[
                            { icon: Clock, label: '24h Response Time', value: 'Guaranteed' },
                            { icon: Users, label: 'Expert Team', value: '50+ Specialists' },
                            { icon: CheckCircle, label: 'Customer Satisfaction', value: '98%' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                className="flex items-center gap-3"
                            >
                                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${BRAND_COLOR_PRIMARY}`}>
                                    <stat.icon className="h-6 w-6 text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="text-sm font-bold text-white">{stat.value}</p>
                                    <p className="text-xs text-gray-400">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// 2. Enhanced Contact Methods
const contactMethods = [
    {
        name: 'General Inquiries',
        icon: Mail,
        detail: 'info@foxestechnology.com',
        href: 'mailto:info@foxestechnology.com',
        description: 'Questions about digitizing Egyptian tours',
        color: 'from-blue-500 to-blue-600'
    },
    {
        name: 'Sales Department',
        icon: Building,
        detail: 'sales@foxestechnology.com',
        href: 'mailto:sales@foxestechnology.com',
        description: 'Pricing for Egyptian tour operators',
        color: 'from-red-500 to-red-600'
    },
    {
        name: 'Phone Support',
        icon: Phone,
        detail: '+20 115 385 5556',
        href: 'tel:+201153855556',
        description: 'Cairo office: Mon-Fri, 9AM-6PM EET',
        color: 'from-green-500 to-green-600'
    },
    {
        name: 'Visit Our Office',
        icon: MapPin,
        detail: 'Cairo, Egypt',
        href: '#office-info',
        description: 'Meet our team in Cairo',
        color: 'from-purple-500 to-purple-600'
    },
];

function ContactMethods() {
    return (
        <section className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">
                        Choose Your Preferred Channel
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        We&apos;re available through multiple channels to serve you better
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {contactMethods.map((method, index) => (
                        <motion.a
                            key={method.name}
                            href={method.href}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className="group relative overflow-hidden rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg transition-all hover:border-red-500 hover:shadow-xl"
                        >
                            <div>
                                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${method.color} shadow-lg`}>
                                    <method.icon className="h-7 w-7 text-white" />
                                </div>
                                
                                <h3 className="mt-6 text-xl font-bold text-slate-900">{method.name}</h3>
                                <p className="mt-2 text-sm text-slate-500">{method.description}</p>
                                <p className={`mt-4 text-base font-bold ${BRAND_TEXT_PRIMARY} transition-colors group-hover:text-red-700`}>
                                    {method.detail}
                                </p>

                                <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-400 transition-all group-hover:gap-3 group-hover:text-red-600">
                                    <span>Contact now</span>
                                    <ArrowRight className="h-4 w-4" />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}

// 3. Enhanced Contact Form & Office Info
function ContactFormAndInfo() {
    const [formData, setFormData] = useState({
        firstName: '', 
        lastName: '', 
        email: '', 
        phone: '',
        company: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStatus('success');
        
        // Reset form
        setTimeout(() => {
            setStatus('idle');
            setFormData({ firstName: '', lastName: '', email: '', phone: '', company: '', message: '' });
        }, 3000);
    };

    return (
        <section id="office-info" className="bg-slate-50 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                    
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-8">
                            <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">
                                Send Us a Message
                            </h2>
                            <p className="mt-4 text-lg text-slate-600">
                                Fill out the form below and we&apos;ll get back to you within 24 hours.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-bold text-slate-900">
                                        First name *
                                    </label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        required
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="mt-2 block w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-bold text-slate-900">
                                        Last name *
                                    </label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        required
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="mt-2 block w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10"
                                        placeholder="Doe"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-bold text-slate-900">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-2 block w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10"
                                    placeholder="john@company.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-bold text-slate-900">
                                    Phone number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="mt-2 block w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10"
                                    placeholder="+20 123 456 7890"
                                />
                            </div>

                            <div>
                                <label htmlFor="company" className="block text-sm font-bold text-slate-900">
                                    Company name
                                </label>
                                <input
                                    type="text"
                                    name="company"
                                    id="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="mt-2 block w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10"
                                    placeholder="Your Company Ltd."
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-bold text-slate-900">
                                    Message *
                                </label>
                                <textarea
                                    name="message"
                                    id="message"
                                    rows={5}
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="mt-2 block w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-slate-900 transition-all focus:border-red-500 focus:outline-none focus:ring-4 focus:ring-red-500/10"
                                    placeholder="Tell us about your project..."
                                />
                            </div>

                            <motion.button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                                whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                                className={`group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl px-8 py-4 text-lg font-bold text-white shadow-lg transition-all sm:w-auto ${
                                    status === 'success' 
                                        ? 'bg-green-600 hover:bg-green-600' 
                                        : `${BRAND_COLOR_PRIMARY} ${BRAND_HOVER_PRIMARY}`
                                } disabled:opacity-50`}
                            >
                                {status === 'loading' && (
                                    <>
                                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                        <span>Sending...</span>
                                    </>
                                )}
                                {status === 'success' && (
                                    <>
                                        <CheckCircle className="h-5 w-5" />
                                        <span>Message Sent!</span>
                                    </>
                                )}
                                {status === 'idle' && (
                                    <>
                                        <span>Send Message</span>
                                        <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                                {status === 'error' && <span>Try Again</span>}
                            </motion.button>
                        </form>
                    </motion.div>

                    {/* Office Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        {/* Office Hours & Details */}
                        <div className="space-y-6">
                            <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                                        <Clock className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Office Hours</h3>
                                </div>
                                <div className="space-y-3 text-base text-slate-600">
                                    <p className="flex justify-between">
                                        <span className="font-semibold">Monday - Friday:</span>
                                        <span>9:00 AM - 6:00 PM</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="font-semibold">Saturday:</span>
                                        <span>10:00 AM - 4:00 PM</span>
                                    </p>
                                    <p className="flex justify-between">
                                        <span className="font-semibold">Sunday:</span>
                                        <span>Closed</span>
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg">
                                        <Building className="h-6 w-6 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900">Headquarters</h3>
                                </div>
                                <p className="text-base leading-relaxed text-slate-600">
                                    Foxes Technology LLC<br />
                                    Cairo, Egypt<br />
                                    <a href="mailto:info@foxestechnology.com" className={`mt-3 inline-block font-semibold ${BRAND_TEXT_PRIMARY} hover:underline`}>
                                        info@foxestechnology.com
                                    </a>
                                </p>
                            </div>

                            <div className="rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <CheckCircle className={`h-6 w-6 ${BRAND_TEXT_PRIMARY}`} />
                                    <h3 className="text-xl font-bold text-slate-900">Quick Response</h3>
                                </div>
                                <p className="text-base text-slate-600">
                                    We guarantee a response to all Egyptian tourism operators within 24 hours during business days.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// 4. FAQ Section
function FAQSection() {
    const faqs = [
        {
            question: 'How quickly can Egyptian tour operators get started?',
            answer: 'You can start digitizing your tours immediately after signing up. Our onboarding process for Egyptian operators takes less than 30 minutes, with Arabic and English support.'
        },
        {
            question: 'Do you integrate with Egyptian payment systems?',
            answer: 'Yes! We integrate with major Egyptian payment gateways and banking systems. We also support mobile payment processing perfect for on-site tour operations across Egypt.'
        },
        {
            question: 'What support is available for Egyptian tourism businesses?',
            answer: 'We offer 24/7 email support in Arabic and English, live chat during Cairo business hours (9AM-6PM EET), and dedicated account managers for Egyptian enterprise tour operators.'
        },
    ];

    return (
        <section className="bg-white py-20 sm:py-28">
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
                            transition={{ delay: index * 0.1 }}
                            className="rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-lg transition-all hover:border-red-500 hover:shadow-xl"
                        >
                            <div>
                                <h3 className="text-lg font-bold text-slate-900">{faq.question}</h3>
                                <p className="mt-2 text-slate-600">{faq.answer}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}