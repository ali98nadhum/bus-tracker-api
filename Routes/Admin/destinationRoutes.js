const { createDestination, getAllDestination, getOneDestination } = require("../../Controllers/Admin/destinationController");

const router = require("express").Router();


router.route("/")
.post(createDestination)
.get(getAllDestination)

router.route("/:id")
.get(getOneDestination)

module.exports = router;
