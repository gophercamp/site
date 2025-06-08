'use client';

import Button from '@/components/ui/Button';
import Link from 'next/link';
import { ReactNode } from 'react';

interface AdminTableProps {
  title: string;
  description: string;
  addButtonLink: string;
  addButtonText: string;
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  emptyStateIcon: ReactNode;
  emptyStateTitle: string;
  emptyStateDescription: string;
  children: ReactNode;
}

export default function AdminTable({
  title,
  description,
  addButtonLink,
  addButtonText,
  isLoading,
  error,
  isEmpty,
  emptyStateIcon,
  emptyStateTitle,
  emptyStateDescription,
  children,
}: AdminTableProps) {
  return (
    <div>
      <div className="mb-6 sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">{title}</h1>
          <p className="mt-2 text-sm text-secondary">{description}</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link href={addButtonLink}>
            <Button variant="primary">{addButtonText}</Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-4 infobox-bg-warning infobox-border-warning infobox-text-warning px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-go-blue mx-auto"></div>
          <p className="mt-2 text-sm text-secondary">Loading...</p>
        </div>
      ) : isEmpty ? (
        <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] shadow-sm overflow-hidden rounded-lg px-4 py-12 text-center">
          {emptyStateIcon}
          <h3 className="mt-2 text-lg font-medium text-primary">{emptyStateTitle}</h3>
          <p className="mt-1 text-sm text-secondary">{emptyStateDescription}</p>
          <div className="mt-6">
            <Link href={addButtonLink}>
              <Button variant="primary">{addButtonText}</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-[var(--bg-primary)] shadow overflow-hidden rounded-lg border border-[var(--border-color)]">
          <div className="overflow-x-auto">{children}</div>
        </div>
      )}
    </div>
  );
}
