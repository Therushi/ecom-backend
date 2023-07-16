const mongoose = require("mongoose");
const modelOptions = require("../utils/timeStamp");

const CompanySchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    website: {
      type: String,
    },
    contact: {
      type: Number,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  modelOptions
);

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
