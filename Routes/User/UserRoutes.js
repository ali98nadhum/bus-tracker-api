const router = require("express").Router();
const { getProfile, updateProfile, addFavorite, getFavorites, removeFavorite } = require("../../Controllers/User/UserController");
const { verifyTokenAndUser } = require("../../middlewares/verifyToken");
const uploadImage = require("../../middlewares/uploadImage");

router.route("/profile")
    .get(verifyTokenAndUser, getProfile)
    .put(verifyTokenAndUser, uploadImage.single("image"), updateProfile);

router.route("/favorites")
    .get(verifyTokenAndUser, getFavorites);

router.route("/favorites/:destinationId")
    .post(verifyTokenAndUser, addFavorite)
    .delete(verifyTokenAndUser, removeFavorite);

module.exports = router;
