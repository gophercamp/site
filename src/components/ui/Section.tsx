import React from 'react';

/**
 * Section component for policy pages
 * @param title - the heading of the section
 * @param children - section content
 */
export interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      {children}
    </section>
  );
}
