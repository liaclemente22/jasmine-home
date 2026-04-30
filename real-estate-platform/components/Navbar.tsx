"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
    { href: "/", label: "Home" },
    { href: "/listings", label: "Listings" },
    { href: "/rentals", label: "Rentals" },
    { href: "/for-sale", label: "For Sale" },
    { href: "/brokers", label: "Brokers" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === "/";
        }

        return pathname.startsWith(href);
    };

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6">
            <div
                className={`mx-auto max-w-6xl rounded-full border transition-all duration-300 ${scrolled
                    ? "border-[rgba(90,72,55,0.12)] bg-[rgba(255,250,244,0.82)] shadow-[0_18px_45px_rgba(61,45,32,0.12)] backdrop-blur-xl"
                    : "border-white/30 bg-[rgba(255,250,244,0.28)] backdrop-blur-md"
                    }`}
            >
                <div className="flex items-center justify-between gap-4 px-5 py-3 md:px-6 lg:px-7">
                    <Link
                        href="/"
                        className="relative block h-14 w-[170px] shrink-0 overflow-hidden md:h-16 md:w-[190px] lg:w-[205px]"
                    >
                        <Image
                            src="/logo3.png"
                            alt="Jasmine Home"
                            fill
                            priority
                            className="object-contain scale-[2.45]"
                        />
                    </Link>

                    <nav className="hidden items-center gap-0.5 md:flex md:flex-1 md:justify-center lg:gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`whitespace-nowrap rounded-full px-3 py-2 text-xs tracking-[0.14em] transition-colors duration-200 lg:px-4 lg:text-sm ${isActive(link.href)
                                    ? "bg-[rgba(74,92,85,0.1)] text-[var(--darkSage)]"
                                    : "text-[var(--textDark)]/78 hover:bg-white/60 hover:text-[var(--textDark)]"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center justify-end gap-3 md:flex md:min-w-[190px] lg:min-w-[210px]">
                        <Link
                            href="/list-your-property"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-[var(--darkSage)] px-4 py-3 text-[11px] tracking-[0.18em] text-white transition duration-300 hover:bg-[#394842] hover:shadow-[0_14px_30px_rgba(74,92,85,0.2)] lg:px-5 lg:text-xs"
                        >
                            LIST YOUR PROPERTY
                        </Link>
                    </div>

                    <button
                        type="button"
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={menuOpen}
                        onClick={() => setMenuOpen((open) => !open)}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--darkSage)]/12 bg-white/60 text-[var(--textDark)] backdrop-blur-sm md:hidden"
                    >
                        <span className="relative h-4 w-5">
                            <span
                                className={`absolute left-0 top-0 h-[2px] w-5 bg-current transition-all duration-300 ${menuOpen ? "top-[7px] rotate-45" : ""
                                    }`}
                            />
                            <span
                                className={`absolute left-0 top-[7px] h-[2px] w-5 bg-current transition-all duration-300 ${menuOpen ? "opacity-0" : "opacity-100"
                                    }`}
                            />
                            <span
                                className={`absolute left-0 top-[14px] h-[2px] w-5 bg-current transition-all duration-300 ${menuOpen ? "top-[7px] -rotate-45" : ""
                                    }`}
                            />
                        </span>
                    </button>
                </div>

                {menuOpen && (
                    <div className="border-t border-[var(--darkSage)]/8 px-5 pb-5 pt-4 md:hidden">
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`rounded-2xl px-4 py-3 text-sm tracking-[0.14em] transition-colors duration-200 ${isActive(link.href)
                                        ? "bg-[rgba(74,92,85,0.1)] text-[var(--darkSage)]"
                                        : "bg-white/42 text-[var(--textDark)] hover:bg-white/70"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <Link
                            href="/list-your-property"
                            className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-[var(--darkSage)] px-5 py-3 text-sm tracking-[0.18em] text-white transition duration-300 hover:bg-[#394842]"
                        >
                            LIST YOUR PROPERTY
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
