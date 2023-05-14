const {User} =require("../models/user.model")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")
const {errorHandler}=require("../Helpers/errorHandler")



const register = async (req, res,next) => {
      try {
      console.log(req.body);
      const hash = bcrypt.hashSync(req.body.password, 5);
      const newUser = new User({
        ...req.body,
        password: hash,
      });
  
      await newUser.save();
      res.status(201).send("User has been created.");
    } catch (error) {
       next(error)
    }
  
};
const login = async (req, res,next) => {
  try {

    const user = await User.findOne({username:req.body.username})
    if(!user) return next(errorHandler(404,"User not found"))

    const isCorrect =bcrypt.compareSync(req.body.password,user.password)
    
    if(!isCorrect) return next(errorHandler(400,"Wrong Password")) 
    
    const { password, ...info } = user._doc;
    
    const token =jwt.sign({
      id:user._id,
      isSeller:user.isSeller,
    },process.env.JWT_KEY)
    
    res.cookie("accessToken",token,{httpOnly:true}).status(200).send(info);
  } catch (error) {
      next(error)
  }

};
const logout = async (req, res) => {
    res.clearCookie("accessToken",{sameSite:"none",secure:true}).status(200).send("User has been logout")
  };


  module.exports = {
    register
    ,login
    ,logout

  };