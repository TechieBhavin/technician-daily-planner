const express = require("express");
const router = express.Router();

const {
  createTask,
  getTodayTasks,
  getTodaySummary,
  completeTask,
  getAllTasks
} = require("../controllers/taskController");

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/today", getTodayTasks);
router.get("/summary/today", getTodaySummary);
router.put("/:id/complete", completeTask);

module.exports = router;
