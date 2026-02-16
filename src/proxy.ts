import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PASSWORD_COOKIE = "site_access";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Permetti l'accesso alla pagina di login e alle API
  if (pathname === "/login" || pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  // Controlla se c'è il cookie di accesso
  const hasAccess = request.cookies.get(PASSWORD_COOKIE);

  if (!hasAccess) {
    // Reindirizza alla pagina di login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
