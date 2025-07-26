const router = require("express").Router();
const {createDestination, getAllDestination, getDestinationById, deleteDestination, updateDestination} = require("../../Controllers/Admin/DestinationController");

router.route("/")
.post(createDestination)
.get(getAllDestination)


router.route("/:id")
.get(getDestinationById)
.put(updateDestination)
.delete(deleteDestination)

module.exports = router;
