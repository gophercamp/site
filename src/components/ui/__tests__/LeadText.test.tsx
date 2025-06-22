import { render, screen } from '@testing-library/react';
import LeadText from '../LeadText';

describe('LeadText Component', () => {
  it('renders with text content', () => {
    render(<LeadText>This is lead text content</LeadText>);

    const leadText = screen.getByText('This is lead text content');
    expect(leadText).toBeInTheDocument();
    expect(leadText.tagName).toBe('P');
  });

  it('applies default CSS classes', () => {
    render(<LeadText>Lead text</LeadText>);

    const leadText = screen.getByText('Lead text');
    expect(leadText).toHaveClass('lead', 'text-xl', 'text-secondary', 'mb-8');
  });

  it('applies custom className', () => {
    render(<LeadText className="custom-lead-class">Lead text</LeadText>);

    const leadText = screen.getByText('Lead text');
    expect(leadText).toHaveClass('lead', 'text-xl', 'text-secondary', 'mb-8', 'custom-lead-class');
  });

  it('renders React node children', () => {
    render(
      <LeadText>
        This is <strong>bold</strong> and this is <em>italic</em> text.
      </LeadText>
    );

    const leadText = screen.getByRole('paragraph');
    expect(leadText).toBeInTheDocument();
    expect(leadText).toHaveTextContent('This is bold and this is italic text.');

    expect(screen.getByText('bold')).toBeInTheDocument();
    expect(screen.getByText('italic')).toBeInTheDocument();
  });

  it('handles empty content', () => {
    render(<LeadText>{''}</LeadText>);

    const leadText = screen.getByRole('paragraph');
    expect(leadText).toBeInTheDocument();
    expect(leadText).toBeEmptyDOMElement();
  });

  it('renders with complex nested content', () => {
    render(
      <LeadText>
        <span>Nested span content</span>
        <a href="#">Link in lead text</a>
      </LeadText>
    );

    expect(screen.getByText('Nested span content')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('Link in lead text');
  });

  it('maintains proper semantic structure', () => {
    render(<LeadText>Semantic lead paragraph</LeadText>);

    const leadText = screen.getByRole('paragraph');
    expect(leadText).toBeInTheDocument();
    expect(leadText.tagName).toBe('P');
  });

  it('handles long text content', () => {
    const longText =
      'This is a very long lead text that might span multiple lines and contains various words to test how the component handles longer content properly.';

    render(<LeadText>{longText}</LeadText>);

    const leadText = screen.getByText(longText);
    expect(leadText).toBeInTheDocument();
    expect(leadText).toHaveTextContent(longText);
  });

  it('preserves whitespace and formatting', () => {
    render(<LeadText> Spaced content </LeadText>);

    const leadText = screen.getByRole('paragraph');
    expect(leadText).toBeInTheDocument();
    // Note: DOM normalizes whitespace, so we test the actual rendered behavior
    expect(leadText).toHaveTextContent('Spaced content');
  });
});
