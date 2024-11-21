import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../lib/mongodb";
import Userservices from "@/services/Userservices";

export async function POST(req){
    try {

        await connectMongoDB();
        const {email} = await req.json();
        const user = await Userservices.checkuserEmail(email);
        console.log("User: ",user);

        return NextResponse.json({user});

    }catch(error){
        console.log(error);
    }
}