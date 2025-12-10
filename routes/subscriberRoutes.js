// backend/routes/subscriberRoutes.js
import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// POST /api/subscribers -> add a new subscriber
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: "Already subscribed" });
    }

    const sub = await Subscriber.create({ email });
    res.status(201).json({ message: "Subscribed successfully", subscriber: sub });
  } catch (error) {
    console.error("Error subscribing:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/subscribers -> get all subscribers (for admin panel)
router.get("/", async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (error) {
    console.error("Error fetching subscribers:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
