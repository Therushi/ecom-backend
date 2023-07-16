const Project = require("../models/ProjectModel");
const User = require("../models/UserModel");
const asyncHandler = require("../utils/asyncHandler");

exports.createProject = asyncHandler(async (req, res) => {
  const { name, priority, managerId, employee, startDate, endDate } = req.body;

  const existingProject = await Project.findOne({ name });

  if (existingProject)
    return res.status(409).json({ message: "Project is already exists" });

  const managerExists = await User.findOne({
    _id: managerId,
    roles: {
      $elemMatch: {
        $eq: "admin",
      },
    },
  });
  if (managerExists === null) {
    return res.status(404).json({
      message: "Manager not found",
    });
  }
  const employeeIds = employee.map((id) => id.employeeId);

  const employeeExists = await User.find({
    _id: { $in: employeeIds },
    roles: {
      $elemMatch: {
        $eq: "user",
      },
    },
  });

  const foundEmployeeIds = employeeExists.map((employee) =>
    employee._id.toString()
  );

  const missingEmployeeIds = employeeIds.filter(
    (employeeId) => !foundEmployeeIds.includes(employeeId)
  );

  if (missingEmployeeIds.length > 0 || employeeExists == null) {
    return res.status(404).json({
      message: "Check employee data",
      missingEmployeeIds: missingEmployeeIds,
    });
  }

  const project = await Project.create({
    name,
    priority,
    managerId,
    employee,
    startDate,
    endDate,
  });
  if (project) {
    res.status(201).json({
      message: "Project created sucessfully",
      data: project,
    });
  }
});

exports.updateProject = asyncHandler(async (req, res) => {
  const { id } = req.body;
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
      message: "Project not found",
    });
  }
  res.status(200).json({
    message: "Project updated successfully",
    data: updatedProject,
  });
});

exports.getAllProject = asyncHandler(async (req, res) => {
  const projects = await Project.find({});
  return res.status(200).json({
    message: "Fetched all Projects",
    data: projects,
  });
});

exports.getProjectById = asyncHandler(async (req, res) => {
  const id = req.params.id;

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
