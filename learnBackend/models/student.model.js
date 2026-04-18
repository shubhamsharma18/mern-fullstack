const mongoose=require("mongoose");
const studentSchema=new mongoose.Schema({

    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    }

})

const studentModel= mongoose.model("student",studentSchema)

module.exports=studentModel