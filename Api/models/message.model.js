const mongoose =require("mongoose");
const {Schema}=mongoose;


const messageSchema = new Schema({
  conversationId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
},{
  timestamps:true
});


module.exports ={
    Message:mongoose.model("Message", messageSchema)
} 