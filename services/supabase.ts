
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eellfwpysjdfeqfkfbig.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlbGxmd3B5c2pkZmVxZmtmYmlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMzExMzUsImV4cCI6MjA3OTkwNzEzNX0.os94hAP2KNs7jCG4PjrZPjZ8B-_AeMFVe4XIFdjV4hE';

export const supabase = createClient(supabaseUrl, supabaseKey);
