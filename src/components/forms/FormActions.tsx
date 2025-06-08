import Button from '@/components/ui/Button';
import Link from 'next/link';

interface FormActionsProps {
  cancelHref: string;
  isSubmitting: boolean;
  submitLabel?: string;
  cancelLabel?: string;
}

const FormActions = ({
  cancelHref,
  isSubmitting,
  submitLabel = 'Save',
  cancelLabel = 'Cancel',
}: FormActionsProps) => {
  return (
    <div className="flex justify-end space-x-3">
      <Link href={cancelHref}>
        <Button variant="outline" type="button">
          {cancelLabel}
        </Button>
      </Link>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Saving...' : submitLabel}
      </Button>
    </div>
  );
};

export default FormActions;
