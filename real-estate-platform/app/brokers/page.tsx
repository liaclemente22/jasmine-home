import Link from "next/link";

const principles = [
    {
        title: "Curation",
        description:
            "We feature listings selectively, with stronger presentation and a clear standard for quality.",
    },
    {
        title: "Clarity",
        description:
            "Pricing, property details, and communication are handled with more transparency from first inquiry onward.",
    },
    {
        title: "Collaboration",
        description:
            "We work alongside brokers and owners with mutual respect, aligned expectations, and shared care for the listing.",
    },
];

const benefits = [
    "Boutique brand exposure",
    "Better-presented listings",
    "More intentional lead quality",
    "Thoughtful positioning and marketing",
    "A calmer long-term working relationship",
];

export default function BrokersPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] pt-32">
            <section className="px-8 pb-12">
                <div className="mx-auto max-w-6xl rounded-[2.25rem] border border-[#e9dfd3] bg-[linear-gradient(180deg,rgba(255,252,247,0.95)_0%,rgba(255,248,241,0.88)_100%)] px-6 py-12 shadow-[0_24px_60px_rgba(87,74,60,0.08)] md:px-10">
                    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
                        <div className="max-w-2xl">
                            <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">
                                For brokers and owners
                            </p>
                            <h1 className="mt-5 font-serif text-4xl leading-tight text-[var(--textDark)] md:text-6xl">
                                Thoughtful representation with clearer standards.
                            </h1>
                            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--muted)] md:text-lg">
                                Jasmine Home collaborates with brokers and property owners who value
                                trust, calm communication, and carefully curated listing presentation.
                            </p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[1.5rem] bg-white/78 p-5">
                                <p className="text-sm uppercase tracking-[0.22em] text-[#8c7c6a]">
                                    Best fit
                                </p>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                                    Partners who prefer quality positioning over high-volume exposure.
                                </p>
                            </div>
                            <div className="rounded-[1.5rem] bg-white/78 p-5">
                                <p className="text-sm uppercase tracking-[0.22em] text-[#8c7c6a]">
                                    Next step
                                </p>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                                    Share a property and we’ll review how it fits the brand.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-8 py-12">
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">
                            How we work
                        </p>
                        <h2 className="mt-5 font-serif text-4xl leading-tight text-[var(--textDark)]">
                            A more considered way to represent property.
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {principles.map((item) => (
                            <article
                                key={item.title}
                                className="rounded-[1.75rem] border border-[#e9dfd3] bg-white p-8 shadow-[0_18px_40px_rgba(87,74,60,0.06)]"
                            >
                                <h3 className="font-serif text-2xl text-[var(--textDark)]">
                                    {item.title}
                                </h3>
                                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                                    {item.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-[var(--beige)] px-8 py-20">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div className="max-w-md">
                        <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">
                            What you gain
                        </p>
                        <h2 className="mt-5 font-serif text-4xl leading-tight text-[var(--textDark)]">
                            Support that helps listings feel more intentional from the start.
                        </h2>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        {benefits.map((benefit) => (
                            <div
                                key={benefit}
                                className="rounded-[1.5rem] border border-white/70 bg-white/78 p-5"
                            >
                                <p className="text-sm leading-7 text-[var(--muted)]">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-8 py-20">
                <div className="mx-auto max-w-4xl rounded-[2rem] bg-[var(--darkSage)] px-8 py-12 text-center text-white shadow-[0_24px_60px_rgba(74,92,85,0.2)]">
                    <h2 className="font-serif text-4xl">Let’s represent homes the right way.</h2>
                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/85">
                        If you’re a broker or owner who values stronger presentation and calmer
                        collaboration, we’d love to hear about your property.
                    </p>
                    <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link
                            href="/list-your-property"
                            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm tracking-[0.18em] text-[var(--darkSage)] transition hover:opacity-90"
                        >
                            LIST YOUR PROPERTY
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full border border-white/30 px-8 py-3 text-sm tracking-[0.18em] text-white transition hover:bg-white/10"
                        >
                            CONTACT US
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
