const mongoose =require("mongoose");
const {Schema}=mongoose;


const productSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },
      totalStars: {
        type: Number,
        default: 0,
      },
      starNumber: {
        type: Number,
        default: 0,
      },
      category: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      cover: {
        type: String,
        required: true,
      },
      images: {
        type: [String],
        required: false,
      },
      shortTitle: {
        type: String,
        required: true,
      },
      deliveryTime: {
        type: Number,
        required: true,
      },
      revisionNumber: {
        type: Number,
        required: true,
      },
      features: {
        type: [String],
        required: false,
      },
      sales: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );
  

module.exports ={
    Product:mongoose.model("Product", productSchema)
} 