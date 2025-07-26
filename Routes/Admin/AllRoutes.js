const express = require("express");
const router = express.Router();


router.use("/destination", require("./DestinationRoutes"))



module.exports = router;
