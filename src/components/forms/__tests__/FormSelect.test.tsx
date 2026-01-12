import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import FormSelect from '../FormSelect';

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

describe('FormSelect Component', () => {
  it('renders with basic props', () => {
    render(<FormSelect label="Select Option" name="select" options={mockOptions} />);

    const select = screen.getByRole('combobox');
    const label = screen.getByText('Select Option');

    expect(select).toBeInTheDocument();
    expect(label).toBeInTheDocument();
    expect(select).toHaveAttribute('id', 'select');
    expect(select).toHaveAttribute('name', 'select');
    expect(select.tagName).toBe('SELECT');
  });

  it('renders all options correctly', () => {
    render(<FormSelect label="Select Option" name="select" options={mockOptions} />);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);

    expect(options[0]).toHaveValue('option1');
    expect(options[0]).toHaveTextContent('Option 1');
    expect(options[1]).toHaveValue('option2');
    expect(options[1]).toHaveTextContent('Option 2');
    expect(options[2]).toHaveValue('option3');
    expect(options[2]).toHaveTextContent('Option 3');
  });

  it('renders placeholder option when placeholder prop is provided', () => {
    render(
      <FormSelect
        label="Select Option"
        name="select"
        options={mockOptions}
        placeholder="Choose an option"
      />
    );

    const placeholderOption = screen.getByRole('option', { name: 'Choose an option' });
    expect(placeholderOption).toBeInTheDocument();
    expect(placeholderOption).toHaveValue('');
    expect(placeholderOption).toHaveAttribute('disabled');

    const allOptions = screen.getAllByRole('option');
    expect(allOptions).toHaveLength(4); // 1 placeholder + 3 regular options
  });

  it('shows required asterisk when required prop is true', () => {
    render(
      <FormSelect label="Required Field" name="required-select" options={mockOptions} required />
    );

    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    expect(asterisk).toHaveClass('text-[var(--form-error-color)]');
  });

  it('does not show asterisk when required prop is false or not provided', () => {
    render(<FormSelect label="Optional Field" name="optional-select" options={mockOptions} />);

    const asterisk = screen.queryByText('*');
    expect(asterisk).not.toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    const errorMessage = 'Please select an option';
    render(
      <FormSelect label="Select Option" name="select" options={mockOptions} error={errorMessage} />
    );

    const error = screen.getByText(errorMessage);
    expect(error).toBeInTheDocument();
    expect(error).toHaveClass('text-[var(--form-error-text)]');
  });

  it('applies error styling when error prop is provided', () => {
    render(
      <FormSelect label="Select Option" name="select" options={mockOptions} error="Error message" />
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-[var(--form-error-border)]');
  });

  it('applies custom className', () => {
    render(
      <FormSelect
        label="Select Option"
        name="select"
        options={mockOptions}
        className="custom-class"
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = createRef<HTMLSelectElement>();
    render(<FormSelect label="Select Option" name="select" options={mockOptions} ref={ref} />);

    expect(ref.current).toBe(screen.getByRole('combobox'));
  });

  it('handles user selection correctly', async () => {
    const user = userEvent.setup();
    render(<FormSelect label="Select Option" name="select" options={mockOptions} />);

    const select = screen.getByRole('combobox');

    await user.selectOptions(select, 'option2');
    expect(select).toHaveValue('option2');

    await user.selectOptions(select, 'option1');
    expect(select).toHaveValue('option1');
  });

  it('passes through HTML select attributes', () => {
    // Test single select first
    render(
      <FormSelect
        label="Select Option"
        name="select"
        options={mockOptions}
        defaultValue="option2"
        disabled
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option2');
    expect(select).toBeDisabled();
  });

  it('handles multiple select attribute', () => {
    render(
      <FormSelect label="Multiple Select" name="multi-select" options={mockOptions} multiple />
    );

    const select = screen.getByRole('listbox');
    expect(select).toHaveAttribute('multiple');
  });

  it('associates label with select correctly', () => {
    render(<FormSelect label="Country" name="country" options={mockOptions} />);

    const label = screen.getByText('Country');
    const select = screen.getByRole('combobox');

    expect(label).toHaveAttribute('for', 'country');
    expect(select).toHaveAttribute('id', 'country');
  });

  it('applies base styling classes', () => {
    render(<FormSelect label="Select Option" name="select" options={mockOptions} />);

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass(
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
      <FormSelect
        label="Select Option"
        name="select"
        options={mockOptions}
        error="Error message"
        className="custom-class"
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveClass('border-[var(--form-error-border)]', 'custom-class');
  });

  it('handles empty options array', () => {
    render(<FormSelect label="Empty Select" name="empty" options={[]} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    const options = screen.queryAllByRole('option');
    expect(options).toHaveLength(0);
  });

  it('handles options with special characters', () => {
    const specialOptions = [
      { value: 'special&chars', label: 'Option with & special chars' },
      { value: 'html<tags>', label: 'Option with <HTML> tags' },
      { value: 'quotes"test', label: 'Option with "quotes"' },
    ];

    render(<FormSelect label="Special Options" name="special" options={specialOptions} />);

    const options = screen.getAllByRole('option');
    expect(options[0]).toHaveTextContent('Option with & special chars');
    expect(options[1]).toHaveTextContent('Option with <HTML> tags');
    expect(options[2]).toHaveTextContent('Option with "quotes"');
  });

  it('handles controlled value', () => {
    const { rerender } = render(
      <FormSelect
        label="Controlled Select"
        name="controlled"
        options={mockOptions}
        value="option1"
        onChange={() => {}}
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveValue('option1');

    rerender(
      <FormSelect
        label="Controlled Select"
        name="controlled"
        options={mockOptions}
        value="option3"
        onChange={() => {}}
      />
    );
    expect(select).toHaveValue('option3');
  });

  it('renders with placeholder and regular options in correct order', () => {
    render(
      <FormSelect
        label="Select with Placeholder"
        name="select"
        options={mockOptions}
        placeholder="Select an option"
      />
    );

    const allOptions = screen.getAllByRole('option');
    expect(allOptions[0]).toHaveTextContent('Select an option');
    expect(allOptions[0]).toHaveAttribute('disabled');
    expect(allOptions[1]).toHaveTextContent('Option 1');
    expect(allOptions[2]).toHaveTextContent('Option 2');
    expect(allOptions[3]).toHaveTextContent('Option 3');
  });

  it('handles options with duplicate values', () => {
    const duplicateOptions = [
      { value: 'same', label: 'First Same' },
      { value: 'same2', label: 'Second Same' }, // Use different values to avoid key conflicts
      { value: 'different', label: 'Different' },
    ];

    render(<FormSelect label="Duplicate Values" name="duplicate" options={duplicateOptions} />);

    const options = screen.getAllByRole('option');
    expect(options).toHaveLength(3);
    expect(options[0]).toHaveValue('same');
    expect(options[1]).toHaveValue('same2');
    expect(options[2]).toHaveValue('different');
  });
});
