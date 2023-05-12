const jwt = require("jsonwebtoken")
const {errorHandler}=require("../Helpers/errorHandler")

const verifyToken =(req,res,next)=>{
    const token = req.cookies.accessToken
    if(!token) return next(errorHandler(401,"You are not authenticated!")) 
    jwt.verify(token,process.env.JWT_KEY, async (err,payload)=>{
        if(err) return next(errorHandler(403,"Token is not valid"))()
        req.userId=payload.id;
        req.isSeller=payload.isSeller;
        next()
      })
     
}
module.exports={
    verifyToken
}