
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://emryofyuawtlhdhjzorh.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtcnlvZnl1YXd0bGhkaGp6b3JoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMjI1MTgsImV4cCI6MjA1Mjc5ODUxOH0.F2gxwqlfLIq6SFFdl9PYDvdelAou8cRmRAv_7e8WA8M";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: 'ourgymconnect.auth.token'
  }
});
