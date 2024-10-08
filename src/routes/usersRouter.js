const express = require("express");

const userController = require("../controllers/usersController");

const router = express.Router();

router.route("/signin").post(userController.signin);
router.route("/signout").post(userController.signout);
router.route("/admin-signup").post(userController.adminSignin);

module.exports = router;
