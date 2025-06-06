import { Button } from '@react-email/components';
import React from 'react';

interface EmailButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function EmailButton({ href, children }: EmailButtonProps) {
  return (
    <Button
      href={href}
      style={{
        display: 'inline-block',
        backgroundColor: '#00ADD8', // Go Blue primary color
        color: 'white',
        padding: '12px 24px',
        textDecoration: 'none',
        borderRadius: '4px',
        margin: '20px 0',
        fontWeight: 'bold',
      }}
    >
      {children}
    </Button>
  );
}
