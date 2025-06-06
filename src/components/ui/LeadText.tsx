import React from 'react';

/**
 * LeadText component for consistent lead paragraph styling
 * @param children - content of the lead paragraph
 * @param className - additional CSS classes
 */
export interface LeadTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function LeadText({ children, className = '' }: LeadTextProps) {
  return <p className={`lead text-xl text-secondary mb-8 ${className}`}>{children}</p>;
}
