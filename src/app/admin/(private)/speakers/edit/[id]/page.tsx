'use client';

import {
  FormCheckbox,
  FormError,
  FormInput,
  FormSection,
  FormTextarea,
  ImageUpload,
} from '@/components/forms';
import Button from '@/components/ui/Button';
import { SpeakerFormData, speakerSchema } from '@/lib/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getSpeaker, updateSpeaker } from '../../actions';

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

  // Setup form with React Hook Form + Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(speakerSchema),
    defaultValues: {
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
    },
  });

  // Current avatar URL value
  const avatarUrl = watch('avatar_url');

  // Load speaker data on mount
  useEffect(() => {
    async function loadSpeaker() {
      try {
        setLoading(true);

        const result = await getSpeaker(id);

        if (result.error) {
          if (result.error === 'Speaker not found') {
            setNotFound(true);
            return;
          }
          throw new Error(result.error);
        }

        // Reset form with speaker data
        if (result.speaker) {
          reset({
            name: result.speaker.name || '',
            bio: result.speaker.bio || '',
            company: result.speaker.company || '',
            title: result.speaker.title || '',
            avatar_url: result.speaker.avatar_url || '',
            social_twitter: result.speaker.social_twitter || '',
            social_github: result.speaker.social_github || '',
            social_linkedin: result.speaker.social_linkedin || '',
            social_website: result.speaker.social_website || '',
            featured: result.speaker.featured || false,
          });
        }
      } catch (err: unknown) {
        console.error('Error loading speaker:', err);
        const errorMessage = err instanceof Error ? err.message : 'Please try again.';
        setError('Failed to load speaker data. ' + errorMessage);
      } finally {
        setLoading(false);
      }
    }

    loadSpeaker();
  }, [id, reset]);

  // Handle image upload
  const handleImageChange = (url: string) => {
    setValue('avatar_url', url);
  };

  // Handle form submission
  const onSubmit = async (data: SpeakerFormData) => {
    try {
      setSaving(true);
      setError(null);

      // Update speaker via server action
      const result = await updateSpeaker(id, data);

      if (result.error) {
        throw new Error(result.error);
      }

      // Redirect to speakers list on success
      router.push('/admin/speakers');
    } catch (err: unknown) {
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
        <p className="mt-2 text-sm text-secondary">Loading speaker data...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-primary mb-4">Speaker Not Found</h1>
        <p className="text-secondary mb-8">
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
        <h1 className="text-3xl font-bold text-primary">Edit Speaker</h1>
        <Link href="/admin/speakers">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      {error && <FormError error={error} />}

      <div className="bg-[var(--bg-primary)] shadow overflow-hidden rounded-lg border border-[var(--border-color)]">
        <form
          onSubmit={handleSubmit(data => onSubmit(data as SpeakerFormData))}
          className="p-6 space-y-6"
        >
          {/* Preview */}
          {avatarUrl && (
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Image
                  src={avatarUrl}
                  alt="Speaker avatar"
                  className="h-32 w-32 rounded-full object-cover"
                  width={128}
                  height={128}
                />
              </div>
            </div>
          )}

          {/* Basic Information */}
          <FormSection title="Basic Information">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormInput
                label="Name"
                type="text"
                required
                error={errors.name?.message}
                {...register('name')}
              />

              <div className="sm:col-span-1">
                <ImageUpload
                  label="Speaker Photo"
                  name="avatar_url"
                  value={avatarUrl}
                  onChange={handleImageChange}
                  error={errors.avatar_url?.message}
                  bucketName="speakers"
                  folderPath="avatars"
                />
              </div>

              <FormInput
                label="Job Title"
                type="text"
                error={errors.title?.message}
                {...register('title')}
              />

              <FormInput
                label="Company"
                type="text"
                error={errors.company?.message}
                {...register('company')}
              />

              <div className="sm:col-span-2">
                <FormTextarea
                  label="Bio"
                  rows={4}
                  error={errors.bio?.message}
                  {...register('bio')}
                />
              </div>

              <div className="sm:col-span-1">
                <FormCheckbox
                  label="Featured Speaker"
                  error={errors.featured?.message}
                  {...register('featured')}
                />
              </div>
            </div>
          </FormSection>

          {/* Social Links */}
          <FormSection title="Social Links">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormInput
                label="Twitter URL"
                type="url"
                error={errors.social_twitter?.message}
                {...register('social_twitter')}
              />

              <FormInput
                label="GitHub URL"
                type="url"
                error={errors.social_github?.message}
                {...register('social_github')}
              />

              <FormInput
                label="LinkedIn URL"
                type="url"
                error={errors.social_linkedin?.message}
                {...register('social_linkedin')}
              />

              <FormInput
                label="Personal Website"
                type="url"
                error={errors.social_website?.message}
                {...register('social_website')}
              />
            </div>
          </FormSection>

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
