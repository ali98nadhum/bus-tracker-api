const { createDestination, getAllDestination } = require("../../Controllers/Admin/destinationController");

const router = require("express").Router();


router.route("/")
.post(createDestination)
.get(getAllDestination)

module.exports = router;
