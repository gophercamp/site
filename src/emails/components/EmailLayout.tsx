import { Container, Heading, Section } from '@react-email/components';
import React from 'react';

interface EmailLayoutProps {
  children: React.ReactNode;
}

export default function EmailLayout({ children }: EmailLayoutProps) {
  return (
    <Container style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <Heading as="h1" style={{ color: '#00ADD8' }}>
        Gophercamp 2026
      </Heading>
      <Section>{children}</Section>

      <Section
        style={{
          fontSize: '12px',
          color: '#666',
          marginTop: '30px',
          borderTop: '1px solid #eee',
          paddingTop: '20px',
        }}
      >
        <p>Gophercamp 2026 • Brno, Czech Republic</p>
      </Section>
    </Container>
  );
}
