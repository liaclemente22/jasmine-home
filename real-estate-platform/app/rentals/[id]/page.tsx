import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyInquiry from "@/components/PropertyInquiry";
import RelatedProperties from "@/components/RelatedProperties";
import { getPropertyById } from "@/lib/property-service";

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}): Promise<Metadata> {
    const { id } = await params;
    const property = await getPropertyById(id);

    if (!property || property.type !== "rent") {
        return {
            title: "Rental not found | Jasmine Home",
        };
    }

    return {
        title: `${property.title} | Rentals`,
        description: `Explore ${property.title} in ${property.location} with ${property.bedrooms} bedrooms and a monthly rate of Php ${property.price.toLocaleString()}.`,
        openGraph: {
            title: `${property.title} | Jasmine Home`,
            description: `A curated rental home in ${property.location}.`,
            images: property.images[0] ? [property.images[0]] : [],
            type: "website",
        },
    };
}

export default async function PropertyDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const property = await getPropertyById(id);

    if (!property || property.type !== "rent") {
        notFound();
    }

    return (
        <>
            <main className="min-h-screen bg-[var(--background)] pt-28">
                <PropertyGallery images={property.images} title={property.title} />

                <section className="px-8 py-20">
                    <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-3">
                        <div className="space-y-10 lg:col-span-2">
                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="inline-flex rounded-full bg-[var(--sage)] px-4 py-1 text-xs tracking-[0.18em] text-white">
                                        FOR RENT
                                    </span>
                                    <span
                                        className={`inline-flex rounded-full px-4 py-1 text-xs tracking-[0.18em] text-white ${property.status === "available"
                                            ? "bg-green-600"
                                            : property.status === "reserved"
                                                ? "bg-yellow-500"
                                                : "bg-red-600"
                                            }`}
                                    >
                                        {property.status.toUpperCase()}
                                    </span>
                                </div>

                                <h1 className="mt-5 font-serif text-4xl text-[var(--textDark)] md:text-5xl">
                                    {property.title}
                                </h1>

                                <p className="mt-4 text-lg text-[#8c7c6a]">
                                    {property.location}
                                </p>

                                <p className="mt-4 text-[var(--muted)]">
                                    {property.bedrooms} Beds • {property.bathrooms} Baths • {property.area} sqm
                                </p>
                            </div>

                            <div className="rounded-[2rem] border border-[#e9dfd3] bg-white p-8 shadow-[0_18px_40px_rgba(87,74,60,0.06)]">
                                <p className="text-xs uppercase tracking-[0.3em] text-[#8c7c6a]">
                                    Overview
                                </p>
                                <p className="mt-5 text-base leading-8 text-[var(--muted)] md:text-lg">
                                    {property.description}
                                </p>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-[1.5rem] border border-[#e9dfd3] bg-white p-5">
                                    <p className="text-xs uppercase tracking-[0.22em] text-[#8c7c6a]">
                                        Monthly rate
                                    </p>
                                    <p className="mt-3 font-serif text-2xl text-[var(--textDark)]">
                                        ₱{property.price.toLocaleString()}
                                    </p>
                                </div>
                                <div className="rounded-[1.5rem] border border-[#e9dfd3] bg-white p-5">
                                    <p className="text-xs uppercase tracking-[0.22em] text-[#8c7c6a]">
                                        Best suited for
                                    </p>
                                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                                        Renters looking for comfort, practicality, and a more considered fit.
                                    </p>
                                </div>
                                <div className="rounded-[1.5rem] border border-[#e9dfd3] bg-white p-5">
                                    <p className="text-xs uppercase tracking-[0.22em] text-[#8c7c6a]">
                                        Inquiry support
                                    </p>
                                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                                        Request viewings and ask follow-up questions directly from this page.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="lg:sticky lg:top-28">
                            <div className="rounded-[2rem] border border-[#e9dfd3] bg-white p-8 shadow-[0_18px_40px_rgba(87,74,60,0.06)]">
                                <p className="text-xs uppercase tracking-[0.28em] text-[#8c7c6a]">
                                    Monthly rent
                                </p>
                                <p className="mt-4 font-serif text-4xl text-[var(--textDark)]">
                                    ₱{property.price.toLocaleString()}
                                </p>
                                <p className="mt-1 text-sm text-[var(--muted)]">per month</p>

                                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                                    Reach out to ask about availability, schedule a viewing, or clarify next steps.
                                </p>
                            </div>

                            <div className="mt-6">
                                <PropertyInquiry propertyTitle={property.title} />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <RelatedProperties currentProperty={property} />
        </>
    );
}
