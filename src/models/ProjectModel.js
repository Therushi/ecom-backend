const mongoose = require("mongoose");
const schemaOptions = require("../utils/timeStamp");

const ProjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
    priority: {
      type: String,
      require: true,
    },
    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      reuired: true,
    },
    employee: [
      {
        employeeId: {
          type: mongoose.Schema.Types.ObjectId,
        },
        name: { type: String },
        email: { type: String },
      },
    ],
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  schemaOptions
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
