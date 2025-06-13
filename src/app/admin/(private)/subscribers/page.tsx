'use client';

import AdminTable from '@/components/admin/AdminTable';
import { NewsletterSubscriber } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { deleteSubscriber, getSubscribers, getSubscriberStats } from './actions';

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    confirmed: 0,
    unconfirmed: 0,
  });

  // Load subscribers on page load
  useEffect(() => {
    loadSubscribers();
  }, []);

  // Function to load subscribers from server action
  async function loadSubscribers() {
    try {
      setLoading(true);
      setError(null);

      // Get subscribers
      const result = await getSubscribers();
      if (result.error) {
        throw new Error(result.error);
      }

      setSubscribers(result.subscribers || []);

      // Get subscriber stats
      const statsResult = await getSubscriberStats();
      if (!statsResult.error) {
        setStats(statsResult.stats);
      }
    } catch (err: Error | unknown) {
      console.error('Error loading subscribers:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError('Failed to load subscribers. ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Function to handle subscriber deletion
  async function handleDeleteSubscriber(id: number) {
    if (
      !confirm('Are you sure you want to delete this subscriber? This action cannot be undone.')
    ) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await deleteSubscriber(id);

      if (result.error) {
        throw new Error(result.error);
      }

      // Reload subscribers after deletion
      await loadSubscribers();
    } catch (err: Error | unknown) {
      console.error('Error deleting subscriber:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError('Failed to delete subscriber. ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Function to format date
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
        {/* Total Subscribers */}
        <div className="bg-primary border border-primary overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-go-blue bg-opacity-10 rounded-md p-3">
                <FaEnvelope className="h-6 w-6 text-go-blue" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-secondary truncate">Total Subscribers</dt>
                  <dd>
                    <div className="text-lg font-medium text-primary">{stats.total}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmed Subscribers */}
        <div className="bg-primary border border-primary overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                <FaEnvelope className="h-6 w-6 text-green-800" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-secondary truncate">Confirmed</dt>
                  <dd>
                    <div className="text-lg font-medium text-primary">{stats.confirmed}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* Unconfirmed Subscribers */}
        <div className="bg-primary border border-primary overflow-hidden shadow-sm rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                <FaEnvelope className="h-6 w-6 text-yellow-800" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-secondary truncate">Unconfirmed</dt>
                  <dd>
                    <div className="text-lg font-medium text-primary">{stats.unconfirmed}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdminTable
        title="Newsletter Subscribers"
        description="View and manage newsletter subscribers."
        addButtonLink="/admin/subscribers/export"
        addButtonText="Export CSV"
        isLoading={loading}
        error={error}
        isEmpty={subscribers.length === 0}
        emptyStateIcon={<FaEnvelope className="h-12 w-12 text-slate-400 mx-auto" />}
        emptyStateTitle="No subscribers found"
        emptyStateDescription="No one has subscribed to the newsletter yet."
      >
        <table className="min-w-full divide-y border-[var(--border-color)]">
          <thead className="bg-[var(--bg-secondary)]">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
              >
                Subscribed Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
              >
                Confirmed Date
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-[var(--bg-primary)] divide-y border-[var(--border-color)]">
            {subscribers.map(subscriber => (
              <tr key={subscriber.id}>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-primary">{subscriber.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {subscriber.confirmed ? (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Confirmed
                    </span>
                  ) : (
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-primary">{formatDate(subscriber.subscribed_at)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-primary">
                    {subscriber.confirmed_at ? formatDate(subscriber.confirmed_at) : '—'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleDeleteSubscriber(subscriber.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </AdminTable>
    </div>
  );
}
