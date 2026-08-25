const express = require("express");
const router = express.Router();
const { startTrip, endTrip } = require("../../Controllers/Driver/TripController");
const { verifyTokenAndDriver } = require("../../middlewares/verifyToken");

router.put("/start", verifyTokenAndDriver, startTrip);
router.put("/end", verifyTokenAndDriver, endTrip);

module.exports = router;
