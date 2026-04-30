"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    email: string;
    id: string;
    recipientName: string;
    subject: string;
};

export default function InquiryReplyForm({
    email,
    id,
    recipientName,
    subject,
}: Props) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!message.trim()) {
            setError("Write a short reply before sending.");
            return;
        }

        setSending(true);

        try {
            const res = await fetch(`/api/admin/inquiries/${id}/reply`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: message.trim(),
                    subject,
                }),
            });

            const result = await res.json();

            if (!result.success) {
                setError(result.error || "Unable to send reply");
                return;
            }

            setSuccess(`Reply sent to ${recipientName}.`);
            setMessage("");
            setOpen(false);
            router.refresh();
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
                <button
                    type="button"
                    onClick={() => {
                        setOpen((current) => !current);
                        setError("");
                        setSuccess("");
                    }}
                    className="rounded-full border border-[#d8cdc0] px-4 py-2 text-xs tracking-[0.18em] text-[var(--darkSage)] transition hover:bg-white"
                >
                    {open ? "CANCEL REPLY" : "SEND REPLY"}
                </button>
                <a
                    href={`mailto:${email}`}
                    className="rounded-full border border-[#d8cdc0] px-4 py-2 text-xs tracking-[0.18em] text-[var(--textDark)] transition hover:bg-white"
                >
                    OPEN EMAIL
                </a>
            </div>

            {open && (
                <form
                    onSubmit={handleSubmit}
                    className="rounded-[1.5rem] border border-[#e9dfd3] bg-white p-4"
                >
                    <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-[#8c7c6a]">
                        Reply to {recipientName}
                    </label>
                    <textarea
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        rows={4}
                        placeholder="Write your response here..."
                        className="w-full rounded-[1.25rem] border border-[#e8ddd0] bg-[var(--background)] px-4 py-3 text-sm outline-none"
                    />
                    {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
                    <div className="mt-4 flex justify-end">
                        <button
                            type="submit"
                            disabled={sending}
                            className="rounded-full bg-[var(--darkSage)] px-5 py-3 text-xs tracking-[0.18em] text-white transition hover:bg-[#394842] disabled:opacity-60"
                        >
                            {sending ? "SENDING..." : "SEND MESSAGE"}
                        </button>
                    </div>
                </form>
            )}

            {success && <p className="text-sm text-[var(--darkSage)]">{success}</p>}
        </div>
    );
}
