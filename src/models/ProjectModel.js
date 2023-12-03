const mongoose = require("mongoose");
const schemaOptions = require("../utils/timeStamp");

const ProjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    priority: {
      type: String,
      required: true,
    },
    userId: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Users",
    },
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Companies",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  schemaOptions
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
