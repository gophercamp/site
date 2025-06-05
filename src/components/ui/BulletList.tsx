import React from 'react';

/**
 * BulletList component for consistent list styling in policy pages
 * @param items - array of list items to display
 */
export interface BulletListProps {
  items: React.ReactNode[];
  className?: string;
}

export default function BulletList({ items, className = "" }: BulletListProps) {
  return (
    <ul className={`list-disc pl-6 mb-6 ${className}`}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
