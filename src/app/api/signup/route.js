import { NextResponse } from "next/server";

export async function post(req){
    try {
        const {firstname,lastname,email,password} = await req.json();
        console.log("firstname",firstname);
        console.log("lastname",lastname);
        console.log("email",email);
        console.log("password",password);

        return NextResponse.json({message: "user sign-up"}, {status: 201});
    }catch(err){
        return NextResponse.json({message: "Error"}, {status: 500});
    }
}