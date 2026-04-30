import AdminPropertyForm from "@/components/admin/AdminPropertyForm";

export default function NewPropertyPage() {
    return (
        <section>
            <div className="mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-[#8c7c6a]">New Listing</p>
                <h2 className="mt-3 font-serif text-3xl text-[var(--textDark)]">
                    Create a property listing
                </h2>
            </div>

            <AdminPropertyForm mode="create" />
        </section>
    );
}
