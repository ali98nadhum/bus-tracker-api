const router = require("express").Router();
const { registerNewDriver } = require("../../Controllers/Driver/BusController");
const uploadImage = require("../../middlewares/uploadImage");



router.route("/register").post(
  uploadImage.fields([
    { name: "draverImage", maxCount: 1 },
    { name: "licensephoto", maxCount: 1 },
  ]),
  registerNewDriver
);

module.exports = router;
