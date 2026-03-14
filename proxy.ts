import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'

export async function proxy(request: NextRequest) {
  const { user, response } = await updateSession(request)

  const pathname = request.nextUrl.pathname

  // Define protected routes (e.g., dashboard, profile)
  const protectedRoutes = ['/dashboard', '/profile'] // Add your protected routes here
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // If not authenticated, redirect to /auth
  if (isProtectedRoute && !user) {
    const url = request.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  const isAuthRoute = pathname === '/auth' || pathname === '/signup'
  if (isAuthRoute && user) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard' // Or wherever authenticated users should go
    return NextResponse.redirect(url)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
