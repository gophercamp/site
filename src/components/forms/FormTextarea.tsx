'use client';

import { forwardRef } from 'react';

interface FormTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  error?: string;
  required?: boolean;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, name, error, required, className, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-[var(--text-secondary)]">
          {label} {required && <span className="text-[var(--form-error-color)]">*</span>}
        </label>
        <textarea
          id={name}
          name={name}
          ref={ref}
          className={`mt-1 block w-full rounded-md border-[var(--border-color)] shadow-sm
            focus:border-[var(--form-focus-color)] focus:ring-[var(--form-focus-ring-color)]
            bg-[var(--bg-primary)] text-[var(--text-primary)] sm:text-sm transition-colors duration-200
            ${error ? 'border-[var(--form-error-border)]' : ''}
            ${className || ''}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-[var(--form-error-text)]">{error}</p>}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';

export default FormTextarea;
