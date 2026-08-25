const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("express-async-handler");
const prisma = new PrismaClient();

// ==================================
// @desc Get user profile
// @route /api/v1/users/profile
// @method GET
// @access private (User only)
// ==================================
module.exports.getProfile = asyncHandler(async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: parseInt(req.user.id) },
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            isVerifird: true,
            createdAt: true
        }
    });

    if (!user) {
        return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    res.status(200).json(user);
});

// ==================================
// @desc Update user profile
// @route /api/v1/users/profile
// @method PUT
// @access private (User only)
// ==================================
module.exports.updateProfile = asyncHandler(async (req, res) => {
    const { name } = req.body;
    let imagePath;

    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await prisma.user.update({
        where: { id: parseInt(req.user.id) },
        data: {
            name: name || undefined,
            image: imagePath || undefined
        },
        select: {
            id: true,
            name: true,
            email: true,
            image: true
        }
    });

    res.status(200).json({ message: "تم تحديث الملف الشخصي", user: updatedUser });
});

// ==================================
// @desc Add favorite destination
// @route /api/v1/users/favorites/:destinationId
// @method POST
// @access private (User only)
// ==================================
module.exports.addFavorite = asyncHandler(async (req, res) => {
    const { destinationId } = req.params;

    try {
        const favorite = await prisma.user_fave_destination.create({
            data: {
                userId: parseInt(req.user.id),
                destinationId: parseInt(destinationId)
            }
        });
        res.status(201).json({ message: "تمت الإضافة إلى المفضلة", favorite });
    } catch (error) {
        // Handle unique constraint violation (already favorited)
        res.status(400).json({ message: "هذه الوجهة موجودة في المفضلة مسبقاً" });
    }
});

// ==================================
// @desc Remove favorite destination
// @route /api/v1/users/favorites/:destinationId
// @method DELETE
// @access private (User only)
// ==================================
module.exports.removeFavorite = asyncHandler(async (req, res) => {
    const { destinationId } = req.params;

    try {
        await prisma.user_fave_destination.delete({
            where: {
                userId_destinationId: {
                    userId: parseInt(req.user.id),
                    destinationId: parseInt(destinationId)
                }
            }
        });
        res.status(200).json({ message: "تم الحذف من المفضلة" });
    } catch (error) {
        res.status(400).json({ message: "لم يتم العثور على الوجهة في المفضلة" });
    }
});

// ==================================
// @desc Get favorite destinations
// @route /api/v1/users/favorites
// @method GET
// @access private (User only)
// ==================================
module.exports.getFavorites = asyncHandler(async (req, res) => {
    const favorites = await prisma.user_fave_destination.findMany({
        where: { userId: parseInt(req.user.id) },
        include: {
            destination: true
        }
    });

    const destinations = favorites.map(f => f.destination);
    res.status(200).json(destinations);
});
