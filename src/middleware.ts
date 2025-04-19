import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

export async function middleware(request: NextRequest) {
  try {
    // Allow /auth/* routes to bypass authentication
    if (request.nextUrl.pathname.startsWith("/auth")) {
      return await auth0.middleware(request);
    }

    if (request.nextUrl.pathname.startsWith("/devspot/pages")) {
      const session = await auth0.getSession(request);
      if (!session) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Rest of your middleware logic...
    return await auth0.middleware(request);
  } catch (error) {
    console.error("Error in middleware:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/devspot/pages/:path*", // protect a folder
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
