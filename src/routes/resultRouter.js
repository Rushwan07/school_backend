const resultController = require("../controllers/resultController");

const express = require("express");

const router = express.Router();

router.route("/create-result").post(resultController.createResult);

module.exports = router;
