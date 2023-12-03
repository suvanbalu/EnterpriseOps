import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// Route to add a single product
router.post("/addproduct", async (req, res) => {
  try {
    const productData = req.body;
    const product = new Product(productData);
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/addproducts", async (req, res) => {
  try {
    const productsData = req.body; // Expecting an array of product objects
    const products = await Product.insertMany(productsData);
    res.status(201).json(products);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
