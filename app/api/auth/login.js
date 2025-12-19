import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const secret = process.env.JWT_SECRET || "supersecret"

const POST = async (req: NextRequest) => {
    try{
        const { identifier, role, password } = await req.json()

        const User = await prisma.user.findFirst({
            where: role === "tenant"
            ? { roomNumber: identifier, role: "tenant" } 
            : { adminId: identifier, role: "admin" }
        })

        if(!User) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        const isPasswordValid = await bcrypt.compare(password, User.password)

        if(!isPasswordValid) {
            return NextResponse.json({ error: "Invalid password" }, { status: 401 })
        }

        const token = jwt.sign({ id: User.id }, secret, { expiresIn: "7d" })

        return NextResponse.json({ token })

    } catch (err: any) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
    }
}


