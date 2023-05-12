const express =require("express");
const mongoose =require("mongoose");
const dotenv = require("dotenv");
const {User} =require("./models/user.model")
const {Product} =require("./models/product.model")
const {Order} =require("./models/order.model")
const {Review} =require("./models/review.model")
const {Message} =require("./models/message.model")
const {Conversation}=require("./models/conversation.model")


//To Access env file
dotenv.config();

//Routes files
const productRouter = require("./routes/product");
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

//for requests body
app.use(express.json());

//Routes Endpoints
app.use("/api/product", productRouter);    
app.use("/api/user", userRouter);    
app.use("/api/order", orderRouter);    
app.use("/api/review", reviewRouter);    
app.use("/api/message", messageRouter);    
app.use("/api/conversation", conversationRouter);    
app.use("/api/auth", authRouter);    


app.listen(3000 ,()=>{
    connect()
    console.log("listen on 3000")
})