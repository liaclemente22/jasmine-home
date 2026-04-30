const policySections = [
    {
        title: "Information We Collect",
        body:
            "Jasmine Home may collect information you voluntarily submit through contact and inquiry forms, including your name, email address, and the message you send.",
    },
    {
        title: "How We Use Information",
        body:
            "Information submitted through the website is used to respond to inquiries, discuss listings, and provide support related to rentals, purchases, and property submissions.",
    },
    {
        title: "Data Sharing",
        body:
            "Jasmine Home does not sell personal information. Information may only be shared when reasonably necessary to respond to a property-related request or support a legitimate inquiry.",
    },
    {
        title: "Data Retention",
        body:
            "Submitted messages may be retained for follow-up, service continuity, and record-keeping related to inquiries and client communication.",
    },
    {
        title: "Your Choices",
        body:
            "If you want to update or request removal of information you submitted through the website, you may contact Jasmine Home directly through the contact page.",
    },
];

export default function PrivacyPolicyPage() {
    return (
        <main className="min-h-screen bg-[var(--background)] px-8 pb-24 pt-32">
            <div className="mx-auto max-w-5xl">
                <section className="rounded-[2.25rem] border border-[#e9dfd3] bg-[linear-gradient(180deg,rgba(255,252,247,0.95)_0%,rgba(255,248,241,0.88)_100%)] px-6 py-12 shadow-[0_24px_60px_rgba(87,74,60,0.08)] md:px-10">
                    <p className="text-xs uppercase tracking-[0.34em] text-[#8c7c6a]">Privacy Policy</p>
                    <h1 className="mt-5 font-serif text-4xl leading-tight text-[var(--textDark)] md:text-5xl">
                        How Jasmine Home handles information shared through the website.
                    </h1>
                    <p className="mt-6 max-w-3xl text-base leading-8 text-[var(--muted)] md:text-lg">
                        This page explains, in general terms, what information may be collected
                        through forms on the site and how that information is used to respond to property-related inquiries.
                    </p>
                </section>

                <section className="mt-12 rounded-[2rem] border border-[#e9dfd3] bg-white p-8 shadow-[0_18px_40px_rgba(87,74,60,0.05)] md:p-10">
                    <div className="grid gap-8">
                        {policySections.map((section) => (
                            <div key={section.title}>
                                <h2 className="font-serif text-2xl text-[var(--textDark)]">{section.title}</h2>
                                <p className="mt-3 text-sm leading-7 text-[var(--muted)] md:text-base">
                                    {section.body}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
