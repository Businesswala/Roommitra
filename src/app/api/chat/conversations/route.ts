import { NextResponse } from 'next/server';
import { prisma as db } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // In a real app, extract user/lister ID from session
    // const session = await getServerSession(authOptions);
    // const userId = session.user.id;
    
    // For now, return empty or mock
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const listerId = searchParams.get('listerId');

    // @ts-ignore - Prisma types are being stubborn in build
    const conversations = await db.conversation.findMany({
      where: {
        OR: [
          { userId: userId || undefined },
          { listerId: listerId || undefined }
        ]
      },
      include: {
        messages: {
          orderBy: { timestamp: 'desc' },
          take: 1
        },
        user: { select: { name: true, profilePhoto: true } },
        lister: { select: { name: true, profilePhoto: true } }
      },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json({ success: true, conversations });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
