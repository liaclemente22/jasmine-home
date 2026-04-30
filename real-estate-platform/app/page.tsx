import type { Metadata } from "next";
import Hero from "@/components/Hero";
import OfferSection from "@/components/OfferSection";
import Philosophy from "@/components/Philosopy";
import FeaturedHomes from "@/components/FeaturedHomes";
import BrokerCTA from "@/components/BrokerCTA";
import FadeSection from "@/components/FadeSection";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover curated rentals and homes for sale in the Philippines with Jasmine Home.",
};

export default function Home() {
  return (
    <main className="pt-24">
      <Hero />

      <FadeSection>
        <OfferSection />
      </FadeSection>

      <FadeSection>
        <Philosophy />
      </FadeSection>

      <FadeSection>
        <FeaturedHomes />
      </FadeSection>

      <FadeSection>
        <BrokerCTA />
      </FadeSection>
    </main >
  );
}
