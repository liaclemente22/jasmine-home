import Image from "next/image";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative isolate overflow-hidden bg-[var(--background)] px-4 pb-16 pt-28 sm:px-6 md:px-10 md:pb-20 md:pt-36">

            {/* Background Image */}
            <div className="absolute inset-0 -z-20">
                <Image
                    src="/hero11.jpg"
                    alt="Jasmine Home Interior"
                    fill
                    priority
                    className="object-cover scale-105"
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,250,244,0.42),transparent_38%),linear-gradient(100deg,rgba(96,74,56,0.38)_10%,rgba(158,130,104,0.2)_38%,rgba(245,243,239,0.22)_70%,rgba(255,252,248,0.42)_100%)]" />
            </div>

            <div className="absolute inset-x-0 top-16 -z-10 mx-auto h-80 max-w-5xl rounded-full bg-[var(--beige)]/70 blur-3xl" />
            <div className="absolute left-0 top-0 -z-10 h-full w-full bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_25%,rgba(96,74,56,0.07)_100%)]" />

            <div className="mx-auto grid min-h-[78vh] max-w-6xl items-center gap-8 sm:gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
                <div className="max-w-3xl">
                    <div className="inline-flex items-center gap-3 rounded-full border border-white/22 bg-white/18 px-4 py-2 text-xs uppercase tracking-[0.32em] text-[#fff8f2] shadow-sm backdrop-blur-sm">
                        <span className="h-px w-6 bg-[#dcc3a4]" />
                        Calm, curated living
                    </div>

                    <h1 className="mt-8 max-w-2xl font-serif text-4xl leading-[0.95] tracking-[0.01em] text-[#fffaf5] drop-shadow-[0_12px_26px_rgba(45,30,20,0.12)] sm:text-6xl md:text-7xl">
                        Luxury spaces, presented with warmth, light, and quiet confidence.
                    </h1>

                    <p className="mt-6 max-w-xl text-base leading-7 text-[#fff0e5]/92 sm:text-lg sm:leading-8 md:text-xl">
                        Jasmine Home curates refined rentals, homes for sale, and owner listings
                        through a polished experience that still feels warm, personal, and serene.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-3 text-sm text-[#fff8f2]">
                        <span className="rounded-full border border-white/18 bg-white/16 px-4 py-2 shadow-sm backdrop-blur-sm">
                            Curated homes
                        </span>
                        <span className="rounded-full border border-white/18 bg-white/16 px-4 py-2 shadow-sm backdrop-blur-sm">
                            Verified listings
                        </span>
                        <span className="rounded-full border border-white/18 bg-white/16 px-4 py-2 shadow-sm backdrop-blur-sm">
                            Owner support
                        </span>
                    </div>

                    <div className="mt-10 rounded-[2rem] border border-white/28 bg-[rgba(255,250,245,0.24)] p-4 shadow-[0_26px_60px_rgba(67,48,34,0.12)] backdrop-blur-xl sm:p-5">
                        <div className="px-2 pb-4">
                            <p className="text-xs uppercase tracking-[0.28em] text-[#f0dcc4]">
                                Start your search
                            </p>
                            <p className="mt-2 text-sm text-[#fff4e9]/82">
                                Explore rentals by city, area, or property name.
                            </p>
                        </div>

                        <form
                            action="/rentals"
                            method="GET"
                            className="flex flex-col gap-3 sm:flex-row"
                        >
                            <input
                                type="text"
                                name="search"
                                placeholder="Search by city, area, or property..."
                                className="min-h-14 flex-1 rounded-full border border-white/14 bg-[rgba(255,252,248,0.94)] px-6 text-sm text-[#3a2d24] outline-none transition placeholder:text-[#8d7b6d] focus:border-[#dcc3a4]"
                            />
                            <button
                                type="submit"
                                className="min-h-14 w-full rounded-full bg-[#dfc4a3] px-8 text-sm tracking-[0.18em] text-[#34261d] transition hover:translate-y-[-1px] hover:bg-[#ead3ba] sm:w-auto"
                            >
                                SEARCH
                            </button>
                        </form>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                        <Link
                            href="/for-sale"
                            className="inline-flex w-full items-center justify-center rounded-full bg-[#dfc4a3] px-8 py-4 text-sm tracking-[0.2em] text-[#34261d] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_18px_34px_rgba(67,48,34,0.16)] sm:w-auto"
                        >
                            FIND A HOME
                        </Link>

                        <Link
                            href="/list-your-property"
                            className="inline-flex w-full items-center justify-center rounded-full border border-white/24 bg-white/14 px-8 py-4 text-sm tracking-[0.2em] text-[#fff9f4] transition-all duration-300 hover:bg-white/22 hover:shadow-[0_18px_34px_rgba(67,48,34,0.12)] sm:w-auto"
                        >
                            LIST YOUR PROPERTY
                        </Link>
                    </div>
                </div>

                <div className="lg:justify-self-end">
                    <div className="overflow-hidden rounded-[2rem] border border-white/24 bg-[rgba(98,73,53,0.2)] shadow-[0_24px_52px_rgba(67,48,34,0.16)] backdrop-blur-xl">
                        <div className="relative h-56 overflow-hidden border-b border-white/10 sm:h-64">
                            <Image
                                src="/property1.jpg"
                                alt="Featured luxury interior"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,240,0.12),rgba(76,58,43,0.34))]" />
                            <div className="absolute inset-x-0 bottom-0 p-6 text-[#fffaf4]">
                                <p className="text-xs uppercase tracking-[0.3em] text-[#f1deca]">
                                    Featured collection
                                </p>
                                <h2 className="mt-3 font-serif text-3xl leading-tight">
                                    Spaces that sell a lifestyle before a floor plan
                                </h2>
                            </div>
                        </div>

                        <div className="grid gap-4 px-6 py-6 sm:grid-cols-3 lg:grid-cols-1">
                            <div className="rounded-[1.5rem] border border-white/10 bg-white/14 p-5">
                                <p className="text-3xl font-semibold text-[#fff1de]">Refined</p>
                                <p className="mt-2 text-sm leading-6 text-[#fff2e6]/84">
                                    presentation that feels premium without becoming visually heavy
                                </p>
                            </div>

                            <div className="rounded-[1.5rem] border border-white/10 bg-white/14 p-5">
                                <p className="text-3xl font-semibold text-[#fff1de]">Selective</p>
                                <p className="mt-2 text-sm leading-6 text-[#fff2e6]/84">
                                    a more curated visual identity that elevates listings at first glance
                                </p>
                            </div>

                            <div className="rounded-[1.5rem] border border-white/10 bg-white/14 p-5">
                                <p className="text-3xl font-semibold text-[#fff1de]">Personal</p>
                                <p className="mt-2 text-sm leading-6 text-[#fff2e6]/84">
                                    guidance that keeps the journey warm, clear, and high touch
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-white/12 bg-[rgba(255,250,245,0.12)] px-6 py-5 text-sm leading-7 text-[#fff2e6]/86">
                            Jasmine Home balances editorial polish with warmer light, so the
                            experience feels elevated, inviting, and easier to step into.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
