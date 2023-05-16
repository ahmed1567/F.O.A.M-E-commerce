const mongoose =require("mongoose");
const {Schema}=mongoose;


const orderSchema = new Schema(
    {
        gigId: {
          type: String,
          required: true,
        },
        sellerId: {
          type: String,
          required: true,
        },
        buyerId: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },

        isCompleted: {
          type: Boolean,
          default: false,
        },
        payment_intent: {
          type: String,
          required: true,
        },
        img: {
          type: String,
          required: false,
        },
      },
      {
        timestamps: true,
      }
    );
  

module.exports ={
    Order:mongoose.model("Order", orderSchema)
} 