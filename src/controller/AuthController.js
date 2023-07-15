const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const asyncHandler = require("../utils/asyncHandler");

exports.register = asyncHandler(async (req, res) => {
  const { name, email, roles, password } = req.body;

  const existingUser = await User.findOne({
    email,
    name,
  });

  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  const encryptedUser = await bcrypt.hash(password, saltRounds);

  const user = await User.create({
    name,
    email,
    roles,
    password: encryptedUser,
  });
  user.password = undefined;

  if (user)
    return res
      .status(201)
      .json({ message: "User created sucessfully", data: user });
});

exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({
    email,
  });

  if (!existingUser)
    return res.status(403).json({ message: "Please register to login" });

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
      message: "Please check your credentials",
    });
  }
});
