const termsSections = [
    {
        title: "Website Use",
        body:
            "The Jasmine Home website is provided for general informational purposes related to property listings, inquiries, and brand services.",
    },
    {
        title: "Property Information",
        body:
            "While care is taken in presenting property information, availability, pricing, status, and details may change over time. Users should confirm important information directly before making decisions.",
    },
    {
        title: "Inquiries and Communication",
        body:
            "Submitting a form or inquiry through the website does not create a formal brokerage, agency, or contractual relationship by itself.",
    },
    {
        title: "Third-Party Reliance",
        body:
            "Users should not rely solely on website content for financial, legal, or property decisions. Independent verification and professional advice may still be necessary.",
    },
    {
        title: "Changes",
        body:
            "Jasmine Home may update listings, pages, and website terms over time to reflect business, property, or service changes.",
    },
];

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] px-8 pb-24 pt-32">
            <div className="mx-auto max-w-5xl">
                <section className="rounded-[2.25rem] border border-[#e9dfd3] bg-[linear-gradient(180deg,rgba(255,252,247,0.95)_0%,rgba(255,248,241,0.88)_100%)] px-6 py-12 shadow-[0_24px_60px_rgba(87,74,60,0.08)] md:px-10">
                    <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">Terms of Use</p>
                    <h1 className="mt-5 font-serif text-4xl leading-tight text-[var(--textDark)] md:text-5xl">
                        General terms for using the Jasmine Home website and its property content.
                    </h1>
                    <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)] md:text-lg">
                        These terms provide a simple overview of how the website content should be
                        used and what users should keep in mind when browsing listings and submitting inquiries.
                    </p>
                </section>

                <section className="mt-12 rounded-[2rem] border border-[#e9dfd3] bg-white p-8 shadow-[0_18px_40px_rgba(87,74,60,0.05)] md:p-10">
                    <div className="grid gap-8">
                        {termsSections.map((section) => (
                            <div key={section.title}>
                                <h2 className="font-serif text-2xl text-[var(--textDark)]">{section.title}</h2>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted)] md:text-base">
                                    {section.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
