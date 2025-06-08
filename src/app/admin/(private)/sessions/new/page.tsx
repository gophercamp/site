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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createSession, getAllSpeakers, Speaker } from '../actions';

export default function NewSessionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [loadingSpeakers, setLoadingSpeakers] = useState(true);

  // Setup form with React Hook Form + Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors },
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

  // Load speakers on page load for dropdown
  useEffect(() => {
    async function loadSpeakers() {
      try {
        setLoadingSpeakers(true);
        const result = await getAllSpeakers();

        if (result.error) {
          console.error('Error loading speakers:', result.error);
        } else {
          setSpeakers(result.speakers || []);
        }
      } catch (err) {
        console.error('Error loading speakers:', err);
      } finally {
        setLoadingSpeakers(false);
      }
    }

    loadSpeakers();
  }, []);

  // Handle form submission
  const onSubmit = async (data: SessionFormData) => {
    try {
      setLoading(true);
      setError(null);

      // Use server action to create session
      const result = await createSession(data);

      if (result.error) {
        throw new Error(result.error);
      }

      // Redirect to sessions list on success
      router.push('/admin/sessions');
    } catch (err: unknown) {
      console.error('Error adding session:', err);
      const errorMessage = err instanceof Error ? err.message : 'Please try again.';
      setError('Failed to add session. ' + errorMessage);
    } finally {
      setLoading(false);
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

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary">Add New Session</h1>
        <Link href="/admin/sessions">
          <Button variant="outline">Cancel</Button>
        </Link>
      </div>

      {error && <FormError error={error} />}

      <div className="bg-[var(--bg-primary)] shadow overflow-hidden rounded-lg border border-[var(--border-color)]">
        <form
          onSubmit={handleSubmit(data => onSubmit(data as SessionFormData))}
          className="p-6 space-y-6"
        >
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
                disabled={loadingSpeakers}
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
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Session'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
