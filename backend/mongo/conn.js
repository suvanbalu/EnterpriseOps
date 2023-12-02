import mongoose from "mongoose";

const connectionString =
  "mongodb+srv://suvan:yk8aSW26njv.LZ-@cluster0.ldaw2fl.mongodb.net/?retryWrites=true&w=majority";

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