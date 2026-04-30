import Link from "next/link";
import Image from "next/image";

const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/rentals", label: "Rentals" },
    { href: "/for-sale", label: "For Sale" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

const serviceLinks = [
    { href: "/list-your-property", label: "List Your Property" },
    { href: "/brokers", label: "For Brokers" },
    { href: "/faq", label: "FAQ" },
];

const legalLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms of Use" },
];

export default function Footer() {
    return (
        <footer className="border-t border-[#e8ddd0] bg-[var(--background)] px-8 py-16">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
                    <div className="max-w-sm">
                        <Link
                            href="/"
                            className="relative inline-flex h-24 w-[220px] overflow-hidden"
                        >
                            <Image
                                src="/logo3.png"
                                alt="Jasmine Home"
                                fill
                                className="object-contain scale-[2.2]"
                            />
                        </Link>
                        <p className="mt-5 text-sm leading-7 text-[var(--muted)]">
                            A calmer, more thoughtful real estate experience for renters, buyers,
                            property owners, and brokers across the Philippines.
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#8c7c6a]">
                            Explore
                        </p>
                        <div className="mt-5 flex flex-col gap-3 text-sm text-[var(--muted)]">
                            {quickLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="hover:text-[var(--textDark)]">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#8c7c6a]">
                            Services
                        </p>
                        <div className="mt-5 flex flex-col gap-3 text-sm text-[var(--muted)]">
                            {serviceLinks.map((link) => (
                                <Link key={link.href} href={link.href} className="hover:text-[var(--textDark)]">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-[#8c7c6a]">
                            Contact
                        </p>
                        <div className="mt-5 space-y-3 text-sm text-[var(--muted)]">
                            <p>Inquiries welcome via the contact page.</p>
                            <Link href="/contact" className="inline-flex text-[var(--darkSage)] hover:translate-x-1 transition">
                                Get in touch
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col gap-4 border-t border-[#e8ddd0] pt-6 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
                    <p>© 2026 Jasmine Home. All rights reserved.</p>
                    <div className="flex flex-wrap gap-4">
                        {legalLinks.map((link) => (
                            <Link key={link.href} href={link.href} className="hover:text-[var(--textDark)]">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
