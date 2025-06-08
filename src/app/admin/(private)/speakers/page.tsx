'use client';

import Button from '@/components/ui/Button';
import { Speaker } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load speakers on page load
  useEffect(() => {
    loadSpeakers();
  }, []);

  // Function to load speakers from API
  async function loadSpeakers() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/admin/speakers');
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load speakers');
      }

      setSpeakers(data.speakers || []);
    } catch (err: Error | unknown) {
      console.error('Error loading speakers:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError('Failed to load speakers. ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Function to delete a speaker
  async function deleteSpeaker(id: string) {
    if (!confirm('Are you sure you want to delete this speaker? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`/api/admin/speakers/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to delete speaker');
      }

      // Reload speakers after deletion
      await loadSpeakers();
    } catch (err: Error | unknown) {
      console.error('Error deleting speaker:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError('Failed to delete speaker. ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-6 sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Speakers</h1>
          <p className="mt-2 text-sm text-secondary">
            Manage conference speakers and their information.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link href="/admin/speakers/new">
            <Button variant="primary">Add Speaker</Button>
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
          <p className="mt-2 text-sm text-secondary">Loading speakers...</p>
        </div>
      ) : speakers.length === 0 ? (
        <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] shadow-sm overflow-hidden rounded-lg px-4 py-12 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-slate-400 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-primary">No speakers found</h3>
          <p className="mt-1 text-sm text-secondary">Get started by adding your first speaker.</p>
          <div className="mt-6">
            <Link href="/admin/speakers/new">
              <Button variant="primary">Add Speaker</Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-[var(--bg-primary)] shadow overflow-hidden rounded-lg border border-[var(--border-color)]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y border-[var(--border-color)]">
              <thead className="bg-[var(--bg-secondary)]">
                <tr>
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
                    Company
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider"
                  >
                    Featured
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-[var(--bg-primary)] divide-y border-[var(--border-color)]">
                {speakers.map(speaker => (
                  <tr key={speaker.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {speaker.avatar_url ? (
                            <Image
                              className="h-10 w-10 rounded-full object-cover"
                              src={speaker.avatar_url}
                              alt={speaker.name}
                              width={40}
                              height={40}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                              <span className="text-sm font-medium text-[var(--text-secondary)]">
                                {speaker.name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-primary">{speaker.name}</div>
                          <div className="text-sm text-secondary">{speaker.title || '—'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-primary">{speaker.company || '—'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {speaker.featured ? (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Yes
                        </span>
                      ) : (
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link
                        href={`/admin/speakers/edit/${speaker.id}`}
                        className="text-primary hover:text-primary-dark mr-4"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteSpeaker(speaker.id)}
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
