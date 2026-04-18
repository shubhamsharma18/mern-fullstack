const jwt=require("jsonwebtoken")

 const validateAuth=(req,res,next)=>{

const token=req.cookies["my-token"]
if(!token){
    res.status(401).json({
        success:false, 
        message:"You are not authorized to access this route"
    })
}

try{
const decoded=jwt.verify(token,process.env.JWT_SECRET)
req.user=decoded
next()
}
catch(e){ 

    res.status(401).json({
        success:false, 
        message:"You are not authorized to access this route"
    })
}
}

module.exports={  
    validateAuth
}