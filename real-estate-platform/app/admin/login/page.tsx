"use client";

import { Suspense } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
    return (
        <Suspense fallback={<LoginShell />}>
            <AdminLoginForm />
        </Suspense>
    );
}

function AdminLoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const next = searchParams.get("next") || "/admin/properties";
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        const formData = new FormData(event.currentTarget);
        const res = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: formData.get("username"),
                password: formData.get("password"),
            }),
        });

        const result = await res.json();

        if (!result.success) {
            setError(result.error || "Unable to log in");
            setLoading(false);
            return;
        }

        router.push(next);
        router.refresh();
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-20">
            <div className="w-full max-w-md rounded-[2rem] border border-[#e9dfd3] bg-white p-8 shadow-[0_24px_60px_rgba(87,74,60,0.08)]">
                <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">Admin Login</p>
                <h1 className="mt-4 font-serif text-4xl text-[var(--textDark)]">
                    Manage listings securely.
                </h1>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                    Sign in to create, edit, and remove property listings from the dashboard.
                </p>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="mb-2 block text-sm text-[var(--textDark)]">Username</label>
                        <input
                            name="username"
                            type="text"
                            required
                            className="w-full rounded-full border border-[#e8ddd0] bg-[var(--background)] px-5 py-3 outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm text-[var(--textDark)]">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full rounded-full border border-[#e8ddd0] bg-[var(--background)] px-5 py-3 outline-none"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-600">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-full bg-[var(--darkSage)] py-3 text-sm tracking-[0.18em] text-white transition hover:bg-[#394842] disabled:opacity-60"
                    >
                        {loading ? "SIGNING IN..." : "SIGN IN"}
                    </button>
                </form>
            </div>
        </main>
    );
}

function LoginShell() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 py-20">
            <div className="h-[28rem] w-full max-w-md rounded-[2rem] border border-[#e9dfd3] bg-white shadow-[0_24px_60px_rgba(87,74,60,0.08)]" />
        </main>
    );
}
