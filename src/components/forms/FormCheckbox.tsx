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
          className={`h-4 w-4 text-[var(--form-focus-color)] focus:ring-[var(--form-focus-ring-color)] border-[var(--border-color)] rounded transition-colors duration-200
            ${error ? 'border-[var(--form-error-border)]' : ''}
            ${className || ''}`}
          {...props}
        />
        <label htmlFor={name} className="ml-2 block text-sm text-[var(--text-secondary)]">
          {label}
        </label>
        {error && <p className="mt-1 text-sm text-[var(--form-error-text)]">{error}</p>}
      </div>
    );
  }
);

FormCheckbox.displayName = 'FormCheckbox';

export default FormCheckbox;
