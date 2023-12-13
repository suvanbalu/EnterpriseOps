import express from "express";
import SalesCollection from "../models/SalesCollection.js";
import Sale from "../models/Sale.js";

const router = express.Router();

router.post("/add-collections", async (req, res) => {
  try {
    const collections = Array.isArray(req.body) ? req.body : [req.body];

    for (const collectionData of collections) {
      const { s_billNo, date, psr, amountCollected, type } = collectionData;
      const existingSale = await Sale.findOne({ sbillno: s_billNo });

      if (!existingSale) {
        return res.status(404).json({ error: `Sale not found with the provided sbillno: ${s_billNo}` });
      }


      const updatedCredit = existingSale.credit - amountCollected;
      if (updatedCredit < 0) {
        return res.status(400).json({ error: "Invalid credit value after subtraction" });
      }


      const lastCollection = await SalesCollection.findOne({}, {}, { sort: { sc_id: -1 } });


      const newScId = lastCollection ? lastCollection.sc_id + 1 : 0;

      const newSalesCollection = new SalesCollection({
        s_billNo,
        sc_id: newScId,
        date,
        psr,
        amountCollected,
        type,
      });

      await newSalesCollection.save();

      await Sale.updateOne(
        { sbillno: s_billNo },
        { $inc: { credit: -amountCollected } }
      );
    }

    res.status(201).json({ message: "SalesCollections added successfully" });
  } catch (error) {
    console.error("Error adding sales collections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-collections", async (req, res) => {
  try {
    const collections = await SalesCollection.aggregate([
      {
        $group: {
          _id: "$s_billNo",
          netAmountCollected: { $sum: "$amountCollected" },
          details: {
            $push: {
              sc_id: "$sc_id",
              date: {
                $dateToString: {
                  format: "%m/%d/%Y",
                  date: "$date",
                },
              },
              psr: "$psr",
              amountCollected: "$amountCollected",
              type: "$type",
            },
          },
        },
      },
      {
        $lookup: {
          from: "sales",
          localField: "_id",
          foreignField: "sbillno",
          as: "saleData",
        },
      },
      {
        $addFields: {
          remainingCredit: { $ifNull: [{ $first: "$saleData.credit" }, 0] },
          totalAmount: { $ifNull: [{ $first: "$saleData.totalAmount" }, 0] },
        },
      },
    ]);

    if (collections.length === 0) {
      return res.status(404).json({ error: "No collections found for the provided s_billNo" });
    }

    res.json(collections);
  } catch (error) {
    console.error("Error getting collections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-collection/:s_billNo", async (req, res) => {
  try {
    const s_billNoParam = req.params.s_billNo;
    const billresult = SalesCollection.findOne({ s_billNo: req.params.id })
    if (!billresult) {
      return res.status(401).send("No collection done for the given billno")
    }
    const collections = await SalesCollection.aggregate([
      {
        $match: {
          s_billNo: s_billNoParam,
        },
      },
      {
        $group: {
          _id: "$s_billNo",
          details: {
            $push: {
              sc_id: "$sc_id",
              date: {
                $dateToString: {
                  format: "%m/%d/%Y",
                  date: "$date",
                },
              },
              psr: "$psr",
              amountCollected: "$amountCollected",
              type: "$type",
            },
          },
        },
      },
    ]);

    if (collections.length === 0) {
      return res.status(404).json({ error: "No collections found for the provided s_billNo" });
    }

    res.json(collections[0]);
  } catch (error) {
    console.error("Error getting collections:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-collection-by-id/:sc_id", async (req, res) => {
  const { sc_id } = req.params;

  try {
    const existingCollection = await SalesCollection.findOne({ sc_id });

    if (!existingCollection) {
      return res.status(404).json({ error: `SalesCollection not found with the provided sc_id: ${sc_id}` });
    }

    res.json(existingCollection);
  } catch (error) {
    console.error("Error getting collection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update-collection/:sc_id", async (req, res) => {
  try {
    const { sc_id } = req.params;
    const { amountCollected } = req.body;


    const existingCollection = await SalesCollection.findOne({ sc_id });

    if (!existingCollection) {
      return res.status(404).json({ error: `SalesCollection not found with the provided sc_id: ${sc_id}` });
    }


    const creditAdjustment = existingCollection.amountCollected - amountCollected;
    // console.log("credit", creditAdjustment);

    await SalesCollection.updateOne({ sc_id }, req.body);


    await Sale.updateOne(
      { sbillno: existingCollection.s_billNo },
      { $inc: { credit: creditAdjustment } }
    );

    res.status(200).json({ message: "SalesCollection updated successfully" ,data:req.body});
  } catch (error) {
    console.error("Error updating sales collection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete-collection/:sc_id", async (req, res) => {
  try {
    const { sc_id } = req.params;

    // Find the SalesCollection document by sc_id
    const existingCollection = await SalesCollection.findOne({ sc_id });

    if (!existingCollection) {
      return res.status(404).json({ error: `SalesCollection not found with the provided sc_id: ${sc_id}` });
    }

    // Adjust the credit value in Sale collection before deleting the SalesCollection
    await Sale.updateOne(
      { sbillno: existingCollection.s_billNo },
      { $inc: { credit: existingCollection.amountCollected } }
    );

    // Delete the SalesCollection document
    await SalesCollection.deleteOne({ sc_id });

    res.status(200).json({ message: "SalesCollection deleted successfully" });
  } catch (error) {
    console.error("Error deleting sales collection:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
