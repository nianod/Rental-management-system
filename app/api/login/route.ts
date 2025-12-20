// app/api/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "supersecret";

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = await req.json();
    console.log('📥 Login request received:', { 
      identifier: body.identifier, 
      role: body.role 
    });

    const { identifier, role, password } = body;

    // Validate inputs
    if (!identifier || !password || !role) {
      console.log('❌ Missing required fields');
      return NextResponse.json(
        { error: "Missing required fields" }, 
        { status: 400 }
      );
    }

    // Build query based on role
    const whereClause = role === "tenant"
      ? { roomNumber: identifier, role: "tenant" }
      : { adminId: identifier, role: "admin" };

    console.log('🔍 Searching for user with:', whereClause);

    // Find user
    const user = await prisma.user.findFirst({
      where: whereClause,
    });

    console.log('👤 User found:', user ? 'Yes' : 'No');

    if (!user) {
      return NextResponse.json(
        { error: "User not found" }, 
        { status: 404 }
      );
    }

    // Verify password
    console.log('🔐 Verifying password...');
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log('❌ Invalid password');
      return NextResponse.json(
        { error: "Invalid password" }, 
        { status: 401 }
      );
    }

    // Generate token
    console.log('🎫 Generating JWT token...');
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      secret, 
      { expiresIn: "7d" }
    );

    console.log('✅ Login successful');
    return NextResponse.json({ 
      token, 
      user: { 
        id: user.id, 
        role: user.role,
        roomNumber: user.roomNumber,
        adminId: user.adminId
      } 
    });
    
  } catch (err: unknown) {
    // Detailed error logging
    console.error('💥 LOGIN ERROR:', err);
    
    if (err instanceof Error) {
      console.error('Error name:', err.name);
      console.error('Error message:', err.message);
      console.error('Error stack:', err.stack);
    }
    
    return NextResponse.json(
      { 
        error: "Server error occurred", 
        details: err instanceof Error ? err.message : "Unknown error"
      }, 
      { status: 500 }
    );
  }
}