import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set({ name, value, ...options }))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set({ name, value, ...options })
          )
        },
      },
    }
  )

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT USE getSession AS IT DOES NOT VERIFY TOKENS
  // ALWAYS USE getUser
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { pathname } = request.nextUrl

  // Protected Routes
  const isProtectedRoute = pathname.startsWith('/dashboard') || pathname.startsWith('/pending')

  if (isProtectedRoute && !user) {
    // If not authenticated, redirect to signin
    const url = request.nextUrl.clone()
    url.pathname = '/signin' // or whatever the auth path is
    return NextResponse.redirect(url)
  }

  // Redirect authenticated users away from auth pages
  const isAuthRoute = pathname === '/signin' || pathname === '/signup' || pathname === '/' || pathname === '/auth'

  if (isAuthRoute && user) {
    // Check user role/status if we need to route to pending vs dashboard
    const { data: profile } = await supabase
      .from("users")
      .select("is_approved, status, role")
      .eq("id", user.id)
      .single()

    const url = request.nextUrl.clone()
    
    if (profile?.role === "admin") {
      url.pathname = "/dashboard"
      return NextResponse.redirect(url)
    }

    if (!profile?.is_approved || profile?.status === "pending") {
      url.pathname = "/pending"
      return NextResponse.redirect(url)
    }

    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
