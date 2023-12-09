import express from "express";
import Sale from "../models/Sale.js";
import Party from "../models/Party.js";
import Product from "../models/Product.js";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

dayjs.extend(customParseFormat);

const router = express.Router();

router.get("/get-sales", async (req, res) => {
  try {
    const sales = await Sale.aggregate([
      {
        $lookup: {
          from: "parties", // Assuming the Party model's collection name is "parties"
          localField: "party_id",
          foreignField: "party_id",
          as: "partyData",
        },
      },
      {
        $unwind: "$partyData",
      },
      {
        $unwind: "$details",
      },
      {
        $lookup: {
          from: "products", // Assuming the Product model's collection name is "products"
          localField: "details.p_id",
          foreignField: "p_id",
          as: "productData",
        },
      },
      {
        $unwind: "$productData",
      },
      {
        $group: {
          _id: "$sbillno",
          party_id: { $first: "$party_id" },
          party_name: { $first: "$partyData.partyName" },
          date: { $first: { $dateToString: { format: "%m-%d-%Y", date: "$date" } } },
          route: { $first: "$partyData.route" },
          totalAmount: { $first: "$totalAmount" },
          credit: { $first: "$credit" },
          details: {
            $push: {
              p_id: "$details.p_id",
              productName: "$productData.productName",
              piecesPerCase: "$productData.piecesPerCase",
              case: "$details.case",
              piece: "$details.piece",
              saleRate: "$details.saleRate",
            },
          },
        },
      },
    ]);

    res.json(sales);
  } catch (error) {
    console.error("Error getting sales:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-sale/:sbillno", async (req, res) => {
  try {
    const sbillnoParam = req.params.sbillno;

    const sale = await Sale.aggregate([
      {
        $match: {
          sbillno: sbillnoParam,
        },
      },
      {
        $lookup: {
          from: "parties", // Assuming the Party model's collection name is "parties"
          localField: "party_id",
          foreignField: "party_id",
          as: "partyData",
        },
      },
      {
        $unwind: "$partyData",
      },
      {
        $unwind: "$details",
      },
      {
        $lookup: {
          from: "products", // Assuming the Product model's collection name is "products"
          localField: "details.p_id",
          foreignField: "p_id",
          as: "productData",
        },
      },
      {
        $unwind: "$productData",
      },
      {
        $group: {
          _id: "$sbillno",
          party_id: { $first: "$party_id" },
          party_name: { $first: "$partyData.partyName" },
          date: { $first: { $dateToString: { format: "%m-%d-%Y", date: "$date" } } },
          route: { $first: "$partyData.route" },
          totalAmount: { $first: "$totalAmount" },
          credit: { $first: "$credit" },
          details: {
            $push: {
              p_id: "$details.p_id",
              productName: "$productData.productName",
              piecesPerCase: "$productData.piecesPerCase",
              case: "$details.case",
              piece: "$details.piece",
              saleRate: "$details.saleRate",
            },
          },
        },
      },
    ]);

    if (sale.length === 0) {
      return res.status(404).json({ error: "Sale not found" });
    }

    res.json(sale[0]); // Assuming sbillno is unique, so we take the first element of the result array
  } catch (error) {
    console.error("Error getting sale:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/add-sale", async (req, res) => {
  try {
    const {
      sbillno,
      party_id,
      date,
      totalAmount,
      credit,
      details,
    } = req.body;

    // Validate required fields
    if (!sbillno || !party_id || !date || !totalAmount || !details) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new Sale instance
    const newSale = new Sale({
      sbillno,
      party_id,
      date,
      totalAmount,
      credit,
      details,
    });

    // Save the sale to the database
    const savedSale = await newSale.save();

    res.status(201).json(savedSale);
  } catch (error) {
    console.error("Error adding sale:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update-sale", async (req, res) => {
  const updatedData = req.body;
  const updateResult = await Sale.findOneAndUpdate({})
})

export default router;
