'use client';

/**
 * Component to display the current date in the admin sidebar
 */
export default function AdminSidebarDate() {
  return (
    <p className="text-xs text-secondary mt-1 opacity-70">
      {new Date().toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })}
    </p>
  );
}
