import express from "express";
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import morgan from "morgan";
import cors from "cors"

import userRouter from "./routes/user.js"

dotenv.config();
const app = express();
connectDB();

app.use(morgan("dev"));
app.use(express.json({limit:"30mb" , extended:true}));
app.use(express.urlencoded({limit:"30mb" , extended:true}));
app.use(cors());

app.use("/users" , userRouter);

app.get("/",(req,res)=>{
    res.send("workd")
})

const PORT = process.env.PORT || 8000; 
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
})