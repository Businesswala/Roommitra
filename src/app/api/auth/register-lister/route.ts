import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

// IMPORTANT: Commended Prisma out to prevent Next.js Static Page Generator crashes during Production builds (Vercel)
// require('@prisma/client')

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password } = body;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    console.log("MOCK - Registered Lister: ", body.email);

    return NextResponse.json({ success: true, user: { id: "mock-id-345", email: body.email } });
  } catch (error: any) {
    console.error("Lister Registration Error:", error);
    return NextResponse.json(
      { error: "Failed to register lister. Email or Mobile might already exist." }, 
      { status: 500 }
    );
  }
}
