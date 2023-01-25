const express = require("express");
const router = express.Router();
const viewController = require("../Controller/viewController");
const authController = require("../Controller/authController");
const userController = require("../Controller/userController");

router.get(
  "/",
  authController.isLoggedIn,
  viewController.getMe,
  viewController.LoginWindow
);

router.get("/register", viewController.SignupWindow);
router.use(authController.isLoggedIn)
router.get("/profile", viewController.getMe);
router.get('/forgotpassword',viewController.forgotPassword)
router.get('/resetpassword',viewController.resetpassword)


//upload file 
router.post(
  "/upload",
  userController.uploadUserProfile,
  userController.uploadProfilePhoto,
  viewController.redirectAccount
);

module.exports = router;
