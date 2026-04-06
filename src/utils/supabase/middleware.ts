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

  try {
    const supabase = createServerClient(
      url,
      anonKey,
      {
        cookies: {
          getAll() {
            try {
              return request.cookies.getAll()
            } catch {
              return []
            }
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
              // Safe to ignore in certain edge contexts
            }
          },
        },
      }
    )

    // refreshing the auth token
    await supabase.auth.getUser()
  } catch (e) {
    console.error("[MIDDLEWARE AUTH CRITICAL FAULT]:", e);
  }

  return supabaseResponse
}
