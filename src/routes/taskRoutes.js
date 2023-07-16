const express = require("express");
const {
  createTask,
  updateTask,
  getAllTaskByProjectId,
  deleteTask,
} = require("../controller/TaskController");
const router = express.Router();

router.post("/tasks", createTask);
router.put("/tasks/:taskId", updateTask);
router.get("/tasks/:projectId", getAllTaskByProjectId);
router.delete("/tasks/:taskId", deleteTask);
module.exports = router;
