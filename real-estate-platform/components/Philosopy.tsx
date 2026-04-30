export default function Philosophy() {
    return (
        <section className="bg-[var(--beige)] px-6 py-24">
            <div className="mx-auto max-w-4xl text-center">
                <div>
                    <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">
                        Our philosophy
                    </p>
                    <h2 className="mt-5 font-serif text-4xl leading-tight text-[var(--textDark)] md:text-5xl">
                        Home search should feel grounded, not pressured.
                    </h2>
                </div>

                <p className="mx-auto mt-8 max-w-3xl text-lg leading-8 text-[var(--muted)] md:text-xl">
                    Jasmine Home believes the best property decisions happen when people feel
                    informed, calm, and genuinely understood. That means less pressure, fewer
                    volume-driven listings, and more attention to fit, timing, and everyday life.
                </p>
            </div>
        </section>
    );
}
