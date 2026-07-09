import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Read the terms and conditions for using Foxes Technology services.',
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h1 className="font-poppins text-4xl font-bold text-slate-900 sm:text-5xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Last Updated: January 7, 2025
        </p>

        <div className="prose prose-slate mt-12 max-w-none">
          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              By accessing or using the services provided by Foxes Technology (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), including our booking management system, POS solutions, and related products (collectively, the &quot;Services&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not use our Services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">2. Eligibility</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              You must be at least 18 years old and have the legal authority to enter into these Terms on behalf of yourself or the organization you represent. By using our Services, you represent and warrant that you meet these requirements.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">3. Account Registration</h2>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>You must provide accurate, complete, and current information during registration.</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
              <li>You must notify us immediately of any unauthorized access to your account.</li>
              <li>We reserve the right to suspend or terminate accounts that violate these Terms.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">4. Use of Services</h2>

            <h3 className="font-poppins text-xl font-semibold text-slate-900 mt-6">4.1 Permitted Use</h3>
            <p className="mt-4 text-slate-700 leading-relaxed">
              You may use our Services for lawful business purposes related to managing tours, activities, bookings, and payments. You agree to comply with all applicable laws and regulations.
            </p>

            <h3 className="font-poppins text-xl font-semibold text-slate-900 mt-6">4.2 Prohibited Activities</h3>
            <p className="mt-4 text-slate-700 leading-relaxed">You agree not to:</p>
            <ul className="mt-4 space-y-2 text-slate-700">
              <li>Use our Services for any illegal, fraudulent, or unauthorized purpose</li>
              <li>Attempt to gain unauthorized access to our systems or other users&apos; accounts</li>
              <li>Interfere with or disrupt the operation of our Services</li>
              <li>Upload viruses, malware, or harmful code</li>
              <li>Scrape, copy, or reverse engineer our Services</li>
              <li>Use our Services to transmit spam or unsolicited communications</li>
              <li>Violate any third-party rights, including intellectual property rights</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">5. Payment Terms</h2>
            <ul className="mt-4 space-y-3 text-slate-700">
              <li><strong>Subscription Fees:</strong> You agree to pay all applicable fees for your chosen subscription plan.</li>
              <li><strong>Billing:</strong> Fees are billed in advance on a monthly or annual basis, as selected during registration.</li>
              <li><strong>Payment Methods:</strong> We accept credit cards, debit cards, and other payment methods as specified on our platform.</li>
              <li><strong>Late Payments:</strong> Failure to pay fees on time may result in suspension or termination of your account.</li>
              <li><strong>Taxes:</strong> You are responsible for any applicable taxes, duties, or government charges.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">6. Refunds and Cancellations</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Refund and cancellation policies are outlined in our <a href="/refund-policy" className="text-red-600 hover:text-red-700 font-semibold">Refund Policy</a>. By using our Services, you agree to those terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">7. Intellectual Property</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              All content, software, trademarks, logos, and materials provided through our Services are owned by Foxes Technology or our licensors and are protected by copyright, trademark, and other intellectual property laws. You may not use, reproduce, or distribute our content without our prior written consent.
            </p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              You retain ownership of any data or content you upload to our Services. By uploading content, you grant us a license to use, store, and process it solely to provide our Services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">8. Data and Privacy</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              We collect and process your personal information in accordance with our <a href="/privacy-policy" className="text-red-600 hover:text-red-700 font-semibold">Privacy Policy</a>. By using our Services, you consent to such collection and processing.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">9. Service Availability</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              We strive to provide reliable and uninterrupted Services, but we do not guarantee that our Services will be available at all times. We reserve the right to modify, suspend, or discontinue any part of our Services without prior notice.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">10. Limitation of Liability</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              To the maximum extent permitted by law, Foxes Technology shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your use of our Services, including but not limited to loss of profits, data, or business opportunities.
            </p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Our total liability to you for any claims arising from these Terms shall not exceed the amount you paid to us in the 12 months preceding the claim.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">11. Indemnification</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              You agree to indemnify and hold harmless Foxes Technology, its affiliates, and their respective officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from your use of our Services or violation of these Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">12. Termination</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              We may suspend or terminate your access to our Services at any time, with or without cause, including if we believe you have violated these Terms. Upon termination, you must cease all use of our Services, and we may delete your data in accordance with our data retention policies.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">13. Dispute Resolution</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Any disputes arising from these Terms or your use of our Services shall be resolved through good-faith negotiation. If a resolution cannot be reached, disputes shall be subject to the exclusive jurisdiction of the courts in Egypt.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">14. Changes to These Terms</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              We reserve the right to modify these Terms at any time. We will notify you of significant changes by posting the updated Terms on our website and updating the &quot;Last Updated&quot; date. Your continued use of our Services after changes indicates acceptance of the updated Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-poppins text-2xl font-bold text-slate-900">15. Contact Us</h2>
            <p className="mt-4 text-slate-700 leading-relaxed">
              If you have questions about these Terms, please contact us:
            </p>
            <div className="mt-4 rounded-lg bg-slate-50 p-6 text-slate-700">
              <p><strong>Foxes Technology</strong></p>
              <p className="mt-2">Email: <a href="mailto:legal@foxestechnology.com" className="text-red-600 hover:text-red-700 font-semibold">legal@foxestechnology.com</a></p>
              <p>Website: <a href="https://foxestechnology.com" className="text-red-600 hover:text-red-700 font-semibold">foxestechnology.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
