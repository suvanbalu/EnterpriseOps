import express from "express";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { connect } from '../mongo/conn.js';
import bodyParser from "body-parser";
import path from "path";

import sales from "../routes/sale.js"; 
import product from "../routes/product.js";
import purchase from "../routes/purchase.js";
import party from "../routes/party.js";
import salescollection from "../routes/salescollection.js";
import financial from "../routes/financial.js";
import employee from "../routes/employee.js";
import dashboard from "../routes/dashboard.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.listen(PORT, () => {
  console.log("Server Listening to PORT - ", PORT);
});
const whitelist = [
  '*'
];

app.use((req, res, next) => {
  const origin = req.get('referer');
  const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
  if (isWhitelisted) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
  }
  // Pass to next layer of middleware
  if (req.method === 'OPTIONS') res.sendStatus(200);
  else next();
});
app.use("/api/sale", sales);
app.use("/api/product", product);
app.use("/api/purchase", purchase);
app.use("/api/party", party);
app.use("/api/salescollection", salescollection);
app.use("/api/financial", financial);
app.use("/api/employee", employee);
app.use("/api/dashboard", dashboard);

connect(function (err) {
  if (err) {
    console.log('Unable to connect to Mongo.', err);
    process.exit(1);
  } else {
    console.log('Connected to Mongo');
  }
});
