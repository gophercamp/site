import { Link, Text } from '@react-email/components';

export interface EmailUnsubscribeProps {
  unsubscribeUrl?: string;
  style?: React.CSSProperties;
}

export default function EmailUnsubscribe({ unsubscribeUrl, style }: EmailUnsubscribeProps) {
  if (!unsubscribeUrl) {
    return null;
  }

  return (
    <Text style={{ marginTop: '10px', ...style }}>
      Don&apos;t want to receive these emails?{' '}
      <Link href={unsubscribeUrl} style={{ color: '#666' }}>
        Unsubscribe
      </Link>
    </Text>
  );
}
