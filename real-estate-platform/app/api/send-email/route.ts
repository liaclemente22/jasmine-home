import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connectDB } from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";

const resend = new Resend(process.env.RESEND_API_KEY);

type InquiryType = "contact" | "property" | "submission";

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as {
            email?: string;
            inquiryType?: InquiryType;
            message?: string;
            name?: string;
            propertyTitle?: string;
            subject?: string;
        };

        const { name, email, message, subject, propertyTitle } = body;
        const inquiryType = body.inquiryType ?? "contact";

        if (!name || !email || !message || !subject) {
            return NextResponse.json(
                { success: false, error: "Missing required inquiry details" },
                { status: 400 }
            );
        }

        await connectDB();

        await Inquiry.create({
            name,
            email,
            message,
            property: propertyTitle,
            subject,
            type: inquiryType,
            status: "new",
        });

        await resend.emails.send({
            from: "Jasmine Home <onboarding@resend.dev>",
            to: "liaalmideclemente@gmail.com",
            subject,
            html: `
                <h2>New Message</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Type:</strong> ${inquiryType}</p>
                ${propertyTitle ? `<p><strong>Property:</strong> ${propertyTitle}</p>` : ""}
                <p style="white-space: pre-line;">${message}</p>
            `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Inquiry send error:", error);
        return NextResponse.json(
            { success: false, error: "Unable to send inquiry" },
            { status: 500 }
        );
    }
}
