"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeletePropertyButton({ id }: { id: string }) {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        const confirmed = window.confirm("Delete this listing?");

        if (!confirmed) return;

        setDeleting(true);
        const res = await fetch(`/api/properties/${id}`, { method: "DELETE" });
        const result = await res.json();

        if (!result.success) {
            alert(result.error || "Unable to delete listing");
            setDeleting(false);
            return;
        }

        router.push("/admin/properties?success=deleted");
        router.refresh();
    };

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="rounded-full border border-red-200 px-4 py-2 text-xs tracking-[0.18em] text-red-600 transition hover:bg-red-50"
        >
            {deleting ? "DELETING..." : "DELETE"}
        </button>
    );
}
