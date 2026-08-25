const router = require("express").Router();
const { getAllDestination, getOneDestination } = require("../../Controllers/Admin/destinationController");

// Public routes for users to fetch destinations
router.get("/", getAllDestination);
router.get("/:id", getOneDestination);

module.exports = router;
