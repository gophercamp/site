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
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSpeaker } from '../actions';

export default function NewSpeakerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Setup form with React Hook Form + Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
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

  // Handle image upload
  const handleImageChange = (url: string) => {
    setValue('avatar_url', url);
  };

  // Handle form submission
  const onSubmit = async (data: SpeakerFormData) => {
    try {
      setLoading(true);
      setError(null);
      // Use server action to create speaker
      const result = await createSpeaker(data);

      if (result.error) {
        throw new Error(result.error);
      }

      // Redirect to speakers list on success
      router.push('/admin/speakers');
    } catch (err: unknown) {
      console.error('Error adding speaker:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError('Failed to add speaker. ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Add New Speaker</h1>
        <Link href="/admin/speakers">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      {error && <FormError error={error} />}

      <div className="bg-white dark:bg-slate-800 shadow overflow-hidden rounded-lg">
        <form
          onSubmit={handleSubmit(data => onSubmit(data as SpeakerFormData))}
          className="p-6 space-y-6"
        >
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
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save Speaker'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
