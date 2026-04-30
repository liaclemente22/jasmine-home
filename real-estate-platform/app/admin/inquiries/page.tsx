import InquiryReplyForm from "@/components/admin/InquiryReplyForm";
import InquiryStatusSelect from "@/components/admin/InquiryStatusSelect";
import { connectDB } from "@/lib/mongodb";
import { Inquiry } from "@/models/Inquiry";

type InquiryRecord = {
    _id: { toString(): string };
    createdAt: Date;
    email: string;
    lastRespondedAt?: Date;
    lastResponseMessage?: string;
    message: string;
    name: string;
    property?: string;
    status: "new" | "contacted" | "closed";
    subject?: string;
    type: "property" | "submission" | "contact";
};

const typeLabels = {
    contact: "General Contact",
    property: "Property Inquiry",
    submission: "Listing Submission",
} as const;

function getDisplaySubject(inquiry: InquiryRecord) {
    if (inquiry.subject?.trim()) {
        return inquiry.subject;
    }

    if (inquiry.type === "property" && inquiry.property) {
        return `Inquiry for ${inquiry.property}`;
    }

    if (inquiry.type === "submission") {
        return "New Property Submission";
    }

    return "New Contact Message";
}

export default async function AdminInquiriesPage() {
    await connectDB();
    const inquiries = (await Inquiry.find({}).sort({ createdAt: -1 }).lean()) as InquiryRecord[];

    return (
        <section className="rounded-[2rem] border border-[#e9dfd3] bg-white p-5 shadow-[0_18px_40px_rgba(87,74,60,0.05)] sm:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-[#8c7c6a]">
                        Inquiries
                    </p>
                    <h2 className="mt-3 font-serif text-3xl text-[var(--textDark)]">
                        Track incoming leads and follow-ups
                    </h2>
                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">
                        Review property inquiries, general contact messages, and owner submissions
                        in one place so follow-up does not depend on email alone.
                    </p>
                </div>
                <div className="rounded-[1.5rem] bg-[var(--background)] px-5 py-4 text-sm text-[var(--muted)]">
                    {inquiries.length} total lead{inquiries.length === 1 ? "" : "s"}
                </div>
            </div>

            {inquiries.length === 0 ? (
                <div className="mt-8 rounded-[1.5rem] border border-[#e9dfd3] bg-[var(--background)] px-6 py-10 text-center">
                    <h3 className="font-serif text-2xl text-[var(--textDark)]">No inquiries yet.</h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                        New contact messages and property inquiries will appear here once visitors
                        start using the site forms.
                    </p>
                </div>
            ) : (
                <div className="mt-8 grid gap-5">
                    {inquiries.map((inquiry) => (
                        <article
                            key={inquiry._id.toString()}
                            className="rounded-[1.75rem] border border-[#e9dfd3] bg-[var(--background)] p-5"
                        >
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="space-y-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="rounded-full bg-white px-3 py-1 text-xs tracking-[0.16em] text-[#8c7c6a]">
                                            {typeLabels[inquiry.type]}
                                        </span>
                                        {inquiry.property && (
                                            <span className="rounded-full bg-white px-3 py-1 text-xs tracking-[0.16em] text-[var(--darkSage)]">
                                                {inquiry.property}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-[var(--textDark)]">
                                            {getDisplaySubject(inquiry)}
                                        </h3>
                                        <p className="mt-1 text-sm text-[var(--muted)]">
                                            {inquiry.name} • {inquiry.email}
                                        </p>
                                    </div>

                                    <p className="max-w-3xl whitespace-pre-line text-sm leading-7 text-[var(--muted)]">
                                        {inquiry.message}
                                    </p>

                                    {inquiry.lastResponseMessage && (
                                        <div className="rounded-[1.25rem] border border-[#d9e6df] bg-white px-4 py-4">
                                            <p className="text-xs uppercase tracking-[0.16em] text-[#8c7c6a]">
                                                Last reply
                                            </p>
                                            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-[var(--muted)]">
                                                {inquiry.lastResponseMessage}
                                            </p>
                                            {inquiry.lastRespondedAt && (
                                                <p className="mt-2 text-xs text-[#8c7c6a]">
                                                    Sent {new Date(inquiry.lastRespondedAt).toLocaleString()}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                </div>

                                <div className="flex min-w-[13rem] flex-col gap-3">
                                    <p className="text-xs uppercase tracking-[0.18em] text-[#8c7c6a]">
                                        {new Date(inquiry.createdAt).toLocaleString()}
                                    </p>
                                    <InquiryStatusSelect
                                        id={inquiry._id.toString()}
                                        status={inquiry.status}
                                    />
                                    <InquiryReplyForm
                                        id={inquiry._id.toString()}
                                        email={inquiry.email}
                                        recipientName={inquiry.name}
                                        subject={getDisplaySubject(inquiry)}
                                    />
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
