import express from "express";
import Purchase from "../models/Purchase.js";
import Product from "../models/Product.js";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);

const router = express.Router();

router.post("/add-entry", async (req, res) => {
  try {
    // Iterate over each item in the details array and check if the product exists
    for (const detail of req.body.details) {
      // console.log("PID , ",detail.p_id)
      const productExists = await Product.exists({ p_id: detail.p_id });
      if (!productExists) {
        return res.status(404).send(`Product not found: ${detail.p_id}`);
      }
    }

    const parsedDate = dayjs(req.body.date, "DD-MMM-YYYY");
    if (!parsedDate.isValid()) {
      return res.status(400).send("Invalid date format");
    }

    const dateObject = parsedDate.toDate();
    const entry = new Purchase({
      ...req.body,
      date: dateObject
    });
    await entry.save();

    res.status(201).send(entry);
  } catch (err) {
    res.status(400).send(err.message);
  }
});


router.get("/get-all-entry", async (req, res) => {
  try {
    const purchases = await Purchase.find({});

    const transformedPurchases = await Promise.all(purchases.map(async (purchase) => {
      const details = await Promise.all(purchase.details.map(async detail => {
        const product = await Product.findOne({ p_id: detail.p_id });
        return {
          productName: product ? `${product.productName} ${product.category} ${product.quantity} ${product.unit}` : "Unknown",
          p_id: product ? product.p_id : "Unknown",
          quantity: detail.quantity,
          rateOfProduct: detail.rateOfProduct
        };
      }));

      return {
        billno: purchase.billno,
        date: purchase.date.toLocaleString(),
        totalAmount: purchase.totalAmount,
        details
      };
    }));

    res.status(200).json(transformedPurchases);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/get-bill-entry/:billno", async (req, res) => {
  try {
    const purchase = await Purchase.findOne({ billno: req.params.billno })

    const details = await Promise.all(purchase.details.map(async detail => {
      const product = await Product.findOne({ p_id: detail.p_id });
      return {
        productName: product ? `${product.productName} ${product.category} ${product.quantity} ${product.unit}` : "Unknown",
        p_id: product ? product.p_id : "Unknown",
        quantity: detail.quantity,
        rateOfProduct: detail.rateOfProduct
      };
    }));

    const transformedPurchase = {
      billno: purchase.billno,
      date: purchase.date.toLocaleString(),
      totalAmount: purchase.totalAmount,
      details
    };
    res.status(200).json(transformedPurchase);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/update-entry/:billno", async (req, res) => {
  try {
    // Check if the purchase exists
    const purchase = await Purchase.findOne({ billno: req.params.billno });
    if (!purchase) {
      return res.status(404).send(`Purchase with bill number ${billno} not found`);
    }

    // Update the purchase
    const updatedPurchase = await Purchase.findOneAndUpdate({ billno: req.params.billno }, req.body, { new: true });
    res.status(200).send(updatedPurchase);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/delete-entry/:billno", async (req, res) => {
  const { billno } = req.params;

  try {
    const result = await Purchase.findOneAndDelete({ billno });
    if (!result) {
      return res.status(404).send(`Purchase with bill number ${billno} not found`);
    }

    res.status(200).send(`Purchase with bill number ${billno} successfully deleted`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
