import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import UserModel from "../models/user.js"
export const signup = async(req,res)=>{
    const {email , password , firstName , lastName} = req.body;
    try {
        const oldUser = await UserModel.findOne({email});
        if(oldUser){
            return res.status(400).json({message:"User already exists."})
        }
        const hashedPassword = await bcrypt.hash(password,12);
        const result = await UserModel.create({
            email,
            password:hashedPassword,
            name:`${firstName} ${lastName}`
        })
        const token = jwt.sign({email:result.email , id:result._id},process.env.SECRET,{expiresIn:"1h"})
  res.status(200).json({result,token})
    } catch (error) {
        res.status(500).json({message:"Something went wrong."})
    }
}

export const signin = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if(!user) return res.status(404).json({message:"User doesn't exist"})
        const passwordCheck = await bcrypt.compare(password , user.password)
        if(!passwordCheck){
            return res.status(400).json({message: "Wrong Credientials"});
        }
        const token = jwt.sign({email:user.email , id : user._id} , process.env.SECRET , {expiresIn:"1h"});
        res.status(200).json({result:user,token});
    } catch (error) {
        res.status(500).json({message:"Something went wrong."})
        console.log(error)
    }
}