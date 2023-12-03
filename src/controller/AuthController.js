const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const asyncHandler = require("../utils/asyncHandler");
const { userCollections } = require("../utils/constants");
const Roles = require("../models/RolesModel");
const Subscription = require("../models/SubscriptionModel");

exports.verifyEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error("Email is mandatory");

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(401).json({
      status: false,
      message: "Email already taken",
      data: null,
    });
  }
  return res.status(200).json({
    status: true,
    message: "Email is valid",
    data: null,
  });
});

// TODO: OTP VERIFICATION API

exports.register = asyncHandler(async (req, res) => {
  const { name, email, password, roleType, subscriptionType } = req.body;

  if (!(name && email && password && roleType && subscriptionType)) {
    return res.status(400).json({
      status: false,
      message: "All fields are mandatory",
      data: null,
    });
  }

  const subscription = await Subscription.findOne(
    { name: subscriptionType.toLowerCase() },
    { _id: 1, validity: 1 }
  );
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + subscription.validity);
  const subscriptionEndDate = endDate.toISOString();
  const roles = await Roles.find({}, { _id: 1 });
  const rolesIds = roles.map((id) => id._id);

  // Encrypt password and Store
  const encryptedPassword = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    name,
    email,
    password: encryptedPassword,
    isRegistered: true,
    subscriptionId: subscription._id,
    roleId: rolesIds,
    subscriptionEndDate,
  });

  if (!user) throw new Error("while creating user something went wrong");

  return res.status(200).json({
    status: true,
    message: "user registered sucessfully",
    data: user,
  });
});

exports.roleAdd = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  const role = await Roles.create({ name, description });

  return res.status(200).json({
    status: 200,
    data: role,
  });
});

exports.addSubscription = asyncHandler(async (req, res) => {
  const { name, description, price, validity, userLimit, projectLimit } =
    req.body;

  const subscription = await Subscription.create({
    name,
    description,
    price,
    validity,
    userLimit,
    projectLimit,
  });

  return res.status(200).json({
    status: 200,
    data: subscription,
  });
});
