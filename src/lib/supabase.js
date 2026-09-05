import { createClient } from '@supabase/supabase-js';

// Fallback to shared project credentials if .env.local is not present.
// The anon key is safe to include here — it is a public client key protected by Supabase RLS.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  || 'https://sqfknwqofkhuocoixauo.supabase.co';

const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxZmtud3FvZmtodW9jb2l4YXVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg1MzM0ODYsImV4cCI6MjEwNDEwOTQ4Nn0.tQ0eWrl0qD0SvmVsLhKz1_bClipvKOqxRW04TNXcRRQ';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
