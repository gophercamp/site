'use client';

import AdminTable from '@/components/admin/AdminTable';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { deleteSession, getSessions, Session } from './actions';

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load sessions on page load
  useEffect(() => {
    loadSessions();
  }, []);

  // Function to load sessions from server action
  async function loadSessions() {
    try {
      setLoading(true);
      setError(null);

      const result = await getSessions();

      if (result.error) {
        throw new Error(result.error);
      }

      setSessions(result.sessions || []);
    } catch (err: Error | unknown) {
      console.error('Error loading sessions:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError('Failed to load sessions. ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Function to handle session deletion
  async function handleDeleteSession(id: string) {
    if (!confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await deleteSession(id);

      if (result.error) {
        throw new Error(result.error);
      }

      // Reload sessions after deletion
      await loadSessions();
    } catch (err: Error | unknown) {
      console.error('Error deleting session:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError('Failed to delete session. ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Function to format date and time
  const formatDateTime = (dateString: string | undefined) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <AdminTable
      title="Sessions"
      description="Manage conference sessions and their details."
      addButtonLink="/admin/sessions/new"
      addButtonText="Add Session"
      isLoading={loading}
      error={error}
      isEmpty={sessions.length === 0}
      emptyStateIcon={<FaCalendarAlt className="h-12 w-12 text-slate-400 mx-auto" />}
      emptyStateTitle="No sessions found"
      emptyStateDescription="Get started by adding your first session."
    >
      <table className="min-w-full divide-y border-[var(--border-color)]">
        <thead className="bg-[var(--bg-secondary)]">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
            >
              Session Title
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
            >
              Speaker
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
            >
              Time
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
            >
              Status
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-[var(--bg-primary)] divide-y border-[var(--border-color)]">
          {sessions.map(session => (
            <tr key={session.id}>
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-primary">{session.title}</div>
                <div className="text-sm text-secondary">{session.session_type || '—'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {session.speaker ? (
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-8 w-8">
                      {session.speaker.avatar_url ? (
                        <Image
                          className="h-8 w-8 rounded-full object-cover"
                          src={session.speaker.avatar_url}
                          alt={session.speaker.name}
                          width={32}
                          height={32}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                          <span className="text-xs font-medium text-[var(--text-secondary)]">
                            {session.speaker.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-primary">{session.speaker.name}</div>
                    </div>
                  </div>
                ) : (
                  <span className="text-sm text-secondary">—</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-primary">{formatDateTime(session.start_time)}</div>
                {session.end_time && (
                  <div className="text-xs text-secondary">
                    to {formatDateTime(session.end_time)}
                  </div>
                )}
                <div className="text-xs text-secondary">{session.location || '—'}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {session.is_published ? (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Published
                  </span>
                ) : (
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
                    Draft
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link
                  href={`/admin/sessions/edit/${session.id}`}
                  className="text-primary hover:text-primary-dark mr-4"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteSession(session.id)}
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
  );
}
