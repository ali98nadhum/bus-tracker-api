const router = require("express").Router();
const {registerUser, login} = require("../../Controllers/User/AuthController");
const uploadImage = require("../../middlewares/uploadImage");
const validate = require("../../middlewares/validate");
const { registerValidator } = require("../../Utils/validators/UserRegistervalidator");



router.route("/register").post(uploadImage.single("image"), validate(registerValidator), registerUser);
router.route("/login").post(login)

module.exports = router;