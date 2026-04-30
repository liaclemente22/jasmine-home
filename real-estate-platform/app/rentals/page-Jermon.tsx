"use client";

import { useState } from "react";
import Link from "next/link";
import { properties } from "@/data/properties";
import { useSearchParams } from "next/navigation";
import PropertyCard from "@/components/PropertyCard";

export default function RentalsPage() {
    const [location, setLocation] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortOption, setSortOption] = useState("");

    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("search")?.toLowerCase() || "";

    // Get all rental properties
    const rentalProperties = properties.filter(
        (property) => property.type === "rent"
    );

    const filteredProperties = rentalProperties
        .filter((property) => {
            const matchesSearch =
                property.title.toLowerCase().includes(searchQuery) ||
                property.location.toLowerCase().includes(searchQuery);

            return (
                matchesSearch &&
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

    return (
        <main className="pt-32 px-8 bg-[var(--background)] min-h-screen">
            <div className="max-w-6xl mx-auto">
                <h1 className="font-serif text-5xl mb-12">Rentals</h1>

                {searchQuery && (
                    <p className="text-[var(--muted)] mb-6">
                        Showing results for:{" "}
                        <span className="font-medium capitalize">{searchQuery}</span>
                    </p>
                )}

                <p className="text-[var(--muted)] mb-10">
                    {filteredProperties.length} Properties Found
                </p>

                {/* FILTER SECTION */}
                <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
                    <div className="grid md:grid-cols-5 gap-6">
                        {/* Sort */}
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="border border-gray-200 rounded-full px-4 py-3 bg-white text-gray-800 appearance-none"
                        >
                            <option value="">Sort By</option>
                            <option value="priceLowHigh">Price: Low → High</option>
                            <option value="priceHighLow">Price: High → Low</option>
                            <option value="bedrooms">Bedrooms: Most First</option>
                        </select>

                        {/* Location */}
                        <select
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="border border-gray-200 rounded-full px-4 py-3 bg-white text-gray-800"
                        >
                            <option value="">All Locations</option>
                            <option value="Makati">Makati</option>
                            <option value="BGC">BGC</option>
                            <option value="Ortigas">Ortigas</option>
                            <option value="QC">Quezon City</option>
                        </select>

                        {/* Bedrooms */}
                        <select
                            value={bedrooms}
                            onChange={(e) => setBedrooms(e.target.value)}
                            className="border border-gray-200 rounded-full px-4 py-3 bg-white text-gray-800"
                        >
                            <option value="">Any Bedrooms</option>
                            <option value="1">1 Bedroom</option>
                            <option value="2">2 Bedrooms</option>
                        </select>

                        {/* Max Price */}
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="border border-gray-200 rounded-full px-4 py-3"
                        />

                        {/* Reset */}
                        <button
                            onClick={() => {
                                setLocation("");
                                setBedrooms("");
                                setMaxPrice("");
                                setSortOption("");
                            }}
                            className="bg-sage text-white rounded-full py-3 hover:opacity-90 transition"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* PROPERTY GRID */}
                <div className="grid md:grid-cols-3 gap-8">
                    {filteredProperties.length === 0 ? (
                        <p className="text-[var(--muted)]">
                            No properties match your criteria.
                        </p>
                    ) : (
                        filteredProperties.map((home) => (
                            <Link
                                key={home.id}
                                href={`/rentals/${home.id}`}
                                className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6"
                            >
                                <span className="absolute top-4 right-4 bg-[var(--sage)] text-white text-xs px-3 py-1 rounded-full tracking-wide">
                                    For Rent
                                </span>

                                <h3 className="font-semibold text-lg">{home.title}</h3>

                                <p className="text-sm text-[var(--muted)] mt-2">
                                    {home.location} • {home.bedrooms} Beds
                                </p>

                                <p className="mt-4 font-medium">
                                    ₱{home.price.toLocaleString()} / month
                                </p>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </main>
    );
}