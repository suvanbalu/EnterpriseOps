import mongoose, { Schema, model } from "mongoose";

const salaryHistorySchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
});

const advanceSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

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
  salaryHistory: [salaryHistorySchema],
  advances: [advanceSchema],
});

employeeSchema.index({ employeeId: 1 });

export default model("Employee", employeeSchema);
