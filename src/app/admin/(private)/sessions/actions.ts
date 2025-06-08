'use server';

import { getSupabaseClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

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

/**
 * Types for sessions management
 */
export interface Session {
  id: string;
  title: string;
  description?: string;
  speaker_id?: string;
  start_time?: string;
  end_time?: string;
  location?: string;
  session_type?: string;
  difficulty_level?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  speaker?: Speaker;
}

// Get all sessions with speaker information
export async function getSessions(): Promise<{ sessions: Session[] | null; error: string | null }> {
  try {
    const supabase = getSupabaseClient();

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
      return { sessions: null, error: error.message };
    }

    return { sessions: data, error: null };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { sessions: null, error: errorMessage };
  }
}

// Get a specific session by ID with speaker information
export async function getSession(
  id: string
): Promise<{ session: Session | null; error: string | null }> {
  try {
    const supabase = getSupabaseClient();

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
      .eq('id', id)
      .single();

    if (error) {
      return {
        session: null,
        error: error.code === 'PGRST116' ? 'Session not found' : error.message,
      };
    }

    return { session: data, error: null };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { session: null, error: errorMessage };
  }
}

// Create a new session
export async function createSession(
  sessionData: Partial<Session>
): Promise<{ session: Session | null; error: string | null }> {
  try {
    // Validate required fields
    if (!sessionData.title) {
      return { session: null, error: 'Session title is required' };
    }

    const supabase = getSupabaseClient();

    // Insert session into database
    const { data, error } = await supabase
      .from('sessions')
      .insert([
        {
          title: sessionData.title,
          description: sessionData.description || null,
          speaker_id: sessionData.speaker_id || null,
          start_time: sessionData.start_time || null,
          end_time: sessionData.end_time || null,
          location: sessionData.location || null,
          session_type: sessionData.session_type || null,
          difficulty_level: sessionData.difficulty_level || null,
          is_published: sessionData.is_published || false,
        },
      ])
      .select();

    if (error) {
      return { session: null, error: error.message };
    }

    // Revalidate the sessions list page
    revalidatePath('/admin/sessions');

    return { session: data[0], error: null };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { session: null, error: errorMessage };
  }
}

// Update a session
export async function updateSession(
  id: string,
  sessionData: Partial<Session>
): Promise<{ session: Session | null; error: string | null }> {
  try {
    // Validate required fields
    if (!sessionData.title) {
      return { session: null, error: 'Session title is required' };
    }

    const supabase = getSupabaseClient();

    // Update session in database
    const { data, error } = await supabase
      .from('sessions')
      .update({
        title: sessionData.title,
        description: sessionData.description || null,
        speaker_id: sessionData.speaker_id || null,
        start_time: sessionData.start_time || null,
        end_time: sessionData.end_time || null,
        location: sessionData.location || null,
        session_type: sessionData.session_type || null,
        difficulty_level: sessionData.difficulty_level || null,
        is_published: sessionData.is_published || false,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
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
      .single();

    if (error) {
      return { session: null, error: error.message };
    }

    // Revalidate the session pages
    revalidatePath('/admin/sessions');
    revalidatePath(`/admin/sessions/edit/${id}`);

    return { session: data, error: null };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { session: null, error: errorMessage };
  }
}

// Delete a session
export async function deleteSession(
  id: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const supabase = getSupabaseClient();

    const { error } = await supabase.from('sessions').delete().eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    // Revalidate the sessions list page
    revalidatePath('/admin/sessions');

    return { success: true, error: null };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: errorMessage };
  }
}

// Get all speakers for dropdown selection
export async function getAllSpeakers(): Promise<{
  speakers: Speaker[] | null;
  error: string | null;
}> {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('speakers')
      .select('id, name, avatar_url')
      .order('name', { ascending: true });

    if (error) {
      return { speakers: null, error: error.message };
    }

    // Type assertion for the partial speaker data that's sufficient for dropdowns
    return { speakers: data as Speaker[], error: null };
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { speakers: null, error: errorMessage };
  }
}
