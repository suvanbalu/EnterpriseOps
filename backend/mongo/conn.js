import mongoose from "mongoose";

const connectionString =
  "mongodb+srv://esshatraderscbe:SuvanJeyam@cluster0.g13plfr.mongodb.net/?retryWrites=true&w=majority";

export const connect = (callBack) => {
  mongoose.set('strictQuery', false);
  mongoose
    .connect(connectionString)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log(err);
      return callBack(err);
    });
};