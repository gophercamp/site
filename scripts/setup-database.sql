-- Copy and paste this script into the SQL Editor in your Supabase dashboard
-- to set up the database schema manually if you're unable to use the
-- setup-database.ts Node.js script.

-- Enable UUID extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===============================
-- SPEAKERS TABLE
-- ===============================
CREATE TABLE IF NOT EXISTS public.speakers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name TEXT NOT NULL,
  bio TEXT,
  company TEXT,
  title TEXT,
  avatar_url TEXT,
  social_twitter TEXT,
  social_github TEXT,
  social_linkedin TEXT,
  social_website TEXT,
  featured BOOLEAN DEFAULT FALSE
);

-- Enable RLS for speakers table
ALTER TABLE public.speakers ENABLE ROW LEVEL SECURITY;

-- Create policies for speakers
DROP POLICY IF EXISTS "Public speakers are viewable by everyone" ON public.speakers;
CREATE POLICY "Public speakers are viewable by everyone"
ON public.speakers
FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Speakers are editable by authenticated users only" ON public.speakers;
CREATE POLICY "Speakers are editable by authenticated users only"
ON public.speakers
FOR INSERT WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Speakers are editable by authenticated users only" ON public.speakers;
CREATE POLICY "Speakers are editable by authenticated users only"
ON public.speakers
FOR UPDATE USING ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Speakers are deletable by authenticated users only" ON public.speakers;
CREATE POLICY "Speakers are deletable by authenticated users only"
ON public.speakers
FOR DELETE USING ((select auth.uid()) IS NOT NULL);

-- ===============================
-- SESSIONS TABLE
-- ===============================
CREATE TABLE IF NOT EXISTS public.sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  description TEXT,
  speaker_id UUID REFERENCES public.speakers(id),
  start_time TIMESTAMP WITH TIME ZONE,
  end_time TIMESTAMP WITH TIME ZONE,
  location TEXT,
  session_type TEXT, -- e.g. 'talk', 'workshop', 'panel'
  difficulty_level TEXT, -- e.g. 'beginner', 'intermediate', 'advanced'
  is_published BOOLEAN DEFAULT FALSE
);

-- Enable RLS for sessions table
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for sessions
DROP POLICY IF EXISTS "Public sessions are viewable by everyone" ON public.sessions;
CREATE POLICY "Public sessions are viewable by everyone"
ON public.sessions
FOR SELECT USING (is_published = TRUE);

DROP POLICY IF EXISTS "All sessions are viewable by authenticated users" ON public.sessions;
CREATE POLICY "All sessions are viewable by authenticated users"
ON public.sessions
FOR SELECT USING ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Sessions are editable by authenticated users only" ON public.sessions;
CREATE POLICY "Sessions are editable by authenticated users only"
ON public.sessions
FOR INSERT WITH CHECK ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Sessions are editable by authenticated users only" ON public.sessions;
CREATE POLICY "Sessions are editable by authenticated users only"
ON public.sessions
FOR UPDATE USING ((select auth.uid()) IS NOT NULL);

DROP POLICY IF EXISTS "Sessions are deletable by authenticated users only" ON public.sessions;
CREATE POLICY "Sessions are deletable by authenticated users only"
ON public.sessions
FOR DELETE USING ((select auth.uid()) IS NOT NULL);

-- ===============================
-- NEWSLETTER SUBSCRIBERS TABLE
-- ===============================
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed BOOLEAN DEFAULT FALSE,
  confirmation_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  confirmed_at TIMESTAMP WITH TIME ZONE,
  ip_address TEXT,
  user_agent TEXT,
  unsubscribed BOOLEAN DEFAULT FALSE,
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  unsubscribe_token TEXT UNIQUE
);

-- Enable RLS for newsletter subscribers table
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows only server-side operations
-- (using the service role key - no client-side access)
DROP POLICY IF EXISTS "Server-side operations only" ON public.newsletter_subscribers;
CREATE POLICY "Server-side operations only"
ON public.newsletter_subscribers
FOR ALL
TO authenticated
USING ((select auth.uid()) IS NOT NULL);

-- Create an index on the email field for faster lookups
CREATE INDEX IF NOT EXISTS newsletter_subscribers_email_idx ON public.newsletter_subscribers (email);

-- Create an index on the unsubscribe_token field for faster lookups
CREATE INDEX IF NOT EXISTS newsletter_subscribers_unsubscribe_token_idx ON public.newsletter_subscribers (unsubscribe_token);

-- ===============================
-- TRIGGERS FOR UPDATING THE updated_at FIELD
-- ===============================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for speakers table
DROP TRIGGER IF EXISTS update_speakers_updated_at ON public.speakers;
CREATE TRIGGER update_speakers_updated_at
BEFORE UPDATE ON public.speakers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Trigger for sessions table
DROP TRIGGER IF EXISTS update_sessions_updated_at ON public.sessions;
CREATE TRIGGER update_sessions_updated_at
BEFORE UPDATE ON public.sessions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- Report successful completion
DO $$
BEGIN
  RAISE NOTICE 'Database setup completed successfully';
END $$;
