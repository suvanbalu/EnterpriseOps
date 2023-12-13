import mongoose, { Schema, model } from "mongoose";


const employeeSchema = new Schema({
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
  }
});

employeeSchema.index({ employeeId: 1 });

export default model("Employee", employeeSchema);
