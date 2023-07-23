const mongoose = require("mongoose");
const schemaOptions = require("../utils/timeStamp");

// Common validation function for managerId and adminId
function atLeastOneFieldRequired() {
  if (!this.managerId && !this.adminId) {
    return false; // At least one of managerId or adminId should be present
  }
  return true;
}

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
      ref: "Managers",
      validate: atLeastOneFieldRequired,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      validate: atLeastOneFieldRequired,
    },
    employee: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Emplyees",
    },
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
