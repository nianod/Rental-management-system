import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/mongoose';
import Room from '@/app/models/Room';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

 async function requireAdmin(req: NextRequest) {
  const auth = req.headers.get('authorization') || ''
  const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) throw new Error('Unauthorized');

  const payload = jwt.verify(token, JWT_SECRET) as { role?: string };
  if (payload.role !== 'admin') throw new Error('Forbidden');
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    // await requireAdmin(req); 
  

    const body = await req.json();
    const { roomNumber, title, description, price, features, status } = body;

    if (!roomNumber || !title || !description || !price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const room = await Room.create({
      roomNumber,
      title,
      description,
      price,
      features: features || [],
      status: status || 'vacant',
    });

    return NextResponse.json(room, { status: 201 });
  } catch (err) {
    console.error('CREATE ROOM ERROR:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();
    const rooms = await Room.find().sort({ createdAt: -1 });
    return NextResponse.json(rooms);
  } catch (err) {
    console.error('LIST ROOMS ERROR:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

