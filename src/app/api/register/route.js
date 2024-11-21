import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import Userservices from "services/Userservices";


export async function POST(req){
    try{
        await connectMongoDB();
        const {firstname,lastname,email,password} = await req.json();

        const user = await Userservices.register({firstname,lastname,email,password});
        return NextResponse.json({message: "User register"},{status: 201});
    }catch(error){
        return NextResponse.json({message:"error"},{status: 500});
    }
}