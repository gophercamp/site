'use client';

import Button from '@/components/ui/Button';
import { Speaker } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function EditSpeakerPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<Speaker>>({
    name: '',
    bio: '',
    company: '',
    title: '',
    avatar_url: '',
    social_twitter: '',
    social_github: '',
    social_linkedin: '',
    social_website: '',
    featured: false,
  });

  // Load speaker data on mount
  useEffect(() => {
    async function loadSpeaker() {
      try {
        setLoading(true);

        const response = await fetch(`/api/admin/speakers/${id}`);
        const data = await response.json();

        if (!response.ok) {
          if (response.status === 404) {
            setNotFound(true);
            return;
          }
          throw new Error(data.error || 'Failed to load speaker');
        }

        setFormData(data.speaker || {});
      } catch (err: Error | unknown) {
        console.error('Error loading speaker:', err);
        const errorMessage = err instanceof Error ? err.message : 'Please try again.';
        setError('Failed to load speaker data. ' + errorMessage);
      } finally {
        setLoading(false);
      }
    }

    loadSpeaker();
  }, [id]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);

      // Validate required fields
      if (!formData.name) {
        setError('Speaker name is required');
        return;
      }

      // Update speaker via API
      const response = await fetch(`/api/admin/speakers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update speaker');
      }

      // Redirect to speakers list on success
      router.push('/admin/speakers');
    } catch (err: Error | unknown) {
      console.error('Error updating speaker:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError('Failed to update speaker. ' + errorMessage);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Loading speaker data...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Speaker Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The speaker you are looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/admin/speakers">
          <Button>Back to Speakers</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Edit Speaker</h1>
        <Link href="/admin/speakers">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      {error && (
        <div className="mb-4 bg-red-50 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-400 px-4 py-3 rounded relative">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 shadow overflow-hidden rounded-lg">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Preview */}
          {formData.avatar_url && (
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Image
                  src={formData.avatar_url}
                  alt={formData.name || 'Speaker avatar'}
                  className="h-32 w-32 rounded-full object-cover"
                  width={128}
                  height={128}
                />
              </div>
            </div>
          )}

          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name || ''}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-700 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="avatar_url"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Avatar URL
                </label>
                <input
                  type="url"
                  name="avatar_url"
                  id="avatar_url"
                  value={formData.avatar_url || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-700 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Job Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-700 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  value={formData.company || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-700 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:text-white sm:text-sm"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Bio
                </label>
                <textarea
                  name="bio"
                  id="bio"
                  rows={4}
                  value={formData.bio || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-700 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:text-white sm:text-sm"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  id="featured"
                  checked={formData.featured || false}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary focus:ring-primary border-slate-300 dark:border-slate-700 rounded"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 block text-sm text-slate-700 dark:text-slate-300"
                >
                  Featured Speaker
                </label>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
              Social Links
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="social_twitter"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Twitter URL
                </label>
                <input
                  type="url"
                  name="social_twitter"
                  id="social_twitter"
                  value={formData.social_twitter || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-700 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="social_github"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="social_github"
                  id="social_github"
                  value={formData.social_github || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-700 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="social_linkedin"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  name="social_linkedin"
                  id="social_linkedin"
                  value={formData.social_linkedin || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-700 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:text-white sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="social_website"
                  className="block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Personal Website
                </label>
                <input
                  type="url"
                  name="social_website"
                  id="social_website"
                  value={formData.social_website || ''}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-slate-300 dark:border-slate-700 shadow-sm focus:border-primary focus:ring-primary dark:bg-slate-700 dark:text-white sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <Link href="/admin/speakers">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Update Speaker'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
