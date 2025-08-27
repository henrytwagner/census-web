import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const isLoggedIn = Boolean(req.cookies.get("ACCESS_TOKEN"));
    const { pathname } = req.nextUrl;

    if (pathname.startsWith("/dashboard") && !isLoggedIn) {
        const login = req.nextUrl.clone();
        login.pathname = "/login";
        login.searchParams.set("next", pathname);
        return NextResponse.redirect(login);
    }

    if (pathname === "" && !isLoggedIn) {
        const next = req.nextUrl.clone();
        next.pathname = "/login";
        return NextResponse.redirect(next);
    }

    if ((pathname === "/login" || pathname === "/register") && isLoggedIn) {
        const next = req.nextUrl.clone();
        next.pathname = "/";
        return NextResponse.redirect(next);
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login", "/register"],
};
