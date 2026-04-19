'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function GetConversations(userId: string) {
  try {
    const user = await prisma.profile.findUnique({
      where: { supabaseId: userId }
    })

    if (!user) return []

    const conversations = await prisma.conversation.findMany({
      where: {
        OR: [
          { userId: user.id },
          { listerId: user.id }
        ]
      },
      include: {
        user: true,
        lister: true,
        listing: true,
        messages: {
          orderBy: { timestamp: 'desc' },
          take: 1
        }
      },
      orderBy: { updatedAt: 'desc' }
    })

    return conversations
  } catch (error) {
    console.error('Error fetching conversations:', error)
    return []
  }
}

export async function GetMessages(conversationId: string) {
  try {
    const messages = await prisma.message.findMany({
      where: { conversationId },
      orderBy: { timestamp: 'asc' }
    })
    return messages
  } catch (error) {
    console.error('Error fetching messages:', error)
    return []
  }
}

export async function SendMessage(data: {
  conversationId: string
  senderId: string
  receiverId: string
  message: string
}) {
  try {
    const newMessage = await prisma.message.create({
      data: {
        conversationId: data.conversationId,
        senderId: data.senderId,
        receiverId: data.receiverId,
        message: data.message,
        status: 'sent'
      }
    })

    // Update conversation's updatedAt
    await prisma.conversation.update({
      where: { id: data.conversationId },
      data: { updatedAt: new Date() }
    })

    revalidatePath('/messages')
    return { success: true, message: newMessage }
  } catch (error: any) {
    console.error('Error sending message:', error)
    return { success: false, error: error.message }
  }
}

export async function CreateConversation(data: {
  userId: string
  listerId: string
  listingId?: string
}) {
  try {
    // Check if conversation already exists
    const existing = await prisma.conversation.findFirst({
      where: {
        userId: data.userId,
        listerId: data.listerId,
        listingId: data.listingId
      }
    })

    if (existing) return existing

    const conversation = await prisma.conversation.create({
      data: {
        userId: data.userId,
        listerId: data.listerId,
        listingId: data.listingId
      }
    })

    revalidatePath('/messages')
    return conversation
  } catch (error) {
    console.error('Error creating conversation:', error)
    return null
  }
}