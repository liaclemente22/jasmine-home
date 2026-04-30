"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/data/properties";

export default function ForSalePage() {
    const [location, setLocation] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [saleProperties, setSaleProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let ignore = false;

        const loadProperties = async () => {
            try {
                const res = await fetch("/api/properties?type=sale");
                const data = await res.json();

                if (!ignore && data.success) {
                    setSaleProperties(data.properties);
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        };

        loadProperties();

        return () => {
            ignore = true;
        };
    }, []);

    const locationOptions = useMemo(
        () => [...new Set(saleProperties.map((property) => property.location))].sort(),
        [saleProperties]
    );

    const filteredProperties = saleProperties
        .filter((property) => {
            return (
                property.status === "available" &&
                (location === "" || property.location === location) &&
                (bedrooms === "" || property.bedrooms === Number(bedrooms)) &&
                (maxPrice === "" || property.price <= Number(maxPrice))
            );
        })
        .sort((a, b) => {
            if (sortOption === "priceLowHigh") return a.price - b.price;
            if (sortOption === "priceHighLow") return b.price - a.price;
            if (sortOption === "bedrooms") return b.bedrooms - a.bedrooms;
            return 0;
        });

    const resetFilters = () => {
        setLocation("");
        setBedrooms("");
        setMaxPrice("");
        setSortOption("");
    };

    return (
        <main className="min-h-screen bg-[var(--background)] px-8 pb-24 pt-32">
            <div className="mx-auto max-w-6xl">
                <section className="rounded-[2.25rem] border border-[#e9dfd3] bg-[linear-gradient(180deg,rgba(255,252,247,0.95)_0%,rgba(255,248,241,0.88)_100%)] px-6 py-10 shadow-[0_24px_60px_rgba(87,74,60,0.08)] md:px-10 md:py-12">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">
                                Homes for sale
                            </p>
                            <h1 className="mt-5 font-serif text-4xl leading-tight text-[var(--textDark)] md:text-6xl">
                                Long-term homes chosen for value, comfort, and fit.
                            </h1>
                            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted)] md:text-lg">
                                Explore properties for ownership with a calmer browsing experience
                                that helps buyers focus on location, livability, and long-term potential.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:w-[24rem]">
                            <div className="rounded-[1.5rem] bg-white/78 p-5">
                                <p className="text-sm uppercase tracking-[0.22em] text-[#8c7c6a]">
                                    Available now
                                </p>
                                <p className="mt-3 font-serif text-3xl text-[var(--textDark)]">
                                    {filteredProperties.length}
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] bg-white/78 p-5">
                                <p className="text-sm uppercase tracking-[0.22em] text-[#8c7c6a]">
                                    Ownership focus
                                </p>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                                    Curated listings for buyers planning a more permanent move.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-10 rounded-[2rem] border border-[#e9dfd3] bg-white p-6 shadow-[0_18px_40px_rgba(87,74,60,0.06)] md:p-8">
                    <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="text-xs uppercase tracking-[0.3em] text-[#8c7c6a]">
                                Filter homes
                            </p>
                            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                                Narrow by location, size, and price range.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex items-center text-sm tracking-[0.18em] text-[var(--darkSage)] transition duration-200 hover:translate-x-1"
                        >
                            RESET FILTERS
                        </button>
                    </div>

                    <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        <label className="flex flex-col gap-2">
                            <span className="text-xs uppercase tracking-[0.22em] text-[#8c7c6a]">
                                Sort
                            </span>
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="rounded-full border border-[#e8ddd0] bg-[var(--background)] px-5 py-3 text-sm text-[var(--textDark)] outline-none"
                            >
                                <option value="">Recommended</option>
                                <option value="priceLowHigh">Price: Low to High</option>
                                <option value="priceHighLow">Price: High to Low</option>
                                <option value="bedrooms">Bedrooms: Most First</option>
                            </select>
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="text-xs uppercase tracking-[0.22em] text-[#8c7c6a]">
                                Location
                            </span>
                            <select
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="rounded-full border border-[#e8ddd0] bg-[var(--background)] px-5 py-3 text-sm text-[var(--textDark)] outline-none"
                            >
                                <option value="">All Locations</option>
                                {locationOptions.map((option) => (
                                    <option key={option} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="text-xs uppercase tracking-[0.22em] text-[#8c7c6a]">
                                Bedrooms
                            </span>
                            <select
                                value={bedrooms}
                                onChange={(e) => setBedrooms(e.target.value)}
                                className="rounded-full border border-[#e8ddd0] bg-[var(--background)] px-5 py-3 text-sm text-[var(--textDark)] outline-none"
                            >
                                <option value="">Any Bedrooms</option>
                                <option value="1">1 Bedroom</option>
                                <option value="2">2 Bedrooms</option>
                                <option value="3">3 Bedrooms</option>
                                <option value="4">4 Bedrooms</option>
                            </select>
                        </label>

                        <label className="flex flex-col gap-2">
                            <span className="text-xs uppercase tracking-[0.22em] text-[#8c7c6a]">
                                Max price
                            </span>
                            <input
                                type="number"
                                placeholder="e.g. 9000000"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                                className="rounded-full border border-[#e8ddd0] bg-[var(--background)] px-5 py-3 text-sm text-[var(--textDark)] outline-none placeholder:text-[#988a7d]"
                            />
                        </label>
                    </div>
                </section>

                <section className="mt-12">
                    <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <p className="text-sm leading-7 text-[var(--muted)]">
                            {filteredProperties.length} home
                            {filteredProperties.length === 1 ? "" : "s"} available for sale
                        </p>

                        <Link
                            href="/contact"
                            className="inline-flex items-center text-sm tracking-[0.18em] text-[var(--darkSage)] transition duration-200 hover:translate-x-1"
                        >
                            TALK TO AN ADVISOR
                        </Link>
                    </div>

                    {loading ? (
                        <div className="rounded-[2rem] border border-[#e9dfd3] bg-white px-6 py-12 text-center shadow-[0_18px_40px_rgba(87,74,60,0.05)]">
                            <h2 className="font-serif text-3xl text-[var(--textDark)]">
                                Loading homes...
                            </h2>
                        </div>
                    ) : filteredProperties.length === 0 ? (
                        <div className="rounded-[2rem] border border-[#e9dfd3] bg-white px-6 py-12 text-center shadow-[0_18px_40px_rgba(87,74,60,0.05)]">
                            <h2 className="font-serif text-3xl text-[var(--textDark)]">
                                No homes match those filters right now.
                            </h2>
                            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
                                Try widening your location or price range, or reset the filters to
                                review all active sale listings.
                            </p>
                            <button
                                type="button"
                                onClick={resetFilters}
                                className="mt-8 rounded-full bg-[var(--darkSage)] px-6 py-3 text-sm tracking-[0.18em] text-white transition hover:bg-[#394842]"
                            >
                                SHOW ALL HOMES
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {filteredProperties.map((property) => (
                                <PropertyCard key={property.id} property={property} />
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
