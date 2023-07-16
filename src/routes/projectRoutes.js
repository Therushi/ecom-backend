const express = require("express");
const {
  createProject,
  updateProject,
  getAllProject,
  getProjectById,
} = require("../controller/ProjectController");
const router = express.Router();

router.post("/create-project", createProject);
router.post("/update-project", updateProject);
router.get("/get-project", getAllProject);
router.get("/get/:id", getProjectById);

module.exports = router;
