"use client";
import { properties } from "@/data/properties";
import PropertyCard from "@/components/PropertyCard";


import { useState } from "react";
import Link from "next/link";
import PropertyGallery from "@/components/PropertyGallery";

const saleProperties = properties.filter(
    (property) => property.type === "sale"
);
export default function ForSalePage() {
    const [sortOption, setSortOption] = useState("");

    const sortedProperties = [...saleProperties].sort((a, b) => {
        if (sortOption === "priceLowHigh") return a.price - b.price;
        if (sortOption === "priceHighLow") return b.price - a.price;
        return 0;
    });

    return (
        <main className="pt-28 px-8 bg-[var(--background)] min-h-screen">

            {/* Header */}
            <section className="max-w-6xl mx-auto mb-16 text-center">
                <h1 className="font-serif text-5xl mb-6">
                    Homes for Sale
                </h1>
                <p className="text-[var(--muted)]">
                    Curated properties for long-term ownership.
                </p>
            </section>

            {/* Sort */}
            <div className="max-w-6xl mx-auto mb-10 flex justify-end">
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-gray-200 rounded-full px-4 py-3"
                >
                    <option value="">Sort By</option>
                    <option value="priceLowHigh">Price: Low → High</option>
                    <option value="priceHighLow">Price: High → Low</option>
                </select>
            </div>


            {/* Grid */}
            <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
                {sortedProperties
                    .filter((property) => property.status !== "sold")
                    .map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
            </section>

        </main>
    );
}