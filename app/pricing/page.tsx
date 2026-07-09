'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Check, ArrowRight, HelpCircle, Zap, Star, Shield, X, ChevronDown } from 'lucide-react';

const BRAND_COLOR_PRIMARY = "bg-red-600";
const BRAND_HOVER_PRIMARY = "hover:bg-red-700";
const BRAND_TEXT_PRIMARY = "text-red-600";

// Main Page Component
export default function PricingPage() {
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annually'>('annually');

    return (
        <main className="bg-white">
            <PricingHero billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
            <TrustBadges />
            <PricingTiers billingCycle={billingCycle} />
            <FeatureComparison />
            <PricingFAQ />
            <FinalCTA />
        </main>
    );
}

// 1. Enhanced Hero Section
function PricingHero({ billingCycle, setBillingCycle }: {
    billingCycle: 'monthly' | 'annually';
    setBillingCycle: (cycle: 'monthly' | 'annually') => void;
}) {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20 lg:pt-40 lg:pb-28">
            {/* Background Elements */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(239 68 68) 1px, transparent 0)`,
                    backgroundSize: '48px 48px'
                }}></div>
            </div>
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-500/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>

            <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/50 px-5 py-2.5 backdrop-blur-sm">
                        <Star className="h-4 w-4 text-red-400" />
                        <span className="text-sm font-bold text-white">Transparent Pricing</span>
                    </div>

                    <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
                        style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                        Simple Pricing,
                        <span className="block bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
                            Powerful Results
                        </span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-300 lg:text-xl"
                       style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                        Choose the perfect plan to automate your bookings and grow your business. 
                        No hidden fees, no surprises—just transparent pricing that scales with you.
                    </p>

                    {/* Enhanced Toggle */}
                    <div className="mt-10 inline-flex items-center gap-4 rounded-2xl border-2 border-white/10 bg-white/5 p-2 backdrop-blur-md">
                        <button
                            onClick={() => setBillingCycle('monthly')}
                            className={`relative rounded-xl px-6 py-3 text-base font-bold transition-all ${
                                billingCycle === 'monthly'
                                    ? `${BRAND_COLOR_PRIMARY} text-white shadow-lg`
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBillingCycle('annually')}
                            className={`relative rounded-xl px-6 py-3 text-base font-bold transition-all ${
                                billingCycle === 'annually'
                                    ? `${BRAND_COLOR_PRIMARY} text-white shadow-lg`
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            Annually
                            <span className="ml-2 rounded-full bg-green-500 px-2 py-0.5 text-xs font-bold text-white">
                                Save 20%
                            </span>
                        </button>
                    </div>

                    <p className="mt-4 text-sm text-gray-400">
                        💳 14-day free trial • No credit card required • Cancel anytime
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// 2. Trust Badges
function TrustBadges() {
    const badges = [
        { icon: Shield, text: 'Bank-Level Security', subtext: 'PCI DSS Compliant' },
        { icon: Zap, text: '99.9% Uptime', subtext: 'Guaranteed SLA' },
        { icon: Star, text: '4.9/5 Rating', subtext: '500+ Reviews' },
    ];

    return (
        <section className="relative -mt-16 z-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl bg-white p-8 shadow-2xl ring-1 ring-slate-200"
                >
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        {badges.map((badge, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex items-center gap-4"
                            >
                                <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl ${BRAND_COLOR_PRIMARY}`}>
                                    <badge.icon className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <p className="text-base font-bold text-slate-900">{badge.text}</p>
                                    <p className="text-sm text-slate-600">{badge.subtext}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// 3. Enhanced Pricing Tiers
type PricingTier = {
    name: string;
    id: string;
    href: string;
    price: { monthly: number; annually: number } | 'Custom';
    description: string;
    features: string[];
    notIncluded: string[];
    mostPopular?: boolean;
};

const tiers: PricingTier[] = [
    {
        name: 'Starter',
        id: 'tier-starter',
        href: '/get-started?plan=starter',
        price: { monthly: 99, annually: 79 },
        description: 'Perfect for new operators getting started with online bookings',
        features: [
            'Unlimited bookings & products',
            'Online payment processing',
            'Mobile-optimized booking widget',
            'Email support',
            'Basic analytics dashboard',
            'Customer management',
        ],
        notIncluded: ['AI Assistant', 'Channel Manager', 'Priority Support'],
    },
    {
        name: 'Professional',
        id: 'tier-professional',
        href: '/get-started?plan=professional',
        price: { monthly: 199, annually: 159 },
        description: 'For growing businesses ready to scale with automation',
        features: [
            'Everything in Starter, plus:',
            'AI Assistant (FoxesBOT)',
            'Channel Manager (OTAs)',
            'Advanced analytics & reports',
            'Priority email & chat support',
            'Custom booking flows',
            'Multi-language support',
            'API access',
        ],
        notIncluded: [],
        mostPopular: true,
    },
    {
        name: 'Enterprise',
        id: 'tier-enterprise',
        href: '/contact',
        price: 'Custom',
        description: 'For large operations needing dedicated support',
        features: [
            'Everything in Professional, plus:',
            'Turnstile & hardware integration',
            'Dedicated account manager',
            'Custom development',
            'White-label options',
            'SLA guarantee',
            'Training & onboarding',
            'Priority phone support',
        ],
        notIncluded: [],
    },
];

function PricingTiers({ billingCycle }: { billingCycle: 'monthly' | 'annually' }) {
    return (
        <section className="bg-gradient-to-b from-white to-slate-50 py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {tiers.map((tier, index) => (
                        <motion.div
                            key={tier.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                            className={`relative flex flex-col rounded-3xl p-8 shadow-xl transition-all ${
                                tier.mostPopular
                                    ? 'border-2 border-red-500 bg-gradient-to-br from-slate-900 to-slate-950 text-white ring-2 ring-red-500/20'
                                    : 'border-2 border-slate-200 bg-white text-slate-900'
                            }`}
                        >
                            {tier.mostPopular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                                    <div className={`inline-flex items-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-4 py-2 text-sm font-bold text-white shadow-lg`}>
                                        <Star className="h-4 w-4 fill-white" />
                                        <span>Most Popular</span>
                                    </div>
                                </div>
                            )}

                            <div className="flex-1">
                                <h3 className={`text-2xl font-black ${tier.mostPopular ? 'text-white' : 'text-slate-900'}`}>
                                    {tier.name}
                                </h3>
                                <p className={`mt-4 text-base leading-relaxed ${tier.mostPopular ? 'text-gray-300' : 'text-slate-600'}`}>
                                    {tier.description}
                                </p>

                                <div className="mt-6">
                                    {tier.price === 'Custom' ? (
                                        <div>
                                            <span className="text-5xl font-black">Custom</span>
                                            <p className={`mt-2 text-sm ${tier.mostPopular ? 'text-gray-400' : 'text-slate-600'}`}>
                                                Tailored to your needs
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-5xl font-black">
                                                    ${billingCycle === 'monthly' ? tier.price.monthly : tier.price.annually}
                                                </span>
                                                <span className={`text-lg font-semibold ${tier.mostPopular ? 'text-gray-400' : 'text-slate-600'}`}>
                                                    /month
                                                </span>
                                            </div>
                                            {billingCycle === 'annually' && (
                                                <p className={`mt-2 text-sm ${tier.mostPopular ? 'text-gray-400' : 'text-slate-600'}`}>
                                                    Billed ${tier.price.annually * 12} annually
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <Link href={tier.href} className="mt-8 block">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className={`group flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-base font-bold shadow-lg transition-all ${
                                            tier.mostPopular
                                                ? `${BRAND_COLOR_PRIMARY} text-white ${BRAND_HOVER_PRIMARY}`
                                                : 'bg-slate-900 text-white hover:bg-slate-800'
                                        }`}
                                    >
                                        <span>{tier.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}</span>
                                        <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                    </motion.button>
                                </Link>

                                <ul className={`mt-8 space-y-4 ${tier.mostPopular ? 'text-gray-300' : 'text-slate-700'}`}>
                                    {tier.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <Check className={`h-5 w-5 flex-shrink-0 ${tier.mostPopular ? 'text-green-400' : 'text-green-600'}`} />
                                            <span className="text-sm font-medium">{feature}</span>
                                        </li>
                                    ))}
                                    {tier.notIncluded.length > 0 && (
                                        <>
                                            {tier.notIncluded.map((feature, i) => (
                                                <li key={`not-${i}`} className="flex items-start gap-3 opacity-50">
                                                    <X className="h-5 w-5 flex-shrink-0 text-slate-400" />
                                                    <span className="text-sm font-medium">{feature}</span>
                                                </li>
                                            ))}
                                        </>
                                    )}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-base text-slate-600">
                        All plans include free updates, 24/7 system monitoring, and 99.9% uptime guarantee
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// 4. Enhanced Feature Comparison
const comparisonFeatures = [
    { category: 'Core Features', features: [
        { name: 'Unlimited bookings', starter: true, professional: true, enterprise: true },
        { name: 'Unlimited products', starter: true, professional: true, enterprise: true },
        { name: 'Online payments', starter: true, professional: true, enterprise: true },
        { name: 'Mobile booking widget', starter: true, professional: true, enterprise: true },
        { name: 'Customer management', starter: true, professional: true, enterprise: true },
    ]},
    { category: 'Advanced Features', features: [
        { name: 'AI Assistant (FoxesBOT)', starter: false, professional: true, enterprise: true },
        { name: 'Channel Manager', starter: false, professional: true, enterprise: true },
        { name: 'Advanced analytics', starter: false, professional: true, enterprise: true },
        { name: 'API access', starter: false, professional: true, enterprise: true },
        { name: 'Multi-language', starter: false, professional: true, enterprise: true },
    ]},
    { category: 'Enterprise Features', features: [
        { name: 'Turnstile integration', starter: false, professional: false, enterprise: true },
        { name: 'Dedicated support', starter: false, professional: false, enterprise: true },
        { name: 'Custom development', starter: false, professional: false, enterprise: true },
        { name: 'White-label options', starter: false, professional: false, enterprise: true },
        { name: 'SLA guarantee', starter: false, professional: false, enterprise: true },
    ]},
];

function FeatureComparison() {
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
                        Compare All Features
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        See exactly what&apos;s included in each plan
                    </p>
                </motion.div>

                <div className="overflow-x-auto">
                    <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden rounded-2xl border-2 border-slate-200 shadow-xl">
                            {comparisonFeatures.map((category, categoryIndex) => (
                                <div key={categoryIndex}>
                                    <div className="bg-slate-100 px-6 py-4">
                                        <h3 className="text-lg font-bold text-slate-900">{category.category}</h3>
                                    </div>
                                    <table className="min-w-full divide-y divide-slate-200">
                                        <thead className="bg-slate-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-sm font-bold text-slate-900">Feature</th>
                                                <th className="px-6 py-4 text-center text-sm font-bold text-slate-900">Starter</th>
                                                <th className="px-6 py-4 text-center text-sm font-bold text-slate-900">Professional</th>
                                                <th className="px-6 py-4 text-center text-sm font-bold text-slate-900">Enterprise</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200 bg-white">
                                            {category.features.map((feature, featureIndex) => (
                                                <motion.tr
                                                    key={featureIndex}
                                                    initial={{ opacity: 0 }}
                                                    whileInView={{ opacity: 1 }}
                                                    transition={{ delay: featureIndex * 0.05 }}
                                                    viewport={{ once: true }}
                                                    className="hover:bg-slate-50"
                                                >
                                                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{feature.name}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        {feature.starter ? (
                                                            <Check className="mx-auto h-5 w-5 text-green-600" />
                                                        ) : (
                                                            <X className="mx-auto h-5 w-5 text-slate-300" />
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {feature.professional ? (
                                                            <Check className="mx-auto h-5 w-5 text-green-600" />
                                                        ) : (
                                                            <X className="mx-auto h-5 w-5 text-slate-300" />
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        {feature.enterprise ? (
                                                            <Check className="mx-auto h-5 w-5 text-green-600" />
                                                        ) : (
                                                            <X className="mx-auto h-5 w-5 text-slate-300" />
                                                        )}
                                                    </td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const faqs = [
    { 
        question: 'Is there a free trial available?', 
        answer: 'Yes! We offer a 14-day free trial on all plans. No credit card required to get started. You can explore all features and decide which plan works best for your business.' 
    },
    { 
        question: 'Can I change my plan later?', 
        answer: "Absolutely! You can upgrade, downgrade, or cancel your plan at any time from your account dashboard. Changes take effect immediately, and we'll prorate any charges." 
    },
    { 
        question: 'What payment methods do you accept?', 
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express) and debit cards. For Enterprise plans, we also support bank transfers and can provide custom payment terms.' 
    },
    { 
        question: 'Is there a setup fee?', 
        answer: 'No! There are no setup fees, hidden charges, or surprise costs. The price you see is what you pay—simple and transparent.' 
    },
    { 
        question: 'Do you offer refunds?', 
        answer: "Yes. If you're not satisfied within the first 30 days, we'll refund your payment in full. We want you to be completely happy with our platform." 
    },
    { 
        question: 'Can I get a custom Enterprise plan?', 
        answer: 'Yes! Our Enterprise plans are fully customizable based on your specific needs. Contact our sales team to discuss volume pricing, custom features, and dedicated support options.' 
    },
];

function PricingFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black text-slate-900 lg:text-5xl">
                        Frequently Asked Questions
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Everything you need to know about our pricing
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
                            className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-sm transition-all hover:border-red-300 hover:shadow-md"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="flex w-full items-center justify-between p-6 text-left"
                            >
                                <span className="text-lg font-bold text-slate-900">{faq.question}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ChevronDown className="h-6 w-6 text-slate-600" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="border-t border-slate-200 px-6 py-4">
                                            <p className="text-base leading-relaxed text-slate-700">{faq.answer}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-base text-slate-600">
                        Still have questions?{' '}
                        <Link href="/contact" className={`font-bold ${BRAND_TEXT_PRIMARY} hover:underline`}>
                            Contact our team
                        </Link>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

// 6. Final CTA
function FinalCTA() {
    return (
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

                    {/* Decorative Blur */}
                    <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-red-500/20 blur-3xl"></div>

                    <div className="relative text-center">
                        <h2 className="text-4xl font-black text-white lg:text-5xl">
                            Ready to Get Started?
                        </h2>
                        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-300">
                            Join 500+ operators who have transformed their business with our platform. 
                            Start your free 14-day trial today—no credit card required.
                        </p>

                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Link href="/get-started">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`group inline-flex w-full items-center justify-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-base font-bold text-white shadow-lg transition-all ${BRAND_HOVER_PRIMARY} sm:w-auto`}
                                >
                                    <span>Start Free Trial</span>
                                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </motion.button>
                            </Link>
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
                    </div>
                </motion.div>
            </div>
        </section>
    );
}