const mongoose = require("mongoose");
const modelOptions = require("../utils/timeStamp");

const CompanySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    website: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  modelOptions
);

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
