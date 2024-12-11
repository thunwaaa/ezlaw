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
export async function GET(req) {
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

// DELETE - ลบ folder
export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
        return NextResponse.json({ message: "Folder ID is required" }, { status: 400 });
    }

    await connectMongoDB();
    await Folder.findByIdAndDelete(id);
    return NextResponse.json({ message: "Folder deleted" }, { status: 200 });
}



// const express = require('express');
// const mongoose = require('mongoose');
// const router = express.Router();
// const app = express();

// app.get('/api/folders', async (req, res) => {
//     const userId = req.query.userId; // รับ userId จาก query parameters

//     if (!userId) {
//         return res.status(400).json({ error: 'userId is required' });
//     }

//     try {
//         // ค้นหาโฟลเดอร์ทั้งหมดที่สัมพันธ์กับ userId
//         const folders = await Folder.find({ userId });

//         if (folders.length === 0) {
//             return res.status(404).json({ error: 'No folders found for this userId' });
//         }

//         res.json(folders);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// //create folder
// app.post('/api/folders', async (req, res) => {
//     const { foldername, folderdesc, userId } = req.body;

//     // ตรวจสอบข้อมูลที่จำเป็น
//     if (!foldername || !userId) {
//         return res.status(400).json({ error: 'foldername and userId are required' });
//     }

//     try {
//         // สร้างโฟลเดอร์ใหม่
//         const newFolder = new Folder({
//             foldername,
//             folderdesc,
//             userId,
//         });

//         // บันทึกลง MongoDB
//         await newFolder.save();

//         res.status(201).json({ message: 'Folder created successfully', folder: newFolder });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// //del folder
// app.delete('/api/folders/:folderId', async (req, res) => {
//     const { folderId } = req.params;

//     try {
//         // ค้นหาและลบโฟลเดอร์
//         const deletedFolder = await Folder.findByIdAndDelete(folderId);

//         if (!deletedFolder) {
//             return res.status(404).json({ error: 'Folder not found' });
//         }

//         res.json({ message: 'Folder deleted successfully', folder: deletedFolder });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });



// Get folder by ID
// app.get('/folders/:id', async (req, res) => {
//   try {
//     const folder = await Folder.findById(req.params.id).populate('User');
    
//     if (!folder) {
//       return res.status(404).json({ message: 'Folder not found' });
//     }
    
//     res.status(200).json({ folder });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching folder', error: error.message });
//   }
// });

// Get all flashcards in a folder
// router.get('/folders/:id/flashcards', async (req, res) => {
//   try {
//     const flashcards = await Flashcard.find({ folderId: req.params.id });
    
//     res.status(200).json({ flashcards });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching flashcards', error: error.message });
//   }
// });

// // Create a new flashcard
// router.post('/folders/flashcards', async (req, res) => {
//   try {
//     const { folderId, term, definition } = req.body;
    
//     if (!folderId || !term || !definition) {
//       return res.status(400).json({ message: 'Missing required fields' });
//     }
    
//     const newFlashcard = new Flashcard({
//       folderId,
//       term,
//       definition
//     });
    
//     await newFlashcard.save();
    
//     res.status(201).json({ flashcard: newFlashcard });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating flashcard', error: error.message });
//   }
// });

// // Delete a flashcard
// router.delete('/folders/:folderId/flashcards/:flashcardId', async (req, res) => {
//   try {
//     const { folderId, flashcardId } = req.params;
    
//     const deletedFlashcard = await Flashcard.findOneAndDelete({ 
//       _id: flashcardId, 
//       folderId: folderId 
//     });
    
//     if (!deletedFlashcard) {
//       return res.status(404).json({ message: 'Flashcard not found' });
//     }
    
//     res.status(200).json({ message: 'Flashcard deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting flashcard', error: error.message });
//   }
// });

// // Update a folder
// router.put('/folders/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { foldername, folderdesc } = req.body;
    
//     const updatedFolder = await Folder.findByIdAndUpdate(
//       id, 
//       { foldername, folderdesc }, 
//       { new: true }
//     );
    
//     if (!updatedFolder) {
//       return res.status(404).json({ message: 'Folder not found' });
//     }
    
//     res.status(200).json({ folder: updatedFolder });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating folder', error: error.message });
//   }
// });

// module.exports = router;












// import { connectMongoDB } from "../../../../lib/mongodb";
// import Folder from "../../../../models/folder";
// import { NextResponse } from "next/server";

// export async function POST(req) {
//     const { userId,foldername, folderdesc} = await req.json();
//     console.log(foldername,folderdesc);
//     await connectMongoDB();
//     await Folder.create({userId,foldername,folderdesc});
//     return NextResponse.json({ message: "Folder created"}, {status: 201});    
// }

// export async function GET() {
//     await connectMongoDB();
//     const folders = await Folder.find({});
//     return NextResponse.json({ folders });
// }

// export async function DELETE(req) {
//     const id = req.nextUrl.searchParams.get("id"); 
//     await connectMongoDB();
//     await Folder.findByIdAndDelete(id);
//     return NextResponse.json({message: "Folder deleted"}, {status:200})
// }