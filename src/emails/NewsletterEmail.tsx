import { Link, Section, Text, Heading } from '@react-email/components';
import EmailLayout from './components/EmailLayout';

export interface NewsletterEmailProps {
  subject: string;
  content: string;
  unsubscribeUrl: string;
}

export default function NewsletterEmail({
  subject,
  content,
  unsubscribeUrl,
}: NewsletterEmailProps) {
  // Split content into paragraphs
  const paragraphs = content.split('\n\n').filter(p => p.trim());

  return (
    <EmailLayout>
      <Heading as="h2" style={{ color: '#2e2e2e', fontSize: '24px', marginBottom: '20px' }}>
        {subject}
      </Heading>

      {paragraphs.map((paragraph, index) => (
        <Text key={index} style={{ marginBottom: '16px', lineHeight: '1.6' }}>
          {paragraph}
        </Text>
      ))}

      <Section style={{ marginTop: '30px', fontSize: '12px', color: '#666' }}>
        <Text>
          You&apos;re receiving this email because you subscribed to the Gophercamp 2026 newsletter.
        </Text>
        <Text style={{ marginTop: '10px' }}>
          Don&apos;t want to receive these emails?{' '}
          <Link href={unsubscribeUrl} style={{ color: '#00ADD8' }}>
            Unsubscribe
          </Link>
        </Text>
      </Section>
    </EmailLayout>
  );
}
