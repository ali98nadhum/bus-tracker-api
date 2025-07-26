const router = require("express").Router();
const {createDestination, getAllDestination, getDestinationById, deleteDestination} = require("../../Controllers/Admin/DestinationController");

router.route("/")
.post(createDestination)
.get(getAllDestination)


router.route("/:id")
.get(getDestinationById)
.delete(deleteDestination)

module.exports = router;
