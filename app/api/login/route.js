// app/api/login/route.ts or route.js
import { NextResponse } from 'next/server';
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

    const user =
      role === 'tenant'
        ? await User.findOne({ roomNumber: identifier, role: 'tenant' })
        : await User.findOne({ adminId: identifier, role: 'admin' });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' },
    );

    return NextResponse.json({ token, role: user.role });
  } catch (err) {
    console.error('LOGIN ERROR:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
