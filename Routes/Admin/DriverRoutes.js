const router = require("express").Router();
const { getPendingDrivers, approveDriver } = require("../../Controllers/Admin/DriverController");
const { verifyTokenAndAdmin } = require("../../middlewares/verifyToken");

router.get("/pending", verifyTokenAndAdmin, getPendingDrivers);
router.put("/approve/:id", verifyTokenAndAdmin, approveDriver);

module.exports = router;
