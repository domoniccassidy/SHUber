import mongoose from "mongoose";
import DriverProfile from "../models/driverModel.js";

export const getDrivers = async (req,res)=>{
    try {
        const driverProfiles = await DriverProfile.find();
        res.json(driverProfiles);
    }
    catch(e){
        res.json({message: e.message});
    }
}