import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Foxes Technology collects, uses, and protects your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="font-poppins text-4xl font-bold text-slate-900 sm:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Last Updated: January 7, 2025
        </p>

        <div className="prose prose-slate mt-12 max-w-none">
          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">1. Introduction</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Foxes Technology (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our booking management system, POS solutions, and related services (collectively, the &quot;Services&quot;).
            </p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              By accessing or using our Services, you agree to the terms of this Privacy Policy. If you do not agree, please do not use our Services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">2. Information We Collect</h2>

            <h3 className="font-poppins text-xl font-semibold text-slate-900 mt-6">2.1 Information You Provide</h3>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li><strong>Account Information:</strong> Name, email address, phone number, company name, and billing information.</li>
              <li><strong>Business Data:</strong> Tour and activity details, booking information, customer data, and payment records.</li>
              <li><strong>Communications:</strong> Information you provide when contacting customer support or participating in surveys.</li>
            </ul>

            <h3 className="font-poppins text-xl font-semibold text-slate-900 mt-6">2.2 Automatically Collected Information</h3>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
              <li><strong>Usage Data:</strong> Pages viewed, features used, time spent on our Services, and interaction data.</li>
              <li><strong>Location Data:</strong> Approximate location based on IP address or precise location if you grant permission.</li>
              <li><strong>Cookies:</strong> We use cookies and similar technologies to enhance your experience. See our Cookie Policy for details.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">3. How We Use Your Information</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">We use the information we collect to:</p>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>Provide, operate, and maintain our Services</li>
              <li>Process bookings and payments</li>
              <li>Send transactional notifications and customer support</li>
              <li>Improve and personalize your experience</li>
              <li>Analyze usage trends and optimize our platform</li>
              <li>Detect and prevent fraud, abuse, and security incidents</li>
              <li>Comply with legal obligations and enforce our Terms of Service</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">4. How We Share Your Information</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">We may share your information with:</p>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li><strong>Service Providers:</strong> Third-party vendors who help us operate our Services (e.g., payment processors, cloud hosting providers, analytics services).</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets, your information may be transferred.</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights, property, or safety.</li>
              <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information.</li>
            </ul>
            <p className="mt-4 text-slate-700 leading-relaxed">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">5. Data Security</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              We implement industry-standard security measures to protect your information, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">6. Data Retention</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              We retain your information for as long as necessary to provide our Services, comply with legal obligations, resolve disputes, and enforce our agreements. When no longer needed, we will securely delete or anonymize your data.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">7. Your Rights</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">Depending on your location, you may have the following rights:</p>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
              <li><strong>Correction:</strong> Request corrections to inaccurate or incomplete information.</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements).</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time.</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a structured, machine-readable format.</li>
            </ul>
            <p className="mt-4 text-slate-700 leading-relaxed">
              To exercise these rights, please contact us at <a href="mailto:privacy@foxestechnology.com" className="text-red-600 hover:text-red-700 font-semibold">privacy@foxestechnology.com</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">8. International Data Transfers</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Your information may be transferred to and processed in countries outside of Egypt and the GCC. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">9. Children&apos;s Privacy</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Our Services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will delete it promptly.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">10. Changes to This Privacy Policy</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on our website and updating the &quot;Last Updated&quot; date. Your continued use of our Services after changes indicates acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">11. Contact Us</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              If you have questions about this Privacy Policy or how we handle your information, please contact us:
            </p>
            <div className="mt-4 rounded-lg bg-slate-50 p-6 text-slate-700">
              <p><strong>Foxes Technology</strong></p>
              <p className="mt-2">Email: <a href="mailto:privacy@foxestechnology.com" className="text-red-600 hover:text-red-700 font-semibold">privacy@foxestechnology.com</a></p>
              <p>Website: <a href="https://foxestechnology.com" className="text-red-600 hover:text-red-700 font-semibold">foxestechnology.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
