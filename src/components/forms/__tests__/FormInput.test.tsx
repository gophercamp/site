import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import FormInput from '../FormInput';

describe('FormInput Component', () => {
  it('renders with basic props', () => {
    render(<FormInput label="Test Label" name="test-input" />);

    const input = screen.getByRole('textbox');
    const label = screen.getByText('Test Label');

    expect(input).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-input');
    expect(input).toHaveAttribute('name', 'test-input');
  });

  it('shows required asterisk when required prop is true', () => {
    render(<FormInput label="Required Field" name="required-input" required />);

    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass('text-[var(--form-error-color)]');
  });

  it('does not show asterisk when required prop is false or not provided', () => {
    render(<FormInput label="Optional Field" name="optional-input" />);

    const asterisk = screen.queryByText('*');
    expect(asterisk).not.toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(<FormInput label="Test Label" name="test-input" error={errorMessage} />);

    const error = screen.getByText(errorMessage);
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass('text-[var(--form-error-text)]');
  });

  it('applies error styling when error prop is provided', () => {
    render(<FormInput label="Test Label" name="test-input" error="Error message" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-[var(--form-error-border)]');
  });

  it('applies custom className', () => {
    render(<FormInput label="Test Label" name="test-input" className="custom-class" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLInputElement>();
    render(<FormInput label="Test Label" name="test-input" ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('textbox'));
  });

  it('handles user input correctly', async () => {
    const user = userEvent.setup();
    render(<FormInput label="Test Label" name="test-input" />);

    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello, World!');

    expect(input).toHaveValue('Hello, World!');
  });

  it('passes through HTML input attributes', () => {
    render(
      <FormInput
        label="Test Label"
        name="test-input"
        type="email"
        placeholder="Enter email"
        maxLength={50}
        disabled
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('placeholder', 'Enter email');
    expect(input).toHaveAttribute('maxLength', '50');
    expect(input).toBeDisabled();
  });

  it('associates label with input correctly', () => {
    render(<FormInput label="Email Address" name="email" />);

    const label = screen.getByText('Email Address');
    const input = screen.getByRole('textbox');

    expect(label).toHaveAttribute('for', 'email');
    expect(input).toHaveAttribute('id', 'email');
  });

  it('applies base styling classes', () => {
    render(<FormInput label="Test Label" name="test-input" />);

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass(
      'mt-1',
      'block',
      'w-full',
      'rounded-md',
      'border-[var(--border-color)]',
      'shadow-sm',
      'focus:border-[var(--form-focus-color)]',
      'focus:ring-[var(--form-focus-ring-color)]',
      'bg-[var(--bg-primary)]',
      'text-[var(--text-primary)]',
      'sm:text-sm',
      'transition-colors',
      'duration-200'
    );
  });

  it('handles both error and custom className', () => {
    render(
      <FormInput
        label="Test Label"
        name="test-input"
        error="Error message"
        className="custom-class"
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveClass('border-[var(--form-error-border)]', 'custom-class');
  });

  it('renders with different input types', () => {
    const { rerender } = render(<FormInput label="Password" name="password" type="password" />);

    let input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');

    rerender(<FormInput label="Email" name="email" type="email" />);
    input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('type', 'email');

    rerender(<FormInput label="Number" name="number" type="number" />);
    input = screen.getByLabelText('Number');
    expect(input).toHaveAttribute('type', 'number');
  });
});
