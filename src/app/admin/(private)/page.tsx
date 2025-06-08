'use client';

import { useAuth } from '@/components/providers/AuthProvider';
import Link from 'next/link';
import { FaUsers } from 'react-icons/fa';
import { HiHome } from 'react-icons/hi';
import { MdCalendarMonth } from 'react-icons/md';

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
        <p className="mt-2 text-sm text-secondary">Welcome back, {user?.email}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Speakers Card */}
        <div className="bg-primary border border-primary overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-go-blue bg-opacity-10 rounded-md p-3">
                <FaUsers className="h-6 w-6 text-go-blue" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-secondary truncate">Speakers</dt>
                  <dd>
                    <div className="text-lg font-medium text-primary">Manage Speakers</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-secondary px-5 py-3">
            <div className="text-sm">
              <Link
                href="/admin/speakers"
                className="font-medium text-go-blue hover:text-go-blue-dark"
              >
                View all
              </Link>
            </div>
          </div>
        </div>

        {/* Sessions Card */}
        <div className="bg-primary border border-primary overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-go-blue bg-opacity-10 rounded-md p-3">
                <MdCalendarMonth className="h-6 w-6 text-go-blue" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-secondary truncate">Sessions</dt>
                  <dd>
                    <div className="text-lg font-medium text-primary">Manage Sessions</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-secondary px-5 py-3">
            <div className="text-sm">
              <Link
                href="/admin/sessions"
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
              This admin panel allows you to manage speakers and sessions for the Gophercamp 2026
              conference. Use the navigation menu to access different sections.
            </p>
          </div>
          <div className="mt-5">
            <ul className="list-disc pl-5 space-y-2 text-sm text-[var(--text-secondary)]">
              <li>Add, edit, and delete conference speakers</li>
              <li>Manage session details including time, location, and speaker assignments</li>
              <li>Control which sessions are published to the public website</li>
              <li>Specify speaker details including bio, company, and social links</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
