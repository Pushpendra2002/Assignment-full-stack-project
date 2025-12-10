// backend/routes/clientRoutes.js
import express from "express";
import Client from "../models/Client.js";

const router = express.Router();

// GET /api/clients  -> get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (error) {
    console.error("Error fetching clients:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/clients -> add a new client
router.post("/", async (req, res) => {
  try {
    const { imageUrl, name, description, designation } = req.body;

    if (!imageUrl || !name || !description || !designation) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const client = await Client.create({
      imageUrl,
      name,
      description,
      designation,
    });

    res.status(201).json(client);
  } catch (error) {
    console.error("Error creating client:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
