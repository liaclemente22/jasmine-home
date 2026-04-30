import Link from "next/link";

const offers = [
    {
        title: "Rentals",
        eyebrow: "Flexible living",
        description:
            "Condos and houses matched to your lifestyle, budget, and timeline with a clearer, more thoughtful search experience.",
        href: "/rentals",
        cta: "Browse Rentals",
    },
    {
        title: "Homes for Sale",
        eyebrow: "Long-term moves",
        description:
            "Partnered listings from trusted owners and brokers, presented with care so buyers can compare with more confidence.",
        href: "/for-sale",
        cta: "View Homes",
    },
    {
        title: "List Your Property",
        eyebrow: "Owner support",
        description:
            "A polished listing experience for owners who want their property positioned with warmth, clarity, and premium presentation.",
        href: "/list-your-property",
        cta: "Start Listing",
    },
];

export default function OfferSection() {
    return (
        <section className="bg-[var(--background)] px-8 py-24">
            <div className="mx-auto max-w-6xl">
                <div className="max-w-2xl">
                    <div className="max-w-xl">
                        <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">
                            What we offer
                        </p>
                        <h2 className="mt-5 font-serif text-4xl leading-tight text-[var(--textDark)] md:text-5xl">
                            Real estate guidance shaped with clarity, warmth, and care.
                        </h2>
                        <p className="mt-6 text-base leading-8 text-[var(--muted)] md:text-lg">
                            Whether someone is renting, buying, or preparing a listing, Jasmine Home
                            creates a calmer path through decisions that usually feel overwhelming.
                        </p>
                    </div>
                </div>

                <div className="mt-14 grid gap-6 md:grid-cols-3">
                    {offers.map((offer) => (
                        <article
                            key={offer.title}
                            className="group flex h-full flex-col rounded-[1.75rem] border border-[#e9dfd3] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(87,74,60,0.08)]"
                        >
                            <p className="text-xs uppercase tracking-[0.32em] text-[#8c7c6a]">
                                {offer.eyebrow}
                            </p>
                            <h3 className="mt-5 font-serif text-2xl text-[var(--textDark)]">
                                {offer.title}
                            </h3>
                            <p className="mt-4 flex-1 text-sm leading-7 text-[var(--muted)] md:text-[15px]">
                                {offer.description}
                            </p>
                            <Link
                                href={offer.href}
                                className="mt-8 inline-flex items-center text-sm tracking-[0.18em] text-[var(--darkSage)] transition duration-200 group-hover:translate-x-1"
                            >
                                {offer.cta}
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
