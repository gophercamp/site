'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import Link from 'next/link';
import { FaEnvelope } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';

export default function AdminDashboard() {
  const { userEmail } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="mt-2 text-sm text-secondary">Welcome back, {userEmail}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Subscribers Card */}
        <div className="bg-primary border border-primary overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-go-blue bg-opacity-10 rounded-md p-3">
                <FaEnvelope className="h-6 w-6 text-go-blue" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-secondary truncate">Newsletter</dt>
                  <dd>
                    <div className="text-lg font-medium text-primary">Manage Subscribers</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-secondary px-5 py-3">
            <div className="text-sm">
              <Link
                href="/admin/subscribers"
                className="font-medium text-go-blue hover:text-go-blue-dark"
              >
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Website Card */}
        <div className="bg-primary border border-primary overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-go-blue bg-opacity-10 rounded-md p-3">
                <HiHome className="h-6 w-6 text-go-blue" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-secondary truncate">Website</dt>
                  <dd>
                    <div className="text-lg font-medium text-primary">View Website</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-secondary px-5 py-3">
            <div className="text-sm">
              <Link href="/" className="font-medium text-go-blue hover:text-go-blue-dark">
                Go to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-[var(--bg-primary)] shadow overflow-hidden rounded-lg border border-[var(--border-color)]">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-[var(--text-primary)]">
            Admin Documentation
          </h3>
          <div className="mt-2 max-w-xl text-sm text-[var(--text-secondary)]">
            <p>
              This admin panel allows you to manage newsletter subscribers for the Gophercamp 2026
              conference. Use the navigation menu to access different sections.
            </p>
          </div>
          <div className="mt-5">
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--text-secondary)]">
              <li>View and manage newsletter subscribers</li>
              <li>Export subscriber data as CSV for analysis</li>
              <li>Send newsletters to all confirmed subscribers</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
