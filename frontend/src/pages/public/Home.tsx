import { CTASection } from "@/features/public/components/CTASection";
import { Footer } from "@/features/public/components/Footer";
import { HeroSection } from "@/features/public/components/HeroSection";
import { Navbar } from "@/features/public/components/Navbar";

export default function Home() {
  return (
    <>
      <main className="py-16">
        <HeroSection />
        <CTASection />
      </main>
    </>
  );
}
