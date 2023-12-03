import mongoose, { Schema, model } from "mongoose";

const saleSchema = new Schema({
  sbillno:{
    type:String,
    required:true,
  },
  party_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Party",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  gstApplicable: {
    type: Boolean,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  details: [
    {
      product_id: {
        type: String,  
        required: true,
      },
      quantity: {
        type: {
          case : {type:Number},
          piece : {type:Number}
        },
        required: true,
      },
      productRate: {
        type: Number,
        required: true,
      },
      quantityType: {
        type: String,
        enum: ["cases", "pieces"],
        required: true,
      },
    },
  ],
});

export default model("Sale", saleSchema);
