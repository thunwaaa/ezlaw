import { connectMongoDB } from "../../../../../../lib/mongodb";
import Flashcard from "../../../../../../models/flashcard";
import Folder from "../../../../../../models/folder";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {folderId, term, definition} = await req.json();
    console.log(folderId,term,definition);
    await connectMongoDB();
    await Flashcard.create({folderId,term,definition});
    return NextResponse.json({message: "Flashcard created"}, {status: 201});
    
}

export async function GET() {
    const folderId = req.nextUrl.searchParams.get('folderId');  

    if (!folderId || !mongoose.Types.ObjectId.isValid(folderId)) {
        return NextResponse.json({ message: "Invalid or missing folderId" }, { status: 400 });
    }

    try {
       
        await connectMongoDB();

        
        const flashcards = await Flashcard.find({ folderId });

        if (flashcards.length === 0) {
            return NextResponse.json({ message: "No flashcards found in this folder" }, { status: 404 });
        }

       
        return NextResponse.json({ flashcards });
    } catch (error) {
        console.error("Error fetching flashcards: ", error);
        return NextResponse.json({ message: "Failed to fetch flashcards" }, { status: 500 });
    }
    
}

export async function DELETE(req) {
    const {folderId,flashcardId} = req.query;
    
    try{
        await connectMongoDB();
        const folder = await Folder.findById(folderId);
        if(!folder){
            return NextResponse.json({message: "Folder not found"}, {status: 404});
        }
        const flashcardIndex = folder.flashcards.findIndex(flashcard => flashcard._id, toString() === flashcardId);

        if (flashcardIndex === -1) {
            return NextResponse.json({ message: "Flashcard not found" }, { status: 404 });
        }
        folder.flashcards.splice(flashcardIndex, 1);
        await folder.save();

        return NextResponse.json({ message: "Flashcard deleted successfully" }, { status: 200 });
    }catch (error) {
        console.error("Error deleting flashcard:", error);
        return NextResponse.json({ message: "Failed to delete flashcard" }, { status: 500 });
      }

    
    
}