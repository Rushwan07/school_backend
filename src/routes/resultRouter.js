const express = require("express");
const resultController = require("../controllers/resultController");
const router = express.Router();


router
    .route("/")
    .post(resultController.createResult)
    .get(resultController.getAllResults);


router
    .route("/:id")
    .get(resultController.getResultById)
    .patch(resultController.updateResult)
    .delete(resultController.deleteResult);

module.exports = router;
