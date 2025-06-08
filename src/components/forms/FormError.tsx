'use client';

interface FormErrorProps {
  error: string | null;
}

const FormError = ({ error }: FormErrorProps) => {
  if (!error) return null;

  return (
    <div className="mb-4 bg-[var(--form-error-bg)] border border-[var(--form-error-border)] text-[var(--form-error-text)] px-4 py-3 rounded relative">
      {error}
    </div>
  );
};

export default FormError;
