import { render, screen } from '@testing-library/react';
import Section from '../Section';

describe('Section Component', () => {
  it('renders with title and content', () => {
    render(
      <Section title="Test Section Title">
        <p>Test section content</p>
      </Section>
    );

    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Test Section Title');

    expect(screen.getByText('Test section content')).toBeInTheDocument();
  });

  it('applies correct CSS classes to section', () => {
    render(
      <Section title="Test Title">
        <p>Content</p>
      </Section>
    );

    const section = document.querySelector('section');
    expect(section).toHaveClass('mb-12');
  });

  it('applies correct CSS classes to heading', () => {
    render(
      <Section title="Test Title">
        <p>Content</p>
      </Section>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('text-2xl', 'font-bold', 'text-primary', 'mb-4');
  });

  it('renders complex children content', () => {
    render(
      <Section title="Complex Section">
        <div>
          <p>First paragraph</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
          <a href="#">Section link</a>
        </div>
      </Section>
    );

    expect(screen.getByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByText('List item 2')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('Section link');
  });

  it('handles multiple child elements', () => {
    render(
      <Section title="Multiple Children">
        <p>First child</p>
        <p>Second child</p>
        <p>Third child</p>
      </Section>
    );

    expect(screen.getByText('First child')).toBeInTheDocument();
    expect(screen.getByText('Second child')).toBeInTheDocument();
    expect(screen.getByText('Third child')).toBeInTheDocument();
  });

  it('renders with proper semantic structure', () => {
    render(
      <Section title="Semantic Test">
        <p>Content</p>
      </Section>
    );

    const section = document.querySelector('section');
    const heading = screen.getByRole('heading', { level: 2 });

    expect(section?.tagName).toBe('SECTION');
    expect(heading.tagName).toBe('H2');
    expect(section).toContainElement(heading);
  });

  it('handles special characters in title', () => {
    const specialTitle = 'Title with & < > " \' characters';
    render(
      <Section title={specialTitle}>
        <p>Content</p>
      </Section>
    );

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveTextContent(specialTitle);
  });

  it('handles empty string children', () => {
    render(<Section title="Empty Content">{''}</Section>);

    const section = document.querySelector('section');
    const heading = screen.getByRole('heading', { level: 2 });

    expect(section).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Empty Content');
  });

  it('renders React fragments as children', () => {
    render(
      <Section title="Fragment Children">
        <>
          <p>Fragment child 1</p>
          <p>Fragment child 2</p>
        </>
      </Section>
    );

    expect(screen.getByText('Fragment child 1')).toBeInTheDocument();
    expect(screen.getByText('Fragment child 2')).toBeInTheDocument();
  });
});
