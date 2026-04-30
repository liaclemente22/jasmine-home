import Link from "next/link";
import { getAllProperties } from "@/lib/property-service";

export default async function FeaturedHomes() {
    const featured = (await getAllProperties({
        featured: true,
        status: "available",
    })).slice(0, 3);

    return (
        <section className="bg-[var(--background)] px-8 py-28">
            <div className="mx-auto max-w-6xl">
                <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">
                            Featured homes
                        </p>
                        <h2 className="mt-5 font-serif text-4xl leading-tight text-[var(--textDark)] md:text-5xl">
                            A curated look at homes drawing attention right now.
                        </h2>
                    </div>

                    <Link
                        href="/listings"
                        className="inline-flex items-center text-sm tracking-[0.18em] text-[var(--darkSage)] transition duration-200 hover:translate-x-1"
                    >
                        VIEW ALL LISTINGS
                    </Link>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    {featured.map((property) => (
                        <Link
                            key={property.id}
                            href={
                                property.type === "rent"
                                    ? `/rentals/${property.id}`
                                    : `/for-sale/${property.id}`
                            }
                            className="group overflow-hidden rounded-[2rem] border border-[#ebe1d5] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_rgba(87,74,60,0.08)]"
                        >
                            <div
                                className="relative h-72 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: `url(${property.images[0]})` }}
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(33,24,18,0.02),rgba(33,24,18,0.22))]" />

                                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                                    <span
                                        className={`rounded-full px-3 py-1 text-xs tracking-[0.16em] text-white ${property.type === "rent"
                                            ? "bg-[var(--sage)]"
                                            : "bg-[var(--darkSage)]"
                                            }`}
                                    >
                                        {property.type === "rent" ? "FOR RENT" : "FOR SALE"}
                                    </span>

                                    <span className="rounded-full bg-white/88 px-3 py-1 text-xs tracking-[0.16em] text-[var(--textDark)]">
                                        {property.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="text-sm tracking-[0.08em] text-[#8c7c6a]">
                                    {property.location}
                                </p>
                                <h3 className="mt-3 font-serif text-2xl text-[var(--textDark)]">
                                    {property.title}
                                </h3>

                                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                                    {property.bedrooms} beds • {property.bathrooms} baths • {property.area} sqm
                                </p>

                                <p className="mt-6 font-medium text-[var(--textDark)]">
                                    ₱{property.price.toLocaleString()}
                                    {property.type === "rent" && " / month"}
                                </p>

                                <span className="mt-6 inline-flex items-center text-sm tracking-[0.18em] text-[var(--darkSage)] transition duration-200 group-hover:translate-x-1">
                                    EXPLORE HOME
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
