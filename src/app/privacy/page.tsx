import { Metadata } from 'next';
import { contactInfo } from '@/lib/social';
import PolicyPage from '@/components/ui/PolicyPage';
import Section from '@/components/ui/Section';
import BulletList from '@/components/ui/BulletList';
import InfoBox from '@/components/ui/InfoBox';
import LeadText from '@/components/ui/LeadText';

export const metadata: Metadata = {
  title: 'Privacy Policy | Gophercamp 2026',
  description: 'Privacy policy for Gophercamp 2026 conference website and events.',
};

export default function PrivacyPage() {
  const personalInfoItems = [
    "Name and contact information (email, phone number)",
    "Professional information (company, job title)",
    "Dietary restrictions and accessibility needs",
    "Payment information for registration"
  ];
  
  const autoCollectedItems = [
    "IP address and browser information",
    "Website usage analytics",
    "Cookies and similar tracking technologies"
  ];
  
  const usageItems = [
    "Conference registration and event management",
    "Communication about the conference and related events",
    "Providing customer support",
    "Improving our website and services",
    "Compliance with legal obligations",
    "Newsletter and marketing communications (with your consent)"
  ];
  
  const sharingItems = [
    "With conference sponsors and partners (with your explicit consent)",
    "With service providers who assist in conference operations",
    "To comply with legal requirements or protect rights and safety",
    "In connection with a business transfer or merger"
  ];
  
  const rightsItems = [
    "Access to your personal information",
    "Correction of inaccurate information",
    "Deletion of your personal information",
    "Restriction of processing",
    "Data portability",
    "Objection to processing",
    "Withdrawal of consent"
  ];
  
  return (
    <PolicyPage 
      title="Privacy Policy"
      lastUpdated="June 5, 2025"
    >
      <Section title="Introduction">
        <p>
          Gophercamp 2026 (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
          when you visit our website or participate in our conference.
        </p>
      </Section>

      <Section title="Information We Collect">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
        <p className="mb-4">We may collect personal information that you voluntarily provide, including:</p>
        <BulletList items={personalInfoItems} />

        <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
        <p className="mb-4">We may automatically collect certain information about your device and usage:</p>
        <BulletList items={autoCollectedItems} />
      </Section>

      <Section title="How We Use Your Information">
        <p className="mb-4">We use the collected information for the following purposes:</p>
        <BulletList items={usageItems} />
      </Section>

      <Section title="Information Sharing">
        <p className="mb-4">We may share your information in the following circumstances:</p>
        <BulletList items={sharingItems} />
        <p>
          <strong>We do not sell your personal information to third parties.</strong>
        </p>
      </Section>

      <Section title="Data Security">
        <p>
          We implement appropriate technical and organizational security measures to protect 
          your personal information against unauthorized access, alteration, disclosure, or 
          destruction. However, no method of transmission over the internet is 100% secure.
        </p>
      </Section>

      <Section title="Your Rights">
        <p className="mb-4">Depending on your location, you may have the following rights:</p>
        <BulletList items={rightsItems} />
      </Section>

      <Section title="Cookies and Tracking">
        <p>
          Our website uses cookies and similar technologies to enhance your browsing experience 
          and analyze website traffic. You can control cookie settings through your browser preferences.
        </p>
      </Section>

      <Section title="Children&apos;s Privacy">
        <p>
          Our services are not directed to children under 13. We do not knowingly collect 
          personal information from children under 13. If we learn that we have collected 
          such information, we will delete it promptly.
        </p>
      </Section>

      <Section title="International Data Transfers">
        <p>
          Your information may be transferred to and processed in countries other than your own. 
          We ensure appropriate safeguards are in place for such transfers.
        </p>
      </Section>

      <Section title="Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any 
          material changes by posting the new Privacy Policy on this page and updating 
          the &quot;Last updated&quot; date.
        </p>
      </Section>

      <Section title="Contact Us">
        <p className="mb-4">
          If you have any questions about this Privacy Policy or our privacy practices, please contact us:
        </p>
        <InfoBox variant="default">
          <p><strong>Email:</strong> {contactInfo.privacy}</p>
          <p><strong>Address:</strong> Gophercamp 2026 Organizing Committee, {contactInfo.location}</p>
        </InfoBox>
      </Section>
    </PolicyPage>
  );
}
