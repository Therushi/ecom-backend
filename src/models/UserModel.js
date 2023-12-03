const mongoose = require("mongoose");
const modelOptions = require("../utils/timeStamp");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: { type: String, select: false },
    roleId: { type: [mongoose.Schema.Types.ObjectId], ref: "Roles" },
    companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Companies" },
    isVerified: { type: Boolean, default: false },
    isRegistered: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscriptions",
    },
    subscriptionEndDate: {
      type: Date,
      required: true,
    },
  },
  modelOptions
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
