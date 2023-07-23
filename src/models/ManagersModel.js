const mongoose = require("mongoose");
const modelOptions = require("../utils/timeStamp");

const ManagersSchema = mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    require: true,
  },
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
});

const Managers = mongoose.model("Managers", ManagersSchema);
module.exports = Managers;
