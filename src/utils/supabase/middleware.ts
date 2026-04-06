import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    console.warn("[MIDDLEWARE SESSION ERROR]: Missing Supabase Credentials. Bypassing session refresh.");
    return supabaseResponse;
  }

  const supabase = createServerClient(
    url,
    anonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            supabaseResponse = NextResponse.next({
              request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            )
          } catch (e) {
            // Safe to ignore in edge context
          }
        },
      },
    }
  )

  try {
    // refreshing the auth token
    await supabase.auth.getUser()
  } catch (e) {
    console.error("[MIDDLEWARE AUTH ERROR]:", e);
  }

  // protected routes logic could go here, but I'll keep it simple for now
  // and handle redirection in the root middleware file.

  return supabaseResponse
}
