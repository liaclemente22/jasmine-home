"use client";

import { useState } from "react";

interface InquiryProps {
    propertyTitle: string;
}

export default function PropertyInquiry({ propertyTitle }: InquiryProps) {
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get("name"),
            email: formData.get("email"),
            inquiryType: "property",
            propertyTitle,
            message: `
      Property: ${propertyTitle}

      Message:
      ${formData.get("message")}
    `,
            subject: `New Inquiry for ${propertyTitle}`,
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 h-fit">

            <p className="text-2xl font-medium mb-6">
                Interested in this home?
            </p>

            {submitted ? (
                <div className="text-center py-6">
                    <p className="text-[var(--muted)]">
                        Thank you for your interest in {propertyTitle}.
                        We’ll be in touch shortly.
                    </p>

                    <button
                        onClick={() => setSubmitted(false)}
                        className="mt-6 text-sm underline text-[var(--darkSage)]"
                    >
                        Send another inquiry
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">

                    <input
                        name="name"
                        type="text"
                        required
                        placeholder="Your Name"
                        className="w-full border border-gray-200 rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-sage"
                    />

                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="Your email"
                        className="w-full border border-gray-200 rounded-full px-4 py-3 focus:outline-none focus:ring-1 focus:ring-sage"
                    />

                    <textarea
                        rows={3}
                        name="message"
                        required
                        placeholder="When would you like to view?/ Your Message"
                        className="w-full border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-sage resize-none"
                    />

                    <button
                        type="submit"
                        className="w-full bg-sage text-white py-3 rounded-full hover:opacity-90 transition"
                    >
                        Send Inquiry
                    </button>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                </form>
            )}

        </div>
    );
}
