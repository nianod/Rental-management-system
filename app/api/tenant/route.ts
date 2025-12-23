import { NextRequest, NextResponse } from "next/server";
import RegisterTenantForm from "@/app/admin/tenants/Register";
import { connectDB } from "@/app/lib/mongoose";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const body = await req.json();
        const { name, email, phone, roomNumber, rentAmount, moveInDate, gender, lastPayment } = body;
        
        if (!name || !email || !phone || !roomNumber || !rentAmount || !moveInDate || !gender || !lastPayment) {
            return NextResponse.json(
                { message: "Missing required fields" }, 
                { status: 400 }
            );
        }
        
        const newTenant = await RegisterTenantForm.create({ name, email, phone, roomNumber, rentAmount, moveInDate, gender, lastPayment });
        
        return NextResponse.json(
            { message: "Tenant created successfully", data: newTenant }, 
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating tenant:", error);
        return NextResponse.json(
            { message: "Internal Server Error" }, 
            { status: 500 }
        );
    }
}