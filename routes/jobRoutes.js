const Job = require("../models/Job");
const express = require("express");
const router = express.Router();

// Add new job
router.post("/add", async (req, res) => {
  console.log("POST BODY:", req.body); // <- Add this
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    console.error("Error adding job:", err.message);
    res.status(400).json({ error: err.message });
  }
});


// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ date: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update job status
router.put("/update/:id", async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, {
      status: req.body.status
    }, { new: true });

    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete job
router.delete("/delete/:id", async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
