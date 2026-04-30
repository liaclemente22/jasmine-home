import Link from "next/link";
import { Property } from "@/data/properties";

export default function PropertyCard({ property }: { property: Property }) {
    const url =
        property.type === "rent"
            ? `/rentals/${property.id}`
            : `/for-sale/${property.id}`;

    return (
        <Link
            href={url}
            className="group bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
            {/* Image */}
            <div
                className="relative h-60 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${property.images?.[0] || "/placeholder.jpg"})` }}
            >
                {/* Type Badge */}
                <span
                    className={`absolute top-4 left-4 text-white text-xs px-3 py-1 rounded-full tracking-wide ${property.type === "rent"
                        ? "bg-[var(--sage)]"
                        : "bg-[#7a8c7f]"
                        }`}
                >
                    {property.type === "rent" ? "For Rent" : "For Sale"}
                </span>

                {/* Status Badge */}
                <span
                    className={`absolute top-4 right-4 text-white text-xs px-3 py-1 rounded-full tracking-wide ${property.status === "available"
                        ? "bg-green-600"
                        : property.status === "reserved"
                            ? "bg-yellow-500"
                            : "bg-red-600"
                        }`}
                >
                    {property.status.charAt(0).toUpperCase() +
                        property.status.slice(1)}
                </span>
            </div>

            {/* Info */}
            <div className="p-6">
                <h3 className="font-semibold text-lg">
                    {property.title}
                </h3>

                <p className="text-sm text-[var(--muted)] mt-2">
                    {property.location} • {property.bedrooms} Beds • {property.area} sqm
                </p>

                <p className="mt-4 font-medium text-lg">
                    ₱{property.price.toLocaleString()}
                    {property.type === "rent" && " / month"}
                </p>
            </div>
        </Link>
    );
}