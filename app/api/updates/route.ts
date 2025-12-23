import Update from "@/app/models/Update";
import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/app/lib/mongoose";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { update, description } = body;
        
        if (!update || !description) {
            return NextResponse.json(
                { message: "Missing required fields" }, 
                { status: 400 }
            );
        }
        
        const newUpdate = await Update.create({ update, description });
        
        return NextResponse.json(
            { message: "Update created successfully", data: newUpdate }, 
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating update:", error);
        return NextResponse.json(
            { message: "Internal Server Error" }, 
            { status: 500 }
        );
    }
}