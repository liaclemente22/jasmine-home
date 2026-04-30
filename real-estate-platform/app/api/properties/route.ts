import { NextResponse } from "next/server";
import {
    createProperty,
    getAllProperties,
    type PropertyFilters,
} from "@/lib/property-service";
import type { Property } from "@/data/properties";
import { isAdminSessionValue, ADMIN_COOKIE_NAME } from "@/lib/admin-auth";

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const filters: PropertyFilters = {};

        const type = searchParams.get("type");
        const status = searchParams.get("status");
        const location = searchParams.get("location");
        const search = searchParams.get("search");
        const sort = searchParams.get("sort");
        const featured = searchParams.get("featured");
        const bedrooms = searchParams.get("bedrooms");
        const maxPrice = searchParams.get("maxPrice");

        if (type === "rent" || type === "sale") filters.type = type;
        if (status === "available" || status === "sold" || status === "reserved") filters.status = status;
        if (location) filters.location = location;
        if (search) filters.search = search;
        if (sort === "priceLowHigh" || sort === "priceHighLow" || sort === "bedrooms") {
            filters.sort = sort;
        }
        if (featured === "true") filters.featured = true;
        if (featured === "false") filters.featured = false;
        if (bedrooms) filters.bedrooms = Number(bedrooms);
        if (maxPrice) filters.maxPrice = Number(maxPrice);

        const properties = await getAllProperties(filters);
        return NextResponse.json({ success: true, properties });
    } catch (error) {
        console.error("Properties GET error:", error);
        return NextResponse.json({ success: false, error: "Failed to load properties" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const cookieHeader = req.headers.get("cookie") || "";
        const sessionValue = cookieHeader
            .split(";")
            .map((part) => part.trim())
            .find((part) => part.startsWith(`${ADMIN_COOKIE_NAME}=`))
            ?.split("=")[1];

        if (!isAdminSessionValue(sessionValue)) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const body = (await req.json()) as Property;
        const property = await createProperty({
            ...body,
            id: body.id?.trim() || slugify(body.title),
        });
        return NextResponse.json({ success: true, property }, { status: 201 });
    } catch (error) {
        console.error("Properties POST error:", error);
        return NextResponse.json({ success: false, error: "Failed to create property" }, { status: 500 });
    }
}
