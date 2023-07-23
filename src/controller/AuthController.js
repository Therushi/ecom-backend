const Managers = require("../models/ManagersModel");
const Employees = require("../models/EmployeesModel");
const Admin = require("../models/AdminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const asyncHandler = require("../utils/asyncHandler");
const { userCollections } = require("../utils/constants");

exports.register = asyncHandler(async (req, res) => {
  let Role = Managers;
  const { name, email, password, companyId, managerId, adminId } = req.body;
  if (managerId || adminId) {
    Role = Employees;
  }
  const existingUser = await Role.findOne({
    email,
    name,
  });

  if (existingUser)
    return res
      .status(400)
      .json({ status: false, message: "User already exists" });

  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  let User;
  switch (Role) {
    case Managers:
      User = await Managers.create({
        companyId,
        name,
        email,
        password: encryptedPassword,
      });
      break;
    case Employees:
      const assigneeId = managerId ? managerId : adminId;
      User = await Employees.create({
        companyId,
        assigneeId,
        name,
        email,
        password: encryptedPassword,
      });
      break;
  }

  if (User)
    return res.status(201).json({
      status: true,
      message: "User created sucessfully",
      data: User,
    });
});

exports.login = asyncHandler(async (req, res) => {
  const path = req.params;
  const { email, password } = req.body;
  let userRole;
  switch (path) {
    case "manager":
      userRole = Managers;
      break;
    case "employee":
      userRole = Employees;
      break;
    case "admin":
      userRole = Admin;
      break;
  }
  const existingUser = await userRole.findOne({
    email,
  });

  if (!existingUser)
    return res
      .status(403)
      .json({ status: false, message: "Please register to login" });

  if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
    const token = jwt.sign(
      { id: existingUser.id, email },
      process.env.JWT_SECRET_KEY,
      { algorithm: "HS256", expiresIn: "2h" }
    );
    existingUser.password = undefined;

    return res.status(200).json({
      message: "login sucessfull",
      data: {
        token: token,
        userInfo: existingUser,
      },
    });
  } else {
    return res.status(401).json({
      status: false,
      message: "Please check your credentials",
    });
  }
});

exports.adminRegister = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const checkExistingAdmin = await Admin.findOne({ email, name });

  if (checkExistingAdmin) {
    return res.status(409).json({
      status: false,
      message: "User already present please login",
    });
  }

  const encryptedPassword = await bcrypt.hash(password, saltRounds);
  const user = await Admin.create({ name, email, password: encryptedPassword });
  if (user) {
    return res.send(201).json({
      status: true,
      message: "User created sucessfully",
      data: user,
    });
  }
});

exports.deleteUsers = asyncHandler(async (req, res) => {
  const { userId, userType } = req.params;
  const filter = { _id: userId };

  if (!userCollections.hasOwnProperty(userType)) {
    return res.status(400).json({ error: "Invalid user type." });
  }
  const collection = db.collection(userCollections[userType]);
  const deletedUser = await collection.findOneAndDelete(filter);

  if (!deletedUser) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json({
    message: "User deleted successfully",
    data: deletedUser,
  });
});
