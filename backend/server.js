const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");

// const Task = require("./models/Task");

const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
connectDB();

app.use("/api/tasks", taskRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
  });
});

app.get("/", (req, res) => {
  res.send("Technician Daily Planner API is running");
});

const PORT = process.env.PORT || 5007;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
