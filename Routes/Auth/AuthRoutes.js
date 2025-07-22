const router = require("express").Router();
const {registerUser, login} = require("../../Controllers/Auth/AuthController");
const uploadImage = require("../../middlewares/uploadImage");


router.route("/register").post(uploadImage.single("image"),registerUser);
router.route("/login").post(login)

module.exports = router;