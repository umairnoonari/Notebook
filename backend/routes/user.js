const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const User=require("../model/User")
router.post('/signup',async(req,res)=>{
    const {username,email,password}=req.body
    const user=await User.findOne({username})
    console.log(username,email,password)
    if(user)
    {
        return res.send("User Already Exists")
    }
    try{
        // console.log(username)
        const salt=await bcrypt.genSalt(10)
        const secPass=await bcrypt.hash(password,salt)
        await User.create({username,email,password:secPass})
        return res.status(200).send({msg:"Success"})
    }
    catch(error)
    {
        return res.status(401).send("Internal Server Error")
    }
    
})
router.post('/login',async(req,res)=>{
    const {username,password}=req.body
    const user=await User.findOne({username})
    if(!user)
    {
        return res.send("Please try correct credentials")
    }
    try {
        const Check=await bcrypt.compare(password,user.password)
        if(Check)
        {

            const token=jwt.sign({id:user.id},process.env.SECRET_KEY,{expiresIn:30*60*60})
            return res.status(200).send({token:token,username:user.username})
        }
        else
        {
            return res.send("Please try correct credentials")
        }
        
    } catch (error) {
        return res.status(401).send("Internal Server Error")
    }
})
module.exports=router