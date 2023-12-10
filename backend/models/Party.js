import mongoose, { Schema, model } from "mongoose";

const partySchema = new Schema({
  party_id: {
    type: String,
    unique: true
  },
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
  available: {
    type: Boolean,
    default: true
  },
  address: {
    type: String,
  },
  coordinate: {
    type: String,
  }
});

export default model("Party", partySchema);
