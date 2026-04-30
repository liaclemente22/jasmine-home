import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
        return NextResponse.next();
    }

    const session = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const expected = process.env.ADMIN_SESSION_SECRET;

    if (!expected || session !== expected) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*"],
};
