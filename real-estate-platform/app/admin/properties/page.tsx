import Link from "next/link";
import { getAllProperties } from "@/lib/property-service";
import DeletePropertyButton from "@/components/admin/DeletePropertyButton";

const successMessages = {
    created: "Listing created successfully.",
    updated: "Listing updated successfully.",
    deleted: "Listing deleted successfully.",
} as const;

export default async function AdminPropertiesPage({
    searchParams,
}: {
    searchParams?: Promise<{ success?: keyof typeof successMessages }>;
}) {
    const properties = await getAllProperties();
    const resolvedSearchParams = searchParams ? await searchParams : undefined;
    const success = resolvedSearchParams?.success;

    return (
        <section className="rounded-[2rem] border border-[#e9dfd3] bg-white p-5 shadow-[0_18px_40px_rgba(87,74,60,0.05)] sm:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#8c7c6a]">
                        Properties
                    </p>
                    <h2 className="mt-3 font-serif text-3xl text-[var(--textDark)]">
                        Manage live listing data
                    </h2>
                </div>

                <Link
                    href="/admin/properties/new"
                    className="inline-flex items-center justify-center rounded-full bg-[var(--darkSage)] px-5 py-3 text-xs tracking-[0.18em] text-white"
                >
                    ADD PROPERTY
                </Link>
            </div>

            {success && successMessages[success] && (
                <div className="mt-6 rounded-[1.5rem] border border-[#d9e6df] bg-[#f3f8f5] px-5 py-4 text-sm text-[var(--darkSage)]">
                    {successMessages[success]}
                </div>
            )}

            <div className="mt-8 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="border-b border-[#e8ddd0] text-[#8c7c6a]">
                        <tr>
                            <th className="pb-4 pr-4 font-medium">Title</th>
                            <th className="pb-4 pr-4 font-medium">Type</th>
                            <th className="pb-4 pr-4 font-medium">Location</th>
                            <th className="pb-4 pr-4 font-medium">Status</th>
                            <th className="pb-4 pr-4 font-medium">Price</th>
                            <th className="pb-4 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property) => (
                            <tr key={property.id} className="border-b border-[#f0e7dc] align-top">
                                <td className="py-5 pr-4">
                                    <p className="font-medium text-[var(--textDark)]">{property.title}</p>
                                    <p className="mt-1 text-xs text-[var(--muted)]">{property.id}</p>
                                </td>
                                <td className="py-5 pr-4 capitalize text-[var(--muted)]">{property.type}</td>
                                <td className="py-5 pr-4 text-[var(--muted)]">{property.location}</td>
                                <td className="py-5 pr-4 capitalize text-[var(--muted)]">{property.status}</td>
                                <td className="py-5 pr-4 text-[var(--muted)]">
                                    ₱{property.price.toLocaleString()}
                                </td>
                                <td className="py-5">
                                    <div className="flex flex-wrap gap-2">
                                        <Link
                                            href={`/admin/properties/${property.id}/edit`}
                                            className="rounded-full border border-[#d8cdc0] px-4 py-2 text-xs tracking-[0.18em] text-[var(--darkSage)] transition hover:bg-[var(--background)]"
                                        >
                                            EDIT
                                        </Link>
                                        <DeletePropertyButton id={property.id} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
