import { NextResponse } from 'next/server';
import { prisma as db } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    // @ts-ignore - Prisma types are being stubborn in build
    const messages = await db.message.findMany({
      where: {
        conversationId: id
      },
      orderBy: {
        timestamp: 'asc'
      }
    });

    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

