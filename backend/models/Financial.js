import mongoose, { Schema, model } from "mongoose";

const financialSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  credit_flag: {
    type: Number,
    enum: [1, 0],
  },
});

export default model("Financial", financialSchema);