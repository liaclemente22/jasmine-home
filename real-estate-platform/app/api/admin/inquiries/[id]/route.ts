import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isAdminSessionValue } from "@/lib/admin-auth";
import { connectDB } from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";

function getSessionFromRequest(req: Request) {
    const cookieHeader = req.headers.get("cookie") || "";
    return cookieHeader
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith(`${ADMIN_COOKIE_NAME}=`))
        ?.split("=")[1];
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!isAdminSessionValue(getSessionFromRequest(req))) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { status } = (await req.json()) as { status?: string };

        if (!status || !["new", "contacted", "closed"].includes(status)) {
            return NextResponse.json(
                { success: false, error: "Invalid inquiry status" },
                { status: 400 }
            );
        }

        await connectDB();
        const inquiry = await Inquiry.findByIdAndUpdate(
            id,
            { status },
            { new: true, lean: true }
        );

        if (!inquiry) {
            return NextResponse.json({ success: false, error: "Inquiry not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, inquiry });
    } catch (error) {
        console.error("Inquiry PATCH error:", error);
        return NextResponse.json(
            { success: false, error: "Failed to update inquiry" },
            { status: 500 }
        );
    }
}
