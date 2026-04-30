import PropertyCard from "@/components/PropertyCard";
import type { Property } from "@/data/properties";
import { getAllProperties } from "@/lib/property-service";

type Props = {
    currentProperty: Property;
    limit?: number;
};

export default async function RelatedProperties({
    currentProperty,
    limit = 3,
}: Props) {
    const sameTypeProperties = await getAllProperties({
        type: currentProperty.type,
        status: "available",
    });

    const related = sameTypeProperties
        .filter((property) => property.id !== currentProperty.id)
        .sort((a, b) => {
            const aScore =
                (a.location === currentProperty.location ? 2 : 0) +
                (Math.abs(a.bedrooms - currentProperty.bedrooms) <= 1 ? 1 : 0);
            const bScore =
                (b.location === currentProperty.location ? 2 : 0) +
                (Math.abs(b.bedrooms - currentProperty.bedrooms) <= 1 ? 1 : 0);

            return bScore - aScore;
        })
        .slice(0, limit);

    if (related.length === 0) {
        return null;
    }

    return (
        <section className="px-8 pb-24">
            <div className="mx-auto max-w-6xl">
                <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#8c7c6a]">
                            Related homes
                        </p>
                        <h2 className="mt-3 font-serif text-3xl text-[var(--textDark)]">
                            More homes in a similar range and direction.
                        </h2>
                    </div>
                    <p className="max-w-md text-sm leading-7 text-[var(--muted)]">
                        Explore a few nearby alternatives while this home is still fresh in mind.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {related.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </section>
    );
}
