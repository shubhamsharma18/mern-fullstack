const userModel = require("../models/user.model.js")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt=require("jsonwebtoken")
exports.registerUser = async (req, res) => {

    const { name, email, password } = req.body
    const exist = await userModel.findOne({ email })
    if (!exist) {

        const hashedpassword = await bcrypt.hash(password,10)
        await userModel.create({ name, email, password: hashedpassword })
        return res.json({
            success: true,
            message: "User Registered Successfully",
            data: { name, email, password: hashedpassword }
        })

    }
    res.status(400).json({
        success: false,
        message: "User with the same email already exists"
    })

}

exports.loginUser = async (req, res) => {

    
    const { email, password } = req.body
    const exist = await userModel.findOne({ email })
    if (exist) {
        const isMatched=await bcrypt.compare(password,exist.password)
        if (isMatched) {

            const token=jwt.sign(
               { id:exist._id} ,
                process.env.JWT_SECRET,
                {expiresIn:"1hr"}

            )

            res.cookie("my-token",token,{
                httpOnly:true,
                secure:false,
                maxAge:3600000
            })


            return res.status(200).json({
                success: true,
                meassage: ` ${exist.name} Login Sucessfully`,
                token:token

            })

        }
        else {
            return res.status(400).json({
                sucess: false,
                message: "Incorrect Password ! Please try again"
            })
        }
    }
    return res.status(402).json({
        success: false,
        message: "Email is not registered ! Please login"
    })
}

exports.getAllUsers = async (req, res) => {

    try {
        const usersData = await userModel.find()
        res.status(200).json(usersData)
    } catch (e) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }

}
exports.userProfile = async (req, res) => {
    try {
        // 1. Middleware se jo ID aayi hai usey nikaalein
        // Yaad hai na? Middleware mein humne likha tha: req.user = decoded
        const userId = req.user.id; 

        // 2. Database mein us ID ko dhoondhein
        // .select("-password") ka matlab hai ki password ko chhod kar baaki sab dena (Security!)
        const user = await userModel.findById(userId).select("-password");

        // 3. Agar user nahi mila (Shayad delete ho gaya ho)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User nahi mila"
            });
        }

        // 4. Success Response: User ka data bhej dein
        res.status(200).json({
            success: true,
            message:"Welcome to the User Profile Route u r authorized",
            user: user
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server mein kuch gadbad hai",
            error: error.message
        });
    }
};