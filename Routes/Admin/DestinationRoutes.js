const router = require("express").Router();
const {createDestination, getAllDestination, getDestinationById} = require("../../Controllers/Admin/DestinationController");

router.route("/")
.post(createDestination)
.get(getAllDestination)


router.route("/:id")
.get(getDestinationById)

module.exports = router;
