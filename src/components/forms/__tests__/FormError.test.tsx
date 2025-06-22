import { render, screen } from '@testing-library/react';
import FormError from '../FormError';

describe('FormError Component', () => {
  it('renders error message when error prop is provided', () => {
    const errorMessage = 'Something went wrong';
    render(<FormError error={errorMessage} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it('does not render anything when error prop is null', () => {
    const { container } = render(<FormError error={null} />);
    expect(container.firstChild).toBeNull();
  });

  it('does not render anything when error prop is empty string', () => {
    const { container } = render(<FormError error="" />);
    expect(container.firstChild).toBeNull();
  });

  it('applies correct styling classes', () => {
    const errorMessage = 'Test error message';
    render(<FormError error={errorMessage} />);

    const errorElement = screen.getByText(errorMessage);
    expect(errorElement).toHaveClass(
      'mb-4',
      'bg-[var(--form-error-bg)]',
      'border',
      'border-[var(--form-error-border)]',
      'text-[var(--form-error-text)]',
      'px-4',
      'py-3',
      'rounded',
      'relative'
    );
  });

  it('renders as a div element', () => {
    render(<FormError error="Test error" />);

    const errorElement = screen.getByText('Test error');
    expect(errorElement.tagName).toBe('DIV');
  });

  it('handles long error messages', () => {
    const longError =
      'This is a very long error message that might span multiple lines and should still be displayed correctly with all the proper styling applied to the error container element.';
    render(<FormError error={longError} />);

    const errorElement = screen.getByText(longError);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(longError);
  });

  it('handles special characters in error messages', () => {
    const specialCharError = 'Error with <script>alert("test")</script> & special chars';
    render(<FormError error={specialCharError} />);

    const errorElement = screen.getByText(specialCharError);
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(specialCharError);
  });

  it('handles error messages with HTML entities', () => {
    const htmlEntityError = 'Price must be > 0 & < 1000';
    render(<FormError error={htmlEntityError} />);

    const errorElement = screen.getByText(htmlEntityError);
    expect(errorElement).toBeInTheDocument();
  });

  it('renders multiple error components independently', () => {
    render(
      <div>
        <FormError error="First error" />
        <FormError error="Second error" />
        <FormError error={null} />
      </div>
    );

    expect(screen.getByText('First error')).toBeInTheDocument();
    expect(screen.getByText('Second error')).toBeInTheDocument();

    const errorElements = screen.getAllByText(/error/);
    expect(errorElements).toHaveLength(2);
  });

  it('updates when error prop changes', () => {
    const { rerender } = render(<FormError error="Initial error" />);

    expect(screen.getByText('Initial error')).toBeInTheDocument();

    rerender(<FormError error="Updated error" />);
    expect(screen.getByText('Updated error')).toBeInTheDocument();
    expect(screen.queryByText('Initial error')).not.toBeInTheDocument();

    rerender(<FormError error={null} />);
    expect(screen.queryByText('Updated error')).not.toBeInTheDocument();
  });

  it('handles whitespace-only error strings', () => {
    const { container } = render(<FormError error="   " />);

    // Component should render the whitespace as it's truthy
    const errorElement = container.querySelector('div');
    expect(errorElement).toBeInTheDocument();
    // HTML normalizes whitespace, so test actual behavior
    expect(errorElement).toHaveTextContent('');
  });
});
