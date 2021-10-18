import express from "express";
import { getDrivers } from "../controllers/driver.js";
const router = express.Router();

router.get("/",(req,res,next)=>{
    console.log(`Request from: ${req.originalUrl}, Request type: ${req.method}`);
    next();
},getDrivers)

export default router;