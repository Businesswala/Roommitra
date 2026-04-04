import { NextResponse } from 'next/server';
import db from '../../../../../../prisma.config';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

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

