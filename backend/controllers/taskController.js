const { get } = require("mongoose");
const Task = require("../models/Task");

// @desc   Create a new task
// @route  POST /api/tasks
// @access Public
const createTask = async (req, res) => {
  try {
    const { customerName, location, taskType, scheduledTime, notes } = req.body;

    if (!customerName || !location || !taskType || !scheduledTime) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const task = await Task.create({
      customerName,
      location,
      taskType,
      scheduledTime,
      notes,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get today's tasks
// @route  GET /api/tasks/today
// @access Public
const getTodayTasks = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const tasks = await Task.find({
      scheduledTime: { $gte: startOfDay, $lte: endOfDay }
    }).sort({ scheduledTime: 1 });

    // ✅ SEND RESPONSE ONLY ONCE
    return res.status(200).json(tasks);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


// @desc   Mark task as completed
// @route  PATCH /api/tasks/:id/complete
// @access Public
const completeTask = async (req, res) => {
  try {
    const { completedAt } = req.body;

    if (!completedAt) {
      return res.status(400).json({ message: "Completion time is required" });
    }

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (task.status === "Completed") {
      return res.status(400).json({ message: "Task already completed" });
    }

    task.status = "Completed";
    task.completedAt = completedAt;

    await task.save();

    res.status(200).json({
      message: "Task marked as completed",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Get today's task summary
// @route  GET /api/tasks/summary/today
// @access Public
const getTodaySummary = async (req, res) => {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const total = await Task.countDocuments({
      scheduledTime: { $gte: startOfDay, $lte: endOfDay },
    });

    const completed = await Task.countDocuments({
      scheduledTime: { $gte: startOfDay, $lte: endOfDay },
      status: "Completed",
    });

    const pending = await Task.countDocuments({
      scheduledTime: { $gte: startOfDay, $lte: endOfDay },
      status: "Pending",
    });

    res.status(200).json({
      total,
      completed,
      pending,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTodayTasks,
  completeTask,
  getTodaySummary,
  getAllTasks
};
