'use client';

import { z } from 'zod';

// Speaker validation schema
export const speakerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  avatar_url: z.string().optional(),
  social_twitter: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  social_github: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  social_linkedin: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  social_website: z.string().url('Please enter a valid URL').optional().or(z.literal('')),
  featured: z.boolean().default(false),
});

export type SpeakerFormData = z.infer<typeof speakerSchema>;

// Session validation schema
export const sessionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  speaker_id: z.string().optional(),
  start_time: z.string().optional(),
  end_time: z
    .string()
    .optional()
    .refine(value => !value || !value.startsWith('') || value, 'End time must be after start time'),
  location: z.string().optional(),
  session_type: z.string().optional(),
  difficulty_level: z.string().optional(),
  is_published: z.boolean().default(false),
});

export type SessionFormData = z.infer<typeof sessionSchema>;
