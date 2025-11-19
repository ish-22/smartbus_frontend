import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes for each role
const roleRoutes = {
  admin: ['/admin'],
  owner: ['/owner'],
  driver: ['/driver'],
  passenger: ['/passenger']
}

// Public routes that don't require authentication
const publicRoutes = ['/', '/auth/login', '/auth/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  // Check if user is authenticated (simplified - in real app, verify JWT)
  const userRole = request.cookies.get('userRole')?.value
  
  if (!userRole) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Check role-based access
  for (const [role, routes] of Object.entries(roleRoutes)) {
    if (routes.some(route => pathname.startsWith(route))) {
      if (userRole !== role) {
        // Redirect to appropriate dashboard if wrong role
        return NextResponse.redirect(new URL(`/${userRole}`, request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
