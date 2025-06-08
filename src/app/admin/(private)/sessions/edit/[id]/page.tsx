'use client';

import {
  FormCheckbox,
  FormError,
  FormInput,
  FormSection,
  FormSelect,
  FormTextarea,
} from '@/components/forms';
import Button from '@/components/ui/Button';
import { SessionFormData, sessionSchema } from '@/lib/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAllSpeakers, getSession, updateSession, type Speaker } from '../../actions';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function EditSessionPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);

  // Setup form with React Hook Form + Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      title: '',
      description: '',
      speaker_id: '',
      start_time: '',
      end_time: '',
      location: '',
      session_type: '',
      difficulty_level: '',
      is_published: false,
    },
  });

  // Format datetime string for input field
  function formatDateTimeForInput(dateTimeStr: string): string {
    try {
      const date = new Date(dateTimeStr);
      // Format: YYYY-MM-DDThh:mm (required by datetime-local input)
      return date.toISOString().slice(0, 16);
    } catch {
      return '';
    }
  }

  // Load session and speakers data on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);

        // Load speakers for dropdown
        const speakersResult = await getAllSpeakers();
        if (!speakersResult.error) {
          setSpeakers(speakersResult.speakers || []);
        }

        // Load session data
        const result = await getSession(id);

        if (result.error) {
          if (result.error === 'Session not found') {
            setNotFound(true);
            return;
          }
          throw new Error(result.error);
        }

        // Format date-time strings for input fields
        const session = result.session;
        if (session) {
          // Format date-time strings for datetime-local inputs
          const formattedSession = {
            ...session,
            start_time: session.start_time ? formatDateTimeForInput(session.start_time) : '',
            end_time: session.end_time ? formatDateTimeForInput(session.end_time) : '',
          };

          // Reset form with loaded data
          reset(formattedSession);
        }
      } catch (err: unknown) {
        console.error('Error loading session:', err);
        const errorMessage = err instanceof Error ? err.message : 'Please try again.';
        setError('Failed to load session data. ' + errorMessage);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, reset]);

  // Handle form submission
  const onSubmit = async (data: SessionFormData) => {
    try {
      setSaving(true);
      setError(null);

      // Update session via server action
      const result = await updateSession(id, data);

      if (result.error) {
        throw new Error(result.error);
      }

      // Redirect to sessions list on success
      router.push('/admin/sessions');
    } catch (err: unknown) {
      console.error('Error updating session:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError('Failed to update session. ' + errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // Generate speaker options for dropdown
  const speakerOptions = [
    { value: '', label: '-- Select Speaker --' },
    ...speakers.map(speaker => ({
      value: speaker.id,
      label: speaker.name,
    })),
  ];

  // Generate session type options
  const sessionTypeOptions = [
    { value: '', label: '-- Select Type --' },
    { value: 'talk', label: 'Talk' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'panel', label: 'Panel Discussion' },
    { value: 'lightning', label: 'Lightning Talk' },
    { value: 'keynote', label: 'Keynote' },
  ];

  // Generate difficulty level options
  const difficultyOptions = [
    { value: '', label: '-- Select Level --' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
        <p className="mt-2 text-sm text-secondary">Loading session data...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-primary mb-4">Session Not Found</h1>
        <p className="text-secondary mb-8">
          The session you are looking for doesn&apos;t exist or has been removed.
        </p>
        <Link href="/admin/sessions">
          <Button>Back to Sessions</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Edit Session</h1>
        <Link href="/admin/sessions">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      {error && <FormError error={error} />}

      <div className="bg-[var(--bg-primary)] shadow overflow-hidden rounded-lg border border-[var(--border-color)]">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Basic Information */}
          <FormSection title="Basic Information">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <FormInput
                  label="Title"
                  type="text"
                  required
                  error={errors.title?.message}
                  {...register('title')}
                />
              </div>

              <div className="sm:col-span-2">
                <FormTextarea
                  label="Description"
                  rows={4}
                  error={errors.description?.message}
                  {...register('description')}
                />
              </div>

              <FormSelect
                label="Speaker"
                options={speakerOptions}
                error={errors.speaker_id?.message}
                {...register('speaker_id')}
              />

              <FormSelect
                label="Session Type"
                options={sessionTypeOptions}
                error={errors.session_type?.message}
                {...register('session_type')}
              />

              <FormSelect
                label="Difficulty Level"
                options={difficultyOptions}
                error={errors.difficulty_level?.message}
                {...register('difficulty_level')}
              />

              <FormInput
                label="Location"
                type="text"
                error={errors.location?.message}
                {...register('location')}
              />
            </div>
          </FormSection>

          {/* Schedule Information */}
          <FormSection title="Schedule Information">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormInput
                label="Start Date & Time"
                type="datetime-local"
                error={errors.start_time?.message}
                {...register('start_time')}
              />

              <FormInput
                label="End Date & Time"
                type="datetime-local"
                error={errors.end_time?.message}
                {...register('end_time')}
              />
            </div>
          </FormSection>

          {/* Publishing Options */}
          <div>
            <FormCheckbox
              label="Publish this session (will be visible on the public website)"
              error={errors.is_published?.message}
              {...register('is_published')}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-3">
            <Link href="/admin/sessions">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving...' : 'Update Session'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
