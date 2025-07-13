import mongoose from "mongoose";
import {DB_NAME} from "../constraints.js";
const connectDb=async() => {
  try{
     const connectionInstance=await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
  console.log(`\n Mngodb connected !! db host: ${connectionInstance.connection.host}`)
  }catch(error){
    console.log("failed to connect to MongoDB", error);
    process.exit(1);
  }
}

export default connectDb;