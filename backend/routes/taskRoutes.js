const express = require("express");
const router = express.Router();

const { createTask, getTodayTasks, completeTask } = require("../controllers/taskController");

router.post("/", createTask);
router.get("/today", getTodayTasks);
router.patch("/:id/complete", completeTask);

module.exports = router;
