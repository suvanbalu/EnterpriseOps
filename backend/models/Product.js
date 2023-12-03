import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema({
  _id: {
    type: String,  // Assuming productID is a string, change the type accordingly
    required: true,
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
  taxInfo: {
    CESS: { type: Number },
    CGST: { type: Number },
    SGST: { type: Number },
  },
});

export default model("Product", productSchema);
