import mongoose, { Schema, model } from "mongoose";

const salesCollectionSchema = new Schema({
  s_billNo: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  psr: {
    type: String,
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
  remainingAmount: {
    type: Number,
  },
});

export default model("SalesCollection", salesCollectionSchema);
