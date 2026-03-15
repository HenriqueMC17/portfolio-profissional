import { NextResponse } from 'next/server'
import { convexAuthNextjsMiddleware, createRouteMatcher, isAuthenticatedNextjs, nextjsMiddlewareRedirect } from "@convex-dev/auth/nextjs/server";

const locales = ['pt', 'en']
const defaultLocale = 'pt'

const isSignInPage = createRouteMatcher(["/pt/login", "/en/login"]);
const isProtectedRoute = createRouteMatcher(["/pt/admin", "/en/admin"]);

export const middleware = convexAuthNextjsMiddleware(async (request) => {
  const { pathname } = request.nextUrl
  
  // Check if there is any supported locale in the pathname
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )
 
  if (!pathnameHasLocale) {
    // Redirect if there is no locale
    request.nextUrl.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`
    return NextResponse.redirect(request.nextUrl)
  }

  const isAuthenticated = await isAuthenticatedNextjs();

  if (isSignInPage(request) && isAuthenticated) {
    return nextjsMiddlewareRedirect(request, `/${defaultLocale}/admin`);
  }
  if (isProtectedRoute(request) && !isAuthenticated) {
    return nextjsMiddlewareRedirect(request, `/${defaultLocale}/login`);
  }
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|txt|xml)$).*)',
  ],
}
