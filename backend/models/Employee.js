import mongoose, { Schema, model } from "mongoose";

const employeeSchema = new Schema({
  employeeId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  empType: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: Date,
    required: true,
  },
  dateOfLeaving: {
    type: Date,
  },
  salary: {
    type: Number,
    required: true,
  },
});

export default model("Employee", employeeSchema);
