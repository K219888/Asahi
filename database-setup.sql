-- Database setup for My SaaS App
-- Run this in your Supabase SQL Editor

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT,
  has_active_subscription BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create saved_chats table
CREATE TABLE IF NOT EXISTS saved_chats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sender TEXT NOT NULL,
  text TEXT NOT NULL,
  folder_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Create ebooks table
CREATE TABLE IF NOT EXISTS ebooks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE ebooks ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies
-- Profiles: Users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Saved chats: Users can only see their own chats
CREATE POLICY "Users can view own saved chats" ON saved_chats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved chats" ON saved_chats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved chats" ON saved_chats
  FOR DELETE USING (auth.uid() = user_id);

-- Ebooks: Everyone can read ebooks (for now)
ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Everyone can read ebooks" ON public.ebooks;

CREATE POLICY "Everyone can read ebooks"
  ON public.ebooks
  FOR SELECT
  TO anon
  USING (true);

-- 6. Insert some sample ebooks
INSERT INTO ebooks (title, subtitle, content, author, slug) VALUES
(
  'The Art of Mindfulness',
  'Finding Peace in a Busy World',
  '<h1>The Art of Mindfulness</h1>
   <p>Mindfulness is the practice of being present in the moment, without judgment. It is a simple yet powerful tool that can help you reduce stress, improve focus, and find inner peace.</p>
   <h2>What is Mindfulness?</h2>
   <p>Mindfulness is the basic human ability to be fully present, aware of where we are and what we''re doing, and not overly reactive or overwhelmed by what''s going on around us.</p>
   <h2>Benefits of Mindfulness</h2>
   <ul>
     <li>Reduces stress and anxiety</li>
     <li>Improves focus and concentration</li>
     <li>Enhances emotional regulation</li>
     <li>Promotes better sleep</li>
     <li>Increases self-awareness</li>
   </ul>
   <h2>Getting Started</h2>
   <p>Start with just 5 minutes a day. Find a quiet place, sit comfortably, and focus on your breath. When your mind wanders, gently bring it back to your breath.</p>',
  'Dr. Sarah Johnson',
  'art-of-mindfulness'
),
(
  'Digital Minimalism',
  'Choosing a Focused Life in a Noisy World',
  '<h1>Digital Minimalism</h1>
   <p>Digital minimalism is a philosophy that helps you question what digital communication tools (and behaviors surrounding these tools) add the most value to your life.</p>
   <h2>The Problem with Digital Clutter</h2>
   <p>We''re constantly bombarded with notifications, emails, and social media updates. This digital noise can lead to stress, anxiety, and decreased productivity.</p>
   <h2>Principles of Digital Minimalism</h2>
   <ol>
     <li>Clutter is costly</li>
     <li>Optimization is important</li>
     <li>Intentionality is satisfying</li>
   </ol>
   <h2>Practical Steps</h2>
   <p>Start by auditing your digital life. Identify which apps and tools truly add value, and eliminate the rest. Set boundaries for your digital usage.</p>',
  'Cal Newport',
  'digital-minimalism'
);

-- 7. Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, username)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'username');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
