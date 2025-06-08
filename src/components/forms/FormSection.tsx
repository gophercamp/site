'use client';

import { ReactNode } from 'react';

interface FormSectionProps {
  title: string;
  children: ReactNode;
  columns?: number;
}

const FormSection = ({ title, children, columns = 2 }: FormSectionProps) => {
  return (
    <div>
      <h2 className="text-lg font-medium text-[var(--text-primary)] mb-4">{title}</h2>
      <div className={`grid grid-cols-1 gap-6 sm:grid-cols-${columns}`}>{children}</div>
    </div>
  );
};

export default FormSection;
