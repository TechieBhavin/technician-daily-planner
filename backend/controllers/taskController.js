const Task = require("../models/Task");

// @desc   Create a new task
// @route  POST /api/tasks
// @access Public
const createTask = async (req, res) => {
  try {
    const { customerName, location, taskType, scheduledTime, notes } = req.body;

    if (!customerName || !location || !taskType || !scheduledTime) {
      return res.status(400).json({ message: "All required fields must be filled" });
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
      scheduledTime: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }).sort({ status: 1, scheduledTime: 1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createTask,
  getTodayTasks,
};
