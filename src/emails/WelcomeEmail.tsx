import { EmailLayout, EmailUnsubscribe } from '@/emails/components';
import { Link, Section, Text } from '@react-email/components';

export interface WelcomeEmailProps {
  unsubscribeUrl?: string;
}

export default function WelcomeEmail({ unsubscribeUrl }: WelcomeEmailProps = {}) {
  return (
    <EmailLayout>
      <Text>Hello,</Text>
      <Text>Thank you for confirming your subscription to the Gophercamp 2026 newsletter!</Text>
      <Text>We&apos;ll keep you updated with the latest information about:</Text>

      <ul style={{ paddingLeft: '20px' }}>
        <li>Conference agenda and speaker announcements</li>
        <li>Workshop schedules</li>
        <li>Special events and networking opportunities</li>
        <li>Important dates and deadlines</li>
      </ul>

      <Text>Mark your calendar: April 24, 2026 • Brno, Czech Republic</Text>
      <Text>We&apos;re looking forward to seeing you at Gophercamp 2026!</Text>
      <Text>The Gophercamp Team</Text>

      <Section style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <Text>
          Having trouble viewing this email? Visit our{' '}
          <Link href="https://gophercamp.cz" style={{ color: '#00ADD8' }}>
            website
          </Link>
        </Text>
        <EmailUnsubscribe unsubscribeUrl={unsubscribeUrl} />
      </Section>
    </EmailLayout>
  );
}
