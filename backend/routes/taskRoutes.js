const express = require("express");
const router = express.Router();

const { createTask, getTodayTasks } = require("../controllers/taskController");

router.post("/", createTask);
router.get("/today", getTodayTasks);

module.exports = router;
