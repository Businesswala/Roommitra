import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from './utils/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

/**
 * Next.js Proxy/Middleware - Standardizing session & role-based routing
 */
export default async function proxy(request: NextRequest) {
  try {
    const supabaseResponse = await updateSession(request)
    
    // 2. Extract Auth Session for Role-Based Gating
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
    const role = user?.user_metadata?.role || 'USER'
    const path = request.nextUrl.pathname

    // 3. Routing Protection Engine
    
    // A. Guest Access Gating (If already logged in, move to dashboard)
    if (user && (path === '/login' || path === '/register')) {
      const target = role === 'ADMIN' ? '/admin/dashboard' : role === 'LISTER' ? '/lister/dashboard' : '/user/dashboard'
      return NextResponse.redirect(new URL(target, request.url))
    }

    // B. Protected Route Authorization (Gating by Sector)
    if (path.startsWith('/admin') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (path.startsWith('/lister') && role !== 'LISTER') {
      if (!user) return NextResponse.redirect(new URL('/login', request.url))
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (path.startsWith('/user') && !user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    return supabaseResponse
  } catch (error: any) {
    // If it's a redirect error from Next.js, we must propagate it
    if (error?.digest?.includes('NEXT_REDIRECT')) throw error;
    
    console.error("[PROXY CRITICAL FAULT]:", error);
    return NextResponse.next();
  }
}

// Ensure middleware applies to the correct paths
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
