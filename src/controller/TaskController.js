const Task = require("../models/TaskModel");
const asyncHandler = require("../utils/asyncHandler");

exports.createTask = asyncHandler(async (req, res) => {
  const { projectId, employeeId, title, description, completed } = req.body;

  const newTask = Task.create({
    projectId,
    employeeId,
    title,
    description,
    completed,
  });

  if (newTask) {
    res.status(201).json({
      message: "Task created Sucessfully",
    });
  }
});

exports.updateTask = asyncHandler(async (req, res) => {
  const taskId = req.params.taskId;
  const filter = { _id: taskId };
  const updates = {};
  for (const field in req.body) {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      updates[field] = req.body[field];
    }
  }
  const updatedTask = await Task.findOneAndUpdate(filter, updates, {
    new: true,
  });

  if (!updatedTask) {
    return res.status(404).json({
      message: "Task not found",
    });
  }
  res.status(200).json({
    message: "Task updated successfully",
    data: updatedTask,
  });
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const taskId = req.params.taskId;

  const deletedTask = await Task.findByIdAndDelete(taskId);

  if (deletedTask) {
    return res.status(204).json({
      message: "Task deleted sucessfully",
    });
  }
});

exports.getAllTaskByProjectId = asyncHandler(async (req, res) => {
  const projectId = req.params.projectId;

  const tasks = await Task.find({ projectId });

  if (!tasks) {
    return res.status(404).json({
      message: "Project not found",
    });
  }
  return res.status(200).json({
    message: "getting tasks sucessfully",
    data: tasks,
  });
});
