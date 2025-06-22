import { render, screen } from '@testing-library/react';
import FormSection from '../FormSection';

describe('FormSection Component', () => {
  it('renders with basic props', () => {
    render(
      <FormSection title="User Information">
        <div>Form content</div>
      </FormSection>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('User Information');
    expect(screen.getByText('Form content')).toBeInTheDocument();
  });

  it('applies default column layout (2 columns)', () => {
    render(
      <FormSection title="Default Layout">
        <div>Content</div>
      </FormSection>
    );

    const gridContainer = screen.getByText('Content').parentElement;
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'gap-6', 'sm:grid-cols-2');
  });

  it('applies custom column layout', () => {
    render(
      <FormSection title="Custom Layout" columns={3}>
        <div>Content</div>
      </FormSection>
    );

    const gridContainer = screen.getByText('Content').parentElement;
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'gap-6', 'sm:grid-cols-3');
  });

  it('applies correct heading styles', () => {
    render(
      <FormSection title="Styled Heading">
        <div>Content</div>
      </FormSection>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('text-lg', 'font-medium', 'text-[var(--text-primary)]', 'mb-4');
  });

  it('renders multiple children correctly', () => {
    render(
      <FormSection title="Multiple Children">
        <div>First child</div>
        <div>Second child</div>
        <div>Third child</div>
      </FormSection>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  it('handles complex children components', () => {
    render(
      <FormSection title="Complex Children">
        <input type="text" placeholder="Input field" />
        <select>
          <option>Option 1</option>
        </select>
        <textarea placeholder="Textarea" />
      </FormSection>
    );

    expect(screen.getByPlaceholderText('Input field')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Textarea')).toBeInTheDocument();
  });

  it('handles different column numbers', () => {
    const { rerender } = render(
      <FormSection title="Test" columns={1}>
        <div>Content</div>
      </FormSection>
    );

    let gridContainer = screen.getByText('Content').parentElement;
    expect(gridContainer).toHaveClass('sm:grid-cols-1');

    rerender(
      <FormSection title="Test" columns={4}>
        <div>Content</div>
      </FormSection>
    );

    gridContainer = screen.getByText('Content').parentElement;
    expect(gridContainer).toHaveClass('sm:grid-cols-4');

    rerender(
      <FormSection title="Test" columns={6}>
        <div>Content</div>
      </FormSection>
    );

    gridContainer = screen.getByText('Content').parentElement;
    expect(gridContainer).toHaveClass('sm:grid-cols-6');
  });

  it('renders with React fragments as children', () => {
    render(
      <FormSection title="Fragment Children">
        <>
          <div>Fragment child 1</div>
          <div>Fragment child 2</div>
        </>
      </FormSection>
    );

    expect(screen.getByText('Fragment child 1')).toBeInTheDocument();
    expect(screen.getByText('Fragment child 2')).toBeInTheDocument();
  });

  it('handles empty children', () => {
    render(<FormSection title="Empty Section">{null}</FormSection>);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Empty Section');
  });

  it('handles special characters in title', () => {
    const specialTitle = 'Section with & < > " \' characters';
    render(
      <FormSection title={specialTitle}>
        <div>Content</div>
      </FormSection>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(specialTitle);
  });

  it('maintains proper semantic structure', () => {
    render(
      <FormSection title="Semantic Test">
        <div>Content</div>
      </FormSection>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    const container = heading.parentElement;

    expect(heading.tagName).toBe('H2');
    expect(container?.tagName).toBe('DIV');
  });

  it('renders nested form elements correctly', () => {
    render(
      <FormSection title="Form Elements">
        <div>
          <label htmlFor="nested-input">Nested Input</label>
          <input id="nested-input" type="text" />
        </div>
        <div>
          <label htmlFor="nested-select">Nested Select</label>
          <select id="nested-select">
            <option>Choice 1</option>
          </select>
        </div>
      </FormSection>
    );

    expect(screen.getByLabelText('Nested Input')).toBeInTheDocument();
    expect(screen.getByLabelText('Nested Select')).toBeInTheDocument();
  });

  it('handles conditional children rendering', () => {
    const shouldShowSecond = false;

    render(
      <FormSection title="Conditional Content">
        <div>Always visible</div>
        {shouldShowSecond && <div>Conditionally visible</div>}
      </FormSection>
    );

    expect(screen.getByText('Always visible')).toBeInTheDocument();
    expect(screen.queryByText('Conditionally visible')).not.toBeInTheDocument();
  });

  it('updates when title prop changes', () => {
    const { rerender } = render(
      <FormSection title="Initial Title">
        <div>Content</div>
      </FormSection>
    );

    expect(screen.getByText('Initial Title')).toBeInTheDocument();

    rerender(
      <FormSection title="Updated Title">
        <div>Content</div>
      </FormSection>
    );

    expect(screen.getByText('Updated Title')).toBeInTheDocument();
    expect(screen.queryByText('Initial Title')).not.toBeInTheDocument();
  });

  it('handles long titles gracefully', () => {
    const longTitle =
      'This is a very long section title that might span multiple lines and should still be displayed correctly';

    render(
      <FormSection title={longTitle}>
        <div>Content</div>
      </FormSection>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(longTitle);
  });
});
