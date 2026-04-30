"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    id: string;
    status: "new" | "contacted" | "closed";
};

export default function InquiryStatusSelect({ id, status }: Props) {
    const router = useRouter();
    const [value, setValue] = useState(status);
    const [saving, setSaving] = useState(false);

    const handleChange = async (nextStatus: Props["status"]) => {
        setValue(nextStatus);
        setSaving(true);

        try {
            const res = await fetch(`/api/admin/inquiries/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: nextStatus }),
            });

            const result = await res.json();

            if (!result.success) {
                setValue(status);
                alert(result.error || "Unable to update inquiry status");
                return;
            }

            router.refresh();
        } finally {
            setSaving(false);
        }
    };

    return (
        <select
            value={value}
            disabled={saving}
            onChange={(event) => handleChange(event.target.value as Props["status"])}
            className="rounded-full border border-[#e8ddd0] bg-[var(--background)] px-4 py-2 text-xs uppercase tracking-[0.16em] text-[var(--textDark)] outline-none"
        >
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
        </select>
    );
}
