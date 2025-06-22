import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import FormTextarea from '../FormTextarea';

describe('FormTextarea Component', () => {
  it('renders with basic props', () => {
    render(<FormTextarea label="Description" name="description" />);

    const textarea = screen.getByRole('textbox');
    const label = screen.getByText('Description');

    expect(textarea).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(textarea).toHaveAttribute('id', 'description');
    expect(textarea).toHaveAttribute('name', 'description');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('shows required asterisk when required prop is true', () => {
    render(<FormTextarea label="Required Field" name="required-textarea" required />);

    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass('text-[var(--form-error-color)]');
  });

  it('does not show asterisk when required prop is false or not provided', () => {
    render(<FormTextarea label="Optional Field" name="optional-textarea" />);

    const asterisk = screen.queryByText('*');
    expect(asterisk).not.toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'Description is required';
    render(<FormTextarea label="Description" name="description" error={errorMessage} />);

    const error = screen.getByText(errorMessage);
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass('text-[var(--form-error-text)]');
  });

  it('applies error styling when error prop is provided', () => {
    render(<FormTextarea label="Description" name="description" error="Error message" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-[var(--form-error-border)]');
  });

  it('applies custom className', () => {
    render(<FormTextarea label="Description" name="description" className="custom-class" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<FormTextarea label="Description" name="description" ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('textbox'));
  });

  it('handles user input correctly', async () => {
    const user = userEvent.setup();
    render(<FormTextarea label="Description" name="description" />);

    const textarea = screen.getByRole('textbox');
    const testText = 'This is a test description with multiple lines.\nSecond line here.';

    await user.type(textarea, testText);
    expect(textarea).toHaveValue(testText);
  });

  it('passes through HTML textarea attributes', () => {
    render(
      <FormTextarea
        label="Description"
        name="description"
        placeholder="Enter description"
        maxLength={500}
        rows={5}
        cols={40}
        disabled
      />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveAttribute('placeholder', 'Enter description');
    expect(textarea).toHaveAttribute('maxLength', '500');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('cols', '40');
    expect(textarea).toBeDisabled();
  });

  it('associates label with textarea correctly', () => {
    render(<FormTextarea label="Message" name="message" />);

    const label = screen.getByText('Message');
    const textarea = screen.getByRole('textbox');

    expect(label).toHaveAttribute('for', 'message');
    expect(textarea).toHaveAttribute('id', 'message');
  });

  it('applies base styling classes', () => {
    render(<FormTextarea label="Description" name="description" />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass(
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
      <FormTextarea
        label="Description"
        name="description"
        error="Error message"
        className="custom-class"
      />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveClass('border-[var(--form-error-border)]', 'custom-class');
  });

  it('handles long content input', async () => {
    const user = userEvent.setup();
    render(<FormTextarea label="Long Content" name="content" />);

    const textarea = screen.getByRole('textbox');
    const longContent = 'Lorem ipsum '.repeat(100); // Very long text

    await user.type(textarea, longContent);
    expect(textarea).toHaveValue(longContent);
  });

  it('handles resize attribute', () => {
    render(<FormTextarea label="Resizable" name="resizable" style={{ resize: 'vertical' }} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveStyle({ resize: 'vertical' });
  });

  it('handles defaultValue attribute', () => {
    const defaultValue = 'Default content';
    render(<FormTextarea label="With Default" name="default" defaultValue={defaultValue} />);

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue(defaultValue);
  });

  it('handles controlled value', () => {
    const { rerender } = render(
      <FormTextarea
        label="Controlled"
        name="controlled"
        value="Initial value"
        onChange={() => {}}
      />
    );

    const textarea = screen.getByRole('textbox');
    expect(textarea).toHaveValue('Initial value');

    rerender(
      <FormTextarea
        label="Controlled"
        name="controlled"
        value="Updated value"
        onChange={() => {}}
      />
    );
    expect(textarea).toHaveValue('Updated value');
  });

  it('handles multiline content with line breaks', async () => {
    const user = userEvent.setup();
    render(<FormTextarea label="Multiline" name="multiline" />);

    const textarea = screen.getByRole('textbox');

    await user.type(textarea, 'Line 1{enter}Line 2{enter}Line 3');
    expect(textarea).toHaveValue('Line 1\nLine 2\nLine 3');
  });
});
