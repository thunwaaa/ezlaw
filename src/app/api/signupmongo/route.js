import { NextResponse } from "next/server";
//import { connectMongoDB } from "../../../../lib/mongodb";
//import User from "../../../../models/user";
//import bcrypt from 'bcryptjs'

export async function POST(req){
    try {
        const {firstname,lastname,email,password} = await req.json();
        //const hashedPassword = await bcrypt.hash(password,10);

        //await connectMongoDB();
        //await User.create({firstname,lastname,email,password: hashedPassword});


        console.log("firstname",firstname);
        console.log("lastname",lastname);
        console.log("email",email);
        console.log("password",password);

        return NextResponse.json({message: "user registed"} , {status:201});

    }catch(error){
        return NextResponse.json({message: "An error"},{status: 500});
    }
}