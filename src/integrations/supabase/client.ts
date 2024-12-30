import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pyyofjmqlosaejfuabcb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eW9mam1xbG9zYWVqZnVhYmNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM3NjQ4NzcsImV4cCI6MjAxOTM0MDg3N30.vxMKQYvhJqL0qKqNX5fMqKEHHxZ_GQBxYGwqt3Xs4N4';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    flowType: 'pkce',
  },
});