import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from "bcrypt";


export async function POST(req){
    try {
        await connectMongoDB();
        const {firstname,lastname,email,password} = await req.json();

        const hashedpassword = await bcrypt.hash(password,10)

        const user = await User.create({firstname,lastname,email,password:hashedpassword});
        return NextResponse.json({message: "user registed"} , {status:201});

    }catch(error){
        return NextResponse.json({message: "An error"},{status: 500});
    }
}