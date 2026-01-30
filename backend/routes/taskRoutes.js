const express = require("express");
const router = express.Router();

const { createTask, getTodayTasks, completeTask, getTodaySummary } = require("../controllers/taskController");

router.post("/", createTask);
router.get("/today", getTodayTasks);
router.patch("/:id/complete", completeTask);
router.get("/summary/today", getTodaySummary);
module.exports = router;
