const express=require('express')
const authenticate=require('../middleware/userMid')
const Note=require('../model/Note')
const router=express.Router()
router.get('/fetchallnotes',authenticate,async(req,res)=>{
    const notes=await Note.find({userId:req.id.toString()})
    try{
        return res.status(200).send(notes)
    }catch(error){
        return res.status(401).send("Internal Server Error")
    }
})
router.post('/addnote',authenticate,async(req,res)=>{
    const {title,description}=req.body;
    console.log(req.id)
    try {
        await Note.create({userId:req.id,title,description})
        const notes=await Note.find({userId:req.id})
        return res.status(200).send(notes)
    } catch (error) {
        // console.log("Hello")
        return res.status(401).send(error)
    }
})
router.get('/fetchOneNote/:id',authenticate,async(req,res)=>{
    const {id}=req.params
    try {
        const note=await Note.findById(id)
        if(!note) return res.status(404).send("Not Found")
        if(note.userId.toString()!==req.id.toString())
        {
            return res.status(401).send("Not Allowed")
        }
        else{
            return res.status(200).send(note)
        }
    } catch (error) {
        return res.status(401).send("Internal Server Error")
    }
})
router.put('/update/:id',authenticate,async(req,res)=>{
    const {id}=req.params
    const {title,description}=req.body
    try {
        await Note.updateOne({_id:id},{title,description}).then(async(err)=>{
            const Notes=await Note.find({userId:req.id.toString()})
            return res.status(200).send(Notes)
        }).catch(error=>{
            return res.status(401).send("Not Updated")
        })
    } catch (error) {
        return res.status(401).send("Internal Server Error")
    }
})
router.delete('/delete/:id',authenticate,async(req,res)=>{
    const {id}=req.params
    try {
        const note=await Note.findById(req.params.id)
        if(!note) return res.status(404).send("Not Found")
        if(note.userId.toString()!==req.id.toString()){
            return res.status(401).send("Not Allowed")
        }
        await Note.findByIdAndDelete(req.params.id)
        const Notes=await Note.find({userId:req.id.toString()})
        return res.status(200).send(Notes)
    } catch (error) {
        return res.status(401).send("Internal Server Error")
    }
})
module.exports=router;