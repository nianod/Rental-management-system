import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongoose';
import User from '@/app/models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    
    const { identifier, password, role } = body;
    console.log('🔍 LOGIN:', { identifier, role, passwordLength: password?.length });

    // Build correct query for role
    const query = role === 'tenant'
      ? { roomNumber: identifier.trim(), role: 'tenant' }
      : { adminId: identifier.trim(), role: 'admin' };

    console.log('🔍 Query:', query);

    const user = await User.findOne(query);
    
    console.log('👤 USER FOUND:', !!user);
    if (user) {
      console.log('🔑 USER DATA:', {
        roomNumber: user.roomNumber || user.adminId,
        hasPassword: !!user.password,
        passwordLength: user.password?.length,
        role: user.role
      });
    }

    if (!user) {
      console.log('❌ NO USER');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (!user.password) {
      console.log('❌ NO PASSWORD');
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('✅ PASSWORD MATCH:', isMatch ? 'YES' : 'NO');

    if (!isMatch) {
      console.log('❌ PASSWORD FAIL - Raw input was:', JSON.stringify(password));
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // ✅ GENERATE JWT TOKEN
    const token = jwt.sign(
      { 
        id: user._id.toString(), 
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('🎉 LOGIN SUCCESS');

    return NextResponse.json({
      token,
      role: user.role,
      user: {
        id: user._id,
        name: user.name || 'User',
        roomNumber: user.roomNumber,
        email: user.email || 'N/A',
      },
    });

  } catch (err) {
    console.error('💥 LOGIN ERROR:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
