import express from "express"
import cookieParser from "cookie-parser"       
import authRotes from "./routes/auth.routes.js"
import musicRoutes from './routes/music.routes.js'
export const app =express()
app.use(express.json())
app.use(cookieParser())



app.use("/api/auth",authRotes)
app.use("/api/music",musicRoutes)
// app.get("/",(req,res)=>{
//     res.json("MY SPotify Backend")
// })
