'use client';

import Button from '@/components/ui/Button';
import { Session } from '@/lib/supabase';
import { createBrowserSupabaseClient } from '@/lib/supabase-browser';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export default function SessionsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createBrowserSupabaseClient();

  // Function to load sessions from Supabase
  const loadSessions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('sessions')
        .select(
          `
          *,
          speaker:speakers (
            id,
            name,
            avatar_url
          )
        `
        )
        .order('start_time', { ascending: true });

      if (error) {
        throw error;
      }

      setSessions(data || []);
    } catch (err: Error | unknown) {
      console.error('Error loading sessions:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError('Failed to load sessions. ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }, [supabase, setLoading, setError, setSessions]);

  // Load sessions on page load
  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  // Function to delete a session
  async function deleteSession(id: string) {
    if (!confirm('Are you sure you want to delete this session? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase.from('sessions').delete().eq('id', id);

      if (error) {
        throw error;
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
    <div>
      <div className="mb-6 sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Sessions</h1>
          <p className="mt-2 text-sm text-secondary">
            Manage conference sessions and their details.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link href="/admin/sessions/new">
            <Button variant="primary">Add Session</Button>
          </Link>
        </div>
      </div>

      {error && (
        <div className="mb-4 infobox-bg-warning infobox-border-warning infobox-text-warning px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-go-blue mx-auto"></div>
          <p className="mt-2 text-sm text-secondary">Loading sessions...</p>
        </div>
      ) : sessions.length === 0 ? (
        <div className="bg-primary shadow overflow-hidden rounded-lg border border-primary px-4 py-12 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-secondary mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-primary">No sessions found</h3>
          <p className="mt-1 text-sm text-secondary">Get started by adding your first session.</p>
          <div className="mt-6">
            <Link href="/admin/sessions/new">
              <Button variant="primary">Add Session</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-primary shadow overflow-hidden rounded-lg border border-primary">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y border-primary">
              <thead className="bg-secondary">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                  >
                    Session Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                  >
                    Speaker
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                  >
                    Time
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-primary divide-y border-primary">
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
                              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                                <span className="text-xs font-medium text-secondary">
                                  {session.speaker.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-primary">
                              {session.speaker.name}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm text-secondary">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-primary">
                        {formatDateTime(session.start_time)}
                      </div>
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
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-secondary text-secondary">
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
                        onClick={() => deleteSession(session.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
