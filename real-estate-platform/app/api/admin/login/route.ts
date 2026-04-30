import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isValidAdminCredentials } from "@/lib/admin-auth";

export async function POST(req: Request) {
    try {
        const { username, password } = (await req.json()) as {
            password: string;
            username: string;
        };

        if (!isValidAdminCredentials(username, password)) {
            return NextResponse.json(
                { success: false, error: "Invalid username or password" },
                { status: 401 }
            );
        }

        const response = NextResponse.json({ success: true });
        response.cookies.set({
            name: ADMIN_COOKIE_NAME,
            value: process.env.ADMIN_SESSION_SECRET!,
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 8,
        });

        return response;
    } catch (error) {
        console.error("Admin login error:", error);
        return NextResponse.json(
            { success: false, error: "Unable to log in" },
            { status: 500 }
        );
    }
}
