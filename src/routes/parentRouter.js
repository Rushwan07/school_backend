const express = require("express");
const parentController = require("../controllers/parentController");
const router = express.Router();


router
    .route("/")
    .post(parentController.createParent)
    .get(parentController.getAllParents);


router
    .route("/:id")
    .get(parentController.getParentById)
    .patch(parentController.updateParent)
    .delete(parentController.deleteParent);

module.exports = router;
