'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
    ArrowRight,
    CheckCircle,
    Smartphone,
    Tablet,
    Wifi,
    WifiOff,
    CreditCard,
    Scan,
    Battery,
    Shield,
    Zap,
    Users,
    BarChart3,
    Clock,
    Printer,
    Package
} from 'lucide-react';

const BRAND_COLOR_PRIMARY = "bg-red-600";
const BRAND_HOVER_PRIMARY = "hover:bg-red-700";

export default function POSHardwarePage() {
    return (
        <main className="bg-white">
            <HeroSection />
            <DeviceShowcase />
            <FeaturesGrid />
            <OfflineCapabilities />
            <UseCases />
            <Specifications />
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
            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-500/20 blur-3xl"></div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-950/50 px-5 py-2.5 backdrop-blur-sm">
                            <Tablet className="h-4 w-4 text-red-400" />
                            <span className="text-sm font-bold text-white">POS Hardware</span>
                        </div>

                        <h1 className="mt-8 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
                            style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)' }}>
                            Professional POS
                            <span className="block bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent">
                                On-Site Excellence
                            </span>
                        </h1>

                        <p className="mt-6 text-lg leading-relaxed text-gray-300 lg:text-xl"
                           style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>
                            Equip your team with powerful handheld devices and tablets. Sell tickets, check-in customers,
                            and manage operations from anywhere—even offline.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-3">
                            {[
                                { icon: WifiOff, text: 'Works Offline' },
                                { icon: Battery, text: 'All-Day Battery' },
                                { icon: Shield, text: 'Rugged & Secure' },
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
                                Request Demo
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 p-8 backdrop-blur-sm ring-1 ring-white/10">
                            <img
                                src="/pos2.png"
                                alt="POS Hardware"
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

function DeviceShowcase() {
    const devices = [
        {
            name: 'Handheld POS',
            icon: Smartphone,
            image: '/mobile-pos.png',
            features: ['Compact & portable', 'Built-in scanner', 'Card reader', '8-hour battery'],
            price: 'From $399'
        },
        {
            name: 'Tablet POS',
            icon: Tablet,
            image: '/tablet-pos.png',
            features: ['10" touch screen', 'Stand included', 'Dual cameras', 'Premium design'],
            price: 'From $699'
        },
        {
            name: 'Terminal POS',
            icon: Package,
            image: '/terminal.png',
            features: ['Full keyboard', 'Receipt printer', 'Cash drawer', 'Rugged build'],
            price: 'From $1,299'
        },
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
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Choose Your Device</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Professional hardware designed for tour operators. Pick what works best for your business.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {devices.map((device, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                        >
                            <div className="aspect-video overflow-hidden bg-gray-100">
                                <img
                                    src={device.image}
                                    alt={device.name}
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <device.icon className="w-10 h-10 text-red-600 mb-4" />
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{device.name}</h3>
                                <p className="text-2xl font-black text-red-600 mb-4">{device.price}</p>
                                <ul className="space-y-2 mb-6">
                                    {device.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-2 text-gray-600">
                                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Link
                                    href="/contact"
                                    className="block text-center px-6 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors"
                                >
                                    Order Now
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function FeaturesGrid() {
    const features = [
        { icon: CreditCard, title: 'Accept All Payments', description: 'Credit cards, mobile wallets, contactless payments, and cash' },
        { icon: Scan, title: 'Ticket Scanning', description: 'Scan QR codes and barcodes for fast check-ins' },
        { icon: WifiOff, title: 'Offline Mode', description: 'Keep selling even without internet. Auto-syncs when online' },
        { icon: Printer, title: 'Receipt Printing', description: 'Print receipts, tickets, and invoices on the spot' },
        { icon: Users, title: 'Multi-User Support', description: 'Multiple staff can use devices simultaneously' },
        { icon: Shield, title: 'Secure & Encrypted', description: 'PCI-compliant with end-to-end encryption' },
        { icon: Battery, title: 'Long Battery Life', description: '8-12 hours of continuous use per charge' },
        { icon: Zap, title: 'Lightning Fast', description: 'Process transactions in under 3 seconds' },
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
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Powerful Features</h2>
                    <p className="text-xl text-gray-600">Everything you need for on-site operations</p>
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
                            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <feature.icon className="w-8 h-8 text-red-600" />
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

function OfflineCapabilities() {
    return (
        <section className="py-20 bg-gradient-to-br from-red-600 to-orange-600">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <WifiOff className="w-16 h-16 text-white mb-6" />
                        <h2 className="text-4xl font-black text-white mb-6">Works Anywhere, Even Offline</h2>
                        <p className="text-xl text-red-100 mb-6">
                            Don&apos;t let poor internet ruin your day. Our POS devices work perfectly offline and
                            automatically sync when connectivity returns.
                        </p>
                        <ul className="space-y-4">
                            {[
                                'Process sales and bookings without internet',
                                'Automatic sync when connection restored',
                                'Store up to 10,000 transactions locally',
                                'Never miss a sale due to connectivity issues',
                            ].map((item, index) => (
                                <li key={index} className="flex items-start gap-3 text-white">
                                    <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-0.5" />
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
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                    <Wifi className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="text-sm text-red-100">Online Mode</div>
                                    <div className="text-white font-bold">Real-time sync active</div>
                                </div>
                            </div>
                            <div className="border-t border-white/20 pt-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                        <WifiOff className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-red-100">Offline Mode</div>
                                        <div className="text-white font-bold">Local storage active</div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-t border-white/20 pt-6">
                                <div className="text-4xl font-black text-white mb-2">10,000+</div>
                                <div className="text-red-100">Offline transactions capacity</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function UseCases() {
    const cases = [
        { icon: Scan, title: 'Ticket Check-in', description: 'Scan tickets at entry points for fast, contactless check-ins' },
        { icon: CreditCard, title: 'On-Site Sales', description: 'Sell tickets, merchandise, and add-ons on location' },
        { icon: Users, title: 'Group Bookings', description: 'Process large group reservations quickly and efficiently' },
        { icon: BarChart3, title: 'Real-Time Reports', description: 'View sales data and performance metrics instantly' },
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
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Perfect For Every Scenario</h2>
                    <p className="text-xl text-gray-600">See how tour operators use our POS hardware</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {cases.map((useCase, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow"
                        >
                            <useCase.icon className="w-12 h-12 text-red-600 mb-4" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">{useCase.title}</h3>
                            <p className="text-gray-600 text-lg">{useCase.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Specifications() {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-black text-gray-900 mb-4">Technical Specifications</h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Hardware</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>• Quad-core processor</li>
                            <li>• 4GB RAM / 32GB storage</li>
                            <li>• 5&quot; or 10&quot; touchscreen</li>
                            <li>• Built-in cameras</li>
                            <li>• NFC & Bluetooth</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Connectivity</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>• 4G LTE & WiFi</li>
                            <li>• Bluetooth 5.0</li>
                            <li>• NFC payments</li>
                            <li>• USB-C charging</li>
                            <li>• Offline capable</li>
                        </ul>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Security</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>• PCI-DSS compliant</li>
                            <li>• End-to-end encryption</li>
                            <li>• Secure boot</li>
                            <li>• Tamper detection</li>
                            <li>• Remote wipe capability</li>
                        </ul>
                    </div>
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
                    <h2 className="text-4xl font-black text-white mb-6">
                        Ready to Upgrade Your Operations?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Get professional POS hardware with free shipping and setup support.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/get-started"
                            className={`inline-flex items-center gap-2 rounded-full ${BRAND_COLOR_PRIMARY} px-8 py-4 text-lg font-bold text-white shadow-xl shadow-red-500/30 transition-all ${BRAND_HOVER_PRIMARY}`}
                        >
                            Order Hardware
                            <ArrowRight className="h-5 w-5" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2 rounded-full border-2 border-white/20 bg-white/5 px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:border-white/40"
                        >
                            Talk to Sales
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
