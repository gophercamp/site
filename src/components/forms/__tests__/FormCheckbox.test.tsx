import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import FormCheckbox from '../FormCheckbox';

describe('FormCheckbox Component', () => {
  it('renders with basic props', () => {
    render(<FormCheckbox label="Accept Terms" name="terms" />);

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByText('Accept Terms');

    expect(checkbox).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('id', 'terms');
    expect(checkbox).toHaveAttribute('name', 'terms');
    expect(checkbox).toHaveAttribute('type', 'checkbox');
  });

  it('associates label with checkbox correctly', () => {
    render(<FormCheckbox label="Subscribe to newsletter" name="newsletter" />);

    const label = screen.getByText('Subscribe to newsletter');
    const checkbox = screen.getByRole('checkbox');

    expect(label).toHaveAttribute('for', 'newsletter');
    expect(checkbox).toHaveAttribute('id', 'newsletter');
  });

  it('handles user interaction correctly', async () => {
    const user = userEvent.setup();
    render(<FormCheckbox label="Check me" name="checkbox" />);

    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'You must accept the terms';
    render(<FormCheckbox label="Accept Terms" name="terms" error={errorMessage} />);

    const error = screen.getByText(errorMessage);
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass('text-[var(--form-error-text)]');
  });

  it('applies error styling when error prop is provided', () => {
    render(<FormCheckbox label="Accept Terms" name="terms" error="Error message" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('border-[var(--form-error-border)]');
  });

  it('applies custom className', () => {
    render(<FormCheckbox label="Test Label" name="test-checkbox" className="custom-class" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLInputElement>();
    render(<FormCheckbox label="Test Label" name="test-checkbox" ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('checkbox'));
  });

  it('passes through HTML input attributes', () => {
    render(
      <FormCheckbox
        label="Test Label"
        name="test-checkbox"
        defaultChecked
        disabled
        value="test-value"
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
    expect(checkbox).toBeDisabled();
    expect(checkbox).toHaveAttribute('value', 'test-value');
  });

  it('applies base styling classes', () => {
    render(<FormCheckbox label="Test Label" name="test-checkbox" />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass(
      'h-4',
      'w-4',
      'text-[var(--form-focus-color)]',
      'focus:ring-[var(--form-focus-ring-color)]',
      'border-[var(--border-color)]',
      'rounded',
      'transition-colors',
      'duration-200'
    );
  });

  it('handles both error and custom className', () => {
    render(
      <FormCheckbox
        label="Test Label"
        name="test-checkbox"
        error="Error message"
        className="custom-class"
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveClass('border-[var(--form-error-border)]', 'custom-class');
  });

  it('renders with flex container styling', () => {
    render(<FormCheckbox label="Test Label" name="test-checkbox" />);

    const container = screen.getByRole('checkbox').parentElement;
    expect(container).toHaveClass('flex', 'items-center');
  });

  it('positions label correctly next to checkbox', () => {
    render(<FormCheckbox label="Test Label" name="test-checkbox" />);

    const label = screen.getByText('Test Label');
    expect(label).toHaveClass('ml-2', 'block', 'text-sm', 'text-[var(--text-secondary)]');
  });

  it('handles controlled state', () => {
    const { rerender } = render(
      <FormCheckbox
        label="Controlled Checkbox"
        name="controlled"
        checked={false}
        onChange={() => {}}
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    rerender(
      <FormCheckbox
        label="Controlled Checkbox"
        name="controlled"
        checked={true}
        onChange={() => {}}
      />
    );
    expect(checkbox).toBeChecked();
  });

  it('does not show error when error prop is undefined', () => {
    render(<FormCheckbox label="Test Label" name="test-checkbox" />);

    const errorText = screen.queryByText(/error/i);
    expect(errorText).not.toBeInTheDocument();
  });
});
