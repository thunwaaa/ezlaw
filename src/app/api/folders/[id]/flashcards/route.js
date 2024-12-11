import { error } from "console";
import { connectMongoDB } from "../../../../../../lib/mongodb";
import Flashcard from "../../../../../../models/flashcard";
import Folder from "../../../../../../models/folder";
import { NextResponse } from "next/server";


export async function POST(req,{params}) {
    const {id: folderId} = params;
    const {term, definition} = await req.json();
    console.log(folderId,term,definition);
    try{
        await connectMongoDB();
        const newFlashcard = await Flashcard.create({
            folderId,
            term,
            definition
        });

        return NextResponse.json({
            message: "Flashcard created",
            flashcard: newFlashcard
        },{status:201});
    }catch(error){
        console.log("Error creating flashcard:", error);
        return NextResponse.json({
            message: "Failed to create flashcard",
            error: error.message
        },{status:500});
    }
    
}

export async function GET(request,{ params }) {
    const {id} = params;
    try {
        await connectMongoDB();
        const flashcards = await Flashcard.find({ folderId: id});
        return NextResponse.json({ flashcards,total:flashcards.length });
      } catch (error) {
        console.error("Error fetching flashcards:", error);
        return NextResponse.json(
          { error: "Failed to fetch flashcards" },
          { status: 500 }
        );
      }
}


export async function PUT(req,res) {
    try{
        const{flashcardId,term,definition} = req.body;
        if(!flashcardId){
            return res.status(400).json({error:"Flashcard ID is required"});
        }
        const flashcard = await Flashcard.findById(flashcardId);

        if(!flashcard){
            return res.status(404).json({error:"Flashcard not found"});
        }

        if(term != undefined) flashcard.term = term;
        if(definition != undefined) flashcard.definition = definition;

        await flashcard.save();

        req.status(200).json({
            message: "Flashcard updated successfully",
            flashcard,
        });
    }catch(error){
        console.error("Error updating flashcard : ",error);
        res.status(500).json({error:"Internal sever error"});
    }
    
}


export async function DELETE(request) {
    const { searchParams } = new URL(request.url);
    const folderId = searchParams.get('folderId');
    const flashcardId = searchParams.get('flashcardId');
    
    try {
        await connectMongoDB();
        
        // ลบ Flashcard โดยตรง
        const deletedFlashcard = await Flashcard.findByIdAndDelete(flashcardId);
        
        if (!deletedFlashcard) {
            return NextResponse.json(
                { message: "Flashcard not found" }, 
                { status: 404 }
            );
        }

        return NextResponse.json(
            { 
                message: "Flashcard deleted successfully",
                deletedFlashcard 
            }, 
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting flashcard:", error);
        return NextResponse.json(
            { 
                message: "Failed to delete flashcard",
                error: error.message 
            }, 
            { status: 500 }
        );
    }
}