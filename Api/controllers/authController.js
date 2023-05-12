const {User} =require("../models/user.model")
const bcrypt =require("bcrypt")


const register = async (req, res) => {
    try {
      console.log(req.body.password);
      const hash = bcrypt.hashSync(req.body.password, 5);
      const newUser = new User({
        ...req.body,
        password: hash,
      });
  
      await newUser.save();
      res.status(201).send("User has been created.");
    } catch (error) {
      console.log(error)
        res.status(500).send("Internal server error")
    }
  
};
const login = async (req, res) => {
  try {

    const user = await User.findOne({username:req.body.username})
console.log(user)
    if(!user) return res.status(404).send("User Not Found") 

    const isCorrect =bcrypt.compareSync(req.body.password,user.password)
    
    if(!isCorrect) return res.status(400).send("Wrong Password") 


    res.status(200).send("User found");
  } catch (error) {
    console.log(error)
      res.status(500).send("Internal server error")
  }

};
const logout = async (req, res) => {
    return res.send("dsdffdfdfd")
  };


  module.exports = {
    register
    ,login
    ,logout

  };