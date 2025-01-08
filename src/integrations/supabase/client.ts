import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pyyofjmqlosaejfuabcb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5eW9mam1xbG9zYWVqZnVhYmNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk2NzI0ODAsImV4cCI6MjAyNTI0ODQ4MH0.ZpDVgNQvd0kXeJQvFEUFhXkI4wQgz72ZeUWOY0-kR0Q';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);