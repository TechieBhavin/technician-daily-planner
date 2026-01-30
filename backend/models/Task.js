const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    taskType: {
      type: String,
      enum: ["Installation", "Repair", "Maintenance", "Inspection"],
      required: true,
    },
    scheduledTime: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending",
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
