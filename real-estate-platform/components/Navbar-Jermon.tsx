"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [search, setSearch] = useState("");
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const query = search.trim();
        if (!query) return;
        router.push(`/rentals?search=${encodeURIComponent(query)}`);
        setMenuOpen(false);
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
                ? "bg-white/70 backdrop-blur-md shadow-sm py-4"
                : "bg-transparent py-6"
                }`}
        >
            <div className="max-w-6xl mx-auto px-8 flex justify-between items-center gap-6">
                <Link
                    href="/"
                    className="font-serif text-2xl tracking-[0.08em] text-[var(--textDark)] whitespace-nowrap"
                >
                    Jasmine Home
                </Link>

                <form
                    onSubmit={handleSearch}
                    className="hidden lg:flex flex-1 max-w-xs bg-white/90 rounded-full border border-gray-200 overflow-hidden"
                >
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search homes..."
                        className="flex-1 px-3 py-1.5 text-sm bg-transparent outline-none"
                    />
                    <button
                        type="submit"
                        className="px-5 text-sm bg-sage text-white hover:opacity-90 transition"
                    >
                        Search
                    </button>
                </form>

                <nav className="hidden md:flex gap-8 text-sm tracking-wide text-[var(--textDark)]">
                    <Link href="/">Home</Link>
                    <Link href="/rentals">Rentals</Link>
                    <Link href="/for-sale">For Sale</Link>
                    <Link href="/brokers">Brokers</Link>
                    <Link href="/about">About</Link>
                    <Link href="/list-your-property">List Your Property</Link>
                    <Link href="/contact">Contact</Link>
                </nav>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden flex flex-col gap-1"
                >
                    <span className="w-6 h-[2px] bg-[var(--textDark)]"></span>
                    <span className="w-6 h-[2px] bg-[var(--textDark)]"></span>
                    <span className="w-6 h-[2px] bg-[var(--textDark)]"></span>
                </button>
            </div>

            {menuOpen && (
                <div className="md:hidden bg-white shadow-md mt-4 px-6 py-6">
                    <div className="hidden lg:flex items-center flex-1 max-w-xs bg-white/90 rounded-full border border-gray-200 overflow-hidden">
                        <span className="pl-3 text-gray-400">🔍</span>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search homes..."
                            className="flex-1 px-2 py-1.5 text-sm bg-transparent outline-none"
                        />
                        <button className="px-4 text-sm bg-sage text-white">
                            Me
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-6 text-sm tracking-wide">
                        <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link href="/rentals" onClick={() => setMenuOpen(false)}>Rentals</Link>
                        <Link href="/for-sale" onClick={() => setMenuOpen(false)}>For Sale</Link>
                        <Link href="/brokers" onClick={() => setMenuOpen(false)}>Brokers</Link>
                        <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
                        <Link href="/list-your-property" onClick={() => setMenuOpen(false)}>List Your Property</Link>
                        <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                    </div>
                </div>
            )}
        </header>
    );
}