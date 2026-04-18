const {getAllStudents,createStudent,updateStudent,deleteStudent}=require("../controllers/student.controller")
// import validateStudent from '.././middleware/validateStudent'
const {registerUser,getAllUsers,loginUser,userProfile}=require("../controllers/user.controller")  
const {validateStudent,validateLogin}=require('.././middleware/validateStudent')
const {validateAuth}=require(".././middleware/auth.middleware.js")
const express=require("express")

const router=express.Router()

router.get("/students",getAllStudents)
router.post("/students/create",createStudent)

router.patch("/students/update/:id",updateStudent)
router.delete("/students/delete/:id",deleteStudent)


router.post("/users/register",registerUser)
router.get("/users/getall",validateLogin,getAllUsers)
router.post("/users/login",loginUser)
router.get("/users/profile",validateAuth,userProfile)
module.exports=router