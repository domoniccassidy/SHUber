import express,{urlencoded,json} from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors"
import drivers from "./routes/drivers.js"
import users from "./routes/users.js"

const app = express();

dotenv.config();

app.use(json({limit:"30mb",extended:true}))
app.use(urlencoded({limit:"30mb",extended:true}))
app.use(cors());


app.use("/drivers",drivers)
app.use("/users",users)

const CONNECTION_STRING = process.env.CONNECTION_STRING;
const PORT = process.env.PORT;

mongoose.connect(CONNECTION_STRING,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
    app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`))
}).catch((e)=>{
    console.log(e.message);
})

