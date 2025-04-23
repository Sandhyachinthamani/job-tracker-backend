const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  status: {
    type: String,
    enum: ["applied", "interview", "offer", "rejected"],
    default: "applied",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", JobSchema);
