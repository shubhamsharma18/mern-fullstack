require("dotenv").config()
const mongoose=require("mongoose")
const express=require("express")
const cookieParser=require("cookie-parser")

const studentRoutes=require("./routes/student.routes")  
const app=express();
app.set('json spaces', 2)
app.use(express.json())

app.use(cookieParser())

// app.get("/api",(req,res)=>{
//     const user="shubham"
//     const age=22
//     res.json({user,age})
// })
app.use("/api",studentRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("Connect to the database")
})
.catch((e)=>{
    console.log("error",e)
})

app.listen(3000,(req,res)=>{
    console.log("server is running on port:3000 http://localhost:3000")
})

