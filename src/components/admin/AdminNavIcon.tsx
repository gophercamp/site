'use client';

import { usePathname } from 'next/navigation';

interface AdminNavIconProps {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Client component that renders an icon with active state styling
 */
export default function AdminNavIcon({ path, icon: Icon }: AdminNavIconProps) {
  const pathname = usePathname();

  const isActive = () => {
    // Exact match for dashboard, prefix match for other sections
    if (path === '/admin') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const iconClasses = `mr-3 h-5 w-5 ${isActive() ? 'text-go-blue-dark' : 'text-go-blue'}`;

  return <Icon className={iconClasses} />;
}
