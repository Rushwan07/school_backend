const express = require("express");
const feesController = require("../controllers/feesController");
const router = express.Router();

// Route for creating and fetching fees
router
    .route("/")
    .post(feesController.createFees) // Create fees
    .get(feesController.getAllFees); // Get all fees

// Route for fetching, updating, and deleting a fees record by ID
router
    .route("/:id")
    .get(feesController.getFeesById) // Get fees by ID
    .patch(feesController.updateFees) // Update fees
    .delete(feesController.deleteFees); // Delete fees

module.exports = router;
