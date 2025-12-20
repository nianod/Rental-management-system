// app/api/test-db/route.ts
import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";

export async function GET() {
  try {
    console.log('🧪 Testing database connection...');
    
    // Test database connection
    const userCount = await prisma.user.count();
    console.log(`✅ Database connected. Found ${userCount} users`);
    
    // Get all users (without passwords)
    const users = await prisma.user.findMany({
      select: {
        id: true,
        roomNumber: true,
        adminId: true,
        role: true,
        
      }
    });
    
    return NextResponse.json({ 
      success: true, 
      userCount,
      users 
    });
    
  } catch (error) {
    console.error('💥 Database test failed:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
    }
    
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}
 