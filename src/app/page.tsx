import { FeaturesGrid } from "@/components/landing/features-grid";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { Navbar } from "@/components/landing/navbar";
import Image from "next/image";

export default function Home() {
  return(

  <div>
    <Navbar />
    <main className="pt-4">
      <HeroSection />
      <FeaturesGrid />
    </main>
    <Footer />
  </div>
  )
}
