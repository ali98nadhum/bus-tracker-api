const router = require("express").Router();
const { getPendingDrivers, approveDriver, rejectDriver, blockDriver, getAllDrivers } = require("../../Controllers/Admin/DriverController");
const { verifyTokenAndAdmin } = require("../../middlewares/verifyToken");

router.get("/", verifyTokenAndAdmin, getAllDrivers);
router.get("/pending", verifyTokenAndAdmin, getPendingDrivers);
router.put("/approve/:id", verifyTokenAndAdmin, approveDriver);
router.put("/reject/:id", verifyTokenAndAdmin, rejectDriver);
router.put("/block/:id", verifyTokenAndAdmin, blockDriver);

module.exports = router;
