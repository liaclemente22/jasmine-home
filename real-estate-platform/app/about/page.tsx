import Link from "next/link";

const values = [
    "Listening before advising",
    "Clear and honest communication",
    "Respecting your timeline",
    "Building long-term relationships",
];

const audiences = [
    {
        title: "Renters",
        description:
            "Individuals and families looking for a space that feels genuinely suited to the way they live.",
    },
    {
        title: "Buyers",
        description:
            "People seeking long-term value, calm guidance, and more confidence through the decision process.",
    },
    {
        title: "Property Owners",
        description:
            "Owners who want careful representation, stronger presentation, and better-fit inquiries.",
    },
];

const steps = [
    {
        title: "Listen",
        description: "We begin by understanding your goals, timing, and preferences.",
    },
    {
        title: "Curate",
        description: "We recommend homes and options with more attention to fit than volume.",
    },
    {
        title: "Guide",
        description: "We stay alongside you through questions, viewings, and next decisions.",
    },
];

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] pt-32 text-[var(--textDark)]">
            <section className="px-8 pb-12">
                <div className="mx-auto max-w-6xl rounded-[2.25rem] border border-[#e9dfd3] bg-[linear-gradient(180deg,rgba(255,252,247,0.95)_0%,rgba(255,248,241,0.88)_100%)] px-6 py-12 shadow-[0_24px_60px_rgba(87,74,60,0.08)] md:px-10">
                    <div className="max-w-3xl">
                        <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">
                            About Jasmine Home
                        </p>
                        <h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">
                            Finding a home should feel calm, not complicated.
                        </h1>
                        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
                            Jasmine Home was created to bring clarity and care back into the real
                            estate experience. We take time to understand your needs, your pace,
                            and your priorities so the process feels steadier and more human.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-[var(--beige)] px-8 py-20">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-start">
                    <div>
                        <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">
                            Our approach
                        </p>
                        <h2 className="mt-5 font-serif text-4xl leading-tight">
                            Quality over pressure. Fit over volume.
                        </h2>
                        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
                            We do not believe in pushing listings or rushing decisions. Every
                            recommendation is made with long-term comfort, clarity, and real-life
                            practicality in mind.
                        </p>
                        <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--muted)] md:text-lg">
                            By partnering with trusted owners and brokers, we focus on thoughtful
                            matching and stronger presentation so homes feel right, not forced.
                        </p>
                    </div>

                    <div className="rounded-[2rem] border border-white/70 bg-white/78 p-8 shadow-[0_18px_40px_rgba(87,74,60,0.06)]">
                        <p className="text-xs uppercase tracking-[0.3em] text-[#8c7c6a]">
                            What we value
                        </p>
                        <div className="mt-6 grid gap-4">
                            {values.map((value) => (
                                <div
                                    key={value}
                                    className="rounded-[1.25rem] border border-[#eee4d8] bg-[var(--background)] px-5 py-4 text-sm leading-7 text-[var(--muted)]"
                                >
                                    {value}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-8 py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">
                            Who we serve
                        </p>
                        <h2 className="mt-5 font-serif text-4xl leading-tight">
                            Support for renters, buyers, and owners at different stages.
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {audiences.map((audience) => (
                            <article
                                key={audience.title}
                                className="rounded-[1.75rem] border border-[#e9dfd3] bg-white p-8 shadow-[0_18px_40px_rgba(87,74,60,0.06)]"
                            >
                                <h3 className="font-serif text-2xl">{audience.title}</h3>
                                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                                    {audience.description}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-8 py-20">
                <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#e9dfd3] bg-white p-8 shadow-[0_18px_40px_rgba(87,74,60,0.06)] md:p-10">
                    <div className="max-w-2xl">
                        <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">
                            How we work
                        </p>
                        <h2 className="mt-5 font-serif text-4xl leading-tight">
                            A simple process that stays personal.
                        </h2>
                    </div>

                    <div className="mt-12 grid gap-6 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <div key={step.title} className="rounded-[1.5rem] bg-[var(--background)] p-6">
                                <p className="text-sm uppercase tracking-[0.22em] text-[#8c7c6a]">
                                    {String(index + 1).padStart(2, "0")}
                                </p>
                                <h3 className="mt-3 font-serif text-2xl">{step.title}</h3>
                                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-8 py-20">
                <div className="mx-auto max-w-4xl rounded-[2rem] bg-[var(--darkSage)] px-8 py-12 text-center text-white shadow-[0_24px_60px_rgba(74,92,85,0.2)]">
                    <h2 className="font-serif text-4xl">Work with Jasmine Home</h2>
                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/85">
                        Whether you&apos;re still exploring or ready to move forward, we’re here to
                        guide you with patience, clarity, and thoughtful recommendations.
                    </p>
                    <Link
                        href="/contact"
                        className="mt-8 inline-flex items-center justify-center rounded-full bg-white px-8 py-3 text-sm tracking-[0.18em] text-[var(--darkSage)] transition hover:opacity-90"
                    >
                        GET IN TOUCH
                    </Link>
                </div>
            </section>
        </main>
    );
}
