const express = require("express");
const router = express.Router();
const { startTrip, endTrip } = require("../../Controllers/Driver/TripController");

router.put("/start", startTrip);
router.put("/end", endTrip);

module.exports = router;
