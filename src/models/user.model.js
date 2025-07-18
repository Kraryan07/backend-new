import mongoose, { model, Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


const userSchema= new Schema({
  
    username:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        lowercase:true,
        // unique:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,//cloudinary url
        required:true,
        // lowercase:true,
        // unique:true,
        // trim:true,
        // index:true
    },
    coverImage:{
      type:String,//cloudinary url
    },
    watchHistory:[
      {
      type:Schema.Types.ObjectId,
      ref:"video"
      }
    ],
    password:{
      type:String,
      required:[true,"password is required"],

    },
    refreshTokens:{
      type:String
    }
    
},{
  timestamps:true
}
)

userSchema.pre("save",async function(next){
  if(!this.isModified("password"))  return next();

  this.password=await bcrypt.hash(this.password,10)
  next()
})

userSchema.methods.isPasswordCorrect=async function(password){
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccesstoken=function(){
  jwt.sign(
    {
    _id: this._id,
    email:this.email,
    username:this.username,
    fullname:this.fullname
    },
  process.env.ACCESS_TOKEN_SECRET,
  {esxpiresIn:process.env.ACCESSS_TOKEN_EXPIRY}
  )
}
userSchema.methods.generateRefreshToken=function(){
  jwt.sign(
    {
    _id: this._id
    },
  process.env.REFRESH_TOKEN_SECRET,
  {
    expiresIn:process.env.REFRESH_TOKEN_EXPIRY
  }
)
}


export const User=mongoose.model("User",userSchema)