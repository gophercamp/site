import { FaCalendarAlt, FaEnvelope, FaHome, FaMicrophone, FaPaperPlane } from 'react-icons/fa';
import AdminNavIcon from './AdminNavIcon';
import AdminNavLink from './AdminNavLink';
import AdminSidebarDate from './AdminSidebarDate';

/**
 * Sidebar navigation for the admin section (desktop only)
 * This is a server component that uses client components for interactive parts
 */
export default function AdminSidebar() {
  return (
    <div className="hidden md:flex flex-col w-64 bg-primary shadow-sm border-r border-primary h-[calc(100vh-4rem)] sticky top-16">
      <div className="flex-grow py-8 px-4">
        <nav className="space-y-2">
          <AdminNavLink href="/admin" label="Dashboard">
            <AdminNavIcon path="/admin" icon={FaHome} />
          </AdminNavLink>

          <AdminNavLink href="/admin/speakers" label="Speakers">
            <AdminNavIcon path="/admin/speakers" icon={FaMicrophone} />
          </AdminNavLink>

          <AdminNavLink href="/admin/sessions" label="Sessions">
            <AdminNavIcon path="/admin/sessions" icon={FaCalendarAlt} />
          </AdminNavLink>

          <AdminNavLink href="/admin/subscribers" label="Subscribers">
            <AdminNavIcon path="/admin/subscribers" icon={FaEnvelope} />
          </AdminNavLink>

          <AdminNavLink href="/admin/newsletter" label="Send Newsletter">
            <AdminNavIcon path="/admin/newsletter" icon={FaPaperPlane} />
          </AdminNavLink>
        </nav>
      </div>

      <div className="p-4 border-t border-primary">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
          <span className="text-xs text-secondary">GopherCamp 2026</span>
        </div>
        <AdminSidebarDate />
      </div>
    </div>
  );
}
