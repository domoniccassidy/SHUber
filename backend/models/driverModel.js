import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
    name: {type:String},
    photo: {type:String},
    rating:{
        type:[[String,Number]],
        default:[]
    },
    location:{
        type:[Number],
        default:[0,0]
    }

})

export default mongoose.model("DriverProfile",driverSchema);