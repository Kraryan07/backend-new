import { asynchandler } from "../utils/asynchandler.js"
import { ApiError } from "../utils/apierror.js"
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponce } from "../utils/apiresponce.js";
const registerUser=asynchandler(async(req,res)=>{
  //get user data front end
     //chech validation
     // if check if uer is already exist in db from email and username
     //check for inages,check for avatar
     // upload it to cloudinary
     //create user object -create entry in db
     // remove password and refresh token feild from responce
     //check for user creation 
     // return res

     const {fullname,email,username,password}=req.body
    //  console.log("email",email);s

     if(
      [fullname,email,username,password].some((field)=>field?.trim()==="")
     ){
        throw new ApiError(400,"all fields is require")
     }

     const existedUser=await User.findOne({
      $or:[{email},{username}]
     })

     if(existedUser){
      throw new ApiError(409,"user is already existing")
     }
     const avatarLocalpath=req.files?.avatar[0]?.path;
     const coverimagelocalpath=req.files?.coverImage[0]?.path;
     
     if(!avatarLocalpath){
      throw new ApiError(400,"avatar file is required")
     } 

     const avatar=await uploadOnCloudinary(avatarLocalpath)
      const coverimage=await uploadOnCloudinary(coverimagelocalpath)


      if(!avatar){
        throw new ApiError(500,"avatar is not uploaded")
      }
     
      const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverimage?.url||"", 
        password,
        email,
        username:username.toLowerCase()
      })

     const createdUser=await User.findById(user._id).select("-password -refreshTokens")


     if(!createdUser){
      throw new ApiError(500,"somthing went wrong while registering user")
     }
    return  res.status(201).json(
       new ApiResponce(200,createdUser,"user registered successfully")
    )
})

export {registerUser} 