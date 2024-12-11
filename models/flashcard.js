import mongoose,{Schema} from "mongoose";

const flashcardSchema = new Schema(
    {
        folderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Folder'
        },
        term: {
            type:String,
            require:true
        },
        definition: {
            type:String,
            require:true
        },
    },
    {
        timestamps: true,
    }
);

const Flashcard = mongoose.models.Flashcard || mongoose.model('Flashcard',flashcardSchema);
export default Flashcard;