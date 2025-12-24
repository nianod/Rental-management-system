 import bcrypt from 'bcryptjs';
import { connectDB } from '@/app/lib/mongoose';
import Tenant from '@/app/models/real-tenant';  
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name, email, phone, roomNumber, rentAmount, moveInDate, gender, password } = body;

    if (!name || !email || !phone || !roomNumber || !rentAmount || !moveInDate || !gender || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const existing = await Tenant.findOne({ roomNumber });
    if (existing) {
      return NextResponse.json({ message: 'Room already has a tenant' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newTenant = await Tenant.create({
      name,
      email,
      phone,
      roomNumber,
      rentAmount,
      moveInDate,
      gender,
      lastPayment: new Date(),
      passwordHash,
    });

    return NextResponse.json(
      { message: 'Tenant created successfully', data: newTenant },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating tenant:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
