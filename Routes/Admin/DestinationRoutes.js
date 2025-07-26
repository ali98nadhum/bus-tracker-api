const router = require("express").Router();
const {createDestination, getAllDestination} = require("../../Controllers/Admin/DestinationController");

router.route("/")
.post(createDestination)
.get(getAllDestination)

module.exports = router;
