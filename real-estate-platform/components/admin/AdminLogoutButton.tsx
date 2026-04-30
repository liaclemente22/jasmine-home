"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-[#d8cdc0] px-4 py-2 text-xs tracking-[0.18em] text-[var(--darkSage)] transition hover:bg-white"
        >
            LOG OUT
        </button>
    );
}
