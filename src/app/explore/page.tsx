import { ExploreClientLayout } from "@/components/explore/ExploreClientLayout";
import { getListings } from "@/app/actions/listing";

export const metadata = {
  title: "Explore Listings | Roommitra",
  description: "Hyperlocal search engine mapping live data specifically into your active radius boundary.",
};

export default async function ExplorePage() {
  const result = await getListings();
  const data = (result as any).data || [];
  const error = (result as any).error || null;

  return <ExploreClientLayout initialData={data} initialError={error} />;
}
