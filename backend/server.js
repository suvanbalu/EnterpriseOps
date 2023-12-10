import express from "express";
import cors from "cors";
import { connect } from './mongo/conn.js';
import bodyParser from "body-parser";

import sales from "./routes/sale.js"; 
import product from "./routes/product.js";
import purchase from "./routes/purchase.js";
import party from "./routes/party.js";
import salescollection from "./routes/salescollection.js";

const app = express();
const PORT = process.env.PORT||3001;

app.use(cors());
// app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.listen(PORT,()=>{
  console.log("Server Listening to PORT - ",PORT);
})

app.use("/api/sale",sales);
app.use("/api/product",product);
app.use("/api/purchase",purchase);
app.use("/api/party",party);
app.use("/api/salescollection",salescollection);

connect(function (err) {
  if (err) {
    console.log('Unable to connect to Mongo.',err);
    process.exit(1);
  } 
  else {
    console.log('Connected to Mongo');
  }
});