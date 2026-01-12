import { render, screen } from '@testing-library/react';
import BulletList from '../BulletList';

describe('BulletList Component', () => {
  const mockItems = ['First item', 'Second item', 'Third item'];

  it('renders a list with correct items', () => {
    render(<BulletList items={mockItems} />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);

    expect(listItems[0]).toHaveTextContent('First item');
    expect(listItems[1]).toHaveTextContent('Second item');
    expect(listItems[2]).toHaveTextContent('Third item');
  });

  it('applies default CSS classes', () => {
    render(<BulletList items={mockItems} />);

    const list = screen.getByRole('list');
    expect(list).toHaveClass('list-disc', 'pl-6', 'mb-6');
  });

  it('applies custom className', () => {
    render(<BulletList items={mockItems} className="custom-list-class" />);

    const list = screen.getByRole('list');
    expect(list).toHaveClass('list-disc', 'pl-6', 'mb-6', 'custom-list-class');
  });

  it('handles empty items array', () => {
    render(<BulletList items={[]} />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const listItems = screen.queryAllByRole('listitem');
    expect(listItems).toHaveLength(0);
  });

  it('handles React node items', () => {
    const reactNodeItems = [
      <span key="1">
        Item with <strong>bold</strong> text
      </span>,
      <a key="2" href="#">
        Link item
      </a>,
      'Plain text item',
    ];

    render(<BulletList items={reactNodeItems} />);

    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);

    // Check that the strong element is rendered
    expect(screen.getByText('bold')).toBeInTheDocument();

    // Check that the link is rendered
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent('Link item');

    // Check plain text
    expect(screen.getByText('Plain text item')).toBeInTheDocument();
  });

  it('renders items with proper structure', () => {
    render(<BulletList items={mockItems} />);

    const list = screen.getByRole('list');
    const listItems = screen.getAllByRole('listitem');

    // Verify the list structure
    expect(list.tagName).toBe('UL');
    listItems.forEach(item => {
      expect(item.tagName).toBe('LI');
      expect(list).toContainElement(item);
    });
  });
});
