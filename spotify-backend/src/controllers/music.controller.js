import { musicModel } from "../models/music.models.js";
import { uploadFile } from "../services/storage.service.js";
import jwt from "jsonwebtoken"
import { albumModel } from "../models/album.model.js";

export const createAlbum=async(req,res)=>{

    const {title,musicIds}=req.body
try {

    const album=await albumModel.create({
        title,
        artist:req.user.id,
        musics:musicIds

    })

    res.status(200).json({
        "msg":"ALbum Created",
        data:album
    })
    
} catch (error) {
     res.status(400).json({
        "msg":"Invalid Token"
    })
}
    
  
}


export const createMusic= async(req,res)=>{
    // const {musicUri,title,}



    const {title}=req.body
    const file = req.file; // req.file.buffer yahan se milega
if (!file) return res.status(400).json({ message: "No file uploaded" });
try {
    
    const result =await uploadFile(file.buffer.toString('base64'))
    console.log(result)
    const music=await musicModel.create({
        musicUri:result.url,
        title,
        artist:req.user.id,
        


    })


    res.status(200).json({
        "message":"Success ! mmuisc created",
        data:music
        
    })
} catch (error) {
    console.log(error)
     res.status(400).json({
        "message":"unuccess",
        
    })
}
    


}

export const getMusics=async(req,res)=>{


    try {
        const getMusics=await musicModel.find().populate("artist","username email")
        if(!getMusics) return res.status(200).json({"msg":"not results found"})
        res.status(200).json({
    musics:getMusics
    })
    } catch (error) {
        res.status(400).json({
            "msg":"Failed"
        })
    }
    
}

export const getAlbums=async(req,res)=>{


    try {
        const getAlbums=await albumModel.find().select("-musics").populate("artist","username email")
        if(!getAlbums) return res.status(200).json({"msg":"not results found"})
        res.status(200).json({
     albums:getAlbums
    })
    } catch (error) {
        res.status(400).json({
            "msg":"Failed"
        })
    }
    
}




export const getAlbumMusics=async(req,res)=>{

    const id=req.params.id


    try {
   const songs = await albumModel.findById(id)
  .populate({
      path: "artist",
      select: "username" // Album ka main artist
  })
  .populate({
      path: "musics",
      select: "title musicUri artist",
      populate: {
          path: "artist",
          select: "username" // Har gaane ka artist (Agar alag hai toh)
      }
  })
  .select("title musics artist");
        // console.log(AlbumMusics)
        if(!songs) return res.status(200).json({"msg":"not results found"})
        res.status(200).json({
     albumsMuics:songs
    })
    } catch (error) {
        // console.log(error);
        
        res.status(400).json({
            "msg":"Failed"
        })
    }
    
}