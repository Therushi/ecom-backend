const express = require("express");
const {
  verifyEmail,
  login,
  register,
  roleAdd,
  addSubscription,
} = require("../controller/AuthController");
const router = express.Router();

// router.post("/login", login);
router.post("/register", register);
router.post("/verifyEmail", verifyEmail);
router.post("/addRole", roleAdd);
router.post("/addSubscription", addSubscription);

module.exports = router;
