import mongoose, { Schema, model } from "mongoose";

const partySchema = new Schema({
  partyName: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
});

export default model("Party", partySchema);
