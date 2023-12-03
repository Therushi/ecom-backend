const express = require("express");
const { createEmployee } = require("../controller/EmployeeController");
const router = express.Router();

router.post("/employee", createEmployee);

module.exports = router;
