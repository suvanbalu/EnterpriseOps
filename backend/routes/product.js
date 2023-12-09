import express from "express";
import Product from "../models/Product.js";
import Purchase from "../models/Purchase.js";

const router = express.Router();

// Route to add a single product
router.post("/add-product", async (req, res) => {
  try {
    const productData = req.body;
    const product = new Product(productData);
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/add-products", async (req, res) => {
  try {
    const productsData = req.body; // Expecting an array of product objects
    const products = await Product.insertMany(productsData);
    res.status(201).json(products);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/get-products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/get-product/:p_id', async (req, res) => {
  const pid = req.params.p_id;

  try {
    const product = await Product.findOne({ p_id: pid });
    if (!product) {
      return res.status(404).send(`Product with ID ${pid} not found`);
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/update-product/:p_id", async (req, res) => {
  const pid = req.params.p_id;

  try {
    const product = await Product.findOne({ p_id: pid });
    if (!product) {
      return res.status(404).send(`Product with ID ${pid} not found`);
    }

    const updatedProduct = await Product.findOneAndUpdate({ p_id: pid }, req.body, { new: true });
    if (req.body.p_id !== pid) {
      try {
        // Update all purchases with the new p_id
        const updatedPurchases = await Purchase.updateMany(
          { "details.p_id": pid },
          { $set: { "details.$.p_id": req.body.p_id } }
        );
      } catch (err) {
        return res.status(500).send(err.message); // Send an error response and return
      }
    }
    // Send a success response
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


router.delete("/delete-product/:p_id", async (req, res) => {
  const { p_id } = req.params;

  try {
    const result = await Product.findOneAndDelete({ p_id });
    if (!result) {
      return res.status(404).send(`Product with ID ${p_id} not found`);
    }

    res.status(200).send(`Product with ID ${p_id} successfully deleted`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});


export default router;
