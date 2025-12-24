// app/api/tenant-login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongoose';
import Tenant from '@/app/models/real-tenant';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret'

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { roomNumber, password } = await req.json()

    if (!roomNumber || !password) {
      return NextResponse.json(
        { error: 'Missing credentials' },
        { status: 400 },
      );
    }

    const tenant = await Tenant.findOne({ roomNumber })
    if (!tenant) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, tenant.passwordHash)
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { id: tenant._id.toString(), role: 'tenant' },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    return NextResponse.json({
      token,
      role: 'tenant',
      user: {
        id: tenant._id,
        name: tenant.name,
        roomNumber: tenant.roomNumber,
        email: tenant.email,
      },
    });
  } catch (err) {
    console.error('TENANT LOGIN ERROR:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
