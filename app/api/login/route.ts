import { NextRequest, NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "supersecret";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('LOGIN BODY:', body);

    const { identifier, role, password } = body;

    const user = await prisma.user.findFirst({
      where:
        role === 'tenant'
          ? { roomNumber: identifier, role: 'tenant' }
          : { adminId: identifier, role: 'admin' },
    });

    console.log('FOUND USER:', user?.id);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log('PASSWORD OK:', isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id }, secret, { expiresIn: '7d' });
    return NextResponse.json({ token });
  } catch (err: unknown) {
    console.error('LOGIN API ERROR:', err);
    if (err instanceof Error) {
      return NextResponse.json(
        { error: err.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
