const mongoose = require("mongoose");

// Common validation function for managerId and adminId
function atLeastOneFieldRequired() {
  if (!this.managerId && !this.adminId) {
    return false; // At least one of managerId or adminId should be present
  }
  return true;
}

const EmployeesSchema = mongoose.Schema(
  {
    companyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
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
  },
  { timeStamps: true }
);

const Employees = mongoose.model("Employees", EmployeesSchema);
module.exports = Employees;
