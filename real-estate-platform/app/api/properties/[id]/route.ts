import { NextResponse } from "next/server";
import { deleteProperty, getPropertyById, updateProperty } from "@/lib/property-service";
import type { Property } from "@/data/properties";
import { ADMIN_COOKIE_NAME, isAdminSessionValue } from "@/lib/admin-auth";

function getSessionFromRequest(req: Request) {
    const cookieHeader = req.headers.get("cookie") || "";
    return cookieHeader
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith(`${ADMIN_COOKIE_NAME}=`))
        ?.split("=")[1];
}

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const property = await getPropertyById(id);

        if (!property) {
            return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, property });
    } catch (error) {
        console.error("Property GET error:", error);
        return NextResponse.json({ success: false, error: "Failed to load property" }, { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!isAdminSessionValue(getSessionFromRequest(req))) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;
        const body = (await req.json()) as Partial<Property>;
        const property = await updateProperty(id, body);

        if (!property) {
            return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, property });
    } catch (error) {
        console.error("Property PATCH error:", error);
        return NextResponse.json({ success: false, error: "Failed to update property" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!isAdminSessionValue(getSessionFromRequest(req))) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { id } = await params;
        const property = await deleteProperty(id);

        if (!property) {
            return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, property });
    } catch (error) {
        console.error("Property DELETE error:", error);
        return NextResponse.json({ success: false, error: "Failed to delete property" }, { status: 500 });
    }
}
