'use client';

import { motion } from 'framer-motion';
import { Cookie, Shield, Settings, Eye, BarChart } from 'lucide-react';
import Link from 'next/link';

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Cookie className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-8"
        >
          {/* Introduction */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
            <p className="text-gray-600 leading-relaxed">
              Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used to make websites work more efficiently and provide information to website owners.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              Foxes Technology uses cookies to improve your experience on our website, analyze site traffic, and personalize content. This Cookie Policy explains what cookies are, how we use them, and how you can manage your cookie preferences.
            </p>
          </section>

          {/* Types of Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <Settings className="w-6 h-6 text-red-600" />
              Types of Cookies We Use
            </h2>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="border-l-4 border-red-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-red-600" />
                  Essential Cookies
                </h3>
                <p className="text-gray-600 mb-3">
                  These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Session cookies for authentication</li>
                  <li>Security cookies to prevent fraud</li>
                  <li>Load balancing cookies for website performance</li>
                  <li>Cookie consent preferences</li>
                </ul>
                <p className="text-sm text-gray-500 mt-3">
                  <strong>Duration:</strong> Session or up to 1 year
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <BarChart className="w-5 h-5 text-blue-600" />
                  Analytics & Performance Cookies
                </h3>
                <p className="text-gray-600 mb-3">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Google Analytics (_ga, _gid, _gat)</li>
                  <li>Page view tracking</li>
                  <li>Traffic source analysis</li>
                  <li>User behavior patterns</li>
                  <li>Website performance metrics</li>
                </ul>
                <p className="text-sm text-gray-500 mt-3">
                  <strong>Duration:</strong> Up to 2 years
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="border-l-4 border-green-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-green-600" />
                  Functional Cookies
                </h3>
                <p className="text-gray-600 mb-3">
                  These cookies enable enhanced functionality and personalization, such as remembering your preferences.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Language preferences</li>
                  <li>Region or location settings</li>
                  <li>Display preferences (dark mode, font size)</li>
                  <li>Video player preferences</li>
                  <li>Live chat widget settings</li>
                </ul>
                <p className="text-sm text-gray-500 mt-3">
                  <strong>Duration:</strong> Up to 1 year
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border-l-4 border-purple-600 pl-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-purple-600" />
                  Marketing & Advertising Cookies
                </h3>
                <p className="text-gray-600 mb-3">
                  These cookies track your activity to help us deliver relevant advertising and measure campaign effectiveness.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Facebook Pixel</li>
                  <li>Google Ads conversion tracking</li>
                  <li>LinkedIn Insight Tag</li>
                  <li>Retargeting cookies</li>
                  <li>Ad personalization</li>
                </ul>
                <p className="text-sm text-gray-500 mt-3">
                  <strong>Duration:</strong> Up to 2 years
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We use services from third-party companies that may set cookies on your device. These include:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Google Analytics</strong> - Website analytics and reporting</li>
              <li><strong>Google Ads</strong> - Advertising and conversion tracking</li>
              <li><strong>Facebook</strong> - Social media integration and advertising</li>
              <li><strong>LinkedIn</strong> - Professional network integration and advertising</li>
              <li><strong>Hotjar</strong> - User behavior analytics and heatmaps</li>
              <li><strong>Intercom</strong> - Customer support chat widget</li>
            </ul>
          </section>

          {/* Managing Cookies */}
          <section className="bg-red-50 rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing Your Cookie Preferences</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to decide whether to accept or reject cookies. You can manage your cookie preferences through:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">1. Cookie Consent Banner</h3>
                <p className="text-gray-600">
                  When you first visit our website, you&apos;ll see a cookie consent banner where you can choose which types of cookies to accept.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">2. Browser Settings</h3>
                <p className="text-gray-600 mb-2">
                  Most web browsers allow you to control cookies through their settings:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Microsoft Edge</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">3. Opt-Out Tools</h3>
                <p className="text-gray-600">
                  You can opt out of targeted advertising through:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li><a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Network Advertising Initiative</a></li>
                  <li><a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Digital Advertising Alliance</a></li>
                  <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:underline">Google Analytics Opt-out</a></li>
                </ul>
              </div>
            </div>

            <p className="text-gray-600 mt-4">
              <strong>Note:</strong> Disabling certain cookies may affect the functionality of our website and limit your user experience.
            </p>
          </section>

          {/* Do Not Track */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Do Not Track Signals</h2>
            <p className="text-gray-600 leading-relaxed">
              Some browsers include a &quot;Do Not Track&quot; (DNT) feature that signals to websites you visit that you do not want to be tracked. We currently do not respond to DNT signals, as there is no industry standard for how DNT should be interpreted. We will continue to monitor developments around DNT browser technology.
            </p>
          </section>

          {/* Updates to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our business practices. We will notify you of any material changes by posting the updated policy on this page with a new &quot;Last Updated&quot; date.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Cookies?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-900 font-semibold mb-2">Foxes Technology</p>
              <p className="text-gray-600">Email: <a href="mailto:privacy@foxestechnology.com" className="text-red-600 hover:underline">privacy@foxestechnology.com</a></p>
              <p className="text-gray-600">Phone: +20 2 1234 5678</p>
              <p className="text-gray-600 mt-2">
                Or visit our <Link href="/contact" className="text-red-600 hover:underline font-semibold">Contact Page</Link>
              </p>
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Related Policies</h3>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/privacy-policy"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-red-600 hover:text-red-600 transition-colors font-medium"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-red-600 hover:text-red-600 transition-colors font-medium"
              >
                Terms of Service
              </Link>
              <Link
                href="/refund-policy"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-red-600 hover:text-red-600 transition-colors font-medium"
              >
                Refund Policy
              </Link>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
