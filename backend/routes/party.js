import express from "express";
import Party from "../models/Party.js";

const router = express.Router();

router.get("/get-parties", async (req, res) => {
  try {
    const parties = await Party.find();
    res.json(parties);
  } catch (error) {
    console.error("Error getting parties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/get-party/:party_id", async (req, res) => {

  try {
    const party = await Party.findOne({ party_id:req.params.party_id  });
    if (!party) {
      return res.status(404).json({ error: "Party not found" });
    }
    res.json(party);
  } catch (error) {
    console.error("Error getting party:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add-party", async (req, res) => {
  const partyData = req.body;
  try {
    const newParty = new Party(partyData);
    const savedParty = await newParty.save();
    res.json(savedParty);
  } catch (error) {
    console.error("Error adding party:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/add-parties", async (req, res) => {
  const partiesData = req.body;
  try {
    const savedParties = await Party.insertMany(partiesData);
    res.json(savedParties);
  } catch (error) {
    console.error("Error adding parties:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/update-party/:party_id", async (req, res) => {

  const updatedData = req.body;
  try {
    const updatedParty = await Party.findOneAndUpdate({ party_id:req.params.party_id  }, updatedData, { new: true });
    if (!updatedParty) {
      return res.status(404).json({ error: "Party not found" });
    }
    res.json(updatedParty);
  } catch (error) {
    console.error("Error updating party:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/delete-party/:party_id", async (req, res) => {

  try {
    const deletedParty = await Party.findOneAndDelete({ party_id:req.params.party_id });
    if (!deletedParty) {
      return res.status(404).json({ error: "Party not found" });
    }
    res.json(deletedParty);
  } catch (error) {
    console.error("Error deleting party:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;