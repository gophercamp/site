import { getSupabaseClient } from '@/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('speakers')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ speakers: data });
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name) {
      return NextResponse.json({ error: 'Speaker name is required' }, { status: 400 });
    }

    const supabase = getSupabaseClient();

    // Insert speaker into database
    const { data, error } = await supabase
      .from('speakers')
      .insert([
        {
          name: body.name,
          bio: body.bio || null,
          company: body.company || null,
          title: body.title || null,
          avatar_url: body.avatar_url || null,
          social_twitter: body.social_twitter || null,
          social_github: body.social_github || null,
          social_linkedin: body.social_linkedin || null,
          social_website: body.social_website || null,
          featured: body.featured || false,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ speaker: data[0] }, { status: 201 });
  } catch (error: Error | unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
