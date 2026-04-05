import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

/**
 * Antigravity Supabase Client
 * 
 * Provides a seamless connection to Supabase for Auth, Storage, and Real-time features.
 * Note: For server-side database queries, prioritize using 'db' (Prisma).
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
