import { notFound } from "next/navigation";
import AdminPropertyForm from "@/components/admin/AdminPropertyForm";
import { getPropertyById } from "@/lib/property-service";

export default async function EditPropertyPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const property = await getPropertyById(id);

    if (!property) {
        notFound();
    }

    return (
        <section>
            <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8c7c6a]">Edit Listing</p>
                <h2 className="mt-3 font-serif text-3xl text-[var(--textDark)]">
                    Update {property.title}
                </h2>
            </div>

            <AdminPropertyForm mode="edit" property={property} />
        </section>
    );
}
