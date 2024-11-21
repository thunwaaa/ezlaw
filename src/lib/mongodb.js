import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connect mongodb");
    }catch(error){
        console.log("Error connection to mongo", error);
    }
}