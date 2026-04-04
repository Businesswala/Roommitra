import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  try {
    const { listerId, status } = await req.json();

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json({ error: "Invalid status payload" }, { status: 400 });
    }

    return NextResponse.json({ success: true, user: { id: listerId, status } });
  } catch (error: any) {
    console.error("Admin Status Mutation Error:", error);
    return NextResponse.json({ error: "Failed to locate and patch database record." }, { status: 500 });
  }
}
