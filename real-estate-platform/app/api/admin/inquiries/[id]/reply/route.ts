import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ADMIN_COOKIE_NAME, isAdminSessionValue } from "@/lib/admin-auth";
import { connectDB } from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";

const resend = new Resend(process.env.RESEND_API_KEY);

function getSessionFromRequest(req: Request) {
    const cookieHeader = req.headers.get("cookie") || "";
    return cookieHeader
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith(`${ADMIN_COOKIE_NAME}=`))
        ?.split("=")[1];
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!isAdminSessionValue(getSessionFromRequest(req))) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const { message, subject } = (await req.json()) as {
            message?: string;
            subject?: string;
        };

        if (!message?.trim()) {
            return NextResponse.json(
                { success: false, error: "Reply message is required" },
                { status: 400 }
            );
        }

        await connectDB();
        const inquiry = await Inquiry.findById(id);

        if (!inquiry) {
            return NextResponse.json({ success: false, error: "Inquiry not found" }, { status: 404 });
        }

        await resend.emails.send({
            from: "Jasmine Home <onboarding@resend.dev>",
            to: inquiry.email,
            subject: `Re: ${subject || inquiry.subject || "Your Jasmine Home inquiry"}`,
            html: `
                <p>Hello ${inquiry.name},</p>
                <p style="white-space: pre-line;">${message.trim()}</p>
                <p>Warm regards,<br />Jasmine Home</p>
            `,
        });

        inquiry.status = "contacted";
        inquiry.lastResponseMessage = message.trim();
        inquiry.lastRespondedAt = new Date();
        await inquiry.save();

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Inquiry reply error:", error);
        return NextResponse.json(
            { success: false, error: "Unable to send reply" },
            { status: 500 }
        );
    }
}
