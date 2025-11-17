import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bxhkwzramensnxsckkbg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4aGt3enJhbWVuc254c2Nra2JnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzNDM2NDUsImV4cCI6MjA3ODkxOTY0NX0.O3EAHK9sT0WAnYo42E3RWmbF6UL2tcefhsAcBHpD-x4';

export const supabase = createClient(supabaseUrl, supabaseKey);
