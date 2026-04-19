import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name, phone, mobile, role = "USER", businessName } = body;

    const finalPhone = mobile || phone;

    if (!email || !password || !name || !finalPhone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.profile.findFirst({
      where: {
        OR: [
          { email: email },
          { mobile: finalPhone }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or mobile already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const activeRole = ["USER", "LISTER", "ADMIN"].includes(role) ? role : "USER";

    const user = await prisma.profile.create({
      data: {
        email,
        name,
        mobile: finalPhone,
        hashedPassword,
        role: activeRole as any,
        businessName: role === "LISTER" ? businessName : undefined,
        supabaseId: crypto.randomUUID(), // Mocking fallback for unique constraint
        status: "ACTIVE"
      },
    });

    return NextResponse.json(
      { success: true, message: "User created successfully", userId: user.id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Registration payload error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
