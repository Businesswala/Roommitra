import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.warn("[SUPABASE CLIENT ERROR]: Missing environment variables in browser context.");
    // Return a dummy client that will fail gracefully later rather than crashing the constructor
    return createBrowserClient("", "");
  }

  return createBrowserClient(url, anonKey);
}
