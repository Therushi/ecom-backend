const mongoose = require("mongoose");
const modelOptions = require("../utils/timeStamp");

const RolesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    Description: {
      type: String,
    },
  },
  modelOptions
);

const Roles = mongoose.model("Role", RolesSchema);
module.exports = Roles;
