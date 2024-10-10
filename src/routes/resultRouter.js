const resultController = require("../controllers/resultController");

const express = require("express");

const router = express.Router();

router.route("/").post(resultController.createResult);
// router.route("/admin-results").get("resultController.getAdmin   ")

module.exports = router;
