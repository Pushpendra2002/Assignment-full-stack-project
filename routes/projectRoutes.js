// backend/routes/projectRoutes.js
import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// GET /api/projects  -> get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error("Error fetching projects:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/projects -> add a new project
router.post("/", async (req, res) => {
  try {
    const { imageUrl, name, description } = req.body;

    if (!imageUrl || !name || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const project = await Project.create({ imageUrl, name, description });
    res.status(201).json(project);
  } catch (error) {
    console.error("Error creating project:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
