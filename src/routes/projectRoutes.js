const express = require("express");
const {
  createProject,
  updateProject,
  getAllProject,
  getProjectByManagerId,
  deleteProjectById,
} = require("../controller/ProjectController");
const router = express.Router();

router.get("/projects", getAllProject);
router.post("/projects", createProject);
router.get("/projects/:managerId", getProjectByManagerId);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProjectById);

module.exports = router;
