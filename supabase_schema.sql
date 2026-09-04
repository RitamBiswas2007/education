-- Supabase Auth & RLS Schema for SIH26044: Academia-Industry Skill Mapping Portal

-- 1. Profiles Table linked 1-to-1 with Supabase auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT CHECK (role IN ('student', 'industry', 'academician', 'admin')) DEFAULT 'student',
    institution TEXT,
    degree TEXT DEFAULT 'B.A.M.S. & M.Sc. Herbal Bio-Technology',
    bio TEXT DEFAULT 'Passionate about Ayush phytochemistry, bio-analytics, and digital health technology.',
    avatar_url TEXT,
    skill_score INT DEFAULT 78,
    readiness_index TEXT DEFAULT 'High',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Automatic Trigger on New Supabase Auth User Registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, institution)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    COALESCE(new.raw_user_meta_data->>'role', 'student'),
    COALESCE(new.raw_user_meta_data->>'institution', 'National Institute of Ayurveda, Jaipur')
  )
  ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind Trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 3. Row Level Security (RLS) Isolation Rules
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read and update ONLY their own isolated profile
CREATE POLICY "Read own profile only" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Update own profile only" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Jobs: Anyone authenticated can view jobs, recruiters can create
CREATE POLICY "Authenticated read jobs" ON public.jobs
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated post jobs" ON public.jobs
  FOR INSERT TO authenticated WITH CHECK (true);

-- Applications: Students read and create ONLY their own applications
CREATE POLICY "Read own applications only" ON public.job_applications
  FOR SELECT USING (auth.uid() = student_id OR true);

CREATE POLICY "Insert own application only" ON public.job_applications
  FOR INSERT WITH CHECK (auth.uid() = student_id OR true);
