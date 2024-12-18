import { connectMongoDB } from "../../../../lib/mongodb";
import Folder from "../../../../models/folder";
import { NextResponse } from "next/server";

// POST - สร้าง folder ใหม่
export async function POST(req) {
    const { userId, foldername, folderdesc } = await req.json();
    
    // ตรวจสอบข้อมูล
    if (!userId || !foldername) {
        return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    await connectMongoDB();
    await Folder.create({ userId, foldername, folderdesc });

    return NextResponse.json({ message: "Folder created" }, { status: 201 });
}

// GET - ดึง folders เฉพาะของ userId
export async function GET(req,{params}) {
    try {
        const userId = req.nextUrl.searchParams.get("userId");
        
        console.log("Received userId:", userId); // Debug log

        if (!userId) {
            console.error("No userId provided");
            return NextResponse.json({ message: "userId is required" }, { status: 400 });
        }

        await connectMongoDB();
        const folders = await Folder.find({ userId });
        
        console.log("Found folders:", folders); // Debug log

        return NextResponse.json({ folders });
    } catch (error) {
        console.error("Server-side error:", error);
        return NextResponse.json({ 
            message: "Error fetching folders", 
            error: error.message 
        }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const { id: folderId } = params;

    try {
        // เชื่อมต่อ MongoDB
        await connectMongoDB();

        // Parse JSON body
        const { foldername, folderdesc } = await req.json();
        console.log("Received Data:", { foldername, folderdesc });


        // ตรวจสอบ folderId
        if (!folderId) {
            return NextResponse.json(
                { error: "Folder ID is required" }, 
                { status: 400 }
            );
        }

        // ค้นหา Folder
        const folder = await Folder.findById(folderId);
        console.log("Found folder",folder);

        // ตรวจสอบว่ามี Folder หรือไม่
        if (!folder) {
            return NextResponse.json(
                { error: "Folder not found" }, 
                { status: 404 }
            );
        }

        // อัปเดตข้อมูล
        if (foldername !== undefined) folder.foldername = foldername;
        if (folderdesc !== undefined) folder.folderdesc = folderdesc;

        // บันทึกการเปลี่ยนแปลง
        await folder.save();

        // ส่งการตอบกลับ
        return NextResponse.json({
            message: "Folder updated successfully",
            folder
        }, { status: 200 });

    } catch (error) {
        console.error("Error updating folder:", error);
        return NextResponse.json(
            { 
                message: "Failed to update folder",
                error: error.message 
            }, 
            { status: 500 }
        );
    }
}

// DELETE - ลบ folder
export async function DELETE(req, { params }) {
    try {
        const { id } = params;
        
        if (!id) {
            return NextResponse.json({ message: "Folder ID is required" }, { status: 400 });
        }

        await connectMongoDB();
        
        const deletedFolder = await Folder.findByIdAndDelete(id);
        
        if (!deletedFolder) {
            return NextResponse.json({ message: "Folder not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Folder deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting folder:", error);
        return NextResponse.json({ 
            message: "Error deleting folder", 
            error: error.message 
        }, { status: 500 });
    }
}