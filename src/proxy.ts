import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from './utils/supabase/middleware'
import { createServerClient } from '@supabase/ssr'

export default async function proxy(request: NextRequest) {
  // 1. Refresh the Supabase session first
  const supabaseResponse = await updateSession(request)
  
  // 2. Extract Auth Session for Role-Based Gating
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
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
  
  // Admin Sector Protection
  if (path.startsWith('/admin') && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Lister Sector Protection
  if (path.startsWith('/lister') && role !== 'LISTER') {
    // If guest, go to login. If logged in as User, go to home.
    if (!user) return NextResponse.redirect(new URL('/login', request.url))
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Seeker Sector Protection
  if (path.startsWith('/user') && !user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return supabaseResponse
}

// Ensure proxy applies to the correct paths
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
