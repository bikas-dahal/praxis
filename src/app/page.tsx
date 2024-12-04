import { FeaturesGrid } from "@/components/landing/features-grid";
import { Footer } from "@/components/landing/footer";
import { HeroSection } from "@/components/landing/hero-section";
import { Navbar } from "@/components/landing/navbar";

export default function Home() {
  return(

  <div className="">
    <Navbar />
    <main className="pt-4">
      <HeroSection />
      <FeaturesGrid />
    </main>
    <Footer />
  </div>
  )
}
