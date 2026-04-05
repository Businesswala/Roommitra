import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { CategoryNav } from "@/components/home/CategoryNav";
import { FeaturedListings } from "@/components/home/FeaturedListings";
import { TrustMetrics } from "@/components/home/TrustMetrics";
import { Footer } from "@/components/home/Footer";
import db from "@/lib/prisma";

export default async function Home() {
  const listings = await (db as any).listing.findMany({
    where: { status: "APPROVED" },
    orderBy: { createdAt: "desc" },
    take: 8,
  });

  return (
    <main className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors overflow-x-hidden">
      <Navbar />
      <Hero />
      <CategoryNav />
      <FeaturedListings listings={listings} />
      <TrustMetrics />
      <Footer />
    </main>
  );
}
