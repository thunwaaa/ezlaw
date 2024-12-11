import { connectMongoDB } from "../../../../../lib/mongodb";
import Folder from "../../../../../models/folder";
import { NextResponse } from "next/server";

export async function GET( req ,{ params }) {
    const { id } = params;
    await connectMongoDB();
    const folder = await Folder.findOne({ _id : id });
    return NextResponse.json({ folder }, {status:200});
    
}

export async function PUT(req, {params}) {
    const {id} = params;
    const { newfoldername: foldername, newfolderdesc: folderdesc } = await req.json();
    await connectMongoDB();
    await Folder.findByIdAndUpdate(id,{foldername,folderdesc});
    return NextResponse.json({message: "Folder updated" },{status:200});
    
}