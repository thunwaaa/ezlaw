import { connectMongoDB } from "../../../../../lib/mongodb";
import Folder from "../../../../../models/folder";
import { NextRequest, NextResponse } from "next/server";
import Flashcard from "../../../../../models/flashcard";
import mongoose from "mongoose";
import React,{use} from "react";


export async function GET(req, { params }) {
    await connectMongoDB();
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return new Response("Invalid ID", { status: 400 });
    }

    // แปลง id เป็น ObjectId ก่อนใช้ในการค้นหา
    const objectId = new mongoose.Types.ObjectId(id);  // ใช้ new ในการสร้าง ObjectId

    try {
        // ค้นหาด้วย ObjectId
        const folder = await Folder.findOne({ _id: objectId });
        return new Response(JSON.stringify(folder), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Error occurred", { status: 500 });
    }
}

export async function PUT(request,{params}) {
    await connectMongoDB();
    
    const { id } = params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return NextResponse.json(
            { message: "Invalid ID" }, 
            { status: 400 }
        );
    }

    try {
        const data = await request.json();
        const { foldername, folderdesc } = data;

        if (!foldername) {
            return NextResponse.json(
                { message: "Folder name is required" }, 
                { status: 400 }
            );
        }

        const updatedFolder = await Folder.findByIdAndUpdate(
            id,
            { foldername, folderdesc },
            { new: true } // returns the updated document
        );

        if (!updatedFolder) {
            return NextResponse.json(
                { message: "Folder not found" }, 
                { status: 404 }
            );
        }

        return NextResponse.json(updatedFolder, { status: 200 });
    } catch (error) {
        console.error("Error updating folder:", error);
        return NextResponse.json(
            { message: "Error updating folder" }, 
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = params;
        
        await connectMongoDB();
        
        const folder = await Folder.findByIdAndDelete(id);
        
        if (!folder) {
            return NextResponse.json(
                { message: "Folder not found" }, 
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Folder deleted successfully" }, 
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            { message: "Error deleting folder" }, 
            { status: 500 }
        );
    }
}