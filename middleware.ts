import {
  clerkMiddleware,
  createRouteMatcher,
  redirectToSignIn
} from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher([
  '/organization(.*)',
  '/select-org',
]);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect() // Protect the routes
  }

  if (auth().userId && !isProtectedRoute(req)) {
    let path = '/select-org'

    if (auth().orgId) {
      path = `/organization/${auth().orgId}`
    }

    const orgSelection = new URL(path, req.url)
    return NextResponse.redirect(orgSelection)
  }
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};