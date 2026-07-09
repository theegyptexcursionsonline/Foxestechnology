'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowRight,
    CheckCircle,
    BarChart3,
    TrendingUp,
    DollarSign,
    Users,
    Calendar,
    PieChart,
    LineChart,
    Activity,
    Target,
    Zap,
    Eye,
    Download
} from 'lucide-react';

const BRAND_COLOR_PRIMARY = "bg-red-600";
const BRAND_HOVER_PRIMARY = "hover:bg-red-700";

export default function AnalyticsPage() {
    return (
        <main className="bg-white">
            <HeroSection />
            <DashboardPreview />
            <KeyMetrics />
            <ReportsSection />
            <PredictiveAnalytics />
            <IntegrationSection />
            <CTASection />
        </main>
    );
}

function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-indigo-900 to-slate-950 pt-32 pb-20 lg:pt-40 lg:pb-28">
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, rgb(59 130 246) 1px, transparent 0)`,
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
                            <BarChart3 className="h-4 w-4 text-blue-400" />
                            <span className="text-sm font-bold text-white">Analytics & Reporting</span>
                        </div>

                        <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
                            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                            Data-Driven
                            <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-500 bg-clip-text text-transparent">
                                Decisions
                            </span>
                        </h1>

                        <p className="mt-6 text-lg leading-relaxed text-gray-300 lg:text-xl"
                           style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                            Transform your booking data into actionable insights. Real-time dashboards, predictive analytics,
                            and automated reports to grow your business smarter.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {[
                                { icon: Activity, text: 'Real-Time Data' },
                                { icon: Target, text: 'Predictive Insights' },
                                { icon: Download, text: 'Auto Reports' },
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
                                Start Free Trial
                                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10"
                            >
                                View Demo Dashboard
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
                            {/* Dashboard Preview */}
                            <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-6 py-4">
                                    <h3 className="text-white font-bold text-lg">Revenue Dashboard</h3>
                                    <p className="text-blue-100 text-sm">Real-time performance metrics</p>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-blue-50 rounded-lg p-4">
                                            <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
                                            <div className="text-2xl font-black text-gray-900">$124,500</div>
                                            <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                                <TrendingUp className="w-3 h-3" />
                                                +23% vs last month
                                            </div>
                                        </div>
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <div className="text-sm text-gray-600 mb-1">Bookings</div>
                                            <div className="text-2xl font-black text-gray-900">1,847</div>
                                            <div className="text-xs text-green-600 flex items-center gap-1 mt-1">
                                                <TrendingUp className="w-3 h-3" />
                                                +15% vs last month
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4 h-32 flex items-end justify-between gap-2">
                                        {[40, 65, 45, 80, 60, 90, 75].map((height, i) => (
                                            <div key={i} className="flex-1 bg-gradient-to-t from-blue-600 to-cyan-500 rounded-t" style={{ height: `${height}%` }} />
                                        ))}
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

function DashboardPreview() {
    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Everything in One Dashboard</h2>
                    <p className="text-xl text-gray-600">All the metrics that matter, beautifully visualized</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                >
                    <img
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop"
                        alt="Analytics Dashboard"
                        className="w-full"
                    />
                </motion.div>
            </div>
        </section>
    );
}

function KeyMetrics() {
    const metrics = [
        { icon: DollarSign, title: 'Revenue Tracking', description: 'Daily, weekly, monthly revenue with trends and forecasts', color: 'green' },
        { icon: Users, title: 'Customer Analytics', description: 'Demographics, behavior patterns, lifetime value', color: 'blue' },
        { icon: Calendar, title: 'Booking Trends', description: 'Peak times, popular tours, seasonal patterns', color: 'purple' },
        { icon: TrendingUp, title: 'Growth Metrics', description: 'YoY growth, retention rate, conversion funnels', color: 'orange' },
        { icon: Target, title: 'Performance KPIs', description: 'Occupancy rates, average booking value, ROI', color: 'red' },
        { icon: PieChart, title: 'Channel Analysis', description: 'Revenue by source, OTA performance, direct bookings', color: 'cyan' },
    ];

    const colorClasses: Record<string, { bg: string; text: string }> = {
        green: { bg: 'bg-green-100', text: 'text-green-600' },
        blue: { bg: 'bg-blue-100', text: 'text-blue-600' },
        purple: { bg: 'bg-purple-100', text: 'text-purple-600' },
        orange: { bg: 'bg-orange-100', text: 'text-orange-600' },
        red: { bg: 'bg-red-100', text: 'text-red-600' },
        cyan: { bg: 'bg-cyan-100', text: 'text-cyan-600' },
    };

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {metrics.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
                        >
                            <div className={`w-14 h-14 ${colorClasses[metric.color].bg} rounded-xl flex items-center justify-center mb-4`}>
                                <metric.icon className={`w-7 h-7 ${colorClasses[metric.color].text}`} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{metric.title}</h3>
                            <p className="text-gray-600">{metric.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function ReportsSection() {
    const reports = [
        { name: 'Daily Sales Report', frequency: 'Automated daily', format: 'PDF/Excel' },
        { name: 'Monthly Performance', frequency: 'End of month', format: 'PDF/Excel' },
        { name: 'Customer Insights', frequency: 'Weekly', format: 'PDF' },
        { name: 'Financial Summary', frequency: 'Quarterly', format: 'Excel' },
        { name: 'Custom Reports', frequency: 'On-demand', format: 'PDF/Excel/CSV' },
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
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Automated Reports</h2>
                    <p className="text-xl text-gray-600">Delivered to your inbox on schedule</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {reports.map((report, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-lg"
                        >
                            <Download className="w-10 h-10 text-blue-600 mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{report.name}</h3>
                            <div className="space-y-1 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    {report.frequency}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Activity className="w-4 h-4" />
                                    {report.format}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function PredictiveAnalytics() {
    return (
        <section className="py-20 bg-gradient-to-br from-indigo-600 to-blue-600">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Zap className="w-16 h-16 text-yellow-300 mb-6" />
                        <h2 className="text-4xl font-black text-white mb-6">AI-Powered Predictions</h2>
                        <p className="text-xl text-blue-100 mb-6">
                            Our machine learning algorithms analyze your data to predict future trends and opportunities.
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Revenue forecasting for next 3-12 months',
                                'Demand prediction for dynamic pricing',
                                'Customer churn risk detection',
                                'Optimal inventory recommendations',
                                'Marketing ROI predictions',
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
                        <h3 className="text-2xl font-bold text-white mb-6">Example Prediction</h3>
                        <div className="space-y-6">
                            <div>
                                <div className="flex justify-between text-white mb-2">
                                    <span>Next Month Revenue</span>
                                    <span className="font-bold">$142,000</span>
                                </div>
                                <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-green-400 to-cyan-400 w-[85%]"></div>
                                </div>
                                <div className="text-cyan-200 text-sm mt-1">85% confidence</div>
                            </div>

                            <div className="pt-6 border-t border-white/20">
                                <div className="text-white font-bold mb-4">Recommendations:</div>
                                <ul className="space-y-2 text-blue-100 text-sm">
                                    <li>✓ Increase marketing spend by 15%</li>
                                    <li>✓ Add 3 more time slots on weekends</li>
                                    <li>✓ Launch early bird promotion for slow days</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function IntegrationSection() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Eye className="w-16 h-16 text-blue-600 mx-auto mb-6" />
                    <h2 className="text-4xl font-black text-gray-900 mb-6">Export Anywhere</h2>
                    <p className="text-xl text-gray-600 mb-12">
                        Integrate with your favorite tools or export to any format
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['QuickBooks', 'Xero', 'Excel', 'Google Sheets', 'Power BI', 'Tableau', 'Google Analytics', 'Mailchimp'].map((tool, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4 text-center font-semibold text-gray-900">
                                {tool}
                            </div>
                        ))}
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
                    <BarChart3 className="w-20 h-20 text-blue-400 mx-auto mb-6" />
                    <h2 className="text-4xl font-black text-white mb-6">
                        Start Making Smarter Decisions Today
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Get instant access to powerful analytics with our free trial.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/get-started"
                            className={`inline-flex items-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-lg font-bold text-white shadow-xl shadow-red-500/30 transition-all ${BRAND_HOVER_PRIMARY}`}
                        >
                            Start Free Trial
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-white/40"
                        >
                            Schedule Demo
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
