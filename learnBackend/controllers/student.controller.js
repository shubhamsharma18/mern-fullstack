const studentModel = require("../models/student.model")
const mongoose = require("mongoose")
exports.getAllStudents = async (req, res) => {

    try {
        const studentsData = await studentModel.find()
        res.status(200).json(studentsData)
    }
    catch (e) {

        res.status(500).json({ error: "Internal Server Error" })
    }

}

exports.createStudent = async (req, res) => {

    const { name, email, course } = req.body
    try {

        const totalStudents = await studentModel.countDocuments();

        // 3. Nayi ID set karo (Current count + 1)
        const newId = totalStudents + 1;
        const existingStudent = await studentModel.findOne({ email })
        if (existingStudent) {
            return res.status(400).json({ error: "Student with the same Email already exists" })
        }
        const newStudent = {
            id:newId,
            name,
            email,
            course
        }

        const newstudent = new studentModel(newStudent)
        await newstudent.save()
        res.status(201).json(newstudent)


    }
    catch (e) {
        res.status(500).json({ error: "Internal Server Error" })
    }
}


exports.updateStudent=async(req,res)=>{
    const {id}=req.params
    const {name,email,course}=req.body
    const existing=await studentModel.findOne({id})
    if(!existing){
        return res.status(404).json({ error: "Student not found" })
    }
    existing.name=name||existing.name
    existing.email=email||existing.email
    existing.course=course||existing.course
    await existing.save()
    res.status(200).json(existing)

}

exports.deleteStudent=async(req,res)=> {
    const {id}=req.params
    const existing=await studentModel.findOne({id})
    if(!existing){
        return res.status(404).json({error:"student not found"})

    }
    await existing.deleteOne()
    res.status(200).json({message:"student deleted successfully"})

}