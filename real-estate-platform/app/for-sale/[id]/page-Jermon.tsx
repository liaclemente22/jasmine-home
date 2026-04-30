import { properties } from "@/data/properties";
import PropertyGallery from "@/components/PropertyGallery";

export default async function SaleDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const property = properties.find(
        (p) => p.id === id && p.type === "sale"
    );

    if (!property) {
        return (
            <main className="pt-32 text-center">
                <h1 className="text-2xl">Property not found.</h1>
            </main>
        );
    }

    return (
        <main className="pt-28 bg-[var(--background)] min-h-screen">
            {/* Hero */}
            <section className="relative">
                <PropertyGallery
                    images={property.images}
                    title={property.title}
                />

                {property.status === "sold" && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center pointer-events-none">
                        <span className="text-white text-5xl font-serif tracking-widest">
                            SOLD
                        </span>
                    </div>
                )}
            </section>

            {/* Content */}
            <section className="px-8 py-20">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-16">
                    {/* Left */}
                    <div className="lg:col-span-2">
                        <span
                            className={`inline-block text-white text-xs px-3 py-1 rounded-full mb-4 tracking-wide ${property.status === "available"
                                ? "bg-green-600"
                                : property.status === "reserved"
                                    ? "bg-yellow-500"
                                    : "bg-red-600"
                                }`}
                        >
                            {property.status.charAt(0).toUpperCase() +
                                property.status.slice(1)}
                        </span>

                        <h1 className="font-serif text-4xl mb-4">
                            {property.title}
                        </h1>

                        <p className="text-[var(--muted)] mb-8">
                            {property.bedrooms} Beds • {property.bathrooms} Bath •{" "}
                            {property.area} sqm
                        </p>

                        <p className="text-[var(--muted)] leading-relaxed">
                            {property.description}
                        </p>
                    </div>

                    {/* Sidebar */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 h-fit lg:sticky lg:top-28">
                        <p className="text-3xl font-medium mb-6">
                            ₱{property.price.toLocaleString()}
                        </p>

                        {property.status === "sold" ? (
                            <button
                                disabled
                                className="w-full bg-gray-300 text-gray-600 py-3 rounded-full mb-4 cursor-not-allowed"
                            >
                                Property Sold
                            </button>
                        ) : (
                            <button className="w-full bg-sage text-white py-3 rounded-full mb-4 hover:opacity-90 transition">
                                Request Viewing
                            </button>
                        )}

                        {property.status !== "sold" && (
                            <button className="w-full border border-darkSage text-darkSage py-3 rounded-full hover:bg-darkSage hover:text-white transition">
                                Financing Consultation
                            </button>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}