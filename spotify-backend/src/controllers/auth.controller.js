import {userModel} from "../models/user.model.js";    
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const register=async(req,res)=>{

  try {
      const {username,email,password,role="user"}=req.body
  
      const existingUser=await userModel.findOne({
          $or:[
              {username},
              {email}
          ]
      })
      if(existingUser){
          return res.status(400).json({message:"User already exists"})
      }
  
      const hashedPassword=await bcrypt.hash(password,10)
  
      const user=await userModel.create({
          username,
          email,
          password:hashedPassword,
          role
      })
  
      const token =jwt.sign(
          {id:user._id},
          process.env.JWT_SECRET_KEY,
          {   
          expiresIn:"1d"       
      })
  
      res.cookie("myToken",token,{
          httpOnly:true,
          secure:true,
          maxAge:24*60*60*1000
      })
      res.status(200).json({
          message:"User registered sucessfully",
           user:{
              id:user._id,    
              username:user.username,
              email:user.email,
              role:user.role,
              token
          }
      })
  } catch (error) {
    console.log(error);

    
    res.status(500).json({message:"Internal server error"})
  }

}

export const login=async(req,res)=>{

    const {username,email,password}=req.body
    const user=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })

    if(!user){
        return res.status(400).json({message:"User not found"})
    }

    const checkPassword=await bcrypt.compare(password,user.password)

    if(!checkPassword){
        return res.status(400).json({message:"Invalid password"})
    }
    

     const token =jwt.sign(
        {id:user._id,
        role:user.role,
            expiresIn:"1d"       
        }, process.env.JWT_SECRET_KEY,
    )

    res.cookie("myToken",token,{
        httpOnly:true,
        secure:true,
        maxAge:24*60*60*1000
    })
    res.status(200).json({
        message:"User logged in successfully",
        user:{
            id:user._id,    
            username:user.username,
            email:user.email,
            role:user.role
        }
    })



}