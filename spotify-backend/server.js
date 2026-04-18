import "dotenv/config"
import { connectDB } from "./src/db/db.js"
import { app } from "./src/app.js"

connectDB()

const port = process.env.PORT || 4000

app.listen(port,()=>{


    console.log(`Server is running on port http://localhost:${port}`)

})