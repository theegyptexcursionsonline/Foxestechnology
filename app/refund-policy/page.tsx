'use client';

import { motion } from 'framer-motion';
import { RefreshCcw, CheckCircle, XCircle, Clock, CreditCard, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function RefundPolicy() {
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
            <RefreshCcw className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black text-gray-900 mb-4">Refund Policy</h1>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment to Your Satisfaction</h2>
            <p className="text-gray-600 leading-relaxed">
              At Foxes Technology, we stand behind our products and services. We want you to be completely satisfied with your subscription. This Refund Policy outlines the terms and conditions for requesting refunds and cancellations.
            </p>
          </section>

          {/* Money-Back Guarantee */}
          <section className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <CheckCircle className="w-7 h-7 text-green-600" />
              30-Day Money-Back Guarantee
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We offer a <strong>30-day money-back guarantee</strong> for all new customers. If you&apos;re not completely satisfied with our platform within the first 30 days of your subscription, we&apos;ll provide a full refund, no questions asked.
            </p>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-bold text-gray-900 mb-2">To qualify for our money-back guarantee:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>You must be a new customer (first-time subscriber)</li>
                <li>The refund request must be made within 30 days of your initial payment</li>
                <li>Applies to monthly and annual subscription plans</li>
                <li>Refund will be processed to your original payment method</li>
              </ul>
            </div>
          </section>

          {/* Subscription Cancellations */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-600" />
              Subscription Cancellations
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Monthly Subscriptions</h3>
                <p className="text-gray-600 mb-3">
                  You can cancel your monthly subscription at any time. Here&apos;s how it works:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li>Cancel anytime from your account dashboard or by contacting support</li>
                  <li>You&apos;ll continue to have access until the end of your current billing period</li>
                  <li>No refunds for partial months (you pay for the full month)</li>
                  <li>No cancellation fees</li>
                  <li>You can reactivate your subscription at any time</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Annual Subscriptions</h3>
                <p className="text-gray-600 mb-3">
                  Annual subscriptions have different cancellation terms:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                  <li><strong>Within 30 days:</strong> Full refund available (money-back guarantee)</li>
                  <li><strong>After 30 days:</strong> Pro-rated refund for unused months (minus a 10% processing fee)</li>
                  <li><strong>After 6 months:</strong> No refund available, but service continues until subscription ends</li>
                  <li>You can still access the platform until your annual period expires</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Refund Process */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <Clock className="w-6 h-6 text-blue-600" />
              Refund Processing Timeline
            </h2>
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Submit Request</h3>
                    <p className="text-gray-600">
                      Contact our support team via email or support ticket with your refund request
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Review (1-2 business days)</h3>
                    <p className="text-gray-600">
                      Our team will review your request and verify eligibility
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Approval & Processing (3-5 business days)</h3>
                    <p className="text-gray-600">
                      Once approved, refund is processed to your original payment method
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Bank Processing (5-10 business days)</h3>
                    <p className="text-gray-600">
                      Your bank may take additional time to reflect the refund in your account
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mt-6 font-semibold">
                Total expected time: 7-15 business days from request to funds in your account
              </p>
            </div>
          </section>

          {/* Non-Refundable Items */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <XCircle className="w-6 h-6 text-red-600" />
              Non-Refundable Items
            </h2>
            <p className="text-gray-600 mb-4">The following items are not eligible for refunds:</p>
            <div className="bg-red-50 rounded-lg p-6">
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Custom development work</strong> - Any custom features or integrations developed specifically for your account</li>
                <li><strong>Training sessions</strong> - Completed onboarding or training sessions</li>
                <li><strong>Add-on services</strong> - Premium support packages, additional user licenses purchased mid-term</li>
                <li><strong>Hardware</strong> - POS devices, tablets, or kiosks (subject to separate hardware warranty)</li>
                <li><strong>Third-party fees</strong> - Payment processing fees, SMS costs, or API charges</li>
                <li><strong>Data export services</strong> - Fees for large-scale data migration or export</li>
              </ul>
            </div>
          </section>

          {/* Payment Methods */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <CreditCard className="w-6 h-6 text-purple-600" />
              Refund Payment Methods
            </h2>
            <p className="text-gray-600 mb-4">
              Refunds will be issued to your original payment method:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li><strong>Credit/Debit Cards:</strong> 5-10 business days</li>
              <li><strong>PayPal:</strong> 3-5 business days</li>
              <li><strong>Bank Transfer:</strong> 7-14 business days</li>
              <li><strong>Digital Wallets:</strong> 3-7 business days</li>
            </ul>
            <p className="text-gray-600 mt-4">
              If the original payment method is no longer available, please contact our support team to arrange an alternative refund method.
            </p>
          </section>

          {/* Special Circumstances */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Special Circumstances</h2>

            <div className="space-y-4">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Technical Issues</h3>
                <p className="text-gray-600">
                  If you experience significant technical issues that prevent you from using our platform, contact our support team immediately. We&apos;ll work to resolve the issue or provide a pro-rated refund for downtime exceeding our SLA (Enterprise plans only).
                </p>
              </div>

              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Billing Errors</h3>
                <p className="text-gray-600">
                  If you&apos;re charged incorrectly or multiple times due to a billing error, we&apos;ll immediately refund the erroneous charges upon verification.
                </p>
              </div>

              <div className="border-l-4 border-yellow-600 pl-4">
                <h3 className="font-bold text-gray-900 mb-2">Account Suspension</h3>
                <p className="text-gray-600">
                  If your account is suspended due to violation of our Terms of Service, you are not eligible for a refund. Ensure you comply with all terms to maintain access to your subscription.
                </p>
              </div>
            </div>
          </section>

          {/* How to Request */}
          <section className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-6 border-2 border-red-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
              <HelpCircle className="w-6 h-6 text-red-600" />
              How to Request a Refund
            </h2>
            <p className="text-gray-600 mb-4">
              To request a refund, please contact our support team:
            </p>
            <div className="bg-white rounded-lg p-6 space-y-3">
              <div>
                <p className="font-semibold text-gray-900">Email:</p>
                <a href="mailto:refunds@foxestechnology.com" className="text-red-600 hover:underline text-lg">
                  refunds@foxestechnology.com
                </a>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Or via our support portal:</p>
                <Link href="/contact" className="text-red-600 hover:underline text-lg">
                  Contact Support →
                </Link>
              </div>
              <div className="pt-3 border-t border-gray-200">
                <p className="font-semibold text-gray-900 mb-2">Include in your request:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Your account email address</li>
                  <li>Subscription plan name</li>
                  <li>Reason for refund request</li>
                  <li>Original payment date and transaction ID (if available)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Changes to Policy */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to update this Refund Policy at any time. Any changes will be effective immediately upon posting on this page. Continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section className="border-t border-gray-200 pt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Questions About Refunds?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              If you have questions about our refund policy or need assistance with a refund request:
            </p>
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-900 font-semibold mb-2">Foxes Technology Support Team</p>
              <p className="text-gray-600">Email: <a href="mailto:refunds@foxestechnology.com" className="text-red-600 hover:underline">refunds@foxestechnology.com</a></p>
              <p className="text-gray-600">Phone: +20 2 1234 5678</p>
              <p className="text-gray-600">Hours: Sunday - Thursday, 9:00 AM - 6:00 PM (Cairo Time)</p>
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
                href="/cookie-policy"
                className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-red-600 hover:text-red-600 transition-colors font-medium"
              >
                Cookie Policy
              </Link>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
