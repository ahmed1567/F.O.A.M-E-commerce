const express =require("express");
const mongoose =require("mongoose");
const dotenv = require("dotenv");
const cookieParser=require('cookie-parser')
const cors =require('cors')


///models
const {User} =require("./models/user.model")
const {Gig} =require("./models/gig.model")
const {Order} =require("./models/order.model")
const {Review} =require("./models/review.model")
const {Message} =require("./models/message.model")
const {Conversation}=require("./models/conversation.model")


//To Access env file
dotenv.config();

//Routes files
const gigRouter = require("./routes/gig");
const userRouter = require("./routes/user");
const orderRouter = require("./routes/order");
const reviewRouter = require("./routes/review");
const messageRouter = require("./routes/message");
const conversationRouter = require("./routes/conversation");
const authRouter = require("./routes/auth");



const app=express()
const connect =async ()=>{
    await mongoose.connect(process.env.MONGO).catch(error=>console.log(error))
    console.log("backend server is runing")
}

//our cors
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

//for requests body
app.use(express.json());

//cookies
app.use(cookieParser());


//Routes Endpoints

app.use("/api/Gigs", gigRouter);    
app.use("/api/users", userRouter);    
app.use("/api/orders", orderRouter);    
app.use("/api/reviews", reviewRouter);    
app.use("/api/messages", messageRouter);    
app.use("/api/conversations", conversationRouter);    
app.use("/api/auth", authRouter);    

//error handling
app.use((err,req,res,next)=>{
    const errorStatus= err.status || 500
    const errorMessage= err.message || "something went wrong"
    return res.status(errorStatus).send(errorMessage)
})


app.listen(3000 ,()=>{
    connect()
    console.log("listen on 3000")
})