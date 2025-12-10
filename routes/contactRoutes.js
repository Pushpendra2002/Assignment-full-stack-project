// backend/routes/contactRoutes.js
import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST /api/contacts  -> save contact form data
router.post("/", async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;

    if (!fullName || !email || !mobile || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.create({ fullName, email, mobile, city });
    res.status(201).json(contact);
  } catch (error) {
    console.error("Error saving contact:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/contacts  -> get all contact submissions (for admin panel)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
