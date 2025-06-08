'use client';

import { forwardRef } from 'react';

interface FormCheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  error?: string;
}

const FormCheckbox = forwardRef<HTMLInputElement, FormCheckboxProps>(
  ({ label, name, error, className, ...props }, ref) => {
    return (
      <div className="flex items-center">
        <input
          type="checkbox"
          id={name}
          name={name}
          ref={ref}
          className={`h-4 w-4 text-primary focus:ring-primary border-[var(--border-color)] rounded
            ${error ? 'border-red-500' : ''}
            ${className || ''}`}
          {...props}
        />
        <label htmlFor={name} className="ml-2 block text-sm text-[var(--text-secondary)]">
          {label}
        </label>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;
