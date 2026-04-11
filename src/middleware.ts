import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from './utils/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

/**
 * Next.js Proxy/Middleware - Standardizing session & role-based routing
 */
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // 1. Absolute Bypass for Infrastructure & API
  // 1. Absolute Infrastructure & API Bypass
  // We skip auth logic for POST (Server Actions) and API to prevent Edge runtime crashes.
  if (
    path.startsWith('/_next') || 
    path.startsWith('/api') || 
    request.method === 'POST' ||
    path.includes('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  try {
    const supabaseResponse = await updateSession(request)
    
    // 2. Auth Session Handshake
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !anonKey) {
      return supabaseResponse;
    }

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
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()
    // Strict identity check: user must have an ID to be considered 'logged in'
    const isLoggedIn = !!user?.id;
    const role = user?.user_metadata?.role || 'USER'

    // 3. Routing Protection Grid
    
    // Strict Guest Access Gating - Ensure no active session redirects immediately
    if (path.startsWith('/user') || path.startsWith('/lister') || path.startsWith('/admin')) {
      if (!isLoggedIn) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    if (isLoggedIn && (path === '/login')) {
      const target = role === 'ADMIN' ? '/admin/dashboard' : role === 'LISTER' ? '/lister/dashboard' : '/user/dashboard'
      return NextResponse.redirect(new URL(target, request.url))
    }

    if (path === '/register') {
      return supabaseResponse;
    }

    // Shielding dashboards from incorrect roles
    if (path.startsWith('/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/user/dashboard', request.url))
    }

    if (path.startsWith('/lister') && role !== 'LISTER') {
      return NextResponse.redirect(new URL('/user/dashboard', request.url))
    }

    return supabaseResponse
  } catch (error: any) {
    if (error?.digest?.includes('NEXT_REDIRECT')) throw error;
    console.error("[MIDDLEWARE CRITICAL FAULT]:", error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// Ensure middleware applies to the correct paths
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
