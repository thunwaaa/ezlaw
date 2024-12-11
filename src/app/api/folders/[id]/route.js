import { connectMongoDB } from "../../../../../lib/mongodb";
import Folder from "../../../../../models/folder";
import { NextRequest, NextResponse } from "next/server";
import Flashcard from "../../../../../models/flashcard";
import mongoose from "mongoose";


export async function GET(req, { params }) {
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

// export async function PUT(req, { params }) {
//     const { id } = params;
//     const { folderId: folderId, newImg: img, newContent: content } = await req.json();
//     await connectMongoDB();
//     await Post.findByIdAndUpdate(id, { title, img, content });
//     return NextResponse.json({ message: "Post updated" }, { status: 200 });
// }

// export async function POST(req) {
//     const {folderId, term,definition} = await req.json();

//     if (!folderId || !term) {
//         return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
//     }

//     await connectMongoDB();
//     await Folder.create({ folderId, term, definition });

//     return NextResponse.json({ message: "Flashcard created" }, { status: 201 });
// }

// export async function GET(req) {
//     try {
//         const folderId = req.nextUrl.searchParams.get("FolderId");
        
//         console.log("Received folderId:", folderId); // Debug log

//         if (!folderId) {
//             console.error("No folderId provided");
//             return NextResponse.json({ message: "folderId is required" }, { status: 400 });
//         }

//         await connectMongoDB();
//         const flashcards = await Flashcard.find({ folderId });
        
//         console.log("Found flashcards:", flashcards); // Debug log

//         return NextResponse.json({ flashcards });
//     } catch (error) {
//         console.error("Server-side error:", error);
//         return NextResponse.json({ 
//             message: "Error fetching flashcards", 
//             error: error.message 
//         }, { status: 500 });
//     }
// }