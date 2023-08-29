const jwt=require('jsonwebtoken')
const authenticate=async(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token)
    {
        return res.status(401).send("Unauthorized")
    }
    try {
        const id=jwt.verify(token,process.env.SECRET_KEY);
        if(id)
        {
            req.id=id.id
            next()
        }
        else
        {
            return res.status(401).send("Unauthorized")
        }
    } catch (error) {
        console.log("Hello")
        return res.status(401).send("Internal Server Error")
    }
}
module.exports=authenticate