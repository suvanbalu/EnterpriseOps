import mongoose, { Schema, model } from "mongoose";

const saleSchema = new Schema({
  sbillno: {
    type: String,
    required: true,
    unique:true
  },
  party_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  credit: {
    type: Number,
    min: 0,
  },
  details: [
    {
      p_id: {
        type: String,
        required: true,
      },

      case: 
      { type: Number },
      piece: 
      { type: Number },

      saleRate: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default model("Sale", saleSchema);
