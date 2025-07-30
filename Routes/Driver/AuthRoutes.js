const router = require("express").Router();
const { registerDriver } = require("../../Controllers/Driver/AuthDriver");
const uploadImage = require("../../middlewares/uploadImage");



router.route("/register").post(
  uploadImage.fields([
    { name: "draverImage", maxCount: 1 },
    { name: "licensephoto", maxCount: 1 },
  ]),
  registerDriver
);

module.exports = router;
