import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    emailVerified:
    {
        type:Boolean,
        default:false
    },
    cardVerified:
    {
        type:Boolean,
        default:false
    }
    
})
export default mongoose.model("userProfile", userSchema);