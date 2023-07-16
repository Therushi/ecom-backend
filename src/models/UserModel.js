const mongoose = require("mongoose");
const schemaOptions = require("../utils/timeStamp");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required for registration"],
    },
    email: {
      type: String,
      required: [true, "Email is required for registration"],
      unique: true,
    },
    roles: {
      type: [String],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  schemaOptions
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
