import { connectMongoDB } from "../../../../lib/mongodb";
import Folder from "../../../../models/folder";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { userId,foldername, folderdesc} = await req.json();
    console.log(foldername,folderdesc);
    await connectMongoDB();
    await Folder.create({userId,foldername,folderdesc});
    return NextResponse.json({ message: "Folder created"}, {status: 201});    
}

export async function GET() {
    await connectMongoDB();
    const folders = await Folder.find({});
    return NextResponse.json({ folders });
}

export async function DELETE(req) {
    const id = req.nextUrl.searchParams.get("id"); 
    await connectMongoDB();
    await Folder.findByIdAndDelete(id);
    return NextResponse.json({message: "Folder deleted"}, {status:200})
}


// const express = require('express');
// const mongoose = require('mongoose');
// const router = express.Router();

// // Folder Schema
// const FolderSchema = new mongoose.Schema({
//   foldername: String,
//   folderdesc: String,
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
// });

// // Flashcard Schema
// const FlashcardSchema = new mongoose.Schema({
//   folderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Folder' },
//   term: String,
//   definition: String
// });

// const Folder = mongoose.model('Folder', FolderSchema);
// const Flashcard = mongoose.model('Flashcard', FlashcardSchema);

// // Get folder by ID
// router.get('/folders/:id', async (req, res) => {
//   try {
//     const folder = await Folder.findById(req.params.id);
    
//     if (!folder) {
//       return res.status(404).json({ message: 'Folder not found' });
//     }
    
//     res.status(200).json({ folder });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching folder', error: error.message });
//   }
// });

// // Get all flashcards in a folder
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