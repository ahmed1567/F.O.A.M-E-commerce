const mongoose =require("mongoose");
const {Schema}=mongoose;


const orderSchema = new Schema(
    {
        productId: {
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
        address: {
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
      },
      {
        timestamps: true,
      }
    );
  

module.exports ={
    Order:mongoose.model("Order", orderSchema)
} 