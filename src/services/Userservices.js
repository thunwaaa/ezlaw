import User from "../../models/user";
import bcrypt from "bcryptjs";

class Userservices {
    async checkuserEmail(email){
        try{
            const user = await User.findOne({email}).select("_id");
            return user;
        }catch(error){  
            console.log(error);
            throw new Error("Error while checking user email");
        }
    }
    async register({firstname,lastname,email,password}){
        try{
            const hashedpassword = await bcrypt.hash(password,10)
            const user = await User.create({firstname,lastname,email,password:hashedpassword});

            return user;
        }catch(error){
            console.log(error);
            throw new Error("Error while registering user");
        }
    }
    async finduserbyemail(email){
        try{
            const user = await User.findOne({email});
            return user;
        }catch(error){
            console.log(error);
            throw new Error("Error while find email");
        }
    }
}
export default new Userservices