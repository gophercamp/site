import { Metadata } from 'next';
import { contactInfo } from '@/lib/social';

export const metadata: Metadata = {
  title: 'Privacy Policy | Gophercamp 2026',
  description: 'Privacy policy for Gophercamp 2026 conference website and events.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="lead text-xl text-gray-600 mb-8">
              Last updated: June 5, 2025
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
              <p>
                Gophercamp 2026 (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you visit our website or participate in our conference.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="mb-4">We may collect personal information that you voluntarily provide, including:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Name and contact information (email, phone number)</li>
                <li>Professional information (company, job title)</li>
                <li>Dietary restrictions and accessibility needs</li>
                <li>Payment information for registration</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <p className="mb-4">We may automatically collect certain information about your device and usage:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>IP address and browser information</li>
                <li>Website usage analytics</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <p className="mb-4">We use the collected information for the following purposes:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Conference registration and event management</li>
                <li>Communication about the conference and related events</li>
                <li>Providing customer support</li>
                <li>Improving our website and services</li>
                <li>Compliance with legal obligations</li>
                <li>Newsletter and marketing communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing</h2>
              <p className="mb-4">We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>With conference sponsors and partners (with your explicit consent)</li>
                <li>With service providers who assist in conference operations</li>
                <li>To comply with legal requirements or protect rights and safety</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
              <p>
                <strong>We do not sell your personal information to third parties.</strong>
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect 
                your personal information against unauthorized access, alteration, disclosure, or 
                destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
              <p className="mb-4">Depending on your location, you may have the following rights:</p>
              <ul className="list-disc pl-6 mb-6">
                <li>Access to your personal information</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal information</li>
                <li>Restriction of processing</li>
                <li>Data portability</li>
                <li>Objection to processing</li>
                <li>Withdrawal of consent</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
              <p>
                Our website uses cookies and similar technologies to enhance your browsing experience 
                and analyze website traffic. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Children&apos;s Privacy</h2>
              <p>
                Our services are not directed to children under 13. We do not knowingly collect 
                personal information from children under 13. If we learn that we have collected 
                such information, we will delete it promptly.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any 
                material changes by posting the new Privacy Policy on this page and updating 
                the &quot;Last updated&quot; date.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>Email:</strong> {contactInfo.privacy}</p>
                <p><strong>Address:</strong> Gophercamp 2026 Organizing Committee, {contactInfo.location}</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
