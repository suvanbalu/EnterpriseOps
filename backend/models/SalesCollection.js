import mongoose, { Schema, model } from "mongoose";

const salesCollectionSchema = new Schema({
  s_billNo: {
    type: String,
    required: true,
  },
  sc_id:{
    type:Number,
  },
  psr: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amountCollected: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export default model("SalesCollection", salesCollectionSchema);
