const { createDestination, getAllDestination, getOneDestination, deleteDestination } = require("../../Controllers/Admin/destinationController");

const router = require("express").Router();


router.route("/")
.post(createDestination)
.get(getAllDestination)

router.route("/:id")
.get(getOneDestination)
.delete(deleteDestination)

module.exports = router;
