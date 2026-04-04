import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // In Production:
    // const newListing = await prisma.listing.create({ data });

    console.log("Mock Intercepted Created Listing Data: ", data);

    return NextResponse.json({ success: true, listingId: "mock-uuid-889" });
  } catch (err: any) {
    return NextResponse.json({ error: "Failed to allocate listing inside database" }, { status: 500 });
  }
}
