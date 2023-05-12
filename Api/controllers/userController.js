const {User} =require("../models/user.model")
const jwt = require("jsonwebtoken")
const {errorHandler}=require("../Helpers/errorHandler")


const deleteUser = async (req, res,next) => {
    if(req.params.id.length !==24){
      next(errorHandler(400,"please enter valid id"))
    }
    const user = await User.findById(req.params.id)
    
    if(!user)return res.send("User Not found")
    
    if(req.userId !== user._id.toString()){
    return next(errorHandler(403,"You can only delete your account"))
    } 
   
    await User.findByIdAndDelete(req.params.id)
    res.send("deleted")

  };


  module.exports = {
    deleteUser

  };