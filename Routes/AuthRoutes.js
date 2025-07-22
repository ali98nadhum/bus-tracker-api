const router = require("express").Router();
const {registerUser} = require("../Controllers/Auth/AuthController");
const uploadImage = require("../middlewares/uploadImage");


router.route("/register").post(uploadImage.single("image"),registerUser);

module.exports = router;