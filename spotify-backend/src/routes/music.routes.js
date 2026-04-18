import express from "express"
import { createMusic,createAlbum,getMusics, getAlbums,getAlbumMusics} from "../controllers/music.controller.js"
import { musicAuthMw } from "../middlewares/auth.middleware.js"
import { userAuthMw } from "../middlewares/user.auth.middleware.js"
const router=express.Router()
import multer from "multer"
const upload=multer({
    storage:multer.memoryStorage()
})


// user operations
router.get("/getMusics/",userAuthMw,getMusics)
router.get("/getAlbums/",userAuthMw,getAlbums)
router.get("/getAlbumMusics/:id",userAuthMw,getAlbumMusics)


// artist operations
router.post("/createMusic/",musicAuthMw,upload.single("music"),createMusic)
router.post("/createAlbum/",musicAuthMw,createAlbum)
export default router 