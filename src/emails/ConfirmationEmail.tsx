import { EmailButton, EmailLayout, EmailUnsubscribe } from '@/emails/components';
import { Container, Hr, Link, Text } from '@react-email/components';

export interface ConfirmationEmailProps {
  confirmUrl: string;
  unsubscribeUrl?: string;
}

export default function ConfirmationEmail({ confirmUrl, unsubscribeUrl }: ConfirmationEmailProps) {
  return (
    <EmailLayout>
      <Text>Hello,</Text>
      <Text>
        Thank you for subscribing to the Gophercamp 2026 newsletter. Please confirm your
        subscription by clicking the button below:
      </Text>

      <EmailButton href={confirmUrl}>Confirm Subscription</EmailButton>

      <Text>If you didn&apos;t sign up for this newsletter, you can safely ignore this email.</Text>
      <Text>The Gophercamp team</Text>

      <Hr style={{ borderTop: '1px solid #eee', margin: '20px 0' }} />

      <Container style={{ fontSize: '12px', color: '#666' }}>
        <Text>
          If the button doesn&apos;t work, copy and paste this URL into your browser: <br />
          <Link href={confirmUrl} style={{ color: '#00ADD8' }}>
            {confirmUrl}
          </Link>
        </Text>
        <EmailUnsubscribe unsubscribeUrl={unsubscribeUrl} />
      </Container>
    </EmailLayout>
  );
}
