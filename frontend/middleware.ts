import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher([
  '/user',
  '/sign-up/aftersignup',
  '/dashboard',
  '/search/hotels/:hid*'
  
]);

export default clerkMiddleware(async (auth, req) => {
  // Check if the route is protected
  if (isProtectedRoute(req)) {
    // Wait for auth() to resolve and get the userId
    const { userId } = await auth();

    // If not authenticated, protect the route (redirect to sign-in)
    if (!userId) {
      // Prevent redirect loops by checking if we're already on the sign-in page
      const currentUrl = req.nextUrl.pathname;
      if (!currentUrl.includes('/sign-in')) {
        // Call auth.protect directly as recommended
        await auth.protect(); // Redirect to the sign-in page
      }
    }
  }
  
  // If everything is fine, continue the request by returning `undefined`
  return undefined;
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)','/:path*', ],
};
