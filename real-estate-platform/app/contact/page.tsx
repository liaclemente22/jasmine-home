"use client";

import { useState } from "react";

export default function ContactPage() {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            inquiryType: "contact",
            message: formData.get("message"),
            subject: "New Contact Message",
        };

        const res = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!result.success) {
            setError(result.error || "Unable to send message right now.");
            return;
        }

        setSubmitted(true);
    };

    return (
        <main className="min-h-screen bg-[var(--background)] pt-32 text-[var(--textDark)]">
            <section className="px-8 pb-12">
                <div className="mx-auto max-w-6xl rounded-[2.25rem] border border-[#e9dfd3] bg-[linear-gradient(180deg,rgba(255,252,247,0.95)_0%,rgba(255,248,241,0.88)_100%)] px-6 py-12 shadow-[0_24px_60px_rgba(87,74,60,0.08)] md:px-10">
                    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
                        <div className="max-w-2xl">
                            <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">
                                Contact
                            </p>
                            <h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
                                Let’s start the conversation.
                            </h1>
                            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted)] md:text-lg">
                                Whether you&apos;re searching for a home, exploring your options, or
                                preparing a listing, we&apos;re here to guide you with care and clarity.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[1.5rem] bg-white/78 p-5">
                                <p className="text-sm uppercase tracking-[0.22em] text-[#8c7c6a]">
                                    Response time
                                </p>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                                    We typically respond within 24 to 48 hours.
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] bg-white/78 p-5">
                                <p className="text-sm uppercase tracking-[0.22em] text-[#8c7c6a]">
                                    Best for
                                </p>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                                    Rental searches, sale inquiries, owner listings, and general questions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-8 pb-24">
                <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.7fr_1.3fr]">
                    <div className="rounded-[2rem] border border-[#e9dfd3] bg-[var(--beige)] p-8">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#8c7c6a]">
                            Before you send
                        </p>
                        <div className="mt-6 space-y-5 text-sm leading-7 text-[var(--muted)]">
                            <p>
                                Share the area you&apos;re considering, your budget, or the kind of support
                                you need so we can reply more helpfully.
                            </p>
                            <p>
                                If you&apos;re listing a property, include the location and whether it&apos;s for
                                rent or sale.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-[#e9dfd3] bg-white p-8 shadow-[0_18px_40px_rgba(87,74,60,0.06)] md:p-10">
                        {submitted ? (
                            <div className="py-10 text-center">
                                <h2 className="font-serif text-3xl">Thank you.</h2>
                                <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--muted)]">
                                    Your message has been received and we’ll get back to you as soon as we can.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-8 text-sm tracking-[0.12em] text-[var(--darkSage)] underline"
                                >
                                    SEND ANOTHER MESSAGE
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-sm text-[var(--textDark)]">Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        placeholder="Your full name"
                                        className="w-full rounded-full border border-[#e8ddd0] bg-[var(--background)] px-5 py-3 focus:outline-none focus:ring-1 focus:ring-[var(--sage)]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-[var(--textDark)]">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="you@example.com"
                                        className="w-full rounded-full border border-[#e8ddd0] bg-[var(--background)] px-5 py-3 focus:outline-none focus:ring-1 focus:ring-[var(--sage)]"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm text-[var(--textDark)]">Message</label>
                                    <textarea
                                        name="message"
                                        rows={6}
                                        required
                                        placeholder="Tell us a little about what you're looking for..."
                                        className="w-full resize-none rounded-[1.5rem] border border-[#e8ddd0] bg-[var(--background)] px-5 py-4 focus:outline-none focus:ring-1 focus:ring-[var(--sage)]"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-full bg-[var(--darkSage)] py-3 text-sm tracking-[0.18em] text-white transition hover:bg-[#394842]"
                                >
                                    SEND MESSAGE
                                </button>

                                {error && <p className="text-sm text-red-600">{error}</p>}
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
