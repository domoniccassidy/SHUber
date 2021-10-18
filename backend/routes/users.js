import express from "express"
import {signup, logIn,addUser } from "../controllers/user.js";
const router = express.Router();

router.post(("/signin"),(req,res,next)=>{
    console.log(`Request from: ${req.originalUrl}, Request type: ${req.method}`);
    next();

},logIn)
router.post(("/signup"),(req,res,next)=>{
    console.log(`Request from: ${req.originalUrl}, Request type: ${req.method}`);
    next();

},signup)
router.post(("/"),(req,res,next)=>{
    console.log(`Request from: ${req.originalUrl}, Request type: ${req.method}`);
    next()
},addUser)

export default router;