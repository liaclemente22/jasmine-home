import Link from "next/link";
import AdminLogoutButton from "@/components/admin/AdminLogoutButton";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="min-h-screen bg-[var(--background)] px-4 pb-16 pt-28 sm:px-6 sm:pt-32 md:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="mb-8 flex flex-col gap-4 rounded-[2rem] border border-[#e9dfd3] bg-white px-5 py-5 shadow-[0_18px_40px_rgba(87,74,60,0.05)] sm:px-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-xs uppercase tracking-[0.32em] text-[#8c7c6a]">
                            Admin
                        </p>
                        <h1 className="mt-2 font-serif text-2xl text-[var(--textDark)] sm:text-3xl">
                            Listing Management
                        </h1>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                        <Link
                            href="/admin/properties"
                            className="rounded-full bg-[var(--background)] px-4 py-2 text-center text-xs tracking-[0.18em] text-[var(--textDark)]"
                        >
                            PROPERTIES
                        </Link>
                        <Link
                            href="/admin/inquiries"
                            className="rounded-full bg-[var(--background)] px-4 py-2 text-center text-xs tracking-[0.18em] text-[var(--textDark)]"
                        >
                            INQUIRIES
                        </Link>
                        <Link
                            href="/admin/properties/new"
                            className="rounded-full bg-[var(--darkSage)] px-4 py-2 text-center text-xs tracking-[0.18em] text-white"
                        >
                            NEW LISTING
                        </Link>
                        <AdminLogoutButton />
                    </div>
                </div>

                {children}
            </div>
        </main>
    );
}
