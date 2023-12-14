import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({
  p_id: {
    type: String, // Assuming productID is a string, change the type accordingly
    required: true,
    unique: true,
  },
  piecesPerCase: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },

  CESS: { type: Number },
  GST: { type: Number },
  salesRate: { type: Number },

  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});

export default model("Product", productSchema);
