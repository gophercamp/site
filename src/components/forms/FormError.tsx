'use client';

interface FormErrorProps {
  error: string | null;
}

const FormError = ({ error }: FormErrorProps) => {
  if (!error) return null;

  return (
    <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded relative">
      {error}
    </div>
  );
};

export default FormError;
