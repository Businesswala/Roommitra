import { NextResponse } from 'next/server';
import db from '../../../../../prisma.config';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { conversationId, senderId, message, type = 'text' } = body;

    if (!conversationId || !senderId || !message) {
      return NextResponse.json({ success: false, message: 'Missing fields' }, { status: 400 });
    }

    // Fetch conversation to determine the receiver
    const conversation = await db.conversation.findUnique({
      where: { id: conversationId }
    });

    if (!conversation) {
      return NextResponse.json({ success: false, message: 'Conversation not found' }, { status: 404 });
    }

    const receiverId = conversation.userId === senderId ? conversation.listerId : conversation.userId;

    const newMessage = await db.message.create({
      data: {
        conversationId,
        senderId,
        receiverId,
        message,
        type,
      }
    });

    // Update conversation timestamp
    await db.conversation.update({
      where: { id: conversationId },
      data: { updatedAt: new Date() }
    });

    return NextResponse.json({ success: true, message: newMessage });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
