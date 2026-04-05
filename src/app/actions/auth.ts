'use server'

import prisma from '@/lib/prisma'
import { Role } from '@prisma/client'

export async function RegisterProfile(data: {
  supabaseId: string
  email: string
  name: string
  mobile: string
  role: 'USER' | 'LISTER'
  businessName?: string
  documentUrl?: string
}) {
  try {
    const profile = await prisma.profile.create({
      data: {
        supabaseId: data.supabaseId,
        email: data.email,
        name: data.name,
        mobile: data.mobile,
        role: data.role as Role,
        businessName: data.businessName,
        documentUrl: data.documentUrl,
        status: data.role === 'LISTER' ? 'PENDING' : 'ACTIVE',
      },
    })

    return { success: true, profile }
  } catch (error: any) {
    console.error('Error creating profile:', error)
    return { success: false, error: error.message }
  }
}

export async function GetProfileBySupabaseId(supabaseId: string) {
  try {
    const profile = await prisma.profile.findUnique({
      where: { supabaseId },
    })
    return profile
  } catch (error) {
    console.error('Error fetching profile:', error)
    return null
  }
}
