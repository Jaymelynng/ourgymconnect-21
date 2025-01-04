import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pyyofjmqlosaejfuabcb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eW9mam1xbG9zYWVqZnVhYmNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3NjM3MjIsImV4cCI6MjA1MDMzOTcyMn0.yUHeb2z_IvGNgcOxdf9q4vqEi3LTjeRzLzqC0B2uN9I";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});