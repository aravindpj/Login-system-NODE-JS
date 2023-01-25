const express = require("express");
const router = express.Router();
const authcontroller = require("../Controller/authController");
const usercontroller = require("../Controller/userController");

router.post("/signup", authcontroller.Signup);
router.post("/login", authcontroller.login);
router.post("/logout", authcontroller.logout);
router.post('/forgotpassword',authcontroller.forgottenpassword)
router.post('/resetpassword',authcontroller.resetPassword)
// FACING BUG ON THIS ROUTER
router.patch(
  "/updateProfile",
  authcontroller.isLoggedIn,
  usercontroller.uploadUserProfile,
  usercontroller.uploadProfilePhoto,
);
module.exports = router;
