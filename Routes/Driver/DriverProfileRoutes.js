const router = require("express").Router();
const { getDriverProfile } = require("../../Controllers/Driver/DriverProfileController");
const { verifyTokenAndDriver } = require("../../middlewares/verifyToken");

router.route("/")
    .get(verifyTokenAndDriver, getDriverProfile);

module.exports = router;
