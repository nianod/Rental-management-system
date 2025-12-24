// app/api/login/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongoose';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export async function POST(req) {
  try {
    await connectDB();

    const { identifier, password, role } = await req.json();

    if (!identifier || !password || !role) {
      return NextResponse.json(
        { error: 'Missing credentials' },
        { status: 400 },
      );
    }

    // Look up user by role + identifier
    const query =
      role === 'tenant'
        ? { roomNumber: identifier, role: 'tenant' }
        : { adminId: identifier, role: 'admin' };

    const user = await User.findOne(query);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    // IMPORTANT: password must be a bcrypt hash stored on the user
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { id: user._id.toString(), role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    return NextResponse.json({
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        roomNumber: user.roomNumber,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
