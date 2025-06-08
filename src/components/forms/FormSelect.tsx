'use client';

import { forwardRef } from 'react';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
  placeholder?: string;
}

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  ({ label, name, options, error, required, placeholder, className, ...props }, ref) => {
    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium text-[var(--text-secondary)]">
          {label} {required && <span className="text-[var(--form-error-color)]">*</span>}
        </label>
        <select
          id={name}
          name={name}
          ref={ref}
          className={`mt-1 block w-full rounded-md border-[var(--border-color)] shadow-sm
            focus:border-[var(--form-focus-color)] focus:ring-[var(--form-focus-ring-color)]
            bg-[var(--bg-primary)] text-[var(--text-primary)] sm:text-sm transition-colors duration-200
            ${error ? 'border-[var(--form-error-border)]' : ''}
            ${className || ''}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-[var(--form-error-text)]">{error}</p>}
      </div>
    );
  }
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
