const router = require("express").Router();
const {registerUser, login, verfiyEmail, forgotPassword, resetPassword} = require("../../Controllers/User/AuthController");
const uploadImage = require("../../middlewares/uploadImage");
const validate = require("../../middlewares/validate");
const { registerValidator } = require("../../Utils/validators/UserRegistervalidator");






router.route("/register")
.post(uploadImage.single("image"), validate(registerValidator), registerUser)


router.route("/verify-email/:id/:verificationToken")
.get(verfiyEmail)

router.route("/login")
.post(login)

router.route("/forgot-password")
.post(forgotPassword)

router.route("/reset-password/:token")
.post(resetPassword)

module.exports = router;
