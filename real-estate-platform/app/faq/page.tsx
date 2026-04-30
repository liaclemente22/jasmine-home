const faqSections = [
    {
        title: "Renting",
        items: [
            {
                question: "How do I inquire about a rental property?",
                answer:
                    "You can open the rental listing and send an inquiry through the property form, or contact Jasmine Home directly through the contact page.",
            },
            {
                question: "Can I filter rentals by budget and location?",
                answer:
                    "Yes. The rentals page supports filtering by location, bedroom count, and monthly budget so you can narrow the search more easily.",
            },
        ],
    },
    {
        title: "Buying",
        items: [
            {
                question: "Do you only handle homes for sale listed on the website?",
                answer:
                    "The website highlights active listings, but Jasmine Home can also guide buyers through inquiries, viewings, and next-step discussions around suitable properties.",
            },
            {
                question: "Can I ask about financing before scheduling a viewing?",
                answer:
                    "Yes. If you are exploring financing or affordability first, you can use the inquiry form or contact page to start that conversation.",
            },
        ],
    },
    {
        title: "Listing Your Property",
        items: [
            {
                question: "Who can submit a property?",
                answer:
                    "Property owners and broker partners can submit listings for review through the List Your Property page.",
            },
            {
                question: "What kinds of listings are the best fit?",
                answer:
                    "Listings that are well-maintained, clearly documented, and aligned with the brand’s more curated, quality-first presentation are the strongest fit.",
            },
        ],
    },
    {
        title: "General",
        items: [
            {
                question: "How long does it take to receive a reply?",
                answer:
                    "Jasmine Home typically responds to inquiries within 24 to 48 hours, depending on the request.",
            },
            {
                question: "Do you work with brokers?",
                answer:
                    "Yes. Jasmine Home collaborates with brokers who value clarity, professionalism, and thoughtful listing representation.",
            },
        ],
    },
];

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] px-8 pb-24 pt-32">
            <div className="mx-auto max-w-6xl">
                <section className="rounded-[2.25rem] border border-[#e9dfd3] bg-[linear-gradient(180deg,rgba(255,252,247,0.95)_0%,rgba(255,248,241,0.88)_100%)] px-6 py-12 shadow-[0_24px_60px_rgba(87,74,60,0.08)] md:px-10">
                    <div className="max-w-3xl">
                        <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">FAQ</p>
                        <h1 className="mt-5 font-serif text-4xl leading-tight text-[var(--textDark)] md:text-6xl">
                            Answers to common questions about renting, buying, and listing.
                        </h1>
                        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
                            A quick guide to how Jasmine Home works and what to expect as a renter,
                            buyer, owner, or broker partner.
                        </p>
                    </div>
                </section>

                <section className="mt-12 grid gap-8">
                    {faqSections.map((section) => (
                        <div key={section.title} className="rounded-[2rem] border border-[#e9dfd3] bg-white p-8 shadow-[0_18px_40px_rgba(87,74,60,0.05)]">
                            <h2 className="font-serif text-3xl text-[var(--textDark)]">{section.title}</h2>
                            <div className="mt-8 grid gap-5">
                                {section.items.map((item) => (
                                    <div key={item.question} className="rounded-[1.5rem] bg-[var(--background)] p-6">
                                        <h3 className="text-lg font-medium text-[var(--textDark)]">{item.question}</h3>
                                        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
}
