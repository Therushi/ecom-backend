const Project = require("../models/ProjectModel");
const asyncHandler = require("../utils/asyncHandler");

exports.createProject = asyncHandler(async (req, res) => {
  const { name, priority, managerId, adminId, employee, startDate, endDate } =
    req.body;

  const existingProject = await Project.findOne({ name });

  if (existingProject) {
    return res.status(409).json({
      status: false,
      message: "Project with same name is already exists",
    });
  }

  const projectAssignee = managerId ? managerId : adminId;
  const project = await Project.create({
    name,
    priority,
    companyId,
    projectAssignee,
    employee,
    startDate,
    endDate,
  });

  if (project) {
    res.status(201).json({
      status: true,
      message: "Project created sucessfully",
      data: project,
    });
  }
});

exports.updateProject = asyncHandler(async (req, res) => {
  const { id } = req.params.id;
  const filter = { _id: id };
  const updates = {};
  for (const field in req.body) {
    if (Object.prototype.hasOwnProperty.call(req.body, field)) {
      updates[field] = req.body[field];
    }
  }
  const updatedProject = await Project.findOneAndUpdate(filter, updates, {
    new: true,
  });

  if (!updatedProject) {
    return res.status(404).json({
      status: false,
      message: "Project not found",
    });
  }
  res.status(200).json({
    status: true,
    message: "Project updated successfully",
    data: updatedProject,
  });
});

exports.getAllProject = asyncHandler(async (req, res) => {
  const projects = await Project.find({});
  return res.status(200).json({
    status: true,
    message: "Fetched all Projects",
    data: projects,
  });
});

exports.getProjectByManagerId = asyncHandler(async (req, res) => {
  const id = req.params.managerId;

  const projects = await Project.find({ managerId: id });

  if (projects == null) {
    return res.status(404).json({
      message: `Project for id ${id} not found`,
    });
  }
  return res.status(200).json({
    message: "Project fetched sucessfully ",
    data: projects,
  });
});

exports.deleteProjectById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const filter = { _id: id };

  const updatedProject = await Project.findOneAndUpdate(
    filter,
    { deleted: true },
    { new: true }
  );

  if (!updatedProject) {
    return res.status(404).json({
      message: "Project not found",
    });
  }

  res.status(200).json({
    message: "Project deleted successfully",
    data: updatedProject,
  });
});
