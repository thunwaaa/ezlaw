import mongoose ,{Schema} from "mongoose";

const folderSchema = new Schema(
    {
        foldername: {type: String, require:true},
        folderdesc: { type:String, default:""},
        userId: {type: Schema.Types.ObjectId, ref:"User", require:true},
    },
    {
        timestamps:true
    }
);

const Folder = mongoose.models.Folder || mongoose.model('Folder',folderSchema);
export default Folder;