const mongoose =require("mongoose");
const {Schema}=mongoose;


const gigSchema = new Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: false,
      },
      totalStars: {
        type: Number,
        default: 0,
      },
      starNumber: {
        type: Number,
        default: 0,
      },
      cat: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      cover: {
        type: String,
        required: false,
      },
      image: {
        type: String,
        required: false,
      },
      shortTitle: {
        type: String,
        required: false,
      },    
      shortDesc: {
        type: String,
        required: false,
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
    Gig:mongoose.model("Gig", gigSchema)
} 