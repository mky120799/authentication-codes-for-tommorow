const express = require("express");
const {
  signUp,
  login,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");
const authMiddleware = require('../middlewares/authMiddleware')
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/forgot-password", authMiddleware, forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
