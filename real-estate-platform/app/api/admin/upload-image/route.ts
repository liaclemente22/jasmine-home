import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, isAdminSessionValue } from "@/lib/admin-auth";
import { getCloudinaryConfig, signCloudinaryParams } from "@/lib/cloudinary";

function getSessionFromRequest(req: Request) {
    const cookieHeader = req.headers.get("cookie") || "";
    return cookieHeader
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith(`${ADMIN_COOKIE_NAME}=`))
        ?.split("=")[1];
}

export async function POST(req: Request) {
    try {
        if (!isAdminSessionValue(getSessionFromRequest(req))) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const formData = await req.formData();
        const file = formData.get("file");
        const propertyId = String(formData.get("propertyId") || "unassigned").trim();

        if (!(file instanceof File)) {
            return NextResponse.json(
                { success: false, error: "No image file provided" },
                { status: 400 }
            );
        }

        const { cloudName, apiKey } = getCloudinaryConfig();
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const folder = `jasmine-home/properties/${propertyId || "unassigned"}`;
        const signature = signCloudinaryParams({ folder, timestamp });

        const bytes = await file.arrayBuffer();
        const base64 = Buffer.from(bytes).toString("base64");
        const dataUri = `data:${file.type};base64,${base64}`;

        const uploadPayload = new URLSearchParams();
        uploadPayload.set("file", dataUri);
        uploadPayload.set("api_key", apiKey);
        uploadPayload.set("timestamp", timestamp);
        uploadPayload.set("folder", folder);
        uploadPayload.set("signature", signature);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: "POST",
                body: uploadPayload,
            }
        );

        const result = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                {
                    success: false,
                    error: result?.error?.message || "Failed to upload image",
                },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            imageUrl: result.secure_url,
            publicId: result.public_id,
        });
    } catch (error) {
        console.error("Admin upload image error:", error);
        return NextResponse.json(
            { success: false, error: "Unable to upload image" },
            { status: 500 }
        );
    }
}
