import type { MetadataRoute } from "next";
import { getAllProperties } from "@/lib/property-service";
import { getSiteUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = getSiteUrl();
    const staticRoutes = [
        "",
        "/listings",
        "/rentals",
        "/for-sale",
        "/about",
        "/brokers",
        "/contact",
        "/faq",
        "/privacy-policy",
        "/terms",
        "/list-your-property",
    ];

    const properties = await getAllProperties();

    const propertyRoutes = properties.map((property) => ({
        url: `${baseUrl}${property.type === "rent" ? "/rentals" : "/for-sale"}/${property.id}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: property.featured ? 0.9 : 0.7,
    }));

    return [
        ...staticRoutes.map((route, index) => ({
            url: `${baseUrl}${route}`,
            lastModified: new Date(),
            changeFrequency: route === "" ? "weekly" as const : "monthly" as const,
            priority: index === 0 ? 1 : 0.8,
        })),
        ...propertyRoutes,
    ];
}
