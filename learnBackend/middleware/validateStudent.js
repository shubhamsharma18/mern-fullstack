 const validateStudent=(req,res,next)=>{
    const {name,email,course}=req.body

    const errors=[]

    if(!name  || typeof name!==String ||!name.trim()){
        errors.push("Name is required and must be non empty string ")
    }
    if(!email  || typeof email!==String){
        errors.push("email must be string")
    }
 
}

const validateLogin=(req,res,next)=>{

    // const {email,password}=req.body
    // if(email!=="admin@gmail.com" || password!=="123"){
    //     return res.status(404).json({
    //         success:false,
    //         message:"You are not authorized to access this route"
    //     })
    // }
    next()
}
module.exports={
    validateStudent,
    validateLogin
}