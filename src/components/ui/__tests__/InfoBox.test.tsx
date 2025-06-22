import { render, screen } from '@testing-library/react';
import InfoBox from '../InfoBox';

describe('InfoBox Component', () => {
  it('renders with default variant', () => {
    render(
      <InfoBox>
        <p>Test content</p>
      </InfoBox>
    );

    const infoBox = screen.getByText('Test content').closest('div');
    expect(infoBox).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders with title', () => {
    render(
      <InfoBox title="Test Title">
        <p>Test content</p>
      </InfoBox>
    );

    const title = screen.getByRole('heading', { level: 3 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Test Title');
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('applies default variant styles', () => {
    render(
      <InfoBox>
        <p>Test content</p>
      </InfoBox>
    );

    // Find the outermost div with infobox classes
    const infoBox = document.querySelector('.infobox-bg-default');
    expect(infoBox).toHaveClass('infobox-bg-default');
    expect(infoBox).toHaveClass('infobox-border-default');
  });

  it('applies info variant styles', () => {
    render(
      <InfoBox variant="info">
        <p>Test content</p>
      </InfoBox>
    );

    const infoBox = document.querySelector('.infobox-bg-info');
    expect(infoBox).toHaveClass('infobox-bg-info');
    expect(infoBox).toHaveClass('infobox-border-info');
  });

  it('applies warning variant styles', () => {
    render(
      <InfoBox variant="warning">
        <p>Test content</p>
      </InfoBox>
    );

    const infoBox = document.querySelector('.infobox-bg-warning');
    expect(infoBox).toHaveClass('infobox-bg-warning');
    expect(infoBox).toHaveClass('infobox-border-warning');
  });

  it('applies correct title color classes for each variant', () => {
    const { rerender } = render(
      <InfoBox variant="default" title="Default Title">
        <p>Content</p>
      </InfoBox>
    );

    let title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveClass('infobox-title-default');

    rerender(
      <InfoBox variant="info" title="Info Title">
        <p>Content</p>
      </InfoBox>
    );
    title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveClass('infobox-title-info');

    rerender(
      <InfoBox variant="warning" title="Warning Title">
        <p>Content</p>
      </InfoBox>
    );
    title = screen.getByRole('heading', { level: 3 });
    expect(title).toHaveClass('infobox-title-warning');
  });

  it('applies correct text color classes for each variant', () => {
    const { rerender } = render(
      <InfoBox variant="default">
        <p>Content</p>
      </InfoBox>
    );

    let contentDiv = screen.getByText('Content').parentElement;
    expect(contentDiv).toHaveClass('infobox-text-default');

    rerender(
      <InfoBox variant="info">
        <p>Content</p>
      </InfoBox>
    );
    contentDiv = screen.getByText('Content').parentElement;
    expect(contentDiv).toHaveClass('infobox-text-info');

    rerender(
      <InfoBox variant="warning">
        <p>Content</p>
      </InfoBox>
    );
    contentDiv = screen.getByText('Content').parentElement;
    expect(contentDiv).toHaveClass('infobox-text-warning');
  });

  it('renders without title when not provided', () => {
    render(
      <InfoBox>
        <p>Just content</p>
      </InfoBox>
    );

    const headings = screen.queryAllByRole('heading');
    expect(headings).toHaveLength(0);
    expect(screen.getByText('Just content')).toBeInTheDocument();
  });

  it('applies base styling classes', () => {
    render(
      <InfoBox>
        <p>Test content</p>
      </InfoBox>
    );

    const infoBox = document.querySelector('.infobox-bg-default');
    expect(infoBox).toHaveClass('border', 'rounded-lg', 'p-6');
  });

  it('renders complex children content', () => {
    render(
      <InfoBox title="Complex Content">
        <div>
          <p>First paragraph</p>
          <ul>
            <li>List item 1</li>
            <li>List item 2</li>
          </ul>
          <a href="#">Link</a>
        </div>
      </InfoBox>
    );

    expect(screen.getByText('First paragraph')).toBeInTheDocument();
    expect(screen.getByText('List item 1')).toBeInTheDocument();
    expect(screen.getByText('List item 2')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });
});
