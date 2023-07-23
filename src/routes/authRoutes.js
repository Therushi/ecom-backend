const express = require("express");
const {
  adminRegister,
  login,
  register,
  deleteUsers,
} = require("../controller/AuthController");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/admin/register", adminRegister);
router.delete("/deleteUser/:userType/:userId", deleteUsers);

module.exports = router;
