const mongoose = require("mongoose");

const AdminSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timeStamp: true,
  }
);

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
