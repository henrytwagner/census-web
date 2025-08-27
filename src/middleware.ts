import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const isLoggedIn = Boolean(req.cookies.get("ACCESS_TOKEN"));
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/c") || pathname.startsWith("/o") && !isLoggedIn) {
        const login = req.nextUrl.clone();
        login.pathname = "/login";
        login.searchParams.set("next", pathname);
        return NextResponse.redirect(login);
    }

    if ((pathname === "/login" || pathname === "/register") && isLoggedIn) {
        const next = req.nextUrl.clone();
        next.pathname = "/c";
        return NextResponse.redirect(next);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register"],
};
