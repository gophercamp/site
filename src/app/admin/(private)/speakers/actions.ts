'use server';

import { getSupabaseClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

// Type definitions
/**
 * Types for speakers management
 */
export interface Speaker {
  id: string;
  name: string;
  bio?: string;
  company?: string;
  title?: string;
  avatar_url?: string;
  social_twitter?: string;
  social_github?: string;
  social_linkedin?: string;
  social_website?: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

// Get all speakers
export async function getSpeakers(): Promise<{ speakers: Speaker[] | null; error: string | null }> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return { speakers: null, error: error.message };
    }

    return { speakers: data, error: null };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { speakers: null, error: errorMessage };
  }
}

// Get a specific speaker by ID
export async function getSpeaker(
  id: string
): Promise<{ speaker: Speaker | null; error: string | null }> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase.from('speakers').select('*').eq('id', id).single();

    if (error) {
      return {
        speaker: null,
        error: error.code === 'PGRST116' ? 'Speaker not found' : error.message,
      };
    }

    return { speaker: data, error: null };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { speaker: null, error: errorMessage };
  }
}

// Create a new speaker
export async function createSpeaker(
  speakerData: Partial<Speaker>
): Promise<{ speaker: Speaker | null; error: string | null }> {
  try {
    // Validate required fields
    if (!speakerData.name) {
      return { speaker: null, error: 'Speaker name is required' };
    }

    const supabase = getSupabaseClient();

    // Insert speaker into database
    const { data, error } = await supabase
      .from('speakers')
      .insert([
        {
          name: speakerData.name,
          bio: speakerData.bio || null,
          company: speakerData.company || null,
          title: speakerData.title || null,
          avatar_url: speakerData.avatar_url || null,
          social_twitter: speakerData.social_twitter || null,
          social_github: speakerData.social_github || null,
          social_linkedin: speakerData.social_linkedin || null,
          social_website: speakerData.social_website || null,
          featured: speakerData.featured || false,
        },
      ])
      .select();

    if (error) {
      return { speaker: null, error: error.message };
    }

    // Revalidate the speakers list page
    revalidatePath('/admin/speakers');

    return { speaker: data[0], error: null };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { speaker: null, error: errorMessage };
  }
}

// Update a speaker
export async function updateSpeaker(
  id: string,
  speakerData: Partial<Speaker>
): Promise<{ speaker: Speaker | null; error: string | null }> {
  try {
    // Validate required fields
    if (!speakerData.name) {
      return { speaker: null, error: 'Speaker name is required' };
    }

    const supabase = getSupabaseClient();

    // Update speaker in database
    const { data, error } = await supabase
      .from('speakers')
      .update({
        name: speakerData.name,
        bio: speakerData.bio || null,
        company: speakerData.company || null,
        title: speakerData.title || null,
        avatar_url: speakerData.avatar_url || null,
        social_twitter: speakerData.social_twitter || null,
        social_github: speakerData.social_github || null,
        social_linkedin: speakerData.social_linkedin || null,
        social_website: speakerData.social_website || null,
        featured: speakerData.featured || false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { speaker: null, error: error.message };
    }

    // Revalidate the speaker pages
    revalidatePath('/admin/speakers');
    revalidatePath(`/admin/speakers/edit/${id}`);

    return { speaker: data, error: null };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { speaker: null, error: errorMessage };
  }
}

// Delete a speaker
export async function deleteSpeaker(
  id: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = getSupabaseClient();

    const { error } = await supabase.from('speakers').delete().eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    // Revalidate the speakers list page
    revalidatePath('/admin/speakers');

    return { success: true, error: null };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}
