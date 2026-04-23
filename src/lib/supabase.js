import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials are missing. Please check your .env file.')
}

export const supabase = createClient(
    supabaseUrl || 'https://izqxsfuyibbzwdxdcmev.supabase.co',
    supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6cXhzZnV5aWJiendkeGRjbWV2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0Mzg5MTAsImV4cCI6MjA5MjAxNDkxMH0.74Kiivvw-1KesGCdkI42QJPjADD1K3Eihi1nna8FkLM'
)

