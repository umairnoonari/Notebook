const mongoose=require("mongoose")
const {Schema}=mongoose
const NoteSchema=new Schema({
    userId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    }
})
const Note=mongoose.model("Note",NoteSchema)
module.exports=Note