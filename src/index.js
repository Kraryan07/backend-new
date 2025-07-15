// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv';

// import mongoose from "mongoose";
// import { DB_NAME } from "./constraints";
import { app } from './api.js';
import connectDb from "./db/index.js";

dotenv.config({
  path:'./env'
})

connectDb().then(()=>{
  app.listen(process.env.PORT||8000,()=>{
    console.log(`server is running on port ${process.env.PORT}`)
  })
})
.catch((error)=>{
  console.log("Failed to connect to MongoDB", error);
})





/*
import express from "express";
const app = express();
(async()=>{
  try{
   await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
   app.on("error",(error)=>{
    console.error("Failed to start server",error);
    throw error
   })

   app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
   })
  }
  catch(error){
    console.log(error);
    throw error
  }
})()
  */