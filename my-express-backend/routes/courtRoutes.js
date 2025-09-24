const express = require("express");
const router = express.Router();
const Court = require("../models/courtModel");

router.get("/", async (req, res) => {
  try {
    const courts = await Court.find();
    res.json(courts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courts" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const court = await Court.findById(req.params.id);
    if (!court) {
      return res.status(404).json({ error: "Court not found" });
    }
    res.json(court);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch court" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { courtNo, pricePerHour, fromHour, toHour, image } = req.body;

    if (!courtNo || !pricePerHour || !fromHour || !toHour || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const court = await Court.create({
      courtNo,
      pricePerHour,
      fromHour,
      toHour,
      image,
    });

    res.status(201).json(court);
  } catch (err) {
    res.status(500).json({ error: "Failed to create court" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const court = await Court.findByIdAndDelete(req.params.id);
    if (!court) {
      return res.status(404).json({ error: "Court not found" });
    }
    res.json({ message: "Court deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete court" });
  }
});

module.exports = router;
