"use client";

import { useState } from "react";

export default function ListYourPropertyPage() {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            inquiryType: "submission",
            propertyTitle: `${formData.get("propertyType")} in ${formData.get("location")}`,
            message: `
      Property Type: ${formData.get("propertyType")}
      Location: ${formData.get("location")}
      Price: ₱${formData.get("price")}

      Details:
      ${formData.get("details")}
    `,
            subject: "New Property Submission",
        };

        const res = await fetch("/api/send-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await res.json();

        if (result.success) {
            setSubmitted(true);
        } else {
            setError(result.error || "Something went wrong. Please try again.");
        }
    };

    return (
        <main className="pt-32 bg-[var(--background)] text-[var(--textDark)] min-h-screen">

            {/* Intro */}
            <section className="px-8 py-20 text-center max-w-3xl mx-auto">
                <h1 className="font-serif text-5xl mb-8 tracking-wide">
                    Partner With Jasmine Home
                </h1>

                <p className="text-lg text-[var(--muted)] leading-relaxed">
                    We collaborate with trusted brokers and property owners
                    who value thoughtful representation.
                    Share your listing details below, and we’ll connect with you.
                </p>
            </section>

            {/* Form */}
            <section className="px-8 pb-24">
                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-10">

                    {submitted ? (
                        <div className="text-center py-10">
                            <h2 className="font-serif text-3xl mb-4">
                                Thank You.
                            </h2>

                            <p className="text-[var(--muted)] leading-relaxed">
                                We’ve received your submission and will review it shortly.
                                We appreciate your trust in Jasmine Home.
                            </p>

                            <button
                                onClick={() => setSubmitted(false)}
                                className="mt-8 text-sm underline text-[var(--darkSage)]"
                            >
                                Submit another property
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Contact Name */}
                            <div>
                                <label className="block text-sm mb-2">Your Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    placeholder="Full name"
                                    className="w-full border border-gray-200 rounded-full px-5 py-3 focus:outline-none focus:ring-1 focus:ring-sage"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm mb-2">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="you@example.com"
                                    className="w-full border border-gray-200 rounded-full px-5 py-3 focus:outline-none focus:ring-1 focus:ring-sage"
                                />
                            </div>

                            {/* Property Type */}
                            <div>
                                <label className="block text-sm mb-2">Property Type</label>
                                <select
                                    name="propertyType"
                                    required
                                    className="w-full border border-gray-200 rounded-full px-5 py-3 bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-sage"
                                >
                                    <option value="">Select type</option>
                                    <option>Condominium</option>
                                    <option>House</option>
                                    <option>Townhouse</option>
                                    <option>Commercial</option>
                                </select>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-sm mb-2">Location</label>
                                <input
                                    name="location"
                                    type="text"
                                    required
                                    placeholder="City / Area"
                                    className="w-full border border-gray-200 rounded-full px-5 py-3 focus:outline-none focus:ring-1 focus:ring-sage"
                                />
                            </div>

                            {/* Price */}
                            <div>
                                <label className="block text-sm mb-2">Price</label>
                                <input
                                    name="price"
                                    type="number"
                                    required
                                    placeholder="Price (₱)"
                                    className="w-full border border-gray-200 rounded-full px-5 py-3 focus:outline-none focus:ring-1 focus:ring-sage"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="block text-sm mb-2">Additional Details</label>
                                <textarea
                                    name="details"
                                    rows={4}
                                    placeholder="Share key details about the property..."
                                    className="w-full border border-gray-200 rounded-2xl px-5 py-4 focus:outline-none focus:ring-1 focus:ring-sage resize-none"
                                ></textarea>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="w-full bg-sage text-white py-3 rounded-full hover:opacity-90 transition"
                            >
                                Submit Property
                            </button>

                            {error && <p className="text-sm text-red-600">{error}</p>}

                        </form>
                    )}

                </div>
            </section>

        </main>
    );
}
