const { createDestination } = require("../../Controllers/Admin/destinationController");

const router = require("express").Router();


router.route("/")
.post(createDestination)

module.exports = router;
