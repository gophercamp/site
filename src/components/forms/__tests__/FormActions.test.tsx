import { render, screen } from '@testing-library/react';
import FormActions from '../FormActions';

// Mock Next.js Link component
jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  return ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  );
});

// Mock Button component
jest.mock('@/components/ui/Button', () => {
  // eslint-disable-next-line react/display-name
  return ({
    children,
    variant,
    type,
    disabled,
    ...props
  }: {
    children: React.ReactNode;
    variant?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    [key: string]: unknown;
  }) => (
    <button type={type} disabled={disabled} data-variant={variant} {...props}>
      {children}
    </button>
  );
});

describe('FormActions Component', () => {
  const defaultProps = {
    cancelHref: '/cancel',
    isSubmitting: false,
  };

  it('renders cancel and submit buttons', () => {
    render(<FormActions {...defaultProps} />);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    const submitButton = screen.getByRole('button', { name: 'Save' });

    expect(cancelButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('renders with default labels', () => {
    render(<FormActions {...defaultProps} />);

    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('renders with custom labels', () => {
    render(<FormActions {...defaultProps} submitLabel="Create" cancelLabel="Back" />);

    expect(screen.getByText('Back')).toBeInTheDocument();
    expect(screen.getByText('Create')).toBeInTheDocument();
  });

  it('shows loading state when isSubmitting is true', () => {
    render(<FormActions {...defaultProps} isSubmitting={true} />);

    const submitButton = screen.getByRole('button', { name: 'Saving...' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('shows normal state when isSubmitting is false', () => {
    render(<FormActions {...defaultProps} isSubmitting={false} />);

    const submitButton = screen.getByRole('button', { name: 'Save' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  it('applies correct button types', () => {
    render(<FormActions {...defaultProps} />);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    const submitButton = screen.getByRole('button', { name: 'Save' });

    expect(cancelButton).toHaveAttribute('type', 'button');
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('applies correct button variants', () => {
    render(<FormActions {...defaultProps} />);

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    const submitButton = screen.getByRole('button', { name: 'Save' });

    expect(cancelButton).toHaveAttribute('data-variant', 'outline');
    expect(submitButton).not.toHaveAttribute('data-variant'); // Should use default variant
  });

  it('renders cancel button as link with correct href', () => {
    render(<FormActions {...defaultProps} cancelHref="/admin/dashboard" />);

    const cancelLink = screen.getByRole('button', { name: 'Cancel' }).closest('a');
    expect(cancelLink).toHaveAttribute('href', '/admin/dashboard');
  });

  it('applies container styling', () => {
    render(<FormActions {...defaultProps} />);

    const container = screen.getByRole('button', { name: 'Cancel' }).closest('div');
    expect(container).toHaveClass('flex', 'justify-end', 'space-x-3');
  });

  it('handles custom submit label with isSubmitting', () => {
    render(<FormActions {...defaultProps} submitLabel="Update" isSubmitting={true} />);

    const submitButton = screen.getByRole('button', { name: 'Saving...' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('toggles between normal and submitting states correctly', () => {
    const { rerender } = render(<FormActions {...defaultProps} isSubmitting={false} />);

    let submitButton = screen.getByRole('button', { name: 'Save' });
    expect(submitButton).not.toBeDisabled();

    rerender(<FormActions {...defaultProps} isSubmitting={true} />);
    submitButton = screen.getByRole('button', { name: 'Saving...' });
    expect(submitButton).toBeDisabled();

    rerender(<FormActions {...defaultProps} isSubmitting={false} />);
    submitButton = screen.getByRole('button', { name: 'Save' });
    expect(submitButton).not.toBeDisabled();
  });

  it('renders buttons in correct order (cancel first, submit second)', () => {
    render(<FormActions {...defaultProps} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
    expect(buttons[0]).toHaveTextContent('Cancel');
    expect(buttons[1]).toHaveTextContent('Save');
  });

  it('handles different cancel href formats', () => {
    const { rerender } = render(<FormActions {...defaultProps} cancelHref="/simple-path" />);

    let cancelLink = screen.getByRole('button', { name: 'Cancel' }).closest('a');
    expect(cancelLink).toHaveAttribute('href', '/simple-path');

    rerender(<FormActions {...defaultProps} cancelHref="/complex/path/with/params?id=123" />);
    cancelLink = screen.getByRole('button', { name: 'Cancel' }).closest('a');
    expect(cancelLink).toHaveAttribute('href', '/complex/path/with/params?id=123');

    rerender(<FormActions {...defaultProps} cancelHref="../relative-path" />);
    cancelLink = screen.getByRole('button', { name: 'Cancel' }).closest('a');
    expect(cancelLink).toHaveAttribute('href', '../relative-path');
  });

  it('handles long custom labels', () => {
    render(
      <FormActions
        {...defaultProps}
        submitLabel="Save and Continue to Next Step"
        cancelLabel="Go Back to Previous Page"
      />
    );

    expect(screen.getByText('Go Back to Previous Page')).toBeInTheDocument();
    expect(screen.getByText('Save and Continue to Next Step')).toBeInTheDocument();
  });

  it('handles empty string labels', () => {
    render(<FormActions {...defaultProps} submitLabel="" cancelLabel="" />);

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('');
    expect(buttons[1]).toHaveTextContent('');
  });
});
