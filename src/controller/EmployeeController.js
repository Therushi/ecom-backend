const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/UserModel");

exports.createEmployee = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    roleId,
    companyId,
    subscriptionId,
    subscriptionEndDate,
  } = req.body;

  if (
    !(
      name &&
      email &&
      roleId &&
      companyId &&
      subscriptionId &&
      subscriptionEndDate
    )
  ) {
    return res.status(400).json({
      status: false,
      message: "All fields are mandatory",
      data: null,
    });
  }

  const newUser = await User.create({
    name,
    email,
    roleId,
    companyId,
    subscriptionId,
    subscriptionEndDate,
  });

  if (!newUser) throw new Error("Something went wrong while creating users");

  return res.status(200).json({
    status: true,
    message: "User created successfully",
    data: null,
  });
});
