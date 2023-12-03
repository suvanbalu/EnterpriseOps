import express from "express";
import Sale from "../models/Sale.js"

const router = express.Router();

router.get("/",(req,res)=>{
  res.send("Sales Endpoint");
})

router.post("/addSales")


export default router;