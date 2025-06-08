'use client';

import AdminTable from '@/components/admin/AdminTable';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import { deleteSpeaker, getSpeakers, type Speaker } from './actions';

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load speakers on page load
  useEffect(() => {
    loadSpeakers();
  }, []);

  // Function to load speakers from server action
  async function loadSpeakers() {
    try {
      setLoading(true);
      setError(null);

      const result = await getSpeakers();

      if (result.error) {
        throw new Error(result.error);
      }

      setSpeakers(result.speakers || []);
    } catch (err: Error | unknown) {
      console.error('Error loading speakers:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError('Failed to load speakers. ' + errorMessage);
    } finally {
      setLoading(false);
    }
  }

  // Function to handle speaker deletion
  async function handleDeleteSpeaker(id: string) {
    if (!confirm('Are you sure you want to delete this speaker? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await deleteSpeaker(id);

      if (result.error) {
        throw new Error(result.error);
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
    <AdminTable
      title="Speakers"
      description="Manage conference speakers and their information."
      addButtonLink="/admin/speakers/new"
      addButtonText="Add Speaker"
      isLoading={loading}
      error={error}
      isEmpty={speakers.length === 0}
      emptyStateIcon={<FaUsers className="h-12 w-12 text-slate-400 mx-auto" />}
      emptyStateTitle="No speakers found"
      emptyStateDescription="Get started by adding your first speaker."
    >
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
                  onClick={() => handleDeleteSpeaker(speaker.id)}
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
