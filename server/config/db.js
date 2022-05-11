import mongoose from "mongoose";

const connectDB = async()=>{
try {
   await mongoose.connect(process.env.MONGO_URI);
    console.log("mongodb connected sucessfully");
} catch (error) {
    console.log("error connectiong mongodb");
}

}

export default connectDB;