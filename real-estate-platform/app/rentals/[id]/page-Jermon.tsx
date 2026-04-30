
import Image from "next/image";
import { properties } from "@/data/properties";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyInquiry from "@/components/PropertyInquiry";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";




export default async function PropertyDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const property = properties.find((p) => p.id === id && p.type === "rent");
    if (!property) {
        return (
            <main className="pt-32 text-center">
                <h1 className="text-2xl">Property not found.</h1>
            </main>
        );
    }

    if (!property) {
        return (
            <main className="pt-32 text-center">
                <h1 className="text-2xl">Property not found.</h1>
            </main>
        );
    }

    return (
        <main className="pt-28 bg-[var(--background)] min-h-screen">

            <p className="text-sm text-red-500">
                {JSON.stringify(property.images)}
            </p>
            <PropertyGallery
                images={property.images}
                title={property.title}
            />




            {/* Content */}
            <section className="px-8 py-20">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-16">


                    {/* Left Column */}
                    <div className="lg:col-span-2 space-y-10">

                        <span className="inline-block bg-[var(--sage)] text-white text-xs px-4 py-1 rounded-full mb-4 tracking-wide">
                            For Rent
                        </span>
                        <h1 className="font-serif text-4xl mb-4">
                            {property.title}
                        </h1>

                        <p className="text-[var(--muted)] mb-8">
                            {property.bedrooms} Beds • {property.bathrooms} Bath • {property.area} sqm
                        </p>

                        <div className="prose max-w-none text-[var(--muted)] leading-relaxed">
                            <p>{property.description}</p>
                        </div>

                    </div>

                    {/* Right Column / Sidebar */}
                    <div className="lg:sticky lg:top-28">
                        <PropertyInquiry propertyTitle={property.title} />
                    </div>

                </div>
            </section>

        </main>
    );
}
