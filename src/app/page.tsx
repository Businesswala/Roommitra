import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { CategoryNav } from "@/components/home/CategoryNav";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { TrustMetrics } from "@/components/home/TrustMetrics";
import { Footer } from "@/components/home/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors overflow-x-hidden">
      <Navbar />
      <Hero />
      <CategoryNav />
      <FeaturedListings />
      <TrustMetrics />
      <Footer />
    </main>
  );
}
